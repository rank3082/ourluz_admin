import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";


const initialState: GlobalSliceModel = {
  isEventDetailPopupOpen:true
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setEventDetailPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isEventDetailPopupOpen = action.payload;
    },
  },
});

export const {
  setEventDetailPopupOpen
} = globalSlice.actions;

export default globalSlice.reducer;
