import "./ShiftManager.scss"
import {text} from "../../utils/dictionary-management";
import React, {useState} from "react";
import {setSelectedPopup} from "../../store/global.slice";
import {useDispatch} from "react-redux";
import {SelectedPopup} from "../../utils/enum.const";
import {Autocomplete, TextField} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {FormBody} from "../components/formBody/FormBody";
import {log} from "util";
import {EventModel} from "../../models/event.model";
import {SelectedUserForShift} from "./components/selectedUserForShift/SelectedUserForShift";

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
console.log(rollList,"rollList")

    const selectedEvent2 = (eventObj: EventModel) => {
        setSelectedEventFromList(eventObj)
    }

    const handleSubmit = () => {

    }
    console.log(selectedEventFromList, "selectedEventFromList")
const getRollName =(rollId:number)=>{
        return rollList.find((a)=>a.id === rollId)?.description
}
const getBookedUsersByRoll=(event:EventModel,rollId:number)=>{
        let counter = 0;
         event.users.forEach((user)=>{
            if (user.roleId === rollId){
                counter++;
            }
        })
    return counter
}
    return <div className="side-modal">
        <FormBody closeModal={closeModal} title={text.shiftManager} handleSubmit={handleSubmit}>
            <Autocomplete
                className={"selectEventAutoComplete"}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: EventModel | null) => {
                    newValue && selectedEvent2(newValue);
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

                {rollList.map((roll, index) => {
                    const rollByUser = getBookedUsersByRoll(selectedEventFromList,roll.id);
                    return <div key={index}>
                        <div className={"selectedUserForRoll"}>
                            {roll.description} : {selectedEventFromList?.capacity.filter((c) => roll.id === c.roleId).map((c, indexC) => {
                            return <div style={{backgroundColor:c.count===rollByUser?"green":"red"}} key={indexC}> {rollByUser}/{c.count} דרוש </div>
                        })}
                        </div>
                    </div>
                })}

                {userList.filter((user) => Object.values(selectedEventFromList?.users).map((userOfEvent) => {
                    return userOfEvent.id
                }).includes(user.id)).map((ul, ulIndex) => {
                    const findIndex = selectedEventFromList?.users.findIndex((u)=>u.id === ul.id)
                    const eventUser = selectedEventFromList?.users[findIndex];
                    return <div key={ulIndex} className={"bockRoll"}>
                        <SelectedUserForShift setSelectedEventFromList={setSelectedEventFromList} selectedEventFromList={selectedEventFromList} rollList={rollList} eventUser={eventUser} userFromList={ul} getRollName={getRollName} />
                    </div>
                })}
            </div>}
        </FormBody>

    </div>
}