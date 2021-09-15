import React from "react"
import { Route } from "react-router-dom"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"

export const ApplicationViews = () => {
    return <>
        <Route path= "/profile">
            <MovieTvProvider>
                <MovieTvList/>
            </MovieTvProvider>
        </Route>
    </>
}