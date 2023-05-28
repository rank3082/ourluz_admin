import axios from "axios";
import {store} from "../app/store";
import {setEventList} from "../store/global.slice";
import {mainPath} from "./variable.const";
import {EventModel} from "../models/event.model";

const getToken = () => {
    return store.getState().authentication.token
}

export const getAllEventsByOrganization = async () => {
    console.log(getToken(), "getToken")
    axios.get(`${mainPath}yoman/?organizationId=1`, {
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
                    organizationId: eventObj.organizationId
                }
            })
            store.dispatch(setEventList(getEventList))
        })
        .catch(error => {
            console.error(error);
        });
};

export const updateEventById = async (eventId: number, newList: any, eventData: {
    description: string, startDate: Date, endDate: Date, backgroundColor: string, location: string
}) => {
    try {
        const response = await axios.put(`${mainPath}yoman/${eventId}`, {
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            backgroundColor: eventData.backgroundColor,
            location: eventData.location
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
            location: eventData.location
        }
        store.dispatch(setEventList(newList))
        // setData(response.data);
    } catch (e) {
        console.log(e, "error")
    }
}

export const createNewEvent = async (newList: any, eventData: {
    description: string, startDate: Date, endDate: Date, backgroundColor: string, location: string
}) => {
    try {
        const response = await axios.post(`${mainPath}yoman/?organizationId=1`, {
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            backgroundColor: eventData.backgroundColor,
            location: eventData.location
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
        await axios.delete(`${mainPath}yoman/${eventId}`,{ headers: {
                Authorization: `TOKEN ${getToken()}`
            }});
        delete newList[eventId]
        store.dispatch(setEventList(newList))
    } catch (e) {
        console.log(e, "error")
    }
}