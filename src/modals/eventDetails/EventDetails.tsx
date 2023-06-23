import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setSelectedEvent, setSelectedPopup} from "../../store/global.slice";
import React, {useState} from "react";
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
import {SubTitle} from "../components/subTitle/SubTitle";
import {InputNumber} from "./components/inputNumber/InputNumber";
import {CapacityModel} from "../../models/capacity.model";
import {RollModel} from "../../models/roll.model";
import {retry} from "@reduxjs/toolkit/query";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const {eventList,rollList, isEnglish, selectedEvent} = useAppSelector(state => state.global)

    console.log(selectedEvent, "selectedEvent")
    console.log(rollList, "rollList")
    const initCapacity = rollList.map((r)=>{
        return {roleId:r.id,count:0}
    })
    const isNewEvent = selectedEvent === undefined
    const initEvent: EventModel = isNewEvent ? {
        id: 9999,
        description: "",
        start: new Date(),
        end: new Date(),
        location: "",
        backgroundColor: "#2B76E5",
        allDay: true,
        organizationId: 1,
        capacity:initCapacity,
        users:[]
    } : selectedEvent

    const [description, setDescription] = useState<string>(initEvent.description)
    const [location, setLocation] = useState<string>(initEvent.location)
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs(initEvent.start))
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs(initEvent.end))
    const [color, setColor] = useState(initEvent.backgroundColor)
    const [checkBoxValue, setCheckBoxValue] = useState(initEvent.allDay)

    const [capacity,setCapacity] = useState<CapacityModel[]>(initEvent.capacity)
    // const [capacity,setCapacity] = useState<CapacityModel[]>(rollList.map((r)=> {
    //     return {roleId:r.id,count:0}
    // }))
    console.log(capacity,"capacity")
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
                location: location,
                capacity:capacity
            }).then()
        } else {
            updateEventById(initEvent.id,newList,{
                description: description,
                startDate:  startTime?.toDate() as Date,
                endDate: endTime?.toDate() as Date,
                backgroundColor:color,
                location: location,
                capacity:capacity
            }).then()
        }
        closeModal()
    };

    const deleteEventFunction=()=>{
        console.log(newList,"newList")
        console.log(initEvent,"initEvent")
        deleteEvent(newList,initEvent.id).then()
    }

    const updateCapacityArray = (rollId:number, newCount:number) => {
        const updatedCapacityItem = capacity.map((c) =>
            c.roleId === rollId ? { ...c, count: newCount } : c
        );
        setCapacity(updatedCapacityItem);
    };

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

            <SubTitle title={"הגדרת תפקידים"}/>



            {rollList.map((roll,index)=>{
                const currentCapacity:CapacityModel|undefined = capacity.find((c)=>c.roleId === roll.id)


                return currentCapacity && <InputNumber capacity={currentCapacity} setCapacityItems={(rollId:number, newCount:number)=>updateCapacityArray(rollId, newCount)} key={index} roll={roll}/>
            })}



            <SubTitle title={"הגדרת תצוגה"}/>
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