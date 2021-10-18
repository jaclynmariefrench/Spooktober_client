import React, { useState } from "react"

export const MovieTvContext = React.createContext()

export const MovieTvProvider = (props) => {
    const [ movieTvs, setMovieTv ] = useState([])
    const [ userWaitlist, setUserWaitList ] = useState([])
    
    
    const getMovieTv = () => {
        return fetch("https://spooktober-server.herokuapp.com/movie_tv", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(response => response.json())
            .then(setMovieTv)
    }

    const getSingleMovie = (movie_id) => {
        return fetch(`https://spooktober-server.herokuapp.com/movie_tv/${movie_id}`, {
            // need to figure out how to get authenticated from google
            headers: {
                // "Authorization": `Token ${localStorage.getItem("lu_token")}`
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }

 

    const removeWaitlist = movieId => {
        return fetch(`https://spooktober-server.herokuapp.com/waitlist/${ movieId }`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(getUserWaitlist)
    }

    const leaveWaitlist = movieId => {
        return fetch(`https://spooktober-server.herokuapp.com/movie_tv/${ movieId }/waitlist`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(getMovieTv)
    }
    

    const addWaitlist = movieId => {
        return fetch(`https://spooktober-server.herokuapp.com/movie_tv/${ movieId }/waitlist`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(getMovieTv)
    }

    const getUserWaitlist = () => {
        return fetch(`https://spooktober-server.herokuapp.com/waitlist`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
        .then(response => response.json())
        .then(setUserWaitList)
    }


    return (
        <MovieTvContext.Provider value={{ movieTvs, setMovieTv, getMovieTv, getSingleMovie, 
        leaveWaitlist, addWaitlist, getUserWaitlist, userWaitlist, setUserWaitList, removeWaitlist  }} >
            { props.children }
        </MovieTvContext.Provider>
    )
}