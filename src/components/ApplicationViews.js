import React from "react"
import { Route } from "react-router-dom"
import { CalendarView } from "./cal/calendarView"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"

export const ApplicationViews = () => {
    return <>
        
        <MovieTvProvider>
            <Route path= "/profile">
                <MovieTvList/>
                <CalendarView/>
            </Route>
            <Route path="/calendar">
            </Route>
        </MovieTvProvider>
    </>
}