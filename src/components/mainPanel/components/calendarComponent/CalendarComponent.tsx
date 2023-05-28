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

export const CalendarComponent = () => {
    const {selectedPopup,eventList} = useAppSelector(state => state.global);
    const dispatch = useDispatch()
    const localTime = momentLocalizer(moment);
    const DailyEventComponent: React.FC<{ event: EventModel }> = ({event}) => (
        <div style={{backgroundColor: event.backgroundColor}}>
            <div>{event.description}</div>
            <div>{event.location}</div>

        </div>);
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
        dispatch(setSelectedPopup(SelectedPopup.EventDetail))
        dispatch(setSelectedEvent(event))
    }
    console.log(eventList,"eventList")
    return (<div
            className={selectedPopup !== SelectedPopup.Close ? "notFullCalendarWidth" : "fullCalendarWidth"}>
        <Calendar
                ampm={false}
                events={Object.values(eventList)}
                localizer={localTime}
                components={views}
                // defaultView="week"
                onView={handleViewChange}
                className={currentView === Views.WEEK || currentView === Views.DAY ? "week-calender-wrapper" : "month-calender-wrapper"}
                formats={{timeGutterFormat: 'HH:mm'}}
                onSelectEvent={handleSelectEvent}
            />
        </div>

    )
}