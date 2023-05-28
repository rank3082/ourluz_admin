import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setSelectedEvent, setSelectedPopup} from "../../store/global.slice";
import React from "react";
import {text} from "../../utils/dictionary-management";
import "../../styles/side-modals.scss"
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Checkbox, TextField} from "@mui/material";
import {ColorPicker} from "./components/colorPicker/ColorPicker";
import {useAppSelector} from "../../app/hooks";
import {EventModel} from "../../models/event.model";
import {SelectedPopup} from "../../utils/enum.const";
import {FormBody} from "../components/formBody/FormBody";
import {createNewEvent, deleteEvent, updateEventById} from "../../utils/data-management";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const {eventList, isEnglish, selectedEvent} = useAppSelector(state => state.global)

    console.log(selectedEvent, "selectedEvent")
    const isNewEvent = selectedEvent === undefined
    const initEvent: EventModel = isNewEvent ? {
        id: 9999,
        description: "",
        start: new Date(),
        end: new Date(),
        location: "",
        backgroundColor: "#2B76E5",
        allDay: true,
        organizationId: 1
    } : selectedEvent

    const [description, setDescription] = React.useState<string>(initEvent.description)
    const [location, setLocation] = React.useState<string>(initEvent.location)
    const [startTime, setStartTime] = React.useState<dayjs.Dayjs | null>(dayjs(initEvent.start))
    const [endTime, setEndTime] = React.useState<dayjs.Dayjs | null>(dayjs(initEvent.end))
    const [color, setColor] = React.useState(initEvent.backgroundColor)
    const [checkBoxValue, setCheckBoxValue] = React.useState(initEvent.allDay)


    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
        dispatch(setSelectedEvent(undefined))
    }


        const newList = {...eventList}
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNewEvent) {
            createNewEvent(newList,{
                description: description,
                startDate:  startTime?.toDate() as Date,
                endDate: endTime?.toDate() as Date,
                backgroundColor:color,
                location: location
            }).then()
        } else {
            updateEventById(initEvent.id,newList,{
                description: description,
                startDate:  startTime?.toDate() as Date,
                endDate: endTime?.toDate() as Date,
                backgroundColor:color,
                location: location
            }).then()
            // newList[selectedEvent?.id] = newEvent
        }
        // dispatch(setEventList(newList))
        closeModal()
    };

    const deleteEventFunction=()=>{
        console.log("im here")
        console.log(newList,"newList")
        console.log(initEvent,"initEvent")
        deleteEvent(newList,initEvent.id).then()
    }


    return <div className="side-modal">
        <FormBody
            title={text.eventDetails}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            deleteEventFunction={deleteEventFunction}
            isNewEvent={isNewEvent} >
            <TextField onChange={(e) => setDescription(e.target.value)} required={true} className={"textField"}
                       id="name"
                       defaultValue={description}
                       label={text.description}
                       variant="outlined"
                       dir={isEnglish ? "ltr" : "rtl"}
            />


            <TextField onChange={(e) => setLocation(e.target.value)} required={true} className={"textField"}
                       id="location"
                       label={text.location}
                       defaultValue={location}
                       variant="outlined"
                       dir={isEnglish ? "ltr" : "rtl"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setStartTime(e)} className={"textField"}
                                       label={text.startAt}
                                       defaultValue={startTime} ampm={false}
                                       format={'DD/MM/YYYY HH:mm'}
                />
                <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setEndTime(e)} className={"textField"}
                                       label={text.endAt} defaultValue={endTime} ampm={false}
                                       format={'DD/MM/YYYY HH:mm'}/>
            </LocalizationProvider>
            <ColorPicker backgroundColor={color} setBackgroundColor={setColor}/>

            <div style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                direction: isEnglish ? "ltr" : "rtl"
            }}>
                <span>{text.showWithoutOverlap}</span>
                <Checkbox onChange={() => setCheckBoxValue(!checkBoxValue)} value={true}
                          defaultChecked={checkBoxValue}/>
            </div>
        </FormBody>
    </div>
}