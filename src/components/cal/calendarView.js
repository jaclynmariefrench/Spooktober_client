import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import DatePicker from "react-datepicker"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"
import { CalendarContext } from "./CalendarProvider";
import { useContext } from "react";
import { useEffect } from "react";


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer(
    {
        format, 
        parse,
        startOfWeek,
        getDay,
        locales
    }
)

// const events = [
//     {
//         title: "Movie",
//         allDay: true,
//         start: new Date(2021,9,0),
//         end: new Date(2021, 9, 0)
//     }
// ]

export const CalendarView = () => {

    const [newEvent, setNewEvent ] = useState({title: "", start: "", end: ""})
    // const [allEvents, setAllEvents ] = useState(events)

    const { getCal, createEvent, events } = useContext(CalendarContext)

    useEffect(() => {
        getCal()
    }, [])
    
    const handleAddEvent = () => {
        const newMovie = {
            title: newEvent.title,
            addDay: true,
            start: newEvent.start,
            end: newEvent.end
        }
        createEvent(newMovie)
    }

    return(
        <div className="calendar">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}
                value={newEvent.title} 
                onChange={
                    (e)=> setNewEvent({...newEvent, title: e.target.value})
                }
                />
                <DatePicker 
                    placeholderText="Start Date" 
                    style= {{marginRight: "10px" }}
                    selected={newEvent.start} 
                    onChange={(start)=> setNewEvent({...newEvent, start})}/>
                <DatePicker 
                    placeholderText="End Date" 
                    style= {{marginRight: "10px" }}
                    selected={newEvent.end} 
                    onChange={(end)=> setNewEvent({...newEvent, end})}/>
                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
                    Add Event
                    </button>
            </div>
            <Calendar 
                localizer={localizer} 
                events={events} 
                startAccessor="start" 
                endAccessor="end"
                style={{height: 500, margin: "50px"}}/> 
        </div>
    )
} 


// import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';

// setOptions({
//     theme: 'ios',
//     themeVariant: 'light'
// });

// const now = new Date();
// const defaultEvents = [{
//     id: 1,
//     start: '2021-09-08T13:00',
//     end: '2021-09-08T13:30',
//     title: 'Lunch @ Butcher\'s',
//     description: '',
//     allDay: false,
//     status: 'free',
//     color: '#26c57d'
// }, {
//     id: 2,
//     start: '2021-09-17T15:00',
//     end: '2021-09-17T16:00',
//     title: 'General orientation',
//     description: '',
//     allDay: false,
//     status: 'busy',
//     color: '#fd966a'
// }, {
//     id: 3,
//     start: '2021-09-16T18:00',
//     end: '2021-09-16T22:00',
//     title: 'Dexter BD',
//     description: '',
//     allDay: false,
//     status: 'free',
//     color: '#37bbe4'
// }, {
//     id: 4,
//     start: '2021-09-18T10:30',
//     end: '2021-09-18T11:30',
//     title: 'Stakeholder mtg.',
//     description: '',
//     allDay: false,
//     status: 'busy',
//     color: '#d00f0f'
// }];

// const viewSettings = {
//     calendar: { labels: true }
// };
// const responsivePopup = {
//     medium: {
//         display: 'anchored',
//         width: 400,
//         fullScreen: false,
//         touchUi: false
//     }
// };

// function App() {
//     const [myEvents, setMyEvents] = React.useState(defaultEvents);
//     const [tempEvent, setTempEvent] = React.useState(null);
//     const [isOpen, setOpen] = React.useState(false);
//     const [isEdit, setEdit] = React.useState(false);
//     const [anchor, setAnchor] = React.useState(null);
//     const [start, startRef] = React.useState(null);
//     const [end, endRef] = React.useState(null);
//     const [popupEventTitle, setTitle] = React.useState('');
//     const [popupEventDescription, setDescription] = React.useState('');
//     const [popupEventAllDay, setAllDay] = React.useState(true);
//     const [popupEventDate, setDate] = React.useState([]);
//     const [popupEventStatus, setStatus] = React.useState('busy');
//     const [mySelectedDate, setSelectedDate] = React.useState(now);

//     const saveEvent = React.useCallback(() => {
//         const newEvent = {
//             id: tempEvent.id,
//             title: popupEventTitle,
//             description: popupEventDescription,
//             start: popupEventDate[0],
//             end: popupEventDate[1],
//             allDay: popupEventAllDay,
//             status: popupEventStatus,
//             color: tempEvent.color
//         };
//         if (isEdit) {
//             // update the event in the list
//             const index = myEvents.findIndex(x => x.id === tempEvent.id);;
//             const newEventList = [...myEvents];

//             newEventList.splice(index, 1, newEvent);
//             setMyEvents(newEventList);
//             // here you can update the event in your storage as well
//             // ...
//         } else {
//             // add the new event to the list
//             setMyEvents([...myEvents, newEvent]);
//             // here you can add the event to your storage as well
//             // ...
//         }
//         setSelectedDate(popupEventDate[0]);
//         // close the popup
//         setOpen(false);
//     }, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent]);

//     const deleteEvent = React.useCallback((event) => {
//         setMyEvents(myEvents.filter(item => item.id !== event.id));
//         setTimeout(() => {
//             snackbar({
//                 button: {
//                     action: () => {
//                         setMyEvents(prevEvents => [...prevEvents, event]);
//                     },
//                     text: 'Undo'
//                 },
//                 message: 'Event deleted'
//             });
//         });
//     }, [myEvents]);

