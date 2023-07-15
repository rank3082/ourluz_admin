import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";
import {EventModel} from "../models/event.model";
import {SelectedPage, SelectedPopup} from "../utils/enum.const";
import {RollModel} from "../models/roll.model";
import {UserModel} from "../models/user.model";


const initialState: GlobalSliceModel = {
    isEnglish: false,
    selectedPopup:SelectedPopup.Close,
    selectedPage:SelectedPage.MainPanel,
    eventList:{},
    rollList:[],
    selectedEvent:undefined,
    isMobile:false,
    userList:[],
    isAdmin:false,
    currentUser:undefined
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
        setSelectedPage: (state, action: PayloadAction< SelectedPage >) => {
            state.selectedPage = action.payload;
        },
        setIsMobile: (state, action: PayloadAction< boolean >) => {
            state.isMobile = action.payload;
        },
        setRollList: (state, action: PayloadAction<RollModel[] >) => {
            state.rollList = action.payload;
        },
        setUserList: (state, action: PayloadAction<UserModel[] >) => {
            state.userList = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<UserModel|undefined>) => {
            state.currentUser = action.payload;
        },
    },
});

export const {
    setIsEnglish,
    setEventList,
    setSelectedEvent,
    setSelectedPopup,
    setSelectedPage,
    setIsMobile,
    setRollList,
    setUserList,
    setIsAdmin,
    setCurrentUser
} = globalSlice.actions;

export default globalSlice.reducer;
