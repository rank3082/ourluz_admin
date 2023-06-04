import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";
import {EventModel} from "../models/event.model";
import {SelectedPopup} from "../utils/enum.const";
import {RollModel} from "../models/roll.model";


const initialState: GlobalSliceModel = {
    isEnglish: false,
    selectedPopup:SelectedPopup.Close,
    eventList:{},
    rollList:[],
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
        setRollList: (state, action: PayloadAction<RollModel[] >) => {
            state.rollList = action.payload;
        },
    },
});

export const {
    setIsEnglish,
    setEventList,
    setSelectedEvent,
    setSelectedPopup,
    setIsMobile,
    setRollList
} = globalSlice.actions;

export default globalSlice.reducer;
