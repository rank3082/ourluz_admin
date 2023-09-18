import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setSelectedEvent, setSelectedPopup, setSlotSelected} from "../../store/global.slice";
import React, {useEffect, useState} from "react";
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
import {CapacityModel} from "../../models/capacity.model";
import {ShiftManagerMenu} from "../shiftManager/components/shiftMannagerMenu/ShiftManagerMenu";
import moment from "moment";
import {RollListEditor} from "./components/rollListEditor/RollListEditor";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const {eventList, rollList, isEnglish, selectedEvent, slotSelected} = useAppSelector(state => state.global)
    const initCapacity = rollList.map((r) => {
        return {roleId: r.id, count: 0}
    })

    const isNewEvent = selectedEvent === undefined
    const initEvent: EventModel = isNewEvent ? {
        id: 9999,
        description: "",
        start: slotSelected ? slotSelected.start : new Date(),
        end: slotSelected ? slotSelected.end : new Date(),
        location: "",
        comments: "",
        backgroundColor: "#2B76E5",
        allDay: true,
        organizationId: 1,
        capacity: initCapacity,
        users: []
    } : selectedEvent

    const [description, setDescription] = useState<string>(initEvent.description)
    const [location, setLocation] = useState<string>(initEvent.location)
    const [comments, setComments] = useState<string>(initEvent.comments)
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs(initEvent.start))
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs(initEvent.end))
    const [color, setColor] = useState(initEvent.backgroundColor)
    const [checkBoxValue, setCheckBoxValue] = useState(initEvent.allDay)
    const [capacity, setCapacity] = useState<CapacityModel[]>(initEvent.capacity)

    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
        dispatch(setSelectedEvent(undefined))
        dispatch(setSlotSelected(undefined))
    }


    const newList = {...eventList}
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (isNewEvent) {
                await createNewEvent(newList, {
                    description: description,
                    startDate: moment(startTime?.toDate() as Date).toDate(),
                    endDate: moment(endTime?.toDate() as Date).toDate(),
                    backgroundColor: color,
                    location: location,
                    comments: comments,
                    capacity: capacity
                }).then()
            } else {
                await updateEventById(initEvent.id, newList, {
                    description: description,
                    startDate: moment(startTime?.toDate() as Date).toDate(),
                    endDate: moment(endTime?.toDate() as Date).toDate(),
                    backgroundColor: color,
                    location: location,
                    comments: comments,
                    capacity: capacity
                }).then()
            }
            closeModal()
        } catch (e) {
            console.log(e, "e")
        }

    };

    const deleteEventFunction = () => {
        deleteEvent(newList, initEvent.id).then()
        closeModal()
    }


    useEffect(() => {
        if (selectedEvent) {
            setDescription(selectedEvent.description)
            setLocation(selectedEvent.location)
            setComments(selectedEvent.comments)
            setStartTime(dayjs(selectedEvent.start))
            setEndTime(dayjs(selectedEvent.end))
            setColor(selectedEvent.backgroundColor)
            setCheckBoxValue(selectedEvent.allDay)
            setCapacity(selectedEvent.capacity)
        }
    }, [selectedEvent])

    // const capacityMemo=useMemo(()=>{return capacity},[selectedEvent])


    return <div  className="side-modal">
        <FormBody
            title={text.eventDetails}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            deleteEventFunction={deleteEventFunction}
            isNewEvent={isNewEvent}>
            <TextField
                onChange={(e) => setDescription(e.target.value)} required={true} className={"textField"}
                id="name"
                defaultValue={description}
                label={text.description}
                variant="outlined"
                dir={isEnglish ? "ltr" : "rtl"}
                value={description}
            />


            <TextField onChange={(e) => setLocation(e.target.value)} required={true} className={"textField"}
                       id="location"
                       label={text.location}
                       defaultValue={location}
                       variant="outlined"
                       dir={isEnglish ? "ltr" : "rtl"}
                       value={location}
            />
            <TextField onChange={(e) => setComments(e.target.value)} required={false} className={"textField"}
                       id="comments"
                       label={text.comments}
                       defaultValue={comments === "NULL" ? "" : comments}
                       variant="outlined"
                       dir={isEnglish ? "ltr" : "rtl"}
                       value={comments === "NULL" ? "" : comments}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setStartTime(e)} className={"textField"}
                                       label={text.startAt} defaultValue={startTime} ampm={false}
                                       format={'DD/MM/YYYY HH:mm'}
                                       value={startTime}
                />
                <DesktopDateTimePicker onChange={(e: dayjs.Dayjs | null) => setEndTime(e)} className={"textField"}
                                       label={text.endAt} defaultValue={endTime} ampm={false}
                                       format={'DD/MM/YYYY HH:mm'}
                                       value={endTime}
                />
            </LocalizationProvider>


            <SubTitle title={"הגדרת תפקידים"}/>


            <RollListEditor capacity={capacity} setCapacity={setCapacity}/>


            <SubTitle title={"הגדרת תצוגה"}/>
            <ColorPicker backgroundColor={color} setBackgroundColor={setColor}/>


            {selectedEvent && selectedEvent.description !== "" && <ShiftManagerMenu selectedEvent={selectedEvent}/>}
            <div style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                direction: isEnglish ? "ltr" : "rtl"
            }}>
                <span>{text.showWithoutOverlap}</span>
                <Checkbox onChange={() => setCheckBoxValue(!checkBoxValue)}
                          value={selectedEvent ? selectedEvent.allDay : true}
                          defaultChecked={checkBoxValue}/>
            </div>
        </FormBody>
    </div>
}