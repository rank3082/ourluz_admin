import "./MainPanel.scss"
import {Header} from "./components/header/Header";
import {CalendarComponent} from "./components/calendarComponent/CalendarComponent";
import React, {useEffect} from "react";
import {text} from "../../utils/dictionary-management";
import {setSelectedPopup} from "../../store/global.slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {EventDetails} from "../../modals/eventDetails/EventDetails";
import {ShiftManager} from "../../modals/shiftManager/ShiftManager";
import {SelectedPopup} from "../../utils/enum.const";
import {getAllEventsByOrganization} from "../../utils/data-management";

export const MainPanel = () => {
    const dispatch = useDispatch()
    const {selectedPopup} = useAppSelector(state => state.global);
    useEffect(() => {
        getAllEventsByOrganization().then()
    }, [])

    const UpdateAddEventPopup = () => {
        // const startTime = new Date();
        // startTime.setHours(8, 0, 0, 0);
        //
        // const endTime = new Date();
        // endTime.setHours(10, 0, 0, 0);


        // dispatch(setSelectedEvent({
        //     description: "",
        //     location: "",
        //     start: startTime,
        //     end: endTime,
        //     backgroundColor: "#2B76E5",
        //     allDay: true
        // }
        // ))

        dispatch(setSelectedPopup(SelectedPopup.EventDetail))
    }
    const UpdateShiftManagerPopup = () => {
        dispatch(setSelectedPopup(SelectedPopup.ShiftManager))
    }

    return <div className="mainPanelContainer">
        <Header/>
        {selectedPopup === SelectedPopup.EventDetail && <EventDetails/>}
        {selectedPopup === SelectedPopup.ShiftManager && <ShiftManager/>}
        <div className={"mainPanelBody"}>
            <div className={"addEventButtonWrapper"}>
                <Button
                    className={selectedPopup === SelectedPopup.EventDetail ? "addEventButtonSelected" : "addEventButtonNotSelected"}
                    onClick={UpdateAddEventPopup}>
                    {text.AddEventBtn}
                </Button>
                <Button
                    className={selectedPopup === SelectedPopup.ShiftManager ? "addEventButtonSelected" : "addEventButtonNotSelected"}
                    onClick={UpdateShiftManagerPopup}>
                    {text.shiftManager}
                </Button>
            </div>
            <CalendarComponent/>
        </div>
    </div>
}