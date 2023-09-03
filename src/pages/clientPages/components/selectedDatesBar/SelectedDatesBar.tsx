import "./SelectedDatesBar.scss"
import {Button} from "@mui/material";
import {text} from "../../../../utils/dictionary-management";
import React, {useEffect, useState} from 'react';
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {getAllEventsByDates} from "../../../../utils/data-management";

export const SelectedDatesBar = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
    const lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()) + 1);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs(firstDayOfWeek))
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs(lastDayOfWeek))
    const getAllEventsFunction = async () => {
        const from = (startTime as dayjs.Dayjs).format('YYYY-MM-DD')
        const to = (endTime as dayjs.Dayjs).format('YYYY-MM-DD')
        await getAllEventsByDates(from, to)
    }
    useEffect(() => {
        getAllEventsFunction().then()
    }, [startTime, endTime])

    useEffect(() => {
        setThisWeek()
    }, [])
    const setThisWeek = () => {
        setStartTime(dayjs(firstDayOfWeek))
        setEndTime(dayjs(lastDayOfWeek))
    }
    const setThisMonth = () => {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        setStartTime(dayjs(firstDayOfMonth))
        setEndTime(dayjs(lastDayOfMonth))
    }
    return <div className={"selectedDatesBarContainer"}>
        <div className={"selectedDatesBarButtons"}>

            <Button
                className={"addEventButtonNotSelected"}
                onClick={setThisMonth}
            >
                {text.thisMonth}
            </Button>
            <Button
                className={"addEventButtonNotSelected"}
                onClick={setThisWeek}
            >
                {text.thisWeek}
            </Button>
        </div>
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{display: "flex", paddingInline: "5%", gap: "10%"}}>
                    <MobileDatePicker onChange={(e: dayjs.Dayjs | null) => setStartTime(e)}
                                      className={"textField"}
                                      label={text.startAt}
                                      value={startTime}
                                      defaultValue={startTime}
                                      format={'DD/MM/YYYY'}

                    />
                    <MobileDatePicker onChange={(e: dayjs.Dayjs | null) => setEndTime(e)}
                                      className={"textField"}
                                      label={text.endAt}
                                      value={endTime}
                                      defaultValue={endTime}
                                      format={'DD/MM/YYYY'}/>
                </div>

            </LocalizationProvider>
        </div>
    </div>
}