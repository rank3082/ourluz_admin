import "./WeeklyBookedRow.scss"
import React from "react";
import {EventModel} from "../../../../models/event.model";
import moment from "moment";
import {WeeklyBookedTd} from "../weeklyBookedTd/WeeklyBookedTd";

export const WeeklyBookedRow:React.FC<{eventDetails:EventModel}>=({eventDetails})=>{
    const startTime = moment.utc(eventDetails.start).format("HH:mm");
const endTime = moment.utc(eventDetails.end).format("HH:mm");
    return <tr style={{
        paddingBlock:10,
        background:  "#F8F8F8" ,borderBottom:"1px solid var(--wolf)"}}>
        <td className={"firstTd"}>
            <div>
            {eventDetails.description}
            </div>
            <div>
                {startTime}-{endTime}
            </div>
        </td>
       <WeeklyBookedTd dayOfWeek={0} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={1} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={2} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={3} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={4} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={5} eventDetails={eventDetails}/>
       <WeeklyBookedTd dayOfWeek={6} eventDetails={eventDetails}/>
    </tr>
}