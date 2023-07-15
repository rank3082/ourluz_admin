import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {store} from "../app/store";
import {EventModel} from "../models/event.model";
import {UserModel} from "../models/user.model";

const {isEnglish} = store.getState().global
export const cacheRtl = createCache({
    key: 'muirtl', stylisPlugins: isEnglish ? [] : [prefixer, rtlPlugin],
});
const getRollList = () => {
    return store.getState().global.rollList
}
const getUsersList = () => {
    return store.getState().global.userList
}

export function isMobileFunction(): boolean {
    const toMatch: RegExp[] = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    if (toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    }) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform))) {
        return true;
    }

    return false;
}

export const getRollName = (rollId: number | null) => {
    return getRollList().find((a) => a.id === rollId)?.description
}
export const getUserById = (userId: number) => {
    return getUsersList().find((u) => u.id === userId)
}
export const isEventHasFullBooking = (event: EventModel|undefined) => {
    let isFullBooked = true
    if (event === undefined ){
        return  false
    }
    event.capacity.forEach((c) => {
        if ( c.count > event.users.filter((us) => us.booked && c.roleId === us.roleId).length) {
            isFullBooked = false
        }
    })
    return isFullBooked
}

export  const checkIfUserIsAvailabilityToEvent=(currentUser:UserModel|undefined,userList:{id:number,booked:boolean,roleId:number | null}[])=>{
    let isAvailable = false
    userList.forEach((u)=>{
        if (u.id === currentUser?.id){
            isAvailable =  true
        }
    })
    return isAvailable
}