import React, {useState} from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment'
import "./CalendarComponent.scss"
import {useAppSelector} from "../../../../app/hooks";
export const CalendarComponent = () => {
    const {eventList,isEventDetailPopupOpen} = useAppSelector(state => state.global);

    type Event = {
        start: Date; end: Date; description: string; location: string; color: string,allDay?:boolean
    };

    const localTime = momentLocalizer(moment);
    const DailyEventComponent: React.FC<{ event: Event }> = ({event}) => (<div style={{backgroundColor: event.color}}>
            <div>{event.description}</div>
            <div>{event.location}</div>

        </div>);
    const MonthlyEventComponent: React.FC<{ event: Event }> = ({event}) => (<div style={{backgroundColor: event.color}}>
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


    return (
        <div className={isEventDetailPopupOpen?"notFullCalendarWidth":"fullCalendarWidth"}>
            <Calendar
                events={Object.values(eventList)}
                localizer={localTime}
                components={views}
                defaultView="week"
                onView={handleViewChange}
                className={currentView ===Views.WEEK ||currentView ===Views.DAY  ? "week-calender-wrapper":"month-calender-wrapper"}
            />
        </div>

       )
}