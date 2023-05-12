import "./MainPanel.scss"
import {Header} from "./components/header/Header";
import {CalendarComponent} from "./components/calendarComponent/CalendarComponent";
import React from "react";
import {text} from "../../utils/dictionary-management";
import {setEventDetailPopupOpen} from "../../store/global.slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {EventDetails} from "./modals/eventDetails/EventDetails";

export const MainPanel = () => {
    const dispatch = useDispatch()
    const {isEventDetailPopupOpen} = useAppSelector(state => state.global);
    const UpdateAddEventPopup = () => {
        dispatch(setEventDetailPopupOpen(!isEventDetailPopupOpen))
    }

    return <div className="mainPanelContainer">
        <Header/>
            {isEventDetailPopupOpen && <EventDetails/>}
        <div className={"mainPanelBody"}>
            <div className={"addEventButtonWrapper"}>
                <Button className={isEventDetailPopupOpen ? "addEventButtonSelected":"addEventButtonNotSelected" }
                        onClick={UpdateAddEventPopup}>
                    {text.AddEventBtn}
                </Button>
            </div>
            <CalendarComponent/>
        </div>
    </div>
}