import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/auth/logged_in">User</Link>
            </li>
            {/* <li className="navbar__item">
                <Link className="nav-link" to="categories">Categories</Link>
            </li> */}
            <li className="navbar__item">
                <Link className="nav-link" to="/profile">Movies</Link>
            </li>
        </ul>
    )
}