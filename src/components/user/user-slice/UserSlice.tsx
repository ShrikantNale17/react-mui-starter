import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        details: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.details = action.payload
        },
        likePost: (state: any, { payload }) => {
            state.details = state.details.map((post: any) => post._id === payload._id ? payload : post)
        }
    }
})

export const { setPosts, likePost } = UserSlice.actions;

export default UserSlice.reducer;