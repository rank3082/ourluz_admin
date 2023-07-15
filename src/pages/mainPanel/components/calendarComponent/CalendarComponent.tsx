import React, {useState} from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment'
import "./CalendarComponent.scss"
import {useAppSelector} from "../../../../app/hooks";
import {useDispatch} from "react-redux";
import {setSelectedEvent, setSelectedPopup} from "../../../../store/global.slice";
import {EventModel} from "../../../../models/event.model";
import {SelectedPopup} from "../../../../utils/enum.const";
import {text} from "../../../../utils/dictionary-management";
import {getRollName, getUserById, isEventHasFullBooking} from "../../../../utils/general";

export const CalendarComponent = () => {
    const {selectedPopup,eventList,currentUser,rollList,isMobile} = useAppSelector(state => state.global);
    const dispatch = useDispatch()
console.log(currentUser,"currentUser")

    const localTime = momentLocalizer(moment);
    const DailyEventComponent: React.FC<{ event: EventModel }> = ({event}) => {
        const eventUserBooked = event.users.filter((u)=>u.booked);
      return  <div className={"calenderContainer"} style={{backgroundColor: event.backgroundColor,border:isEventHasFullBooking(event)?"2px solid var(--light-green)":"2px solid var(--dark)"}}>
            <div className={"descriptionStyle"}>{event.description}</div>
            <div>
                <span style={{fontWeight:600}}>{text.location} - </span>
                <span >{event.location}</span>
            </div>
            <div style={{fontWeight:600}}>
              שעת התחלה-
            </div>
            <div >{event.start.toString().split("T")[1]}</div>
            <div style={{fontWeight:600}}>{eventUserBooked.length>0?text.employeeList:text.emptyEmployeeList}</div>
            {eventUserBooked.map((user)=>{
                return <div>{getUserById(user.id)?.firstName} - {getRollName(user.roleId)}</div>
            })}
        </div>};
    const MonthlyEventComponent: React.FC<{ event: EventModel }> = ({event}) => (
        <div style={{backgroundColor: event.backgroundColor}}>
            <div>{event.description}</div>
        </div>);

    const views = {
        month: {
            event: MonthlyEventComponent,
        }, week: {
            event: DailyEventComponent,
        }, day: {
            event: DailyEventComponent,
        }, agenda: {
            event: DailyEventComponent,
        }
    };
    const [currentView, setCurrentView] = useState(Views.W);
    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };


    const handleSelectEvent = (event: EventModel) => {
        if (currentUser?.isAdmin){
        dispatch(setSelectedPopup(SelectedPopup.EventDetail))
        }else {
         dispatch(setSelectedPopup(SelectedPopup.ClientEventDetails))
        }
        dispatch(setSelectedEvent(event))
    }

    console.log(eventList,"eventList")
    return (<div
            className={selectedPopup !== SelectedPopup.Close && !isMobile ? "notFullCalendarWidth" : "fullCalendarWidth"}>
        <Calendar
                ampm={false}
                events={Object.values(eventList)}
                localizer={localTime}
                components={views}

                // defaultView="week"
                onView={handleViewChange}
                className={currentView === Views.WEEK || currentView === Views.DAY ? "week-calender-wrapper" : `month-calender-wrapper  ` }
                formats={{timeGutterFormat: 'HH:mm'}}
                onSelectEvent={handleSelectEvent}
            />
        </div>

    )
}