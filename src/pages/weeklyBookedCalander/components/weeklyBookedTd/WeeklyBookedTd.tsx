import "./WeeklyBookedTd.scss"
import React from "react";
import {EventModel} from "../../../../models/event.model";
import moment from "moment/moment";
import {getUserById} from "../../../../utils/general";
import {Icon} from "../../../../components/icon/Icon";
export const WeeklyBookedTd:React.FC<{dayOfWeek:number,eventDetails:EventModel}>=({dayOfWeek,eventDetails})=>{
    const dayOfStartWeek = moment(eventDetails.start).weekday();
    const dayOfEndWeek = moment(eventDetails.start).weekday();
    const getUserName = (userId:number)=>{
        return userId ?`${getUserById(userId)?.lastName} ${getUserById(userId)?.firstName}`:""
    }
    const bookedEvent = dayOfWeek >= dayOfStartWeek && dayOfWeek <=dayOfEndWeek;
    const getRollIcon = (rollId: number | null) => {
        switch (rollId) {
            case 1: {
                return <Icon name={"manager"}/>
            }
            case 2: {
                return <Icon name={"computerMan"}/>
            }
            case 3: {
                return <Icon name={"driver"}/>
            }
            default : {
                return <Icon name={"regularEmployee"}/>
            }
        }
        // return getRollList().find((a) => a.id === rollId)?.description
    }
    return <td style={{borderInline:bookedEvent?"2px solid":"none",backgroundColor: bookedEvent?eventDetails.backgroundColor:"#F8F8F8"}} className={"tdStyle"}>
       <div style={{display:"flex",flexDirection:"column",gap:5}}>


        {bookedEvent? eventDetails.users.map((u,index)=>{
            return <div key={`${dayOfWeek}_${index}`} style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                {getUserName(u.id)}
                </div>
                <div style={{backgroundColor:"var(--white)",borderRadius:50}}>
            {getRollIcon(u.roleId)}
                </div>
            </div>
        }):""}
       </div></td>

}