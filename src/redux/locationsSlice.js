import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const locationsURL = 'https://frontend-take-home-service.fetch.com/dogs/locations';
const locationsSearchURL = 'https://frontend-take-home-service.fetch.com/dogs/locations/search';



const initialState = {
    locations: [],
    locationsSearch: {},
}

export const locations = createAsyncThunk('locationss/ZIP_CODES', async (searchArray) => {
    console.log(searchArray, 'in locations in locationSlice')
    const response = await fetch(locationsURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchArray),
        credentials: 'include',
    })

    if(response.ok){
        const data = await response.json()
        console.log(data, 'dog details')
        return data;
    }
})

export const postSearchLocations = createAsyncThunk('locationss/ZIP_DETAILS', async (searchArray) => {
    console.log(searchArray, 'in postSearchLcocations in locationSlice')
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
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(locations.fulfilled, (state, action)=> {
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

export const postLocations = (state) => state.locations.locations;
export const searchLocations = (state) => state.locations.searchlocations;

// export const { addBreeds, addSearch  } = locationsSlice.actions

export default locationsSlice.reducer
