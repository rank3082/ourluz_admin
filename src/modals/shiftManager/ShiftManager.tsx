import "./ShiftManager.scss"
import {text} from "../../utils/dictionary-management";
import React, {useMemo, useState} from "react";
import {setSelectedPopup} from "../../store/global.slice";
import {useDispatch} from "react-redux";
import {SelectedPopup} from "../../utils/enum.const";
import {Autocomplete, TextField} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {FormBody} from "../components/formBody/FormBody";
import {EventModel} from "../../models/event.model";
import {SelectedUserForShift} from "./components/selectedUserForShift/SelectedUserForShift";
import {getRollName} from "../../utils/general";
import {AddManualEmployee} from "./components/addManualEmployee/AddManualEmployee";

export const ShiftManager = () => {
    const dispatch = useDispatch()
    const {eventList, isEnglish, rollList, userList} = useAppSelector(state => state.global);
    console.log(eventList, "eventList")
    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
    }
    const [inputValue, setInputValue] = useState("");
    const [selectedEventFromList, setSelectedEventFromList] = useState<EventModel | undefined>();
    const eventOptions = Object.values(eventList).map((eventItem) => eventItem)
    console.log(rollList, "rollList")

    const selectedEvent = (eventObj: EventModel) => {
        setSelectedEventFromList(eventObj)
    }

    const handleSubmit = () => {

    }
    console.log(selectedEventFromList, "selectedEventFromList")
    // const getRollName = (rollId: number) => {
    //     return rollList.find((a) => a.id === rollId)?.description
    // }
    const getBookedUsersByRoll = (event: EventModel, rollId: number) => {
        let counter = 0;
        event.users.forEach((user) => {
            if (user.roleId === rollId) {
                counter++;
            }
        })
        return counter
    }

    const userOfSpecificEvent = useMemo(()=>{
        return selectedEventFromList ?  userList.filter((user) => Object.values(selectedEventFromList?.users).map((userOfEvent) => {
            return userOfEvent.id
        }).includes(user.id)):[];
    },[selectedEventFromList,eventList])


    //
    // const userOfSpecificEvent = useMemo(()=>{
    //     if ( selectedEventFromList)
    //         return userList.filter((user) => Object.values(selectedEventFromList?.users).map((userOfEvent) => {
    //         return userOfEvent.id
    //     }).includes(user.id))
    //     else
    //     return [];
    // },[selectedEventFromList])

    return <div className="side-modal">
        <FormBody closeModal={closeModal} title={text.shiftManager} handleSubmit={handleSubmit} withoutSubmit>
            <Autocomplete
                className={"selectEventAutoComplete"}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: EventModel | null) => {
                    newValue && selectedEvent(newValue);
                }}
                dir={isEnglish ? "ltr" : "rtl"}
                size={"small"}
                disablePortal
                id="combo-box-demo"
                options={eventOptions}
                getOptionLabel={(option) => option.description}
                renderInput={params => <TextField style={{fontSize: "30px !important"}}
                                                  className="text-Field-style" {...params}
                                                  label={text.selectEventForm}/>}
            />
            {selectedEventFromList && <div className={"selectedEventFromListContainer"}>
                <div className={"bockedLabel"}>
                    שיבוץ עובדים עבור {selectedEventFromList.description}
                </div>


                <table  style={{direction: !isEnglish ? "ltr" : "rtl"}}  className={"table"}>
                    <thead>
                    <tr>
                        <th>{text.booked}</th>
                        <th>{text.capacity}</th>
                        <th>{text.roll}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rollList.map((roll, index) => {
                        const rollByUser = getBookedUsersByRoll(selectedEventFromList, roll.id);
                        return <tr key={index}>
                            {/*add key*/}
                            {selectedEventFromList?.capacity.filter((c) => roll.id === c.roleId).map((c, indexC) => {
                                return <>
                                    <td style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"25%"}} key={indexC}>{rollByUser}</td>
                                    <td style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"25%"}} key={indexC}>{c.count}</td>
                                    <td style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"50%"}} key={indexC}> {roll.description} </td>
                                </>
                            })}
                        </tr>
                    })}
                    </tbody>
                </table>

                {userOfSpecificEvent.map((ul, ulIndex) => {
                    const findIndex = selectedEventFromList?.users.findIndex((u) => u.id === ul.id)
                    const eventUser = selectedEventFromList?.users[findIndex];
                    return <div key={ulIndex} className={"bockRoll"}>
                        <SelectedUserForShift setSelectedEventFromList={setSelectedEventFromList}
                                              selectedEventFromList={selectedEventFromList} rollList={rollList}
                                              eventUser={eventUser} userFromList={ul} getRollName={getRollName}/>
                    </div>
                })}
                {userOfSpecificEvent.length ===0 && <div  style={{direction: !isEnglish ? "rtl" : "ltr"}}  className={"alertText"}>{text.withoutEmployee}</div>}
            </div>}
            {selectedEventFromList && <AddManualEmployee setSelectedEventFromList={setSelectedEventFromList} eventId={selectedEventFromList?.id.toString()??""} eventUserList={userOfSpecificEvent.filter((eu)=> {
               const findIndex = selectedEventFromList?.users.findIndex((u) => u.id === eu.id)??-1
               return   selectedEventFromList?.users[findIndex].booked
           })}/>}
            {selectedEventFromList && <div className={"bookedEmployeesFromListBtn"}>{text.bookedEmployeesFromList}</div>}
        </FormBody>

    </div>
}