import React, { useState } from "react";
import DatePicker from "react-datepicker"
import { CalendarContext } from "./CalendarProvider";
import { useContext } from "react";
import { useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"



export const TestView = () => {

    const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})

    const { getCal, createEvent, events, deleteEvent } = useContext(CalendarContext)

    useEffect(() => {
        getCal()
    }, [])
    
    const handleAddEvent = () => {
        const newMovie = {
            movie_tv: newEvent.movie_tv,
            title: newEvent.title,
            all_day: true,
            start: newEvent.start,
            end: newEvent.end
        }
        createEvent(newMovie)
        console.log(newMovie)
    }

    const onSelectEvent=(pEvent) => {
        const r = window.confirm("Would you like to remove this event?")
        console.log(pEvent.id)
        if(r === true){
            deleteEvent(pEvent.id)

        }}
        


    return(
        <div className="calendar">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Movie" style={{width: "20%", marginRight: "10px"}}
                value={newEvent.movie_tv} 
                onChange={
                    (e)=> setNewEvent({...newEvent, movie_tv: e.target.value})
                }
                />
                <DatePicker 
                    placeholderText="Start Date" 
                    style= {{marginRight: "10px" }}
                    start={newEvent.start} 
                    onChange={(start)=> setNewEvent({...newEvent, start})}/>
                <DatePicker 
                    placeholderText="End Date" 
                    style= {{marginRight: "10px" }}
                    end={newEvent.end} 
                    onChange={(end)=> setNewEvent({...newEvent, end})}/>
                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
                    Add Event
                    </button>
            </div>
        </div>
 
    )
} 