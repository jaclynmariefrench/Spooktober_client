import React, { useContext, useEffect, useState } from "react"
import { MovieDetailContext } from "./movieDetailProvider"

export const MovieApiDetail = () => {
    const { moviesDetails } = useContext(MovieDetailContext)
    // const [ filteredMovies, setFiltered ] = useState([])


    // useEffect(() => {
    //     getMovieBySearch()
    // }, [setMoviesDetail])

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //      setFiltered(getMovieBySearch(searchTerms))
    //       const subset = movies.filter(movie => movie.Title.toLowerCase().includes(searchTerms.toLowerCase()))
    //       setFiltered(subset)
    //     } 
    //   }, [searchTerms])


    return (
        <section>
            PICTURE
            <img src={`${moviesDetails.image.url}`} />
                {/* {moviesDetails.filter(
                    movie => {
                        return(
                            <>
                                <h1>{movie.Title}</h1>
                                <img src={movie.Poster} />

                            </>
                        )
                    }
                )} */}
        </section>
    )

}