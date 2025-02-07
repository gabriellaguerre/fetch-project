import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import dogsReducer from './dogsSlice';
import locationsReducer from './locationsSlice'


export const store = configureStore({
    reducer: {
        users: usersReducer,
        dogs: dogsReducer,
        locations: locationsReducer,
    }
})
