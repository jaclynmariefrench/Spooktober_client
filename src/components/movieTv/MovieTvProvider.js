import React, { useState } from "react"

export const MovieTvContext = React.createContext()

export const MovieTvProvider = (props) => {
    const [ movieTvs, setMovieTv ] = useState([])
    
    
    const getMovieTv = () => {
        return fetch("http://localhost:8000/movie_tv", {
            headers:{
                // need to figure out how to get authenticated from google
                // "Authorization": `Token ${localStorage.getItem("lu_token")}`
                "Authorization": `Token 382d5b67ddaf88d071e41206c245e4bff9447cfe`
            }
        })
            .then(response => response.json())
            .then(setMovieTv)
    }

    const getSingleMovie = (movie_id) => {
        return fetch(`http://localhost:8000/movie_tv/${movie_id}`, {
            // need to figure out how to get authenticated from google
            headers: {
                // "Authorization": `Token ${localStorage.getItem("lu_token")}`
                "Authorization": `Token 382d5b67ddaf88d071e41206c245e4bff9447cfe`
            }
        }
         )
    }
    return (
        <MovieTvContext.Provider value={{ movieTvs, setMovieTv, getMovieTv, getSingleMovie }} >
            { props.children }
        </MovieTvContext.Provider>
    )
}