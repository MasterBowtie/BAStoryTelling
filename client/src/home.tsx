import { Button } from "./components/ui/button.js";
import { useApi } from "./utils/use_api.js";
import { User } from "../../server/types/domain/domain.js"
import { useEffect, useState } from "react";



export function Home() {
    const [user, setUser] = useState<User | undefined> ();
    const id = 3;
    const api = useApi();
    async function getUser() {
        const user_item = await api.get(`/users/${Number(id)}`);
        console.log(user_item)
        setUser(user_item);
    }
    useEffect(() => {
        console.log("Got user: " + user?.id)
    }, [user])

    return (
        <div className="body">
            <Button onClick={() => getUser()}>Get User</Button>
            {user? (<div>
                <p>{user.userName}</p>
            </div>): (<div><p>No User</p></div>)}
        </div>
    )
}