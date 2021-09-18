import React from "react"
import { Route } from "react-router-dom"
import { CalendarProvider } from "./cal/CalendarProvider"
import { CalendarView } from "./cal/calendarView"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"
import { SimpleSearch } from "./search/searchForm"
import { UserDetail } from "./user/UserDetail"
import { UserProvider } from "./user/UserProvider"

export const ApplicationViews = () => {
    return <>
            <CalendarProvider>
            <UserProvider>
                <Route path= "/profile">
                    <UserDetail/>
                    <CalendarView/>
                </Route>
            <MovieTvProvider>
                <Route path="/search">
                    <SimpleSearch/>
                </Route>
            </MovieTvProvider>
            </UserProvider>
            </CalendarProvider>
    </>
}