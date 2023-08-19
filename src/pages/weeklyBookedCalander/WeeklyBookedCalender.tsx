import React, {useEffect} from "react";
import {getAllEventsByDates, getAllUsers} from "../../utils/data-management";
import "./WeeklyBookedCalender.scss"
import {useAppSelector} from "../../app/hooks";
import moment from "moment";
import {WeeklyBookedRow} from "./components/weeklyBookedRow/WeeklyBookedRow";
import { useParams } from 'react-router-dom';
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";

export const WeeklyBookedCalender=()=>{
    const dispatch= useDispatch()
    const {weeklyEventList} = useAppSelector(state => state.global);
    const { to, from } = useParams();
    const checkIfUserConnected= async (storageUsername:string,storagePassword:string,token:string)=>{
        dispatch(setToken(token))
    }

    useEffect( ()=>{
            const storageUsername = localStorage.getItem("username");
            const token = localStorage.getItem("token");
            const storagePassword = localStorage.getItem("password");
            storageUsername && storagePassword && token && checkIfUserConnected(storageUsername,storagePassword,token)

       const fetchWeeklyEvents = async ()=>{
       await getAllEventsByDates(from,to).then()
       await getAllUsers().then()
       }
       fetchWeeklyEvents()
    },[])

    const columns: string[] = [];
    const currentDate = moment(from);
    const lastDate = moment(to);

    while (currentDate.isSameOrBefore(lastDate, "day")) {
        const formattedDate = currentDate.format("MM-DD");
        const dayOfWeek = currentDate.format("dddd");
        columns.push(`${formattedDate} ${dayOfWeek}`);
        currentDate.add(1, "day");
    }

    return <div  className={"tableWrapper"}>
        <table style={{borderCollapse: 'collapse',direction:"rtl",width:"100%",height:"100%"}}>
            <thead style={{position: "sticky", top: 0}}>
            <tr style={{paddingBlock: 24}}>
                <th className={"malradThTable"}></th>
                {columns.map((c, index) => {
                    return <th
                        key={index}
                        className={"malradThTable"}>{c}</th>
                })}
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