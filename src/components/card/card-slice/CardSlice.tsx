import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patch } from "../../../utils/http/httpMethods";

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
        },
        commentOnPost: (state: any, { payload }) => {
            state.posts = state.posts.map((post: any) => post._id === payload._id ? payload : post)
        }
    }
})

// export const addComment = createAsyncThunk('comments/addComment', async (payload, thunkApi) => {
//     const { postId, comment } = payload;
//     const response: any = await patch(`posts/comment/${postId}`, comment)
//     console.log(response);
//     thunkApi.dispatch(setSavedPosts(response.savedPosts))
// })

export const { setPosts, likePost, commentOnPost } = CardSlice.actions;

export default CardSlice.reducer;