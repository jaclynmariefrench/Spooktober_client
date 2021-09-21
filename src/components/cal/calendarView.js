import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import { CalendarContext } from "./CalendarProvider";
import { useContext } from "react";
import { useEffect } from "react";
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
  const { getCal, events, deleteEvent } = useContext(CalendarContext);
  const [clickedMovie, setClickedMovie] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getCal();
  }, []);



  return (
    <>
      <div className="calendar">
        <h1>Calendar</h1>
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
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
      <div>
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
              <Button>Edit</Button>
              <Button
              onClick={()=> 
                {deleteEvent(clickedMovie.id)}
              }>Delete</Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
