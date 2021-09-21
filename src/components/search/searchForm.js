import { useContext, useEffect, useState } from "react"
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { SearchContext } from "../search/searchProvider"

export const SimpleSearch = () => {
    const [searchTerm, setSearchTerm ] = useState("")
    const [eraSelect, setEra ] = useState({id: 0})
    const [spiritSelect, setSpirit ] = useState({id:0})
    
    const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist } = useContext(MovieTvContext)
    const { getEras, eraList, spiritList, getSpirits } = useContext(SearchContext)

    useEffect(()=> {
        getMovieTv();
    }, [])

    useEffect(()=> {
        getEras();
    }, [])

    useEffect(()=> {
        getSpirits();
    }, [])

    const handleControlledInputChange = (event) => {
        const era = { ...eraSelect };
        era[event.target.id] = event.target.value;
        setEra(era);
        const spirit = { ...spiritSelect };
        spirit[event.target.id] = event.target.value;
        setSpirit(spirit);
      };
    
  

    return (
        <div className="simple-search">
            <input
                type="text"
                placeholder="what vibe you want?"
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            {/* DROPDOWN TOWN */}
            <fieldset className="search_form">
            <h2 className="dropdown__title">What's the Era?</h2>
                <div className="form-group">
                <select
                    onChange={handleControlledInputChange}
                >
                    <option value="8">Select the Era</option>
                    {eraList.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.label}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset className="search_form">
            <h2 className="dropdown__title">What's the Spirit?</h2>
                <div className="form-group">
                <select
                    onChange={handleControlledInputChange}
                >
                    <option value="8">Select the Spirit</option>
                    {spiritList.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.label}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
                <div>
                {/* RESULTS */}
                {
                    movieTvs.filter(
                        (value)=> {
                            if (searchTerm == "") {
                                return value
                            } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase())) 
                            {
                                return value
                            } else if (value.genre.toLowerCase().includes(searchTerm.toLowerCase())) 
                            {
                                return value
                            } else if (value.subGenre.toLowerCase().includes(searchTerm.toLowerCase())) 
                            {
                                return value
                            }     
                        }).map(
                            (value, key)=> {
                                return(
                                    <section key={key} className="add-to-watch">
                                    <h3 className="add-cal">{value.title}</h3>
                                        {
                                                value.added
                                                    ? <button className="btn btn-3"
                                                        onClick={() => leaveWaitlist(value.id)}
                                                        >Leave</button>
                                                    : <button className="btn btn-2"
                                                        onClick={() => addWaitlist(value.id)}
                                                        >Join</button>
                                            }
                                        </section>
                                )
                            }
                        ) 
                            }

                </div>
            </div>)}