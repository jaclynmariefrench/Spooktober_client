import React from "react"
import { Route } from "react-router-dom"
import { CalendarProvider } from "./cal/CalendarProvider"
import { CalendarView } from "./cal/calendarView"
import { WaitlistList } from "./cal/waitlistList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"
import { NavBar } from "./nav/NavBar"
import { SimpleSearch } from "./search/searchForm"
import { SearchProvider } from "./search/searchProvider"
import { UserDetail } from "./user/UserDetail"
import { UserProvider } from "./user/UserProvider"
import "./profile.css"
import ButtonAppBar from "./cal/modaltest"
import Blog from "./style_test/template"



export const ApplicationViews = () => {
    return <>
            <CalendarProvider>
            <UserProvider>
            <MovieTvProvider>

                <Route path= "/profile">
                    <NavBar/>
                    <div className="profile-container">
                        <WaitlistList/>
                        <CalendarView/>
                    </div>
                </Route>
            </MovieTvProvider>
            </UserProvider>
            <SearchProvider>
                <MovieTvProvider>
                    <Route path="/search">
                        <NavBar/>
                        <SimpleSearch/>
                    </Route>
                </MovieTvProvider>
            </SearchProvider>
            </CalendarProvider>
    </>
}