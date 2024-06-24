import { Button } from "./components/ui/button.js";
import { useApi } from "./utils/use_api.js";
import { User } from "../../server/types/domain/domain.js"
import { useState } from "react";



export function Home() {
    const [user, setUser] = useState<User | undefined> ();
    const id = 3;
    const api = useApi();
    async function getUser() {
        const user = await api.get(`/users/${Number(id)}`);
        console.log(user);

    }
    return (
        <>
            <Button onClick={() => getUser()}>Get User</Button>
        </>
    )
}