import React, { useContext, useEffect, useState, useCallback } from "react";
import { CustomDialog, useDialog, ModalButton, ModalContent, ModalFooter } from 'react-st-modal';
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { CalendarContext } from "./CalendarProvider";
import "../profile.css"


export const WaitlistList = () => {
    const { getUserWaitlist, userWaitlist } = useContext(MovieTvContext)
    const { createEvent } = useContext(CalendarContext)

    const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})
    const [selectedMovie, setSelectedMovie ] = useState({})

                
    useEffect(()=> {
        getUserWaitlist();
    }, [])

    
    useEffect(()=>{
        if (selectedMovie != null) {
            console.log("Hi there")
            CustomDialog(<DatePopUp/>)
        }
        
    },[selectedMovie])
    
    
                
    const DatePopUp = () => {
        const dialog = useDialog();
        const [date, setDate] = useState();
        
        const handleAddtoCalendar = () => {
            const newMovie = {
                movie_tv: selectedMovie.id,
                all_day: true,
                startDate: newEvent.start,
                endDate: newEvent.end
            }
            createEvent(newMovie)
        }
                    
        return (
            <div className="popup">
            
            <ModalContent>
                <ModalButton>
                    <ModalFooter>
                        <h3 style={{
                            color: "black"
                        }}>{selectedMovie.title} </h3>
                            <input
                                type="date"
                                placeholder="Select a Movie Date"
                                start={newEvent.start}
                                onChange={(start)=> setNewEvent({...newEvent, start})}
                            />
                            <input
                                type="date"
                                placeholder="Select a Movie Date"
                                end={newEvent.end}
                                onChange={(end)=> setNewEvent({...newEvent, end})}
                            />
                            <button style={{marginTop: "10px"}} onClick={()=> {
                                handleAddtoCalendar()
                                console.log(newEvent)
                            }}>
                                Add Event
                                </button>
                            <button
                                onClick={() => {
                                // Сlose the dialog and return the value
                                dialog.close(date)
                                }}
                            >
                            Close
                        </button>
                    </ModalFooter>
                </ModalButton>
            </ModalContent>
            
            </div>
          );
    }
    
    return ( 
        <div className="waitlist">
            <header>List of Waitlist Movies</header>
            <article className="movie-waitlist">
            {userWaitlist.map((m) => {
            return (
            <section key={m.id} className="add-to-watch">
                <h3 className="add-cal">{m.movie_tv.title} {m.movie_tv.id}</h3>
                    {
                                <button className="btn btn-3"
                                    onClick={
                                        ()=> {
                                            setSelectedMovie(m.movie_tv)
                                        }
                                    }
                                    >Add to calendar</button>
                        }
                </section>
        );
    })}
            </article>
        </div>

    )
}


