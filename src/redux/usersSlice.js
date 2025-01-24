import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const usersURL = 'http://10.0.2.2:5000/api/users'
const loginUsersURL = 'https://frontend-take-home-service.fetch.com/auth/login'
const logoutUserUrl = 'https://frontend-take-home-service.fetch.com/auth/logout'


const initialState = {
    user: {},
    status: 'idle',
    error: null
  }

  export const login = createAsyncThunk('user/LOGIN_USER', async ({name, email}) => {

    const response = await fetch(loginUsersURL, {
    method: 'POST',
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({name: "asd", email: 'asdf@adf.com'}),
    credentials: 'include',
    })
  
    if(response.ok){
       return  { name };
     }  
})

export const logout = createAsyncThunk('user/LOGOUT_USER', async () => {
    const response = await fetch(logoutUserUrl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
    })
    console.log(response);
    if(response.ok){
        return { users: null }
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action)=> {
                state.user = { name: action.payload.name };
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Login failed. Please try again.'
            })

    }
})

export const selectUser = (state) => state.users.user;

// export const { userAdded, } = usersSlice.actions

export default usersSlice.reducer
