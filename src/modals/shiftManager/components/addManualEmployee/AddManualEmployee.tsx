import "./AddManualEmployee.scss"
import React, {useState} from "react";
import {text} from "../../../../utils/dictionary-management";
import {EmployeeList} from "../../../../pages/employeePage/components/employeeList/EmployeeList";
import {Dialog} from "@mui/material";
import {Icon} from "../../../../components/icon/Icon";
import {SignUp} from "../../../../pages/employeePage/components/signUp/SignUp";
import {useAppSelector} from "../../../../app/hooks";
import {UserModel} from "../../../../models/user.model";

export const AddManualEmployee:React.FC<{setSelectedEventFromList:any,eventUserList:UserModel[],eventId:string}> = ({setSelectedEventFromList,eventUserList,eventId}) => {
    const {isEnglish} = useAppSelector(state => state.global)
    const [openEmployeePopup,setEmployeePopup]=useState(false)
    return <div className={"addManualEmployeeContainer"}>
        <div onClick={()=>setEmployeePopup(!openEmployeePopup)}
             style={{backgroundColor:openEmployeePopup?"var(--grey-active)":"var(--ui-grey)", boxShadow:openEmployeePopup?"0 0 20px 1px var(--dark)":"none"}}
             className={"bookedEmployeesFromListBtn"}>
            {text.addManuelEmployee}
        </div>
        {openEmployeePopup && <div>
            <Dialog
                maxWidth={false}
                open={true}
                    onClose={() => setEmployeePopup(false)}
            >

                <div className={"employeeDialogContainer"}>
                    <div className={"dialogHeader"}>
                        <div
                            onClick={()=>setEmployeePopup(false)}
                             className={"closeX"}>
                            <Icon name={"close_x"}/>
                        </div>
                    </div>
                    <EmployeeList setSelectedEventFromList={setSelectedEventFromList} eventUserList={eventUserList} eventId={eventId}/>

                    {/*<div*/}
                    {/*    style={{direction: isEnglish ? "ltr" : "rtl"}}>*/}
                    {/*    {text.userDetailsId} , {text.userId} {selectedUser?.id}</div>*/}
                    {/*<SignUp isEditMode selectedUser={selectedUser} closeDialog={closeModal}/>*/}
                </div>
            </Dialog>
        </div>}
    </div>
}