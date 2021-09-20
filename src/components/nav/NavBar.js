import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Logout } from "../auth/logout"
import { UserDetail } from "../user/UserDetail"
import { UserProvider } from "../user/UserProvider"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <UserProvider>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="nav-link" to="/profile">{
                        <UserDetail/>
                    }</Link>
                </li>
                <li className="navbar__item">
                    <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="navbar__item">
                    <Logout/>
                </li> 
            </ul>
        </UserProvider>
    )
}