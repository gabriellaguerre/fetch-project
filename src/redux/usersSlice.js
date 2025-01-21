import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const loginUsersURL = 'https://frontend-take-home-service.fetch.com/auth/login'
const logoutUserUrl = 'https://frontend-take-home-service.fetch.com/auth/logout'


const initialState = {
    users: [],
    status: 'idle',
    error: null
  }

  export const login = createAsyncThunk('session/SET_USER', async ({employeeID, password}) => {

    const response = await fetch(loginUsersURL, {
    method: 'POST',
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({employeeID, password})
    })
    if(response.ok){
        const data = await response.json()
        return data
     }  else {
        throw new Error('Login failed. Please check your credentials.');
     }

})

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
    const response = await fetch(logoutUserUrl, {
        headers: {"Content-Type": "application/json"}
    })
    if(response.ok){
        return { users: null }
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userAdded(state, action) {
            state.users.push(action.payload)
        },
        clearError(state){
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action)=> {
                state.users = action.payload
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Login failed. Please try again.'
            })

    }
})

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const { userAdded, } = usersSlice.actions

export default usersSlice.reducer
