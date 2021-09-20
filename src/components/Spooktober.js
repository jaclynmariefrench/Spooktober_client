import React from "react"
import { Route, Redirect} from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/login"
import { NavBar } from "./nav/NavBar"
// import { Register } from "./auth/Register"

export const Spooktober = () => (
    <>
            <Route path="/" render={() => {
                if (localStorage.getItem("spooktober_token")) {
                    return <>
                        <Redirect to="/profile" />
                        <Route path="/" render={ApplicationViews}/>
                        </>
                } else {
                    return <Redirect to="/login" />
                }
                }} />

                <Route path="/login" render={Login} />
        
    </>
)


// else {
//     return <Redirect to="/login" />
// }



