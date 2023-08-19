import React, {useEffect, useState} from "react";
import {getAllEventsByDates, getAllEventsByOrganization} from "../../utils/data-management";
import "./WeeklyBookedCalender.scss"
import {useAppSelector} from "../../app/hooks";
import moment from "moment";
import {WeeklyBookedRow} from "./components/weeklyBookedRow/WeeklyBookedRow";
import {retry} from "@reduxjs/toolkit/query";
export const WeeklyBookedCalender=()=>{
    useEffect( ()=>{
       const fetchWeeklyEvents = async ()=>{
        const startDate = moment(weekDates.start).format("yyyy-MM-D")
        const endDate = moment(weekDates.end).format("yyyy-MM-D")
      await getAllEventsByDates(startDate,endDate).then()
       }
        fetchWeeklyEvents()
    },[])

    const {weeklyEventList,weekDates} = useAppSelector(state => state.global);

    console.log(weeklyEventList,"weeklyEventList")
    console.log(weekDates,"weekDates")

    const columns: string[] = [];
    const currentDate = moment(weekDates.start);
    const lastDate = moment(weekDates.end);

    while (currentDate.isSameOrBefore(lastDate, "day")) {
        const formattedDate = currentDate.format("MM-DD");
        const dayOfWeek = currentDate.format("dddd");
        columns.push(`${formattedDate} ${dayOfWeek}`);
        currentDate.add(1, "day");
    }
    console.log(columns,"columns")

    // const columns=["ראשון,שני,שלישי,רביעי,חמישי,שישי,שבת"]
    return <div  className={"tableWrapper"}>
        <table style={{borderCollapse: 'collapse',direction:"rtl",width:"100%"}}>
            <thead style={{position: "sticky", top: 0}}>
            <tr style={{paddingBlock: 24}}>
                <th className={"malradThTable"}></th>
                {columns.map((c, index) => {
                    return <th
                        key={index}
                        className={"malradThTable"}>{c}</th>
                })}
                {/*<th style={{width: 50, backgroundColor: "#ffffff"}}></th>*/}
            </tr>
            </thead>

            <tbody>
            {Object.values(weeklyEventList).map((eventDetails,index)=>{
                return  <WeeklyBookedRow key={index} eventDetails={eventDetails}/>
            })}
            </tbody>

        </table>
    </div>
}