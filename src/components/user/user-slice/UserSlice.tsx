import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        details: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.details = action.payload
        }
    }
})

export const { setPosts } = UserSlice.actions;

export default UserSlice.reducer;