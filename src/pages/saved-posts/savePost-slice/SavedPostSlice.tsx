import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/Store";
import { authenticationService } from "../../../utils/auth.service";
import { get } from '../../../utils/http/httpMethods'

const currentUser = authenticationService.currentUserValue

export const SavedPostSlice = createSlice({
    name: 'savedPosts',
    initialState: {
        savedPosts: []
    },
    reducers: {
        setSavedPosts: (state, action) => {
            console.log(action.payload)
            state.savedPosts = action.payload
        },
        savePost: (state: any, { payload }) => {
            state.savedPosts = state.savedPosts.find((post: any) => post._id === payload._id) ? state.savedPosts.filter((post: any) => post._id !== payload._id) : [...state.savedPosts, payload];
        },
        likePost: (state: any, { payload }) => {
            let post = state.savedPosts.find((post: any) => post._id === payload._id);
            let likes = post.likes.find((user: any) => user._id === payload.currentUser._id) ? post.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...post.likes, payload.currentUser];
            state.savedPosts = state.savedPosts.map((post: any) => post._id === payload._id ? { ...post, likes: likes } : post)
        },
        commentOnPost: (state: any, { payload }) => {
            // let post = state.savedPosts.find((post: any) => post._id === payload._id);
            // let comments = [...post.comments, payload.comment];
            state.savedPosts = state.savedPosts.map((post: any) => post._id === payload._id ? { ...post, comments: [...post.comments, payload.comment] } : post)
        },
        likeComment: (state: any, { payload }) => {
            let post = state.savedPosts.find((post: any) => post._id === payload._id);
            let comment = post.comments.find((cmnt: any) => cmnt._id === payload.commentId);
            let likes = comment.likes.find((user: any) => user._id === payload.currentUser._id) ? comment.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...comment.likes, payload.currentUser];
            state.savedPosts = state.savedPosts.map((post: any) =>
                post._id === payload._id ?
                    {
                        ...post,
                        comments: post.comments.map((cmnt: any) =>
                            cmnt._id === payload.commentId ?
                                { ...cmnt, likes: likes } :
                                cmnt
                        )
                    } :
                    post
            );
        }
    }
})

export const getSavedPosts = createAsyncThunk('savedPosts/getSavedPosts', async (_, thunkApi) => {
    const response: any = await get(`/users/${currentUser._id}/savedPosts`)
    console.log(response.savedPosts);
    thunkApi.dispatch(setSavedPosts(response.savedPosts))
})

export const { setSavedPosts, savePost, likePost, commentOnPost, likeComment } = SavedPostSlice.actions;

export default SavedPostSlice.reducer;