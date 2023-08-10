import React, { useState } from "react"

export const SearchContext = React.createContext()

export const SearchProvider = (props) => {
    const [ eraList, setEra ] = useState([])
    const [ spiritList, setSpirit ] = useState([])
    
    
    const getEras = () => {
        return fetch("http://localhost:8000/era", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(response => response.json())
            .then(setEra)
    }

    const getSingleEra = (era_id) => {
        return fetch(`http://localhost:8000/era/${era_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }

    const getSpirits = () => {
        return fetch("http://localhost:8000/spirit", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        })
            .then(response => response.json())
            .then(setSpirit)
    }

    const getSingleSpirit = (spirit_id) => {
        return fetch(`http://localhost:8000/era/${spirit_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("spooktober_token")}`
            }
        }
         )
    }
    return (
        <SearchContext.Provider value={{ eraList, setEra, getEras, getSingleEra, spiritList, getSpirits, getSingleSpirit }} >
            { props.children }
        </SearchContext.Provider>
    )
}