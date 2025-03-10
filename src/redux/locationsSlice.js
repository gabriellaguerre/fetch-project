import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const locationsURL = 'https://frontend-take-home-service.fetch.com/locations';
const locationsSearchURL = 'https://frontend-take-home-service.fetch.com/locations/search';
export const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const initialState = {
    locations: [],
    locationsSearch: [],
    geoBounding: {},
    status: 'idle',
    error: null,
}

//*****************************************POST /locations************************************* */

export const postLocations = createAsyncThunk('locations/ZIP_CODES', async (searchArray) => {

    const response = await fetch(locationsURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchArray),
        credentials: 'include',
    })

    if(response.ok){
        const data = await response.json()
        return data;
    }
})

//*************************************POST /locations/search******************************************** */

export const postSearchLocations = createAsyncThunk('locations/ZIP_DETAILS', async (searchArray) => {
    // console.log(searchArray, 'in postSearchLcocations in locationSlice')
    const response = await fetch(locationsSearchURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchArray),
        credentials: 'include',
    })
    if(response.ok){
        const data = await response.json()
        return data;
    }
})


const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
         addGeoBoundingData(state,action){
            state.geoBounding = action.payload
         },
         clearZCLocations(state) {
            state.locations = []
         },
         clearLocationsSearch(state) {
            state.locationsSearch = []
         },
         clearGeoBounding(state){
            state.geoBounding = {}
         },
         clearAllLocationData(state) {
            state.locations = []
            state.locationsSearch = []
            state.geoBounding = {}
         }
    },
    extraReducers(builder) {
        builder
            .addCase(postLocations.fulfilled, (state, action)=> {
                state.locations = action.payload;
                state.status = 'succeeded';
                state.error = null;

            })

            .addCase(postSearchLocations.fulfilled, (state, action)=> {
                state.locationsSearch.push(...action.payload.results);
                state.status = 'succeeded';
                state.error = null;
            })


    }

})

export const allLocations = (state) => state.locations.locations;
export const searchLocations = (state) => state.locations.locationsSearch;
export const geoBoundingData = (state) => state.locations.geoBounding;

export const { addGeoBoundingData, clearZCLocations, clearLocationsSearch, clearGeoBounding, clearAllLocationData } = locationsSlice.actions;

export default locationsSlice.reducer;
