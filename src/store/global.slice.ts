import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";
import {EventModel} from "../models/event.model";


const initialState: GlobalSliceModel = {
  isEventDetailPopupOpen:true,
  eventList:{
      id1:{
    start: new Date(),
    end: new Date(),
    description: 'event 2',
    location: 'San Francisco',
    color: "blue",
    allDay: true
  },
   id2: {
    start: new Date("2023-05-13 12:00"),
    end: new Date("2023-05-13 17:00"),
    description: 'event 3',
    location: 'San Francisco',
    color: "red",
    allDay: true

  },
    id3:{
    start: new Date("2023-05-13 20:00"),
    end: new Date("2023-05-13 23:00"),
    description: 'event 22',
    location: 'San Francisco',
    color: "red",
    allDay: false
  }}
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setEventDetailPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isEventDetailPopupOpen = action.payload;
    },
      setEventList: (state, action: PayloadAction<{ [key: string]: EventModel }>) => {
      state.eventList = action.payload;
    },
  },
});

export const {
  setEventDetailPopupOpen,
    setEventList
} = globalSlice.actions;

export default globalSlice.reducer;
