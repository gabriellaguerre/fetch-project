import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const dogBreedsURL = 'https://frontend-take-home-service.fetch.com/dogs/breeds';
const dogMatchrUrl = 'https://frontend-take-home-service.fetch.com/dogs/match';
const postDogURL = 'https://frontend-take-home-service.fetch.com/dogs';


const initialState = {
    breed: [],
    search: {},
    dogsDetail: [],
    match: {},
    likeDogs: [],
}

// *******************GET /dogs/breeds ***********************************/

  export const breeds = createAsyncThunk('dogs/BREEDS', async () => {

    const response = await fetch(dogBreedsURL, {
    headers: {"Content-Type": "application/json",},
    credentials: 'include',
    })

    if(response.ok){
       const data = response.json();
    
       return data;
    }

})

//  *******************GET /dogs/search **************************************/

export const searchDog = createAsyncThunk('dogs/SEARCH', async (urlFrontend) => {

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



export const nextPrevList = createAsyncThunk('dogs/NEXT_SEARCH', async (nextPrevUrl) => {
    // console.log(nextUrl, 'nextList in dogSlice line 50')


    const url = `https://frontend-take-home-service.fetch.com${nextPrevUrl}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    if(response.ok){
        const data = await response.json()
        return data;
    }
})


//*************************POST /dogs******************************************************* */

export const postSearchDog = createAsyncThunk('dogs/DOG_DETAILS', async (searchArray) => {

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


//*************************POST /dogs/match ************************************** */

export const dogMatch = createAsyncThunk('dogs/MATCH', async (match) => {

    const response = await fetch(dogMatchrUrl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(match),
        credentials: 'include',
    })

    console.log(response, 'response line 103')
    if(response.ok){
        const data = response.json()
        return data;
    }
})


const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        clearAllData(state){
            state.search = {}
            state.dogsDetail = []
            state.match = {}
            state.likeDogs = []
        },

        clearDogDetails(state) {
            state.dogsDetail = []
        },

        addLikeDog(state, action) {
            state.likeDogs = [...state.likeDogs, action.payload]
        },

        removeLikeDog(state, action) {
            state.likeDogs = state.likeDogs.filter(dog => dog.id !== action.payload)

        }

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
                state.status = 'succeeded';
                state.error = null;
            })

            .addCase(postSearchDog.fulfilled, (state, action)=> {
                console.log(action.payload,'action payloda for postsearchDog line 143 dogslice ')
                // state.dogsDetail = action.payload;
                state.dogsDetail = [...state.dogsDetail, ...action.payload];
                console.log(`array length after updating: ${state.dogsDetail.length}`)
                state.status = 'succeeded';
                state.error = null;
            })

            .addCase(nextPrevList.fulfilled, (state, action)=> {

                state.search = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })

            // .addCase(locationSearchNextList.fulfilled, (state, action)=> {
            //     state.location_search = action.payload;
            //     state.status = 'succeeded';
            //     state.error = null;
            // })

            // .addCase(postSearchLocationDog.fulfilled, (state, action)=> {
            //     state.allDogsDetail = [...state.allDogsDetail, action.payload];
            //     state.status = 'succeeded';
            //     state.error = null;
            // })



            .addCase(dogMatch.fulfilled, (state, action)=> {
                state.match = action.payload;
                // console.log(action.payload)
                state.status = 'succeeded';
                state.error = null;
            })

    }

})

export const getDogBreed = (state) => state.dogs.breed;
export const getSearches = (state) => state.dogs.search;
export const getDogDetails = (state) => state.dogs.dogsDetail;
export const getLikeDogs = (state) => state.dogs.likeDogs
export const getMatched = (state) => state.dogs.match
export const locationSearchDogs = (state) => state.dogs.location_search
export const locationDogDetails = (state) => state.dogs.location_dogsDetail
export const getAllDogs = (state) => state.dogs.allDogsDetail

export const { clearAllData, addLikeDog, removeLikeDog, clearDogDetails  } = dogsSlice.actions

export default dogsSlice.reducer
