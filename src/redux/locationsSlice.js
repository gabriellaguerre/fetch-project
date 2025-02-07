import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const locationsURL = 'https://frontend-take-home-service.fetch.com/dogs/locations';



const initialState = {
    location: [],
    search: {},
    locationsDetail: [],
    match: {},
}

  export const locations = createAsyncThunk('locations/ZIP_CODES', async () => {
    
    const response = await fetch(locationsURL, {
    headers: {"Content-Type": "application/json",},
    credentials: 'include',
    })

    console.log(response)
    if(response.ok){
       const data = response.json();
       console.log(data, 'data')
       return data;
    }

})

export const searchLocation = createAsyncThunk('locations/SEARCH', async (urlFrontend) => {
    console.log(urlFrontend.href, 'searchParams in Thunk')

   
    const response = await fetch(urlFrontend.href, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    // console.log(response);
    if(response.ok){
        const data = await response.json()
        
        return data;
    }
})

export const nextList = createAsyncThunk('locations/NEXT_SEARCH', async (nextUrl) => {
    console.log(nextUrl, 'searchParams in NEXT_SEARCH')
    
   
    const url = `https://frontend-take-home-service.fetch.com${nextUrl}`;
    console.log(url, 'url in next search')
    

      const response = await fetch(url, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    // console.log(response);
    if(response.ok){
        const data = await response.json()
        
        return data;
    }
})

export const postSearchLocation = createAsyncThunk('locationss/ZIP_DETAILS', async (searchArray) => {
    console.log(searchArray, 'in postSearchDog in dogSlice')
    const response = await fetch(postDogURL, {
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
        // addBreeds(state, action){
        //     state.push(action.payload)
        // },
        // addSearch(state, action){
        //     state.search = action.payload
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(locations.fulfilled, (state, action)=> {
                state.location = action.payload;
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(searchLocation.fulfilled, (state, action)=> {
                state.search = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })

            .addCase(postSearchLocation.fulfilled, (state, action)=> {
                state.locationsDetail = action.payload;
                console.log(action.payload, 'in postSearchDog')
                state.status = 'succeeded';
                state.error = null;
            })

            .addCase(nextList.fulfilled, (state, action)=> {
                state.search = action.payload;
                console.log(action.payload)
                state.status = 'succeeded';
                state.error = null;
            })
            
    }

})

export const getDogBreed = (state) => state.locations.location;
export const getSearches = (state) => state.locations.search;
export const getDogDetails = (state) => state.locations.locationsDetail;

export const { addBreeds, addSearch  } = locationsSlice.actions

export default locationsSlice.reducer
