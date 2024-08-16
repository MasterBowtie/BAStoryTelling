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

const loginSchema = z.object({
    email: z.string({
        required_error: "Username or Email Required"
    }),
    password: z.string({
        required_error: "Password is required"
    })
});


export function Login() {
    const [ errorMsg, setErrorMsg ] = useState<String| undefined>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api = useApi() 

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
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

            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={loginForm.control}
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
                        control={loginForm.control}
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