import React from "react"
import { Route } from "react-router-dom"
import { CalendarProvider } from "./cal/CalendarProvider"
import { CalendarView } from "./cal/calendarView"
import { WaitlistList } from "./cal/waitlistList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"
import { NavBar } from "./nav/NavBar"
import { SimpleSearch } from "./search/searchForm"
import { SearchProvider } from "./search/searchProvider"
import { UserProvider } from "./user/UserProvider"
import BasicSelect from "./search/advanced_search"
import "./profile.css"
import { MovieDetailProvider } from "./movieDetails/movieDetailProvider"
import { MovieApiDetail } from "./movieDetails/movieDetail"




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
                            <Route path="/advanced-search">
                                <NavBar/>
                                <BasicSelect/>
                            </Route>
                        </MovieTvProvider>
                    </SearchProvider>
            </CalendarProvider>
            <MovieDetailProvider>
                <Route path= "/moviedetail">
                    <NavBar/>
                    <MovieApiDetail/>
                </Route>
            </MovieDetailProvider>
    </>
}