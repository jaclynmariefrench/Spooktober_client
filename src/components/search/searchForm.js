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
            <fieldset className="search_form">
            <h2 className="dropdown__title">What's the spirit?</h2>
                <div className="form-group">
                <select
                    onChange={(e)=> {
                        setSearchTerm(e.target.value)
                    }}
                >
                    <option value="0">Select the Spirit</option>
                    {movieTvs.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.spirit}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset className="search_form">
            <h2 className="dropdown__title">What's the era?</h2>
                <div className="form-group">
                <select
                    onChange={(e)=> {
                        setSearchTerm(e.target.value)
                    }}
                >
                    <option value="0">Select the Era</option>
                    {movieTvs.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.era}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            {/* RESULTS */}
            {
                movieTvs.filter(
                    (value)=> {
                        if (searchTerm == "") {
                            return value
                        } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase()), 
                        value.subGenre.toLowerCase().includes(searchTerm.toLowerCase()))
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