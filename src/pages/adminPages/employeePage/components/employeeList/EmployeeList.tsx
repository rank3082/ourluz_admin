import React, {Fragment, useMemo, useState} from "react";
import "./EmployeeList.scss"
import {useAppSelector} from "../../../../../app/hooks";
import {Icon} from "../../../../../components/icon/Icon";
import { Dialog} from "@mui/material";
import {SignUp} from "../signUp/SignUp";
import {UserModel} from "../../../../../models/user.model";
import {text} from "../../../../../utils/dictionary-management";
import {EmployeeRow} from "./components/EmployeeRow";

export const EmployeeList: React.FC<{setSelectedEventFromList?:any, eventUserList?: UserModel[], eventId?: string }> = ({setSelectedEventFromList,eventUserList, eventId}) => {
    const {userList, isMobile, isEnglish, eventList} = useAppSelector(state => state.global)
    const [editPopup, setEditPopup] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserModel>()

    const EditUser = (user: UserModel) => {
        setSelectedUser(user)
        setEditPopup(true)

    }

    const closeModal = () => {
        setEditPopup(false)
    }
    const userListMemo = useMemo(() => {
        const sortedUserList = [...userList].sort((a:UserModel,b:UserModel)=> {
            const lastNameComparison = a.lastName.localeCompare(b.lastName);

            if (lastNameComparison === 0) {
                return a.firstName.localeCompare(b.firstName);
            }

            return lastNameComparison;
        })
        return sortedUserList
    }, [userList])

    const getRollIdByUserAndEventId = (user:UserModel)=>{
        if (eventId){
            const userIndex = eventList[eventId].users.findIndex((u)=>u.id === user.id)
            return eventList[eventId].users[userIndex]?.roleId ?? -1
        }else {
        return -1
        }
    }
    return <>
        <div className={"employeeListContainer"}>
            <div className={"employeeListLabels"}>
                {!isMobile && <div className={"column1"}>email</div>}
                <div className={"column1"}>name</div>
                {!isMobile && <div className={"column1"}>mobile</div>}
                {!isMobile && <div className={"column1"}>roles</div>}
                <div className={"column1"}>actions</div>
            </div>

            {userListMemo.map((user, index) => {
                return (<EmployeeRow setSelectedEventFromList={setSelectedEventFromList} key={index} isMobile={isMobile} user={user} eventUserList={eventUserList} eventId={eventId} eventList={eventList} EditUser={EditUser} rollBooked={getRollIdByUserAndEventId(user)}/>
                )
            })}
        </div>

        <Dialog open={editPopup} onClose={() => setEditPopup(false)}>
            <div className={"dialogContainer"}>
                <div>
                    <div onClick={closeModal} className={"closeX"}>
                        <Icon name={"close_x"}/>
                    </div>
                </div>
                <div
                    style={{direction: isEnglish ? "ltr" : "rtl"}}>{text.userDetailsId} , {text.userId} {selectedUser?.id}</div>
                <SignUp isEditMode selectedUser={selectedUser} closeDialog={closeModal}/>
            </div>
        </Dialog>
    </>

}