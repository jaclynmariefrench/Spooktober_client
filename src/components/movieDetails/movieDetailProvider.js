import React, { useState } from "react"

export const MovieDetailContext = React.createContext()

export const MovieDetailProvider = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getMovieBySearch = (searchWord) => {
        fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchWord}&page=1`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "8d35a21186msh13c018c76b51e55p175f7ajsn4e29773be49a"
            }
        })
            .then(response => {
                response.json()
            })
            .then(response => { setMovies(response) })
            .catch(err => {
                console.log("oops");
            });
    }

    return (
        <MovieDetailContext.Provider value={{ getMovieBySearch, movies, setMovies  }} >
            { props.children }
        </MovieDetailContext.Provider>
    )

}