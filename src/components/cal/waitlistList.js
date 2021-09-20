import React, { useContext, useEffect, useState } from "react";
import { CustomDialog, useDialog, ModalButton, ModalContent, ModalFooter, Modal } from 'react-st-modal';
import {Datepicker, START_DATE} from '@datepicker-react/styled'
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { CalendarContext } from "./CalendarProvider";


export const WaitlistList = () => {
    const { getUserWaitlist, userWaitlist } = useContext(MovieTvContext)
    const { createEvent } = useContext(CalendarContext)

    const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})
    const [selectedMovie, setSelectedMovie ] = useState({movie_tv:""})

    useEffect(()=> {
        getUserWaitlist();
    }, [])

    const handleAddtoCalendar = () => {
        const newMovie = {
            movie_tv: selectedMovie.id,
            all_day: true,
            startDate: newEvent.start,
            endDate: newEvent.end
        }
        createEvent(newMovie)
    }

      const handleDatesChange = () => {
            setNewEvent({...newEvent, START_DATE})

      }


    const DatePopUp = () => {
        const dialog = useDialog();
        const [date, setDate] = useState();

        return (
            <div className="popup">
            
            <ModalContent>
                <ModalButton>
                    <ModalFooter>

                            <Datepicker
                                onDatesChange={handleDatesChange}
                                startDate={newEvent.startDate} 
                                endDate={newEvent.endDate} />
                                 
                            <button style={{marginTop: "10px"}} onClick={()=> {
                                handleAddtoCalendar()
                                console.log(newEvent)
                            }}>
                                Add Event
                                </button>
                            <button
                                onClick={() => {
                                // Сlose the dialog and return the value
                                dialog.close(date);
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
        <>
            <header>List of Waitlist Movies</header>
            <article className="movie-waitlist">
            {userWaitlist.map((m) => {
            return (
            <section key={m.id} className="add-to-watch">
                <h3 className="add-cal">{m.movie_tv.title} {m.movie_tv.id}</h3>
                    {
                                <button className="btn btn-3"
                                    onClick={()=> 
                                        
                                        {
                                            setSelectedMovie(m.movie_tv)
                                            console.log(selectedMovie.id)
                                            CustomDialog(<DatePopUp/>)
                                        }}
                                    >Add to calendar</button>
                        }
                </section>
        );
              })}
            </article>
        </>
    )
}


