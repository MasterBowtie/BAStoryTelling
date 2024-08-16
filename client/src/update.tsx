import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./components/ui/form";
import  { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useApi } from "./utils/use_api.js";
import { useEffect, useState } from "react";
import { User } from "../../server/types/domain/domain.js";

const updateSchema = z.object({
    userID: z.number({
        required_error: "UserID is required"
    }),
    email: z.string({
        required_error: "Email Required"
    }),
    password: z.string({
        required_error: "Password is required"
    }),
    userName: z.string({
        required_error: "Username is required"
    })

});


export function Update() {
    const [ userID, setUserID] = useState<number| undefined>();
    const [ username, setName] = useState<string | undefined> ();
    const [ email, setEmail] = useState<string | undefined> ();
    const [ password, setPassword] = useState<string | undefined> ();
    const [ errorMsg, setErrorMsg ] = useState<String| undefined>();
    const api = useApi() 

    const updateForm = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema)
    })

    async function getUser(id: number) {
        const user_item = await api.get(`/users/${Number(id)}`);
        setUserID(Number(user_item.UserID));
        setName(user_item.userName);
        setEmail(user_item.email);
        console.log("Set users")
    }

    useEffect(() => {
        var temp = getUser(1)
    }, []);

    async function onSubmit() {
        const updateUser = {
            userName: username,
            email: email,
            userPassword: password
        }
    }

    return (
        <div className="body">
            <Card className="p-10 w-[350px] ">
            <Form {...updateForm}>
                <form className="space-y-8">
                    <Input type="number" value={userID} onChange={n => {setUserID(Number(n.target.value))}}/>
                    <Input value={email} onChange={n => {setEmail(n.target.value)}}/>
                    <Input  value={username} onChange={n => {setName(n.target.value)}}/>
                    <Input id="password" onChange={n => {setPassword(n.target.value)}}/>
                    {errorMsg? <p className="error">{errorMsg}</p>: <p></p>}           
                    <Button type="submit" onClick={onSubmit}>Login</Button>
                </form>
            </Form>
            </Card>
        </div>
    )
}