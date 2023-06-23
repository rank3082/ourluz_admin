import axios from "axios";
import {store} from "../app/store";
import {setEventList, setRollList, setUserList} from "../store/global.slice";
import {mainPath} from "./variable.const";
import {EventModel} from "../models/event.model";
import {CapacityModel} from "../models/capacity.model";
import {RollModel} from "../models/roll.model";
import {UserModel} from "../models/user.model";

const getToken = () => {
    return store.getState().authentication.token
}
const getAllUsersRedux = () => {
    return store.getState().global.userList
}



export const deleteUser = async (userId: number) => {
    const allUsers = getAllUsersRedux()
    try {
        await axios.delete(`${mainPath}yoman/users/${userId}`,{ headers: {
                Authorization: `TOKEN ${getToken()}`
            }});
     const newUsersList:UserModel[] = []
         allUsers.forEach((u)=>{
            if (u.id !== userId){
                newUsersList.push(u);
            }
        })
        store.dispatch(setUserList(newUsersList))
    } catch (e) {
        console.log(e, "error")
    }
}

export const updateUserById = async (userDetails: {
    firstName: string, lastName: string, email: string, mobile: string, roleIds: number[],id:number
})=>{
   const allUsers = getAllUsersRedux()
    try {
        const response = await axios.put(`${mainPath}yoman/users/${userDetails.id}`, {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            mobile: userDetails.mobile,
            roleIds: userDetails.roleIds,
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }});
        console.log(response)

        const newUserList = allUsers.map((u,index)=>{
            if (u.id === userDetails.id){
                return {...u,firstName:userDetails.firstName,lastName:userDetails.lastName,email:userDetails.email,mobile:userDetails.mobile,roleIds:userDetails.roleIds}
            }else {
                return u
            }
        })
        store.dispatch(setUserList(newUserList))
    } catch (e) {
        console.log(e, "error")
    }
}

export const createNewUser = async (newUserDetails: {
    username: string, password: string, firstName: string, lastName: string, email: string,mobile:string,roleIds:number[]
}) => {
    console.log(newUserDetails,"newUserDetails")
    try {
        const response = await axios.post(`${mainPath}yoman/users/`, {
            username: newUserDetails.username,
            password: newUserDetails.password,
            firstName: newUserDetails.firstName,
            lastName: newUserDetails.lastName,
            email: newUserDetails.email,
            mobile:newUserDetails.mobile,
            roleIds:newUserDetails.roleIds,
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }
        });
        const newUser:UserModel=response.data.user;
        const allUsers:UserModel[] = getAllUsersRedux()
        if (newUser){
        const newUserList:UserModel[] = [...allUsers, newUser];
            console.log(newUserList,"newUserList")
            store.dispatch(setUserList(newUserList))
        }

    } catch (e) {
        console.log(e, "error")
    }
}



export const getAllUsers = async () => {
    console.log(getToken(), "getToken")
    axios.get(`${mainPath}yoman/users/`, {
        headers: {
            Authorization: `TOKEN ${getToken()}`
        }
    })
        .then(response => {
            const data = response.data.users;
            console.log(data,"resssss")
            store.dispatch(setUserList(data))
        })
        .catch(error => {
            console.error(error);
        });
};

export const getAllEventsByOrganization = async () => {
    console.log(getToken(), "getToken")
    axios.get(`${mainPath}yoman/events?fromDate=2023-06-03&toDate=2023-06-29`, {
        headers: {
            Authorization: `TOKEN ${getToken()}`
        }
    })
        .then(response => {
            const data = response.data.events;
            let getEventList: { [key: string]: EventModel } = {}
            data.forEach((eventObj: any) => {
                getEventList[eventObj.id] = {
                    id: eventObj.id,
                    description: eventObj.description,
                    start: eventObj.startDate,
                    end: eventObj.endDate,
                    location: eventObj.location,
                    backgroundColor: `${eventObj.backgroundColor}`,
                    allDay: true,
                    organizationId: eventObj.organizationId,
                    capacity:eventObj.capacity,
                    users:eventObj.users
                }
            })
            store.dispatch(setEventList(getEventList))
        })
        .catch(error => {
            console.error(error);
        });
};

export const updateEventById = async (eventId: number, newList: any, eventData: {
    description: string, startDate: Date, endDate: Date, backgroundColor: string, location: string,capacity:CapacityModel[]
}) => {
    try {
        const response = await axios.put(`${mainPath}yoman/events/${eventId}`, {
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            backgroundColor: eventData.backgroundColor,
            location: eventData.location,
            capacity:eventData.capacity
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }});
        console.log(response)

        newList[eventId] = {
            ...newList[eventId],
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            backgroundColor: eventData.backgroundColor,
            location: eventData.location,
            capacity:eventData.capacity
        }
        store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error")
    }
}

export const createNewEvent = async (newList: any, eventData: {
    description: string, startDate: Date, endDate: Date, backgroundColor: string, location: string,capacity:CapacityModel[]
}) => {
    try {
        const response = await axios.post(`${mainPath}yoman/events`, {
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            backgroundColor: eventData.backgroundColor,
            location: eventData.location,
            capacity:eventData.capacity
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }
        });
        newList[response.data.id] = {...response.data, start: response.data.startDate, end: response.data.endDate}
        store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error")
    }
}






export const deleteEvent = async (newList: any, eventId: number) => {
    try {
        await axios.delete(`${mainPath}yoman/events/${eventId}`,{ headers: {
                Authorization: `TOKEN ${getToken()}`
            }});
        delete newList[eventId]
        store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error")
    }
}


export const getAllRolesByOrganization = async () => {
    console.log(getToken(), "getToken")
    axios.get(`${mainPath}yoman/roles`, {
        headers: {
            Authorization: `TOKEN ${getToken()}`
        }
    })
        .then(response => {
            const data = response.data.roles;
            let rollList: RollModel[] = data
            // data.forEach((rollObj: any) => {
            //
            // })
            store.dispatch(setRollList(rollList))
        })
        .catch(error => {
            console.error(error);
        });
};

export const editBookedUserRoll = async (eventId: number, userId: number, roleId: number) => {
    console.log(eventId,userId,roleId,"im here 5")
    try {
        const response = await axios.post(`${mainPath}yoman/bocks/`, {
            eventId: eventId,
            userId: userId,
            roleId: roleId,
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }
        });
        console.log(response,"response")

        // newList[response.data.id] = {...response.data, start: response.data.startDate, end: response.data.endDate}
        // store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error3")
    }
}
export const unBookedUser = async (eventId: number, userId: number) => {
    try {
        const response = await axios.patch(`${mainPath}yoman/bocks/`, {
            eventId: eventId,
            userId: userId,
        },{
            headers: {
                Authorization: `TOKEN ${getToken()}`
            }
        });
        console.log(response,"response")
        // newList[response.data.id] = {...response.data, start: response.data.startDate, end: response.data.endDate}
        // store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error")
    }
}