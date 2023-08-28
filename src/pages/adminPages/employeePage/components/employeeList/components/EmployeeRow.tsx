import "./EmployeeRow.scss"
import React, {useState} from "react";
import {Icon} from "../../../../../../components/icon/Icon";
import {deleteUser, editBookedUserRoll, unBookedUser} from "../../../../../../utils/data-management";
import {UserModel} from "../../../../../../models/user.model";
import {setEventList, setSelectedEvent, setSelectedPopup} from "../../../../../../store/global.slice";
import {EventModel} from "../../../../../../models/event.model";
import {useDispatch} from "react-redux";
import {getRollName} from "../../../../../../utils/general";
import {Button, Dialog} from "@mui/material";
import {SelectedPopup} from "../../../../../../utils/enum.const";
import {
    ClientEventDetailsDialog
} from "../../../../../mainPanel/components/clientEventDetailsDialog/ClientEventDetailsDialog";
export const EmployeeRow:React.FC<{setSelectedEventFromList:any,isMobile:boolean,user:UserModel,eventUserList?:UserModel[],eventId?:string,eventList:{[p: string]: EventModel},EditUser:any,rollBooked:any}>=({setSelectedEventFromList,isMobile,user,eventUserList,eventId,eventList,EditUser,rollBooked})=>{
const dispatch=useDispatch()

    const [openRollDetails,setOpenRollDetails]=useState(false)
    let currentUsersEventList:{id: number, booked: boolean, roleId:number|null}[] = []
   if (eventId){
     currentUsersEventList =  [...eventList[eventId]?.users];
   }

    const updateUserBooking = async (isActive:boolean, user: UserModel,rollId:number) => {
        if (eventId && currentUsersEventList) {
            console.log(currentUsersEventList,"currentUsersEventList")
            const index = currentUsersEventList.findIndex(item => item.id === user.id);

            if (isActive) {
                if (index !== -1){
                    currentUsersEventList.splice(index, 1);
                }
                currentUsersEventList.push({id: user.id, booked: true, roleId: rollId})
                try {
                    await editBookedUserRoll(parseInt(eventId),user.id,rollId).then((res)=>{
                        console.log(res,"book")
                    })
                }catch (e){
                    console.log(e,"booke")
                }

            } else {
                if (index !== -1) {
                    currentUsersEventList.splice(index, 1);
                  await  unBookedUser(parseInt(eventId),user.id).then((res)=>console.log(res,"unBook"))
                }
            }
            dispatch(setEventList({...eventList, [eventId]: {...eventList[eventId], users: currentUsersEventList}}))
            setSelectedEventFromList({...eventList[eventId], users: currentUsersEventList})
        }

    }
   const [deletePopup,setDeletePopup]=useState(false)

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
                      onClick={() => setDeletePopup(true)}>Delete <Icon
                    name={"close_x"}/></span> </>}
        </div>



            <Dialog
            fullWidth={true}
            onClose={()=> {
                setDeletePopup(false)
            }}
            open={deletePopup}
        >
            <div style={{paddingBlock:"10%",fontSize:20,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div style={{color:"var(alert)",fontWeight:600}}>האם אתה בטוח שברצונך למחוק את </div>
            <div style={{color:"var(alert)",fontWeight:600}}>{`${user.firstName} ${user.lastName}`}</div>
            </div>
            <div style={{display:"flex", justifyContent:"space-around",paddingBlock:"10%"}}>
            <Button style={{backgroundColor:"var(--alert)",color:"var(--white)"}} color={"error"} onClick={()=>deleteUser(user.id)}>מחק יוזר</Button>
            <Button style={{backgroundColor:"var(--primary)",color:"var(--white)"}}  onClick={()=>setDeletePopup(false)}>ביטול</Button>
            </div>
        </Dialog>
    </div>
}