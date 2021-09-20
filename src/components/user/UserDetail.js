import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"

export const UserDetail = () => {
    const {users, getUsers } = useContext(UserContext)

    useEffect(
        () => {
            getUsers()
        },
        [])
        
    return (
        <>
        Profile

        </>
    )
}