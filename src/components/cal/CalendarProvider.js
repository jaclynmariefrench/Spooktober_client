import React, { useState } from "react"

export const CalendarContext = React.createContext()

export const CalendarProvider = (props) => {
    const [event, setEvents ] = useState([])


    const getCal = () => {
        return fetch("http://localhost:8000/profile/calendar", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }

    const createEvent = (event) => {
        return fetch("http://localhost:8000/profile/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("spootober_token")}`
            },
            body: JSON.stringify(event)
         })
            .then(getCal)
    }

    const getEvent = (event_id) => {
        return fetch(`http://localhost:8000/profile/calendar/${event_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }
    
    const updateEvent = (event) => {
        return fetch(`http://localhost:8000/games/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            },
            body: JSON.stringify(event)
         })
            .then(getCal)
    }

    

    return (
        <CalendarContext.Provider value={{ getCal, createEvent, getEvent, updateEvent, event, setEvents }} >
            { props.children }
        </CalendarContext.Provider>
    )
}