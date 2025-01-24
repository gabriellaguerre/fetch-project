import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const dogBreedsURL = 'https://frontend-take-home-service.fetch.com/dogs/breeds';
const dogSearchrUrl = 'https://frontend-take-home-service.fetch.com/dogs/search';
const dogMatchrUrl = 'https://frontend-take-home-service.fetch.com/dogs/match';


const initialState = {
    breed: [],
    search: {},
}

  export const breeds = createAsyncThunk('dogs/BREEDS', async () => {
    console.log('in Breeds fxn')
    const response = await fetch(dogBreedsURL, {
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

export const searchDog = createAsyncThunk('dogs/SEARCH', async () => {
    const response = await fetch(dogSearchrUrl, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    console.log(response);
    if(response.ok){
        const data = response.json()
        return data; 
    }
})

export const dogMatch = createAsyncThunk('dogs/MATCH', async (match) => {
    const response = await fetch(dogMatchrUrl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(match),
        credentials: 'include',
    })
   
    if(response.ok){
        const data = response.json()
        return data; 
    }
})



const dogsSlice = createSlice({
    name: 'dogs',
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
            .addCase(breeds.fulfilled, (state, action)=> {
                state.breed = action.payload;
                state.status = 'succeeded';
                state.error = null;

            })
            // .addCase(login.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message || 'Login failed. Please try again.'
            // })

    }
    
})

export const getDogBreed = (state) => state.dogs.breed;

export const { addBreeds, addSearch  } = dogsSlice.actions

export default dogsSlice.reducer
