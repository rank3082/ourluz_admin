import React, {Fragment, useMemo, useState} from "react";
import "./EmployeeList.scss"
import {useAppSelector} from "../../../../app/hooks";
import {Icon} from "../../../../components/icon/Icon";
import {Checkbox, Dialog} from "@mui/material";
import {SignUp} from "../signUp/SignUp";
import {UserModel} from "../../../../models/user.model";
import {deleteUser} from "../../../../utils/data-management";
import {text} from "../../../../utils/dictionary-management";
import {setEventList} from "../../../../store/global.slice";
import {useDispatch} from "react-redux";
import {EmployeeRow} from "./components/EmployeeRow";

export const EmployeeList: React.FC<{setSelectedEventFromList?:any, eventUserList?: UserModel[], eventId?: string }> = ({setSelectedEventFromList,eventUserList, eventId}) => {
    const {userList, isMobile, isEnglish, eventList} = useAppSelector(state => state.global)
    const [editPopup, setEditPopup] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserModel>()
    const removeUser = () => {

    }
    const EditUser = (user: UserModel) => {
        setSelectedUser(user)
        setEditPopup(true)

    }
    // const eventUserIdList:string[]|undefined = eventUserList && Object.keys(eventUserList).map((u)=> {
    //   return eventUserList[u].id
    // })
    const closeModal = () => {
        setEditPopup(false)
    }
    console.log(userList, "userList")
    const userListMemo = useMemo(() => {
        return userList
    }, [userList])
    console.log(eventUserList, "eventUserList")
    // const updateUserBooking = (e: any, user: UserModel) => {
    //     console.log(e.target.checked, "checked1")
    //     console.log(user, "checked2")
    //     console.log(eventId, "checked3")
    //     if (eventId) {
    //         const currentUsersEventList = eventList[eventId].users;
    //         if (e.target.checked) {
    //             // currentUsersEventList.push(user)
    //         } else {
    //             const index = currentUsersEventList.findIndex(item => item.id === user.id);
    //             if (index !== -1) {
    //                 currentUsersEventList.splice(index, 1);
    //             }
    //         }
    //         dispatch(setEventList({...eventList, [eventId]: {...eventList[eventId], users: currentUsersEventList}}))
    //     }
    //
    // }
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
                //     <div className={"tableBody"} key={index}>
                //     {!isMobile && <span className={"column1"}>{user.email}</span>}
                //     <span className={"column1"}>{user.lastName} {user.firstName}</span>
                //     {!isMobile && <span className={"column1"}>{user.mobile}</span>}
                //     {!isMobile && <span
                //         className={"column1"}>{user.roleIds.map((r, index) => index === user.roleIds?.length - 1 ? r : `${r},`)}</span>}
                //     <div className={"column1 actionsStyle"}>
                //         {eventUserList ? <div className={"checkWrapper"}>
                //             <Checkbox defaultChecked={eventUserList.includes(user)}
                //                       onChange={(e) => updateUserBooking(e, user)}/>
                //         </div> : <>
                //             <span className={"iconLabel editStyle"} onClick={() => EditUser(user)}> <Icon
                //                 name={"edit"}/>Edit</span>
                //             <span className={"iconLabel deleteStyle"}
                //                   onClick={() => deleteUser(user.id)}>Delete <Icon
                //                 name={"close_x"}/></span> </>}
                //     </div>
                // </div>
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