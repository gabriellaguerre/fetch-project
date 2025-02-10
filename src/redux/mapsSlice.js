import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const mapsSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
  },
});

export const location = (state)=>state.maps.location
export const zoom = (state)=>state.maps.zoom
export const { setLocation, setZoom } = mapsSlice.actions;
export default mapsSlice.reducer;
