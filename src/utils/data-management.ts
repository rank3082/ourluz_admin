import axios from "axios";
import {store} from "../app/store";
import {setEventList} from "../store/global.slice";
import {mainPath} from "./variable.const";
import {EventModel} from "../models/event.model";

export const getAllEventsByOrganization = async () => {
    axios.get(`${mainPath}yoman/?organizationId=1`)
        .then(response => {
            const data = response.data.events;
            let getEventList:{ [key:string]: EventModel } = {}
            data.forEach((eventObj:any)=>{
                getEventList[eventObj.id]=
                        {
                        id:eventObj.id,
                        description: eventObj.description,
                        start: eventObj.startDate,
                        end: eventObj.endDate,
                        location: eventObj.location,
                        backgroundColor: `#${eventObj.backgroundColor}`,
                        allDay: true,
                        organizationId:eventObj.organizationId
                        }
            })
            store.dispatch(setEventList(getEventList))
        })
        .catch(error => {
            console.error(error);
        });
};