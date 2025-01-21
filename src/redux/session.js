import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const sessionsSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        setUser(state, action) {
                state.push(action.payload)
        },

        removeUser(state, action){
                const id = action.payload
                return state.filter(item => item.id !== id);

        },
        
        },
})

export const selectUser = (state) => state.user;

export const { setUser, removeUser } = sessionsSlice.actions

export default sessionsSlice.reducer;










// const SET_USER = "session/SET_USER";
// const REMOVE_USER = "session/REMOVE_USER";

// const setUser = (user) => ({
// 	type: SET_USER,
// 	payload: user,
// });

// const removeUser = () => ({
// 	type: REMOVE_USER,
// });

// const initialState = { user: null };
