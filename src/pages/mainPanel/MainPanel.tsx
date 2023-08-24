import "./MainPanel.scss"
import {Header} from "./components/header/Header";
import {CalendarComponent} from "./components/calendarComponent/CalendarComponent";
import React, {useEffect, useMemo, useState} from "react";
import {text} from "../../utils/dictionary-management";
import {setSelectedEvent, setSelectedPage, setSelectedPopup} from "../../store/global.slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {Button, Dialog} from "@mui/material";
import {EventDetails} from "../../modals/eventDetails/EventDetails";
import {ShiftManager} from "../../modals/shiftManager/ShiftManager";
import { Menu } from '@headlessui/react'
import {SelectedPage, SelectedPopup, UserEventStatus} from "../../utils/enum.const";
import {
    getAllEventsByOrganization,
    getAllRolesByOrganization,
    getAllUsers,
    isUserIsManager, sendLinkAsSms
} from "../../utils/data-management";
import {ClientEventDetailsDialog} from "./components/clientEventDetailsDialog/ClientEventDetailsDialog";
import {EventModel} from "../../models/event.model";
import { getStatusEventForClient} from "../../utils/general";
import {Icon} from "../../components/icon/Icon";
import {setToken} from "../../store/authentication.slice";
import {Views} from "react-big-calendar";
import moment from "moment";

export const MainPanel = () => {
    const dispatch = useDispatch()

    const {selectedEvent,selectedPopup,isMobile,isAdmin,currentUser,weekDates} = useAppSelector(state => state.global);
    const startDate = moment(weekDates.start).format("yyyy-MM-D")
    // const endDate = moment(weekDates.end).format("yyyy-MM-D")
    useEffect(() => {
        if (selectedPopup === SelectedPopup.Close){
            getAllEventsByOrganization().then()
            getAllRolesByOrganization().then()
            isUserIsManager().then()
            getAllUsers().then()
        }
    }, [selectedPopup])

    const UpdatePopupManager = (popupManage : SelectedPopup) =>{
        if (selectedPopup === popupManage){
            dispatch(setSelectedPopup(SelectedPopup.Close ))
        }else {
        dispatch(setSelectedPopup(popupManage))
        }
    }
    console.log(isAdmin,"isAddmin")
    console.log(Views,"Views")

    const userEventStatusMemo:UserEventStatus = useMemo(()=>{
        return getStatusEventForClient((selectedEvent as EventModel)?.users??[],currentUser)
        // return checkIfUserIsAvailabilityToEvent(currentUser,(selectedEvent as EventModel)?.users??[])??false
    },[selectedPopup])

   const disconnect=()=>{
        localStorage.setItem("token","")
        localStorage.setItem("username","")
        localStorage.setItem("password","")
        dispatch(setToken(undefined))

   }
    const [currentView, setCurrentView] = useState(Views.W);


    const sendEmailToAvailableUsers= async ()=>{
        await sendLinkAsSms(startDate)
    }

    return <div className="mainPanelContainer">
        <Header/>
        <Menu>
            <Menu.Button className={"menuContainer"}>
                        <Icon name={"menu"}/>
            </Menu.Button>

            <Menu.Items className={"menuItems"}>
                <Menu.Item >
                    <div onClick={disconnect} className="opacity-75">Disconnect</div>
                </Menu.Item>
            </Menu.Items>
        </Menu>
        {selectedPopup === SelectedPopup.EventDetail && <EventDetails/>}
        {selectedPopup === SelectedPopup.ShiftManager && <ShiftManager/>}
        {/*{selectedPopup === SelectedPopup.ClientEventDetails && <RollManager/>}*/}
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
                {isAdmin &&  currentView === Views.WEEK && <Button
                    className={"addEventButtonNotSelected"}
                    // onClick={()=>window.open(`/weeklyBooking/from/${startDate}/to/${endDate}`)}>
                    onClick={()=> {
                        // dispatch()
                        dispatch(setSelectedPage(SelectedPage.SendBookPage))
                    }}>
                  צפה בשיבוץ
                </Button>}
                {isAdmin &&  currentView === Views.WEEK && <Button
                    className={"addEventButtonNotSelected"}
                    onClick={()=>sendEmailToAvailableUsers()}>
                  שלח שיבוץ
                </Button>}
                {/*{isAdmin && currentView === Views.WEEK &&*/}
                {/*    <BasicDocument/>*/}
                {/*}*/}

{/*// setCurrentView={setCurrentView}*/}
                 {/*<PdfPage />*/}
                {/*{!isAdmin &&  <Button*/}
                {/*    className={"addEventButtonNotSelected"}*/}
                {/*    onClick={()=>dispatch(setSelectedPage(SelectedPage.EmployeePage))}>*/}
                {/*    {text.myDetails}*/}
                {/*</Button>}*/}
                    </div>
            <CalendarComponent currentView={currentView} setCurrentView={setCurrentView}/>
        </div>
            <Dialog
                fullWidth={true}
                onClose={()=> {
                    dispatch(setSelectedPopup(SelectedPopup.Close))
                    dispatch(setSelectedEvent(undefined))
                }}
            open={selectedPopup === SelectedPopup.ClientEventDetails}
            >
                <ClientEventDetailsDialog userEventStatusMemo={userEventStatusMemo}/>
            </Dialog>
    </div>
}