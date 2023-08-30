import React, {useEffect} from "react";
import {getAllEventsByDates, getAllUsers} from "../../utils/data-management";
import "./WeeklyBookedCalender.scss"
import {useAppSelector} from "../../app/hooks";
import moment from "moment";
import {WeeklyBookedRow} from "./components/weeklyBookedRow/WeeklyBookedRow";
import {useParams} from 'react-router-dom';
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {setSelectedPage} from "../../store/global.slice";
import {SelectedPage} from "../../utils/enum.const";

export const WeeklyBookedCalender = () => {
    const dispatch = useDispatch()
    const {weeklyEventList, isAdmin, weekDates} = useAppSelector(state => state.global);
    let {to, from} = useParams();
    if (weekDates?.start && weekDates?.end) {
        from = moment(weekDates.start).format("yyyy-MM-D")
        to = moment(weekDates.end).format("yyyy-MM-D")
    }
    const checkIfUserConnected = async (storageUsername: string, storagePassword: string, token: string) => {
        dispatch(setToken(token))
    }
    useEffect(() => {
        const storageUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const storagePassword = localStorage.getItem("password");
        storageUsername && storagePassword && token && checkIfUserConnected(storageUsername, storagePassword, token)

        const fetchWeeklyEvents = async () => {
            await getAllEventsByDates(from, to).then()
            await getAllUsers().then()
        }
        fetchWeeklyEvents()
    }, [])

    const columns: string[] = [];
    const currentDate = moment(from);
    const lastDate = moment(to);

    while (currentDate.isSameOrBefore(lastDate, "day")) {
        const formattedDate = currentDate.format("MM-DD");
        const dayOfWeek = currentDate.format("dddd");
        columns.push(`${formattedDate} ${dayOfWeek}`);
        currentDate.add(1, "day");
    }
    return <div>
        {isAdmin && <Button
            className={"addEventButtonNotSelected"}
            // onClick={()=>window.open(`/weeklyBooking/from/${startDate}/to/${endDate}`)}>
            onClick={() => dispatch(setSelectedPage(SelectedPage.MainPanel))}>
            חזור למסך הבית
        </Button>}
        <div style={{
            display: "flex",
            gap: "10%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }}>
            <div style={{
                fontWeight: 700,
                fontSize: 28
            }}>{` ${moment(from).format("MM/DD")} - ${moment(to).format("MM/DD")} `}</div>
            <div style={{fontSize: 28, fontWeight: 700, color: "var(--primary)"}}>לוח משמרות עבור שבוע</div>
        </div>
        <div className={"greyLine"}></div>
        <div className={"tableWrapper"}>
            <table style={{borderCollapse: 'collapse', direction: "rtl", width: "100%", height: "100%"}}>
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
                {Object.values(weeklyEventList).map((eventDetails, index) => {
                    return <WeeklyBookedRow key={index} eventDetails={eventDetails}/>
                })}
                </tbody>
            </table>
        </div>
    </div>

}