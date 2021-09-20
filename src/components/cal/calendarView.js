import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import { CalendarContext } from "./CalendarProvider";
import { useContext } from "react";
import { useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"
import "../profile.css"


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer(
    {
        format, 
        parse,
        startOfWeek,
        getDay,
        locales
    }
)


export const CalendarView = () => {


    const { getCal, events, deleteEvent } = useContext(CalendarContext)

    useEffect(() => {
        getCal()
    }, [])
    

    const onSelectEvent=(pEvent) => {
        const r = window.confirm("Would you like to remove this event?")
        console.log(pEvent.id)
        if(r === true){
            deleteEvent(pEvent.id)

        }}
        


    return(
        <div className="calendar">
            <h1>Calendar</h1>
            <Calendar 
                selectable
                onSelectEvent={event => onSelectEvent(event)}
                localizer={localizer} 
                views={['month', 'agenda']}
                events={events} 
                startAccessor="start" 
                endAccessor="end"
                style={{height: 500, margin: "50px"}}/> 
        </div>
 
    )
} 


