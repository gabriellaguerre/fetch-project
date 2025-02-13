import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const locationsURL = 'https://frontend-take-home-service.fetch.com/locations';
const locationsSearchURL = 'https://frontend-take-home-service.fetch.com/locations/search';
export const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const initialState = {
    locations: [],
    locationsSearch: {},
    geoBounding: {},
    status: 'idle',
    error: null,
}

export const postLocations = createAsyncThunk('locations/ZIP_CODES', async (searchArray) => {
    console.log(searchArray, 'in locations in locationSlice')

    const response = await fetch(locationsURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchArray),
        credentials: 'include',
    })
    console.log(response, 'response')
    if(response.ok){
        const data = await response.json()
        console.log(data, 'locations')
        return data;
    }
})

export const postSearchLocations = createAsyncThunk('locations/ZIP_DETAILS', async (searchArray) => {
    console.log(searchArray, 'in postSearchLcocations in locationSlice')
    const response = await fetch(locationsSearchURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchArray),
        credentials: 'include',
    })
    console.log(response, 'response in postsearchlocation function')
    if(response.ok){
        const data = await response.json()
        console.log(data, 'data in locationSlice line 45')
        return data;
    }
})


const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
         addGeoBoundingData(state,action){
            console.log(action.payload, 'action payload in location slice line 54')
            state.geoBounding = action.payload
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
                state.locationsSearch = action.payload;
                console.log(action.payload, 'in postSearchLocations')
                state.status = 'succeeded';
                state.error = null;
            })


    }

})

export const allLocations = (state) => state.locations.locations;
export const searchLocations = (state) => state.locations.locationsSearch;
export const geoBoundingData = (state) => state.locations.geoBounding;

export const { addGeoBoundingData  } = locationsSlice.actions;

export default locationsSlice.reducer;
