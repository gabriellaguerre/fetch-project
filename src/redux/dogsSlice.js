import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const dogBreedsURL = 'https://frontend-take-home-service.fetch.com/dogs/breeds';
const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
const dogMatchrUrl = 'https://frontend-take-home-service.fetch.com/dogs/match';
const postDogURL = 'https://frontend-take-home-service.fetch.com/dogs';


const initialState = {
    breed: [],
    search: {},
    dogsDetail: [],
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

export const searchDog = createAsyncThunk('dogs/SEARCH', async (urlFrontend) => {
    console.log(urlFrontend.href, 'searchParams in Thunk')

    // const url = new URL(dogSearchUrl)

    // searchParams.breeds.forEach(breed => url.searchParams.append('breeds', breed));
    // url.searchParams.append('size', searchParams.size)

    // console.log(url, 'url in dogs?SEARCH')
   
    const response = await fetch(urlFrontend.href, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    // console.log(response);
    if(response.ok){
        const data = await response.json()
        console.log(data, 'search data in redux')
        return data;
    }
})

export const nextList = createAsyncThunk('dogs/NEXT_SEARCH', async (nextUrl) => {
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
        console.log(data, 'search data in redux')
        return data;
    }
})

export const postSearchDog = createAsyncThunk('dogs/DOG_DETAILS', async (searchArray) => {
    console.log(searchArray, 'in postSearchDog in dogSlice')
    const response = await fetch(postDogURL, {
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
            .addCase(searchDog.fulfilled, (state, action)=> {
                state.search = action.payload;
                console.log(action.payload)
                state.status = 'succeeded';
                state.error = null;
            })

            .addCase(postSearchDog.fulfilled, (state, action)=> {
                state.dogsDetail = action.payload;
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

export const getDogBreed = (state) => state.dogs.breed;
export const getSearches = (state) => state.dogs.search;
export const getDogDetails = (state) => state.dogs.dogsDetail;

export const { addBreeds, addSearch  } = dogsSlice.actions

export default dogsSlice.reducer
