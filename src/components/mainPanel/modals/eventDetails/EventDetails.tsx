import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setEventDetailPopupOpen, setEventList} from "../../../../store/global.slice";
import React from "react";
import {ModalHeader} from "../components/header/ModalHeader";
import {text} from "../../../../utils/dictionary-management";
import "../../../../styles/side-modals.scss"
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Button, Checkbox, TextField} from "@mui/material";
import {ColorPicker} from "./components/colorPicker/ColorPicker";
import {useAppSelector} from "../../../../app/hooks";
import {EventModel} from "../../../../models/event.model";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const {eventList} = useAppSelector(state => state.global)
    const [description, setDescription] = React.useState<string>("")
    const [location, setLocation] = React.useState<string>("")
    const [startTime, setStartTime] = React.useState<dayjs.Dayjs | null>(dayjs(new Date().setHours(8, 0, 0, 0)))
    const [endTime, setEndTime] = React.useState<dayjs.Dayjs | null>(dayjs(new Date().setHours(9, 0, 0, 0)))
    const [color, setColor] = React.useState("#2B76E5")
    const [checkBoxValue, setCheckBoxValue] = React.useState(true)


    const closeModal = () => {
        dispatch(setEventDetailPopupOpen(false))
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEvent: EventModel = {
            description: description,
            location: location,
            start: startTime?.toDate() as Date,
            end: endTime?.toDate() as Date,
            color: color,
            allDay: checkBoxValue
        }
        const newList = {...eventList}
        newList["s"] = newEvent;
        dispatch(setEventList(newList))
    };

    return <div className="side-modal">
        <ModalHeader closeFunction={closeModal} title={text.eventDetails}/>

        <form className={"formContainer"} onSubmit={handleSubmit}>
            <div className={"fieldWrapper"}>
                <TextField onChange={(e) => setDescription(e.target.value)} required={true} className={"textField"}
                           id="name" label="name" variant="outlined"/>
                <TextField onChange={(e) => setLocation(e.target.value)} required={true} className={"textField"}
                           id="location" label="location" variant="outlined"/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setStartTime(e)} className={"textField"}
                                           label={"start at"} defaultValue={startTime} ampm={false}
                                           format={'DD/MM/YYYY HH:mm'}/>
                    <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setEndTime(e)} className={"textField"}
                                           label={"end at"} defaultValue={endTime} ampm={false}
                                           format={'DD/MM/YYYY HH:mm'}/>
                </LocalizationProvider>
                <ColorPicker color={color} setColor={setColor}/>

                <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
                    <span>show without overlap</span>
                    <Checkbox  onChange={() => setCheckBoxValue(!checkBoxValue)} value={true}
                               defaultChecked={checkBoxValue}/>
                </div>
            </div>
            <Button type="submit" variant="contained">Submit</Button>
        </form>
    </div>
}