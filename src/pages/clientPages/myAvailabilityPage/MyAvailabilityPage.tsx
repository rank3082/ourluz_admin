import "./MyAvailabilityPage.scss"
import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {AvailableRow} from "./components/availabelRow/AvailableRow";
import {checkIfUserIsAvailabilityToEvent} from "../../../utils/general";

export const MyAvailabilityPage=()=>{
    const {eventList,currentUser} = useAppSelector(state => state.global)
    return <div>
        <HeaderPage/>
        {Object.keys(eventList).filter((eventItem)=>{

            return new Date(eventList[eventItem].start) >= new Date()
        }).map((eventKey,index)=>{
          return <AvailableRow key={index} eventDetails={eventList[eventKey]} isAvailable={checkIfUserIsAvailabilityToEvent(currentUser,eventList[eventKey]?.users)}/>
        })}
    </div>
}