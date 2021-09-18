import { useContext, useEffect, useState } from "react"
import { MovieTvContext } from "../movieTv/MovieTvProvider"

export const SimpleSearch = () => {
    const [searchTerm, setSearchTerm ] = useState("")
    const { movieTvs, getMovieTv } = useContext(MovieTvContext)

    useEffect(()=> {
        getMovieTv();
    }, [])

    return (
        <div className="simple-search">
            <input
                type="text"
                placeholder="what vibe you want?"
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            {/* RESULTS */}
            {
                movieTvs.filter(
                    (value)=> {
                        if (searchTerm == "") {
                            return value
                        } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        {
                            return value
                        }    
                    }).map(
                        (value, key)=> {
                            return(
                                <div className="search-results" key={key}>
                                    <h2>{value.title}</h2>
                                </div>
                            )
                        })}
            
        </div>
    )
}