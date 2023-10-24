import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    deliveryLocation: "",
  },
  reducers: {
    saveLocation: (state, action) => {
      state.deliveryLocation = action.payload;
    },
  },
});

export const { saveLocation } = locationSlice.actions;

export default locationSlice.reducer;
