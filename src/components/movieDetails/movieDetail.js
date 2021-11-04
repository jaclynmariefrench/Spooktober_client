import React, { useContext, useEffect, useState } from "react"
import { MovieDetailContext } from "./movieDetailProvider"

export const MovieApiDetail = () => {
    const { getMovieBySearch, movies, setMovies } = useContext(MovieDetailContext)
    const [searched, setSearched] = useState([])

    useEffect(() => {
        getMovieBySearch()
    }, [])


    return (
        <section>
            {movies.Title}
        </section>
    )

}