import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import dogsReducer from './dogsSlice';


export const store = configureStore({
    reducer: {
        users: usersReducer,
        dogs: dogsReducer,
    }
})
