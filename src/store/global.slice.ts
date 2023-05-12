import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";


const initialState: GlobalSliceModel = {
  isWork:false
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setIsWork: (state, action: PayloadAction<boolean>) => {
      state.isWork = action.payload;
    },
  },
});

export const {
  setIsWork
} = globalSlice.actions;

export default globalSlice.reducer;
