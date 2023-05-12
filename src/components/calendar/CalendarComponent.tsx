import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment'

export const CalendarComponent = () => {
    type Event = {
        title: string; start: Date; end: Date; description: string; location: string; color: string,allDay?:boolean
    };

    const events: Event[] = [{
        title: 'Event 3',
        start: new Date(),
        end: new Date(),
        description: 'This is a longer description of event 2',
        location: 'San Francisco',
        color: "blue",
        allDay: true
    }, {
        title: 'Event 4',
        start: new Date("2023-05-13 12:00"),
        end: new Date("2023-05-13 17:00"),
        description: 'This is a longer description of event 2',
        location: 'San Francisco',
        color: "red",
        allDay: true

    },{
        title: 'Event 5',
        start: new Date("2023-05-13 20:00"),
        end: new Date("2023-05-13 23:00"),
        description: 'This is a longer description of event 2',
        location: 'San Francisco',
        color: "red"
        // allDay: true

    }];


    const localTime = momentLocalizer(moment);
    const DailyEventComponent: React.FC<{ event: Event }> = ({event}) => (<div style={{backgroundColor: event.color}}>
            <div>{event.title}</div>
            <div>{event.description}</div>
            <div>{event.location}</div>

        </div>);
    const MonthlyEventComponent: React.FC<{ event: Event }> = ({event}) => (<div style={{backgroundColor: event.color}}>
            <div>{event.title}</div>
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

    return (<div style={{height: '500px'}}>
            <Calendar
                events={events}
                localizer={localTime}
                components={views}
                defaultView="week"
            />
        </div>)
}