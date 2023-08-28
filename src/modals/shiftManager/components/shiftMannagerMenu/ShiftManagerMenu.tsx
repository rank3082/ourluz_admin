import "./ShiftManagerMenu.scss"
import React, {useEffect, useMemo, useState} from "react";
import {text} from "../../../../utils/dictionary-management";
import {SelectedUserForShift} from "../selectedUserForShift/SelectedUserForShift";
import {getRollName} from "../../../../utils/general";
import {AddManualEmployee} from "../addManualEmployee/AddManualEmployee";
import {useAppSelector} from "../../../../app/hooks";
import {EventModel} from "../../../../models/event.model";
export const ShiftManagerMenu:React.FC<{selectedEvent:EventModel}>=({selectedEvent})=>{
const {userList,isEnglish,rollList,eventList} = useAppSelector(state => state.global)
    useEffect(()=>{
    setSelectedEventFromList(selectedEvent)
    },[selectedEvent])

    const [selectedEventFromList, setSelectedEventFromList] = useState<EventModel>(selectedEvent);
    const userOfSpecificEvent = useMemo(()=>{
        return selectedEventFromList ?  userList.filter((user) => Object.values(selectedEventFromList?.users).map((userOfEvent) => {
            return userOfEvent.id
        }).includes(user.id)):[];
    },[selectedEventFromList,eventList,selectedEvent])

    const getBookedUsersByRoll = (event: EventModel, rollId: number) => {
        let counter = 0;
        event.users.forEach((user) => {
            if (user.roleId === rollId) {
                counter++;
            }
        })
        return counter
    }

    return <div className={"shiftManagerMenuContainer"}>
        <div className={"selectedEventFromListContainer"}>
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
                        {selectedEventFromList?.capacity.filter((c) => roll.id === c.roleId).map((c, indexC) => {
                            return <React.Fragment key={`${index}a${indexC}`}>
                                <td key={`${index}a${indexC}1`} style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"25%"}} >{rollByUser}</td>
                                <td key={`${index}a${indexC}2`} style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"25%"}} >{c.count}</td>
                                <td key={`${index}a${indexC}3`}style={{color: c.count === rollByUser ? "green" : c.count < rollByUser? "orange":"red",width:"50%"}} > {roll.description} </td>
                            </React.Fragment>
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
        </div>
       <AddManualEmployee setSelectedEventFromList={setSelectedEventFromList} eventId={selectedEventFromList?.id.toString()??""} eventUserList={userOfSpecificEvent.filter((eu)=> {
            const findIndex = selectedEventFromList?.users.findIndex((u) => u.id === eu.id)??-1
            return   selectedEventFromList?.users[findIndex].booked
        })}/>
        {/*<div className={"bookedEmployeesFromListBtn"}>{text.bookedEmployeesFromList}</div>*/}
</div>
}