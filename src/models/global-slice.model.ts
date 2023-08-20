import {EventModel} from "./event.model";
import {SelectedPage, SelectedPopup} from "../utils/enum.const";
import {RollModel} from "./roll.model";
import {UserModel} from "./user.model";


export interface GlobalSliceModel {
  isEnglish:boolean
  eventList: { [key:string]: EventModel },
  selectedEvent:EventModel|undefined,
  selectedPopup:SelectedPopup,
  selectedPage:SelectedPage,
  isMobile:boolean,
  rollList:RollModel[],
  userList:UserModel[],
  isAdmin:boolean,
  currentUser:UserModel|undefined,
  slotSelected:{start:Date,end:Date}|undefined,
  weekDates:{ start:string|Date|undefined; end: string|Date|undefined },
  weeklyEventList: { [key:string]: EventModel }
}
