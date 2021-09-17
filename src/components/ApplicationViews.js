import React from "react"
import { Route } from "react-router-dom"
import { CalendarProvider } from "./cal/CalendarProvider"
import { CalendarView } from "./cal/calendarView"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"

export const ApplicationViews = () => {
    return <>
        
        <MovieTvProvider>
            <CalendarProvider>
                <Route path= "/profile">
                    <CalendarView/>
                    <MovieTvList/>
                </Route>
                {/* <Route path="/calendar">
                </Route> */}
            </CalendarProvider>
        </MovieTvProvider>
    </>
}