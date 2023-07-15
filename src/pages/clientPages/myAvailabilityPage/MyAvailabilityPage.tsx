import "./MyAvailabilityPage.scss"
import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {AvailableRow} from "./components/availabelRow/AvailableRow";

export const MyAvailabilityPage=()=>{
    const {eventList,currentUser} = useAppSelector(state => state.global)
    const checkIfUserIsAvailabilityToEvent=(userList:{id:number,booked:boolean,roleId:number | null}[])=>{
        let isAvailable = false
        userList.forEach((u)=>{
            if (u.id === currentUser?.id){
                isAvailable =  true
            }
        })
        return isAvailable
    }
    return <div>
        <HeaderPage/>
        {Object.keys(eventList).map((eventKey,index)=>{
          return <AvailableRow key={index} eventDetails={eventList[eventKey]} isAvailable={checkIfUserIsAvailabilityToEvent(eventList[eventKey]?.users??false)}/>
        })}
    </div>
}