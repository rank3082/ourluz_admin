import "./MainPanel.scss"
import {Header} from "./components/header/Header";
import {CalendarComponent} from "./components/calendarComponent/CalendarComponent";
import React, {useEffect} from "react";
import {text} from "../../utils/dictionary-management";
import {setSelectedPage, setSelectedPopup} from "../../store/global.slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {EventDetails} from "../../modals/eventDetails/EventDetails";
import {ShiftManager} from "../../modals/shiftManager/ShiftManager";
import {SelectedPage, SelectedPopup} from "../../utils/enum.const";
import {
    getAllEventsByOrganization,
    getAllRolesByOrganization,
    getAllUsers, isUserIsManager
} from "../../utils/data-management";
// import {RollManager} from "../../modals/rollManager/RollManager";

export const MainPanel = () => {
    const dispatch = useDispatch()

    const {selectedPopup,isMobile,isAdmin} = useAppSelector(state => state.global);
    useEffect(() => {
        getAllEventsByOrganization().then()
        getAllRolesByOrganization().then()
        isUserIsManager().then()
        getAllUsers().then()
    }, [])

    const UpdatePopupManager = (popupManage : SelectedPopup) =>{
        if (selectedPopup === popupManage){
            dispatch(setSelectedPopup(SelectedPopup.Close ))
        }else {
        dispatch(setSelectedPopup(popupManage))
        }
    }
    console.log(isAdmin,"isAdmin")

    return <div className="mainPanelContainer">
        <Header/>
        {selectedPopup === SelectedPopup.EventDetail && <EventDetails/>}
        {selectedPopup === SelectedPopup.ShiftManager && <ShiftManager/>}
        {/*{selectedPopup === SelectedPopup.RollManager && <RollManager/>}*/}
        <div className={"mainPanelBody"}>
            <div style={{justifyContent:!isMobile ?"start":"center" }} className={"addEventButtonWrapper"}>
                {isAdmin && <Button
                    className={selectedPopup === SelectedPopup.EventDetail ? "addEventButtonSelected" : "addEventButtonNotSelected"}
                    onClick={()=>UpdatePopupManager(SelectedPopup.EventDetail)}>
                    {text.AddEventBtn}
                </Button>}
                {isAdmin &&  <Button
                    className={selectedPopup === SelectedPopup.ShiftManager ? "addEventButtonSelected" : "addEventButtonNotSelected"}
                    onClick={()=>UpdatePopupManager(SelectedPopup.ShiftManager)}>
                    {text.shiftManager}
                </Button>}
                {/*<Button*/}
                {/*    className={selectedPopup === SelectedPopup.RollManager ? "addEventButtonSelected" : "addEventButtonNotSelected"}*/}
                {/*    onClick={()=>UpdatePopupManager(SelectedPopup.RollManager)}>*/}
                {/*{text.rollManager}*/}
                {/*</Button>*/}
                {isAdmin &&  <Button
                    className={"addEventButtonNotSelected"}
                    onClick={()=>dispatch(setSelectedPage(SelectedPage.EmployeePage))}>
                {text.employeeList}
                </Button>}
                {!isAdmin &&  <Button
                    className={"addEventButtonNotSelected"}
                    onClick={()=>dispatch(setSelectedPage(SelectedPage.MyShiftPage))}>
                    {text.myShift}
                </Button>}
                {!isAdmin &&  <Button
                    className={"addEventButtonNotSelected"}
                    onClick={()=>dispatch(setSelectedPage(SelectedPage.MyAvailabilityPage))}>
                    {text.myAvailability}
                </Button>}
                {/*{!isAdmin &&  <Button*/}
                {/*    className={"addEventButtonNotSelected"}*/}
                {/*    onClick={()=>dispatch(setSelectedPage(SelectedPage.EmployeePage))}>*/}
                {/*    {text.myDetails}*/}
                {/*</Button>}*/}
                    </div>
            <CalendarComponent/>
        </div>
    </div>
}