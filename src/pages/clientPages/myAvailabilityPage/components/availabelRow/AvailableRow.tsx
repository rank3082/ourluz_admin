import "./AvailableRow.scss"
import React, {useState} from "react";
import {EventModel} from "../../../../../models/event.model";
import {Icon} from "../../../../../components/icon/Icon";
import moment from "moment";
import 'moment/locale/he';
import {text} from "../../../../../utils/dictionary-management";
import {removeAvailabilityFromEvent, setAvailabilityToEvent} from "../../../../../utils/data-management"; // Import Hebrew locale
export const AvailableRow: React.FC<{ eventDetails: EventModel ,isAvailable:boolean}> = ({eventDetails,isAvailable}) => {
    moment.locale('he');
    const addAvailabilityEvent = () => {
        setAvailabilityToEvent(eventDetails.id).then()
        setSelectedAvailabilityEvent(true)
    }
    const removeAvailabilityEvent = () => {
        removeAvailabilityFromEvent(eventDetails.id).then()
        setSelectedAvailabilityEvent(false)
    }
    const [openDropDown, setOpenDropDown] = useState(false)
    const [selectedAvailabilityEvent, setSelectedAvailabilityEvent] = useState(isAvailable)
    return <div className={"availableRowContainer"}>
        <div className={"availableRowWrapper"}>
            <div style={{fontSize:22,fontWeight:600}}>
                {eventDetails.description}
            </div>
            <div className={"iconsWrapper"}>

                <div onClick={addAvailabilityEvent}
                     style={{stroke: selectedAvailabilityEvent ? "var(--primary)" : "var(--wolf)"}}
                     className={"iconWrapper"}>
                    <Icon name={"vAvailable"}/>
                </div>
                <div onClick={removeAvailabilityEvent}
                     style={{stroke: !selectedAvailabilityEvent ? "var(--alert)" : "var(--wolf)"}}
                     className={"iconWrapper"}>
                    <Icon name={"xAvailable"}/>
                </div>
                <div className={"chevronWrapper"} onClick={() => setOpenDropDown(!openDropDown)}>
                    <Icon name={openDropDown ? "dropdown_chevron_down" : "dropdown_chevron_up"}/>
                </div>
            </div>
        </div>
        {openDropDown && <div className={"moreEventDetails"}>
            <div style={{fontSize:20}}>
                {text.location} : {eventDetails.location}
            </div >
            <div style={{fontSize:20}}>
                {text.startAtTime} {moment(eventDetails.start).format("dddd DD/MM HH:MM")}
            </div>
            <div style={{fontSize:20}}>
                {text.endAtTime} {moment(eventDetails.end).format("dddd DD/MM HH:MM")}
            </div>
            <div style={{fontSize:20}}>
                {text.commands} : {eventDetails.commands}
            </div>
        </div>}
    </div>
}