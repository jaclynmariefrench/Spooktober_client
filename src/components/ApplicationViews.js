import React from "react"
import { Route } from "react-router-dom"
import { MovieTvList } from "./movieTv/MovieTvList"
import { MovieTvProvider } from "./movieTv/MovieTvProvider"

export const ApplicationViews = () => {
    return <>
        <Route exact path= "/movielist">
            <MovieTvProvider>
                <MovieTvList/>
            </MovieTvProvider>
        </Route>
    </>
}