import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import { MovieTvContext } from "../movieTv/MovieTvProvider"
import { CalendarContext } from "./CalendarProvider";
import "../profile.css"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from '@mui/material/List';



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
    const { getUserWaitlist, userWaitlist, removeWaitlist } = useContext(MovieTvContext)
    const { createEvent } = useContext(CalendarContext)

    const [selectedMovie, setSelectedMovie ] = useState(undefined)
    const [selectWaitlistItem, setWaitlistItem] = useState(undefined)
        
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
            end: newEvent.start
        }
        createEvent(newMovie)
    }
                    
    
    return ( 
        <>
        <article className="waitlist">

        <h1>MOVIE WATCH LIST</h1>
        <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
                {userWaitlist.map((m) => {
                    return (
                    <section key={m.id} className="add-to-watch">
                        <h3 className="add-cal">{m.movie_tv.title}</h3>
                    {           <div>
                                    <Button 
                                        variant="contained"
                                        onClick={
                                            ()=> {
                                                setSelectedMovie(m.movie_tv)
                                                setWaitlistItem(m.id)
                                                handleOpen()
                                            }
                                        }
                                        >Add to calendar</Button>

                                </div>
                                }
                        </section>
                            );
                        })}
            </List>
        </article>
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
                                        placeholderText="Select Date" 
                                        style= {{marginRight: "10px" }}
                                        selected={newEvent.start}
                                        start={newEvent.start} 
                                        onChange={(start)=> setNewEvent({...newEvent, start})}/>
                                    <Button  onClick={()=> {
                                        handleAddtoCalendar()
                                        removeWaitlist(selectWaitlistItem)
                                        handleClose()
                                    }} >
                                        
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




