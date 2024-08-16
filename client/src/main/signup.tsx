import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form";
import  { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useApi } from "../utils/use_api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/application_slice.js";

export function SignUp() {

    const passwordSchema = z.string()
        .min(8, { message: "Password must be longer than 8 characters long" })
        .max(20, { message: "Password must be shorter than 20 characters long" })
        .refine((password) => /[A-Z]/.test(password), {
          message: "Password must contain an Upper-case letter",
        })
        .refine((password) => /[a-z]/.test(password), {
          message: "Password must contain a Lower-case letter",
        })
        .refine((password) => /[0-9]/.test(password), { 
            message: "Password must contain a number",
         })
        .refine((password) => /[!@#$%^&*]/.test(password), {
          message: "Password must contain one of these special characters: !@#$%^&*",
        });
    const userNameSchema = z.string()
        .min(5, {message: "Username must be longer than 5 characters long"})
        .max(20, { message: "Username must be shorter than 20 charaters long"})
        //TODO: allowed special characters
        //      look for not allowed characters
        

    const signUpSchema = z.object({
        firstName: z.string({
            required_error: "Please give a first name"
        }),
        lastName: z.string({
            required_error: "Please give a last name"
        }),
        email: z.string({
            required_error: "Username or Email Required"
        }).email({
            message: "Must be an email"
        }),
        userName: userNameSchema,
        password: passwordSchema,
        confirm: z.string(),
    }).refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    });
    
    const [ errorMsg, setErrorMsg ] = useState<String| undefined>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api = useApi() 
    
    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema)
    })
    
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            const { token } = await api.post("/session", values);
            dispatch(setAuthToken(token));
            navigate('../');
        } catch (error) {
            setErrorMsg("Login failed: " + error);
        }
    }

    return (
        <div className="body">
            <Card className="p-10 w-[350px] ">

            <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username/Email</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        {errorMsg? <p className="error">{errorMsg}</p>: <p></p>}           
                        <Button type="submit">Login</Button>
                </form>
            </Form>
            </Card>
        </div>
    )
}