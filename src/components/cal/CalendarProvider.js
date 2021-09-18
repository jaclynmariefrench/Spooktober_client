import React, { useState } from "react"

export const CalendarContext = React.createContext()

export const CalendarProvider = (props) => {
    const [events, setEvents ] = useState([])


    const getCal = () => {
        return fetch("http://localhost:8000/calendar", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }

    const createEvent = (event) => {
        return fetch("http://localhost:8000/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            },
            body: JSON.stringify(event)
         })
            .then(getCal)
    }

    const getEvent = (event_id) => {
        return fetch(`http://localhost:8000/calendar/${event_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }
    
    const updateEvent = (event) => {
        return fetch(`http://localhost:8000/calendar/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            },
            body: JSON.stringify(event)
         })
            .then(getCal)
    }

    const deleteEvent = eventId => {
        return fetch(`http://localhost:8000/calendar/${ eventId }`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(getCal)
    }
    

    return (
        <CalendarContext.Provider value={{ getCal, createEvent, getEvent, updateEvent, events, setEvents, deleteEvent }} >
            { props.children }
        </CalendarContext.Provider>
    )
}