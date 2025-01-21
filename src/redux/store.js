import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './sessionsSlice'


export const store = configureStore({
    reducer: {
        sessions: sessionsReducer,

    }
})
