import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Logout } from "../auth/logout"
import { UserDetail } from "../user/UserDetail"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/calendar">${
                    <UserDetail/>
                }</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/profile">Movies</Link>
            </li>
            <li className="navbar__item">
                <Logout/>
            </li> 
        </ul>
    )
}