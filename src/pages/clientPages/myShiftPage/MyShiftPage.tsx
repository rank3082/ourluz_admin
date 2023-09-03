import "./MyShiftPage.scss"
import React from "react";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {useAppSelector} from "../../../app/hooks";
import {ShiftRow} from "./components/ShiftRow";
import {text} from "../../../utils/dictionary-management";
import {SelectedDatesBar} from "../components/selectedDatesBar/SelectedDatesBar";
export const MyShiftPage=()=>{
    const {currentUser,weeklyEventList} = useAppSelector(state => state.global)

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
        <HeaderPage headerName={text.myShift}/>
        <SelectedDatesBar/>

        {Object.keys(weeklyEventList).map((eventKey,index)=>{
            const isBooked = checkIfUserIsBookedToEvent(weeklyEventList[eventKey]?.users??false)
           if (isBooked){
               counter++
           }
            return isBooked &&
                <ShiftRow eventDetails={weeklyEventList[eventKey]}/>
        })}
        {counter === 0 && <div className={"thereIsNotBookedEvent"}>{text.thereIsNotBookedEvent}</div>}
    </div>
}