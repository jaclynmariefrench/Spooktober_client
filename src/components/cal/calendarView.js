import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import { CalendarContext } from "./CalendarProvider";
import { useContext } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../profile.css";

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

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


export const CalendarView = () => {
  const { getCal, events, deleteEvent, updateEvent } = useContext(CalendarContext);
  const [clickedMovie, setClickedMovie] = useState();
  const [newEvent, setNewEvent ] = useState({movie_tv: "", title: "", start: "", end: ""})

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEdit = () => setOpen(true)
  

  useEffect(() => {
    getCal();
  }, []);

  const handleEdittoCalendar = () => {
    const newMovie = {
        id: clickedMovie.id,
        movie_tv: clickedMovie.movie_tv.id,
        all_day: true,
        start: newEvent.start,
        end: newEvent.start
    }
    updateEvent(newMovie)
}



  return (
    <>
      <div className="calendar">
        <Calendar
          selectable
          onSelectEvent={(p)=>{
              setClickedMovie(p)
                console.log(clickedMovie)
                handleOpen()
          }
          }
          localizer={localizer}
          views={["month", "agenda"]}
          events={events}
          startAccessor="start"
          endAccessor="start"
          popup="default"
          style={{ height: 500, margin: "50px", backgroundColor: "#5F2849", color: "white"}}
        />
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
              Would you like to edit or delete {clickedMovie?.title}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <DatePicker 
                                placeholderText="Select Date" 
                                style= {{marginRight: "10px" }}
                                selected={newEvent.start}
                                start={newEvent.start} 
                                onChange={(start)=> setNewEvent({...newEvent, start})}/>
                            <Button  onClick={handleEdittoCalendar}>
                                Edit Event
                            </Button>
                            <Button
                              onClick={()=> 
                                {deleteEvent(clickedMovie.id)}
                              }>Delete</Button>
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
  );
};
