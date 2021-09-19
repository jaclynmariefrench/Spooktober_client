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
            {movieTvs.map((m) => {
            return (
            <section key={m.id} className="add-to-watch">
                <h3 className="add-cal">{m.title}</h3>
                    {
                            m.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(m.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(m.id)}
                                    >Join</button>
                        }
                </section>
        );
              })}
            </article>
        </>
    )
}