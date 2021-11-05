import React, { useContext, useEffect, useState } from "react"
import { MovieDetailContext } from "./movieDetailProvider"

export const MovieApiDetail = () => {
    const { getMovieBySearch, movies, searchTerms } = useContext(MovieDetailContext)
    const [ filteredMovies, setFiltered ] = useState([])


    useEffect(() => {
        getMovieBySearch()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
         setFiltered(getMovieBySearch(searchTerms))
          const subset = movies.filter(movie => movie.Title.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } 
      }, [searchTerms])


    return (
        <section>
            HI
                {filteredMovies.map(
                    movie => {
                        return(
                            <>
                                <h1>{movie.Title}</h1>
                                <img src={movie.Poster} />

                            </>
                        )
                    }
                )}
        </section>
    )

}