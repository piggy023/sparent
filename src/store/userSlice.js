import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user'))
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },

        logout: (statue) => {
            statue.user = null
            localStorage.removeItem('user')
        }
    }
})


export const {login, logout} = userSlice.actions

export default userSlice.reducer