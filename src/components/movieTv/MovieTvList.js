import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MovieTvContext } from "./MovieTvProvider"

export const MovieTvList = () => {
    const { movieTvs, getMovieTv } = useContext(MovieTvContext)

    useEffect(()=> {
        getMovieTv();
    }, [])

    return (
        <>
            <header>List of Spooktober Movies</header>
            <article className="movie-list">
                {movieTvs.map((movie) => {
                    return (
                        <section key={`movie--${movie.id}`} className="movie">
                            <div className="movie__title">
                                <h3>{movie.title}</h3> 
                            </div>
                        </section>
          );
        })}
            </article>
        </>
    )
}