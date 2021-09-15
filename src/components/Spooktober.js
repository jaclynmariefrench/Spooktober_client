import React from "react"
import { Route } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/login"
import { NavBar } from "./nav/NavBar"
// import { Register } from "./auth/Register"

export const Spooktober = () => (
    <>
        <Route exact path="/login">
            <Login/>
        </Route>
        <Route path="/profile">
            <NavBar/>
            <ApplicationViews/>
        </Route>
    </>
)




{/* <Route render={() => {
    if (localStorage.getItem("lu_token")) {
        return <>
        <Route render={NavBar} />
        <Route render={props => <ApplicationViews {...props} />} />
        </>
    } else {
        return <Redirect to="/login" />
    }
}} /> */}
{/* <Route path="/register" render={Register} /> */}