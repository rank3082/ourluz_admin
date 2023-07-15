import "./ClientEventDetailsDialog.scss"
import React, {useState} from "react";
import {useAppSelector} from "../../../../app/hooks";
import {text} from "../../../../utils/dictionary-management";
import moment from "moment/moment";
import {Icon} from "../../../../components/icon/Icon";
import {removeAvailabilityFromEvent, setAvailabilityToEvent} from "../../../../utils/data-management";
import {EventModel} from "../../../../models/event.model";
export const ClientEventDetailsDialog: React.FC<{isAvailable:boolean}> = ({isAvailable}) => {
    const {selectedEvent} = useAppSelector(state => state.global)
    const [selectedAvailabilityEvent, setSelectedAvailabilityEvent] = useState(isAvailable)

    const addAvailabilityEvent =async () => {
       await setAvailabilityToEvent((selectedEvent as EventModel).id).then()
        setSelectedAvailabilityEvent(true)
    }
    const removeAvailabilityEvent = async () => {
     await   removeAvailabilityFromEvent((selectedEvent as EventModel).id).then()
        setSelectedAvailabilityEvent(false)
    }
    return  <div className={"clientEventDetails"}>
        <div className={"descriptionLabel"}> {selectedEvent?.description}</div>
        <div className={"eventDetailsText"}>
            {text.location} : {selectedEvent?.location}
        </div>
        <div className={"eventDetailsText"}>
            {text.startAtTime} {moment(selectedEvent?.start).format("dddd DD/MM HH:MM")}
        </div>
        <div className={"eventDetailsText"}>
            {text.endAtTime} {moment(selectedEvent?.end).format("dddd DD/MM HH:MM")}
        </div>
        <div className={"setAvailabilityText"}>{text.setAvailabilityText}</div>
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
        </div>
    </div>
}