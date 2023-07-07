import "./SelectedUserForShift.scss"
import React, {useState} from "react";
import {UserModel} from "../../../../models/user.model";
import {RollModel} from "../../../../models/roll.model";
import {RowOfRoll} from "../rowOfRoll/RowOfRoll";
import {Icon} from "../../../../components/icon/Icon";
import {EventModel} from "../../../../models/event.model";
import {editBookedUserRoll, unBookedUser} from "../../../../utils/data-management";
import {useAppSelector} from "../../../../app/hooks";
import {setEventList} from "../../../../store/global.slice";
import {useDispatch} from "react-redux";
export const SelectedUserForShift:React.FC<{setSelectedEventFromList:any,selectedEventFromList:EventModel,rollList:RollModel[],eventUser:{ id: number; booked: boolean; roleId: number|null}, userFromList:UserModel,getRollName:any}>=({setSelectedEventFromList,selectedEventFromList,rollList,eventUser,userFromList,getRollName})=>{
   const [openRollList,setOpenRollList]=useState(false)
    const {eventList} = useAppSelector(state => state.global)
   const dispatch=useDispatch()
    const updateRoll = (roll:RollModel) =>{
        console.log(selectedEventFromList,"selectedEventFromList")
        const newSelectedUsers:{id: number, booked: boolean, roleId: number|null}[] = selectedEventFromList.users.map((u)=>{
            if (u.id === eventUser.id){
                if (u.roleId === roll.id){
                    unBookedUser(selectedEventFromList.id,u.id).then()
                }else {
                    editBookedUserRoll(selectedEventFromList.id,u.id,roll.id).then()
                }
                return {...u,roleId: u.roleId === roll.id ? null:roll.id,booked:(u.roleId !== roll.id)}

            }
               return u
        })
        setSelectedEventFromList({...selectedEventFromList,users:newSelectedUsers})
        dispatch(setEventList({...eventList, [selectedEventFromList.id]: {...selectedEventFromList, users: newSelectedUsers}}))
   }
    return <div>
        <div onClick={()=>setOpenRollList(!openRollList)} className={`eventUserList  ${eventUser.booked ?"bookedUser":"unBookedUser"}`}>
            <div className={"arrowDropDown"}><Icon name={openRollList?"dropdown_chevron_down":"dropdown_chevron_up"}/></div>
            <div>{userFromList.firstName} {userFromList.lastName} {eventUser.booked && "-"} {eventUser.booked && getRollName(eventUser?.roleId)}</div>

        </div>

        {openRollList && <div>
            {rollList.filter((r)=>userFromList.roleIds.includes(r.id)).map((roll,index)=>{
                return <div onClick={()=>updateRoll(roll)} key={index} >
                    <RowOfRoll roll={roll} selectedRoll={eventUser.roleId}/>
                </div>
            })}
           </div>}
    </div>

}