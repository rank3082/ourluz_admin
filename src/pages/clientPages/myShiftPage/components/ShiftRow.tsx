import "./ShiftRow.scss"
import React from "react";
import {EventModel} from "../../../../models/event.model";
import {text} from "../../../../utils/dictionary-management";
import moment from "moment/moment";
import 'moment/locale/he';
import { getUserById} from "../../../../utils/general";

export const ShiftRow: React.FC<{ eventDetails: EventModel }> = ({eventDetails}) => {
    moment.locale('he');

    return <div className={"shiftRowContainer"} style={{backgroundColor: eventDetails.backgroundColor}}>
        <div className={"descriptionLabel"}>
            {eventDetails.description}
        </div>
        <div className={"eventDetailsText"}>
            {text.location} : {eventDetails.location}
        </div>
        <div>
            {text.startAtTime} {moment(eventDetails.start).format("dddd DD/MM HH:MM")}
        </div>
        <div>
            {text.endAtTime} {moment(eventDetails.end).format("dddd DD/MM HH:MM")}
        </div>
        <div className={"teamsWrapper"}>
            <div className={"teamsLabel"}>:{text.team}</div>
            {eventDetails.users.filter(u => u.booked).map((us, index) => {
              const userDetails = getUserById(us.id)
                return <div key={index}>{userDetails?.mobile}, {userDetails?.lastName}  {userDetails?.firstName}</div>
            })}
        </div>
    </div>
}