//     const loadPopupForm = React.useCallback((event) => {
//         setTitle(event.title);
//         setDescription(event.description);
//         setDate([event.start, event.end]);
//         setAllDay(event.allDay || false);
//         setStatus(event.status || 'busy');
//     }, []);

//     // handle popup form changes

//     const titleChange = React.useCallback((ev) => {
//         setTitle(ev.target.value);
//     }, []);

//     const descriptionChange = React.useCallback((ev) => {
//         setDescription(ev.target.value);
//     }, []);

//     const allDayChange = React.useCallback((ev) => {
//         setAllDay(ev.target.checked);
//     }, []);

//     const dateChange = React.useCallback((args) => {
//         setDate(args.value);
//     }, []);

//     const statusChange = React.useCallback((ev) => {
//         setStatus(ev.target.value);
//     }, []);

//     const onDeleteClick = React.useCallback(() => {
//         deleteEvent(tempEvent);
//         setOpen(false);
//     }, [deleteEvent, tempEvent]);

//     // scheduler options

//     const onSelectedDateChange = React.useCallback((event) => {
//         setSelectedDate(event.date);
//     });

//     const onEventClick = React.useCallback((args) => {
//         setEdit(true);
//         setTempEvent({ ...args.event });
//         // fill popup form with event data
//         loadPopupForm(args.event);
//         setAnchor(args.domEvent.target);
//         setOpen(true);
//     }, [loadPopupForm]);

//     const onEventCreated = React.useCallback((args) => {
//         // createNewEvent(args.event, args.target)
//         setEdit(false);
//         setTempEvent(args.event)
//         // fill popup form with event data
//         loadPopupForm(args.event);
//         setAnchor(args.target);
//         // open the popup
//         setOpen(true);
//     }, [loadPopupForm]);

//     const onEventDeleted = React.useCallback((args) => {
//         deleteEvent(args.event)
//     }, [deleteEvent]);

//     const onEventUpdated = React.useCallback((args) => {
//         // here you can update the event in your storage as well, after drag & drop or resize
//         // ...
//     }, []);

//     // datepicker options
//     const controls = React.useMemo(() => popupEventAllDay ? ['date'] : ['datetime'], [popupEventAllDay]);
//     const respSetting = React.useMemo(() => popupEventAllDay ? {
//         medium: {
//             controls: ['calendar'],
//             touchUi: false
//         }
//     } : {
//             medium: {
//                 controls: ['calendar', 'time'],
//                 touchUi: false
//             }
//         }, [popupEventAllDay]);

//     // popup options
//     const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Event', [isEdit]);
//     const popupButtons = React.useMemo(() => {
//         if (isEdit) {
//             return [
//                 'cancel',
//                 {
//                     handler: () => {
//                         saveEvent();
//                     },
//                     keyCode: 'enter',
//                     text: 'Save',
//                     cssClass: 'mbsc-popup-button-primary'
//                 }
//             ];
//         }
//         else {
//             return [
//                 'cancel',
//                 {
//                     handler: () => {
//                         saveEvent();
//                     },
//                     keyCode: 'enter',
//                     text: 'Add',
//                     cssClass: 'mbsc-popup-button-primary'
//                 }
//             ];
//         }
//     }, [isEdit, saveEvent]);

//     const onClose = React.useCallback(() => {
//         if (!isEdit) {
//             // refresh the list, if add popup was canceled, to remove the temporary event
//             setMyEvents([...myEvents]);
//         }
//         setOpen(false);
//     }, [isEdit, myEvents]);

//     return <div>
//         <Eventcalendar
//             view={viewSettings}
//             data={myEvents}
//             clickToCreate="double"
//             dragToCreate={true}
//             dragToMove={true}
//             dragToResize={true}
//             selectedDate={mySelectedDate}
//             onSelectedDateChange={onSelectedDateChange}
//             onEventClick={onEventClick}
//             onEventCreated={onEventCreated}
//             onEventDeleted={onEventDeleted}
//             onEventUpdated={onEventUpdated}
//         />
//         <Popup
//             display="bottom"
//             fullScreen={true}
//             contentPadding={false}
//             headerText={headerText}
//             anchor={anchor}
//             buttons={popupButtons}
//             isOpen={isOpen}
//             onClose={onClose}
//             responsive={responsivePopup}
//         >
//             <div className="mbsc-form-group">
//                 <Input label="Title" value={popupEventTitle} onChange={titleChange} />
//                 <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
//             </div>
//             <div className="mbsc-form-group">
//                 <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
//                 <Input ref={startRef} label="Starts" />
//                 <Input ref={endRef} label="Ends" />
//                 <Datepicker
//                     select="range"
//                     controls={controls}
//                     touchUi={true}
//                     startInput={start}
//                     endInput={end}
//                     showRangeLabels={false}
//                     responsive={respSetting}
//                     onChange={dateChange}
//                     value={popupEventDate}
//                 />
//                 <SegmentedGroup onChange={statusChange}>
//                     <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
//                     <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
//                 </SegmentedGroup>
//                 {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
//             </div>
//         </Popup>
//     </div>
// }
