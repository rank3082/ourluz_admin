import {EventModel} from "./event.model";
import {SelectedPopup} from "../utils/enum.const";


export interface GlobalSliceModel {
  isEnglish:boolean
  eventList: { [key:string]: EventModel },
  selectedEvent:EventModel|undefined,
  selectedPopup:SelectedPopup
  isMobile:boolean
}
