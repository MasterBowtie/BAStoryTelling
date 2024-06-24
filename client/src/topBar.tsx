import { Link, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";



export function TopBar() {
    return (
        <>
            <div id="mainTitle">
                BAStoryTelling
            </div>
            <div id="navigationArea">
                <div id="navigationBar">
                <Button asChild className={useLocation().pathname == "/"? "bg-active text-active-foreground hover:text-active_hover-foreground hover:bg-active_hover": ""}><Link to="/">Home</Link></Button>
                <Button asChild className={useLocation().pathname == "/Library"? "bg-active text-active-foreground hover:text-active_hover-foreground hover:bg-active_hover": ""}><Link to="/Library">Library</Link></Button>
                <Button asChild className={useLocation().pathname == "/Prompts"? "bg-active text-active-foreground hover:text-active_hover-foreground hover:bg-active_hover": ""}><Link to="/Prompts">Prompts</Link></Button>
                <Button asChild className={useLocation().pathname == "/News"? "bg-active text-active-foreground hover:text-active_hover-foreground hover:bg-active_hover": ""}><Link to="/News">News</Link></Button>
                <Button asChild className={useLocation().pathname == "/Login"? "bg-active text-active-foreground hover:text-active_hover-foreground hover:bg-active_hover": ""}><Link to="/Login">Login</Link></Button>
                </div>
            </div>
        </>
    )
}