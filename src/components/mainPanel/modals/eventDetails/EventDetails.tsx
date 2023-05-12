import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setEventDetailPopupOpen} from "../../../../store/global.slice";
import React from "react";
import {ModalHeader} from "../components/header/ModalHeader";
import {text} from "../../../../utils/dictionary-management";
import "../../../../styles/side-modals.scss"
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setEventDetailPopupOpen(false))
    }
    // const [outsideRef] = useOutsideAlerter(closeModal);

    return <div className="side-modal">
        <ModalHeader closeFunction={closeModal} title={text.eventDetails}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={"calendersWrapper"}>
                <div className={"calenderContainer"}>
                    <span className={"calenderContainerLabel"}>Start at:</span>
                    <DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} ampm={false}/>
                </div>
                <div className={"calenderContainer"}>
                    <span className={"calenderContainerLabel"}>End at:</span>
                    <DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} ampm={false}/>
                </div>
            </div>
        </LocalizationProvider>
    </div>
}