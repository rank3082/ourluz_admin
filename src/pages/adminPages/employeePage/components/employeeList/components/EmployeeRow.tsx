import "./EmployeeRow.scss"
import React, {useState} from "react";
import {Icon} from "../../../../../../components/icon/Icon";
import {deleteUser, editBookedUserRoll, unBookedUser} from "../../../../../../utils/data-management";
import {UserModel} from "../../../../../../models/user.model";
import {setEventList} from "../../../../../../store/global.slice";
import {EventModel} from "../../../../../../models/event.model";
import {useDispatch} from "react-redux";
import {getRollName} from "../../../../../../utils/general";
export const EmployeeRow:React.FC<{setSelectedEventFromList:any,isMobile:boolean,user:UserModel,eventUserList?:UserModel[],eventId?:string,eventList:{[p: string]: EventModel},EditUser:any,rollBooked:any}>=({setSelectedEventFromList,isMobile,user,eventUserList,eventId,eventList,EditUser,rollBooked})=>{
const dispatch=useDispatch()

    const [openRollDetails,setOpenRollDetails]=useState(false)
    let currentUsersEventList:{id: number, booked: boolean, roleId:number|null}[] = []
   if (eventId){
     currentUsersEventList =  [...eventList[eventId]?.users];
   }

    const updateUserBooking = (isActive:boolean, user: UserModel,rollId:number) => {
        console.log(user, "checked2")
        console.log(eventId, "checked3")
        if (eventId && currentUsersEventList) {
            console.log(currentUsersEventList,"currentUsersEventList")
            const index = currentUsersEventList.findIndex(item => item.id === user.id);

            if (isActive) {
                if (index !== -1){
                    currentUsersEventList.splice(index, 1);
                }
                currentUsersEventList.push({id: user.id, booked: true, roleId: rollId})
                editBookedUserRoll(parseInt(eventId),user.id,rollId).then()
            } else {
                if (index !== -1) {
                    currentUsersEventList.splice(index, 1);
                    unBookedUser(parseInt(eventId),user.id).then()
                }
            }
            dispatch(setEventList({...eventList, [eventId]: {...eventList[eventId], users: currentUsersEventList}}))
            setSelectedEventFromList({...eventList[eventId], users: currentUsersEventList})
        }

    }

    return   <div className={"tableBody"}>
        {!isMobile && <span className={"column1"}>{user.email}</span>}
        <span className={"column1"}>{user.lastName} {user.firstName}</span>
        {!isMobile && <span className={"column1"}>{user.mobile}</span>}
        {!isMobile && <div  className={" column1"}>
            <div onClick={()=>setOpenRollDetails(!openRollDetails)} className={"rollWrapper"}>
            <span style={{fontWeight:700,color:openRollDetails?"var(--primary)":"var(--dark)"}}>{user.roleIds.map((r, index) => index === user.roleIds?.length - 1 ? r : `${r},`)}</span>
            <div className={openRollDetails?"eyeIconOpen":"eyeIconClose"}><Icon name={openRollDetails? "open_eye":"close_eye"}/></div>
            </div>
                {openRollDetails && <div style={{borderBottom:"1px solid var(--primary)"}}>{user.roleIds.map((ur,indexKey)=>{
                    const isActive = rollBooked.toString() === ur.toString();
                  return   <div key={`a${indexKey}`} onClick={()=>updateUserBooking(!isActive,user,ur)} style={{color:isActive?"var(--primary)":"var(--dark)"}} className={"rollName"}>{getRollName(ur)}</div>
                })}</div>}
        </div>

        }
        <div className={"column1 actionsStyle"}>
            {eventUserList && eventId ? <div onClick={()=>setOpenRollDetails(!openRollDetails)} className={"checkWrapper"}>
                {eventUserList.includes(user)  ? <Icon name={"check"}/>:<div></div>}
            </div>
                : <>
                            <span className={"iconLabel editStyle"} onClick={() => EditUser(user)}> <Icon
                                name={"edit"}/>Edit</span>
                <span className={"iconLabel deleteStyle"}
                      onClick={() => deleteUser(user.id)}>Delete <Icon
                    name={"close_x"}/></span> </>}
        </div>

    </div>
}