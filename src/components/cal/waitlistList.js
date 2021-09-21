import React, { useContext, useEffect, useState } from "react";
import { CustomDialog, useDialog, ModalButton, ModalContent, ModalFooter } from 'react-st-modal';
import DatePicker from "react-datepicker"
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { CalendarContext } from "./CalendarProvider";
import "../profile.css"


export const WaitlistList = () => {
    const { getUserWaitlist, userWaitlist, leaveWaitlist } = useContext(MovieTvContext)
    const { createEvent } = useContext(CalendarContext)

    const [selectedMovie, setSelectedMovie ] = useState(undefined)
    
    
    useEffect(()=> {
        getUserWaitlist();
    }, [])
    
    
    useEffect(()=>{
        if (selectedMovie != undefined) {
            CustomDialog(<DatePopUp/>)
        }
        
    },[selectedMovie])
    
    
    const DatePopUp = () => {
        const dialog = useDialog();
        const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})
        const [date, setDate] = useState();
        
        
        const handleAddtoCalendar = () => {
            const newMovie = {
                movie_tv: selectedMovie.id,
                all_day: true,
                start: newEvent.start,
                end: newEvent.end
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
                            <div>
                            <input type="text" placeholder="Add Movie" style={{width: "20%", marginRight: "10px"}}
                            value={selectedMovie.id} 
                            onChange={
                                (e)=> setNewEvent({...newEvent, movie_tv: e.target.value})
                            }
                            />
                            <DatePicker 
                                placeholderText="Start Date" 
                                style= {{marginRight: "10px" }}
                                selected={newEvent.start}
                                start={newEvent.start} 
                                onChange={(start)=> setNewEvent({...newEvent, start})}/>
                            <DatePicker 
                                placeholderText="End Date" 
                                style= {{marginRight: "10px" }}
                                selected={newEvent.end}
                                end={newEvent.end} 
                                onChange={(end)=> setNewEvent({...newEvent, end})}/>
                            <button style={{marginTop: "10px"}} onClick={handleAddtoCalendar}>
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
                        </div>
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
            {           <div>
                            <button className="btn btn-3"
                                onClick={
                                    ()=> {
                                        setSelectedMovie(m.movie_tv)
                                    }
                                }
                                >Add to calendar</button>
                                <button className="btn btn-3"
                                        onClick={() => leaveWaitlist(m.id)}
                                        >Delete</button>

                        </div>
                        }
                </section>
        );
    })}
            </article>
            </div>
    )
}


