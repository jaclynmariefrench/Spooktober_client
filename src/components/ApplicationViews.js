import React from "react"
import { Route } from "react-router-dom"
import { CalendarProvider } from "./cal/CalendarProvider"
import { CalendarView } from "./cal/calendarView"
import { WaitlistList } from "./cal/waitlistList"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"
import { SimpleSearch } from "./search/searchForm"
import { SearchProvider } from "./search/searchProvider"
import { UserDetail } from "./user/UserDetail"
import { UserProvider } from "./user/UserProvider"

export const ApplicationViews = () => {
    return <>
            <CalendarProvider>
            <UserProvider>
            <MovieTvProvider>
                <Route path= "/profile">
                    <UserDetail/>
                    <CalendarView/>
                    <WaitlistList/>
                </Route>
            </MovieTvProvider>
            </UserProvider>
            <SearchProvider>
                <MovieTvProvider>
                    <Route path="/search">
                        <SimpleSearch/>
                    </Route>
                </MovieTvProvider>
            </SearchProvider>
            </CalendarProvider>
    </>
}