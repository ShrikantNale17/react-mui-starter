import { createSlice } from "@reduxjs/toolkit";

export const CardSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        likePost: (state: any, { payload }) => {
            state.posts = state.posts.map((post: any) => post._id === payload._id ? payload : post)
        }
    }
})

export const { setPosts, likePost } = CardSlice.actions;

export default CardSlice.reducer;