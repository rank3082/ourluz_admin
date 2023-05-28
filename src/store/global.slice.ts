import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";
import {EventModel} from "../models/event.model";
import {SelectedPopup} from "../utils/enum.const";


const initialState: GlobalSliceModel = {
    isEnglish: false,
    selectedPopup:SelectedPopup.Close,
    eventList:{},
    // eventList: {
    //     id1: {
    //         start: new Date(),
    //         end: new Date(),
    //         description: 'event 2',
    //         location: 'San Francisco',
    //         backgroundColor: "blue",
    //         allDay: true
    //     }, id2: {
    //         start: new Date("2023-05-13 12:00"),
    //         end: new Date("2023-05-13 17:00"),
    //         description: 'event 3',
    //         location: 'San Francisco',
    //         backgroundColor: "red",
    //         allDay: true
    //
    //     }, id3: {
    //         start: new Date("2023-05-13 20:00"),
    //         end: new Date("2023-05-13 23:00"),
    //         description: 'event 22',
    //         location: 'San Francisco',
    //         backgroundColor: "red",
    //         allDay: false
    //     }
    // },
    selectedEvent:undefined,
    isMobile:false
};
export const globalSlice = createSlice({
    name: "global", initialState: initialState, reducers: {
        setIsEnglish: (state, action: PayloadAction<boolean>) => {
            state.isEnglish = action.payload;
        },
        setEventList: (state, action: PayloadAction<{ [key: string]: EventModel }>) => {
            state.eventList = action.payload;
        },
        setSelectedEvent: (state, action: PayloadAction< EventModel|undefined >) => {
            state.selectedEvent = action.payload;
        },
        setSelectedPopup: (state, action: PayloadAction< SelectedPopup >) => {
            state.selectedPopup = action.payload;
        },
        setIsMobile: (state, action: PayloadAction< boolean >) => {
            state.isMobile = action.payload;
        },
    },
});

export const {
    setIsEnglish,
    setEventList,
    setSelectedEvent,
    setSelectedPopup,
    setIsMobile
} = globalSlice.actions;

export default globalSlice.reducer;
