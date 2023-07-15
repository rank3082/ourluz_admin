import "./MyShiftPage.scss"
import React from "react";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {useAppSelector} from "../../../app/hooks";
import {AvailableRow} from "../myAvailabilityPage/components/availabelRow/AvailableRow";
import {ShiftRow} from "./components/ShiftRow";
export const MyShiftPage=()=>{
    const {eventList,currentUser} = useAppSelector(state => state.global)

    const checkIfUserIsBookedToEvent=(userList:{id:number,booked:boolean,roleId:number | null}[])=>{
        let isBooked = false
        userList.forEach((u)=>{
            if (u.id === currentUser?.id && u.booked){
                isBooked =  true
            }
        })
        return isBooked
    }
    return <div>
        <HeaderPage/>
        {Object.keys(eventList).map((eventKey,index)=>{
            const isBooked = checkIfUserIsBookedToEvent(eventList[eventKey]?.users??false)
            return !isBooked &&
                <ShiftRow eventDetails={eventList[eventKey]}/>
            // return <AvailableRow key={index} eventDetails={eventList[eventKey]} isAvailable={checkIfUserIsBookedToEvent(eventList[eventKey]?.users??false)}/>
        })}
    </div>
}