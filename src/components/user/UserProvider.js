import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("https://spooktober-server.herokuapp.com/users", 
        { 
            headers: {
            "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
        }})
        .then(res => res.json())
        .then(setUsers)
    }

    const getSingleUser = (user_id) => {
        return fetch(`https://spooktober-server.herokuapp.com/users/${user_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers, getSingleUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}