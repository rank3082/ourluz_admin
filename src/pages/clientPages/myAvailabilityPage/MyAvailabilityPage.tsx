import "./MyAvailabilityPage.scss"
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../app/hooks";
import {HeaderPage} from "../components/headerPage/HeaderPage";
import {AvailableRow} from "./components/availabelRow/AvailableRow";
import {checkIfUserIsAvailabilityToEvent} from "../../../utils/general";
import {text} from "../../../utils/dictionary-management";
import {SelectedDatesBar} from "../components/selectedDatesBar/SelectedDatesBar";
import dayjs from "dayjs";
import {getAllEventsByDates} from "../../../utils/data-management";

export const MyAvailabilityPage=()=>{
    const {currentUser,weeklyEventList} = useAppSelector(state => state.global)

    useEffect(()=>{

    },[])
    return <div>
        <HeaderPage headerName={text.myAvailability}/>
        <SelectedDatesBar/>


        {Object.keys(weeklyEventList).filter((eventItem)=>{

            return new Date(weeklyEventList[eventItem].start) >= new Date()
        }).map((eventKey,index)=>{
          return <AvailableRow key={index} eventDetails={weeklyEventList[eventKey]} isAvailable={checkIfUserIsAvailabilityToEvent(currentUser,weeklyEventList[eventKey]?.users)}/>
        })}
    </div>
}