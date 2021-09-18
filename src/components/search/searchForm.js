import { useContext, useEffect, useState } from "react"
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { SearchContext } from "../search/searchProvider"

export const SimpleSearch = () => {
    const [searchTerm, setSearchTerm ] = useState("")
    const [eraSelect, setEra ] = useState({id: 0})
    const [spiritSelect, setSpirit ] = useState({id:0})
    
    const { movieTvs, getMovieTv } = useContext(MovieTvContext)
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

    useEffect(()=> {
        let filteredMovie = []
          for (const movie of movieTvs) {
            for (const era of eraList) {
              if(movie.era === era.id){
                filteredMovie.push(movie)
              }
            }
          }
        setEra(filteredMovie)
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
            {/* DROPDOWN TOWN */}
            <fieldset className="search_form">
            <h2 className="dropdown__title">What's the Era?</h2>
                <div className="form-group">
                <select
                    onChange={(e)=> {
                        setEra(e.target.value)
                    }}
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
                    onChange={(e)=> {
                        setSpirit(e.target.value)
                    }}
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
                                <div className="search-results" key={key}>
                                    <h2>{value.title}</h2>
                                </div>
                            )
                        })}
            {
                movieTvs.filter(
                    (value)=> {
                        if(eraSelect == value.id) {
                            return value
                        }
                    }
                ).map(
                    (value, key)=> {
                        return(
                            <div className="search-resutls" key={key}>
                                <header>Era Resutls</header>
                                <h2>{value.title}</h2>
                            </div>
                        )
                    }
                )
            }
                        
                        </div>
                        )
}
