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
        }
    }
})

export const getSavedPosts = createAsyncThunk('savedPosts/getSavedPosts', async (_, thunkApi) => {
    const response: any = await get(`/users/${currentUser._id}/savedPosts`)
    console.log(response.savedPosts);
    thunkApi.dispatch(setSavedPosts(response.savedPosts))
})

export const { setSavedPosts } = SavedPostSlice.actions;

export default SavedPostSlice.reducer;