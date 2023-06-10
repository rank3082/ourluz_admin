import React, {Fragment, useMemo, useState} from "react";
import "./EmployeeList.scss"
import {useAppSelector} from "../../../../app/hooks";
import {Icon} from "../../../../components/icon/Icon";
import {Dialog} from "@mui/material";
import {SignUp} from "../signUp/SignUp";
import {UserModel} from "../../../../models/user.model";
import {deleteUser} from "../../../../utils/data-management";
import {text} from "../../../../utils/dictionary-management";

export const EmployeeList = () => {
    const {userList, isMobile, isEnglish} = useAppSelector(state => state.global)
    const [editPopup, setEditPopup] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserModel>()
    const removeUser = () => {

    }
    const EditUser = (user: UserModel) => {
        setSelectedUser(user)
        setEditPopup(true)

    }
    const closeModal = () => {
        setEditPopup(false)
    }
    console.log(userList,"userList")
const userListMemo= useMemo(()=>{return userList},[userList])
    return <>
        <div className={"employeeListContainer"}>
            <div className={"employeeListLabels"}>
                {!isMobile && <div className={"column1"}>email</div>}
                <div className={"column1"}>name</div>
                {!isMobile && <div className={"column1"}>mobile</div>}
                {!isMobile && <div className={"column1"}>roles</div>}
                <div className={"column1"}>actions</div>
            </div>
            {userListMemo.map((user, index) => (<div className={"tableBody"} key={index}>
                    {!isMobile && <span className={"column1"}>{user.email}</span>}
                    <span className={"column1"}>{user.lastName} {user.firstName}</span>
                    {!isMobile && <span className={"column1"}>{user.mobile}</span>}
                    {!isMobile && <span
                        className={"column1"}>{user.roleIds.map((r, index) => index === user.roleIds?.length - 1 ? r : `${r},`)}</span>}
                    <div className={"column1 actionsStyle"}>
                        <span className={"iconLabel editStyle"} onClick={() => EditUser(user)}> <Icon name={"edit"}/>Edit</span>
                        <span className={"iconLabel deleteStyle"} onClick={() => deleteUser(user.id)}>Delete <Icon
                            name={"close_x"}/></span>
                    </div>
                </div>))}
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