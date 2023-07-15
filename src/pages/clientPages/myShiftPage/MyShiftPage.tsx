import "./MyShiftPage.scss"
import React from "react";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {useAppSelector} from "../../../app/hooks";
import {AvailableRow} from "../myAvailabilityPage/components/availabelRow/AvailableRow";
import {ShiftRow} from "./components/ShiftRow";
import {text} from "../../../utils/dictionary-management";
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
    let counter =0
    return <div>
        <HeaderPage/>
        {Object.keys(eventList).map((eventKey,index)=>{
            const isBooked = checkIfUserIsBookedToEvent(eventList[eventKey]?.users??false)
           if (isBooked){
               counter++
           }
            return isBooked &&
                <ShiftRow eventDetails={eventList[eventKey]}/>
        })}
        {counter === 0 && <div className={"thereIsNotBookedEvent"}>{text.thereIsNotBookedEvent}</div>}
    </div>
}