import {EventModel} from "./event.model";


export interface GlobalSliceModel {
  isEventDetailPopupOpen:boolean,
  eventList: { [key:string]: EventModel }
}
