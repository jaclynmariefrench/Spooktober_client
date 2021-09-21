import React, { useContext, useEffect, useState } from "react";
import { CustomDialog, useDialog, ModalButton, ModalContent, ModalFooter } from 'react-st-modal';
import DatePicker from "react-datepicker"
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { CalendarContext } from "./CalendarProvider";
import "../profile.css"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export const WaitlistList = () => {
    const { getUserWaitlist, userWaitlist, leaveWaitlist } = useContext(MovieTvContext)
    const { createEvent } = useContext(CalendarContext)

const [selectedMovie, setSelectedMovie ] = useState(undefined)
    
const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
    useEffect(()=> {
        getUserWaitlist();
    }, [])
    
        
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
        <>
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
                                        handleOpen()
                                    }
                                }
                                >Add to calendar</button>

                        </div>
                        }
                </section>
        );
    })}
            </article>
            </div>
    <div className="popup">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Would you like to add {selectedMovie?.title}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        
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
                            <Button  onClick={handleAddtoCalendar}>
                                Add Event
                            </Button>
                            <Button
                                onClick={() => {
                                // Сlose the dialog and return the value
                                handleClose()
                                
                                }}
                            >
                            Close
                        </Button>
            </Typography>
          </Box>
        </Modal>
    </div>
    </>
    )
}





{/* <div className="popup">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Would you like to add {selectedMovie?.title}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        
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
                            <Button  onClick={handleAddtoCalendar}>
                                Add Event
                            </Button>
                            <Button
                                onClick={() => {
                                // Сlose the dialog and return the value
                                handleClose()
                                
                                }}
                            >
                            Close
                        </Button>
            </Typography>
          </Box>
        </Modal>
    </div> */}
