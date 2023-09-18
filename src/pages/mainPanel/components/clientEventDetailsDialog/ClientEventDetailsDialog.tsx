import "./ClientEventDetailsDialog.scss"
import React, {useState} from "react";
import {useAppSelector} from "../../../../app/hooks";
import {text} from "../../../../utils/dictionary-management";
import moment from "moment/moment";
import {Icon} from "../../../../components/icon/Icon";
import {removeAvailabilityFromEvent, setAvailabilityToEvent} from "../../../../utils/data-management";
import {EventModel} from "../../../../models/event.model";
import {UserEventStatus} from "../../../../utils/enum.const";

export const ClientEventDetailsDialog: React.FC<{userEventStatusMemo:UserEventStatus,onClose:any}> = ({userEventStatusMemo,onClose}) => {
    const {selectedEvent} = useAppSelector(state => state.global)
    const [selectedAvailabilityEvent, setSelectedAvailabilityEvent] = useState(userEventStatusMemo)

    const addAvailabilityEvent =async () => {
       await setAvailabilityToEvent((selectedEvent as EventModel).id).then()
        setSelectedAvailabilityEvent(UserEventStatus.available)
    }
    const removeAvailabilityEvent = async () => {
     await   removeAvailabilityFromEvent((selectedEvent as EventModel).id).then()
        setSelectedAvailabilityEvent(UserEventStatus.nothing)
    }
    return  <div className={"clientEventDetails"}>
        <div className={"closeClientEventDetails"} onClick={onClose}>
        <Icon name={"close_x"}/>
        </div>
        <div className={"descriptionLabel"} style={{fontSize:22}}> {selectedEvent?.description}</div>
        <div className={"eventDetailsText"}>
            {text.location} : {selectedEvent?.location}
        </div>
        {selectedEvent?.comments && <div className={"eventDetailsText"}>
            {text.comments} : {selectedEvent?.comments}
        </div>}
        <div className={"eventDetailsText"} style={{fontSize:16}}>
            {text.startAtTime} {moment(selectedEvent?.start).format("dddd DD/MM HH:MM")}
        </div>
        <div className={"eventDetailsText"} style={{fontSize:16}}>
            {text.endAtTime} {moment(selectedEvent?.end).format("dddd DD/MM HH:MM")}
        </div>
        {userEventStatusMemo !== UserEventStatus.booked && <div className={"setAvailabilityText"}>{text.availabilityStatus} {selectedAvailabilityEvent?" זמין":" לא זמין"}</div>
        } <div className={"setAvailabilityText"}>{userEventStatusMemo=== UserEventStatus.booked ?text.youAreAlreadyBooked:text.setAvailabilityText}</div>
        {userEventStatusMemo === UserEventStatus.booked ? <div style={{color:"red",fontSize:20,fontWeight:400,display:"flex",justifyContent:"end"}}> {text.cancelBooked}</div>:
            <div className={"iconsWrapper"}>
            <div onClick={addAvailabilityEvent}
                 style={{stroke: selectedAvailabilityEvent === UserEventStatus.available ? "var(--primary)" : "var(--wolf)"}}
                 className={"iconWrapper"}>
                <Icon name={"vAvailable"}/>
            </div>
            <div onClick={removeAvailabilityEvent}
                 style={{stroke: selectedAvailabilityEvent !== UserEventStatus.available ? "var(--alert)" : "var(--wolf)"}}
                 className={"iconWrapper"}>
                <Icon name={"xAvailable"}/>
            </div>
        </div>
    }
    </div>
}