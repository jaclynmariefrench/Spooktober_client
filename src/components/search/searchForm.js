import { useContext, useEffect, useState } from "react";
import { MovieTvContext } from "../movieTv/MovieTvProvider";
import { SearchContext } from "../search/searchProvider";
import "./search.css"

export const SimpleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eraSelect, setEra] = useState({ id: 0 });
  const [spiritSelect, setSpirit] = useState({ id: 0 });
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [dropDownMovies, setDropDown ] = useState([])

  const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist } =
    useContext(MovieTvContext);
  const { getEras, eraList, spiritList, getSpirits } =
    useContext(SearchContext);

  useEffect(() => {
    getMovieTv();
  }, []);

  useEffect(() => {
    getEras();
  }, []);

  useEffect(() => {
    getSpirits();
  }, []);

  useEffect(() => {
    if (eraSelect > 0 || spiritSelect > 0) {
      const searchedTacos = movieTvs.filter((movie) =>
        movie.era.id === eraSelect ||
        movie.spirit.id === spiritSelect
      );
      setDropDown(searchedTacos);
    } else {
      setDropDown(movieTvs);
    }
  }, [ eraSelect, spiritSelect]);

  useEffect(() => {
    if (searchTerm !== "") {
      const searchedTacos = movieTvs.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.subGenre.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setSearchedMovies(searchedTacos);
    } else {
      setSearchedMovies(movieTvs);
    }
  }, [searchTerm]);


  return (
    <div className="simple-search">
      <article className="searchterm">
        <input
        type="text"
        placeholder="what vibe you want?"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {/* SEARCH TERM RESULTS */}
      <h2>Search Term Results</h2>
        {searchedMovies.map((value, key) => {
          return (
            <section key={key} className="add-to-watch">
              <h3 className="add-cal">{value.title}</h3>
              {value.added ? (
                <button
                  className="btn btn-3"
                  onClick={() => leaveWaitlist(value.id)}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="btn btn-2"
                  onClick={() => addWaitlist(value.id)}
                >
                  ADD
                </button>
              )}
            </section>
          );
        })}
        </article>
      {/* DROPDOWN TOWN */}
      <article className="dropdownsearch">
      <fieldset className="search-drop-down">
        <h2 className="dropdown__title">What's the Era?</h2>
        <div className="drop-down">
          <select
            onChange={(e) => {
              setEra(parseInt(e.target.value));
            }}
          >
            <option value="0">Select the Era</option>
            {eraList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset className="search-drop-down">
        <h2 className="dropdown__title">What's the Spirit?</h2>
        <div className="drop-down">
          <select
            onChange={(e) => {
              setSpirit(parseInt(e.target.value));
            }}
          >
            <option value="0">Select the Spirit</option>
            {spiritList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <h2>Dropdown Results</h2>
      {dropDownMovies.map((drop, key) => {
          return (
            <section key={key} className="add-to-watch">
              <h3 className="add-cal">{drop.title}</h3>
              {drop.added ? (
                <button
                  className="btn btn-3"
                  onClick={() => leaveWaitlist(drop.id)}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="btn btn-2"
                  onClick={() => addWaitlist(drop.id)}
                >
                  ADD
                </button>
              )}
            </section>
          );
        })}
      </fieldset>
      </article>
      
    </div>

  );
};

