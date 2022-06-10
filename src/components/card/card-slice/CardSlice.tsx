import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patch, post } from "../../../utils/http/httpMethods";

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
            let post = state.posts.find((post: any) => post._id === payload._id);
            let likes = post.likes.find((user: any) => user._id === payload.currentUser._id) ? post.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...post.likes, payload.currentUser];
            state.posts = state.posts.map((post: any) => post._id === payload._id ? { ...post, likes: likes } : post)
        },
        commentOnPost: (state: any, { payload }) => {
            state.posts = state.posts.map((post: any) => post._id === payload._id ? payload : post)
        },
        likeComment: (state: any, { payload }) => {
            let post = state.posts.find((post: any) => post._id === payload._id);
            let comment = post.comments.find((cmnt: any) => cmnt._id === payload.commentId);
            let likes = comment.likes.find((user: any) => user._id === payload.currentUser._id) ? comment.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...comment.likes, payload.currentUser];
            state.posts = state.posts.map((post: any) => post._id === payload._id ? { ...post, comments: post.comments.map((cmnt: any) => cmnt._id === payload.commentId ? { ...cmnt, likes: likes } : cmnt) } : post);
        },
        replyToComment: (state: any, { payload }) => {
            const { postId, commentId, reply } = payload;
            state.posts = state.posts.map((post: any) => post._id !== postId ? post : { ...post, comments: post.comments.map((cmnt: any) => cmnt._id !== commentId ? cmnt : { ...cmnt, replies: [...cmnt.replies, reply] }) });
        },
        likeReply: (state: any, { payload }) => {
            // let post = state.savedPosts.find((post: any) => post._id === payload._id);
            // let comment = post.comments.find((cmnt: any) => cmnt._id === payload.commentId);
            // let reply = comment.
            // let likes = comment.likes.find((user: any) => user._id === payload.currentUser._id) ? comment.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...comment.likes, payload.currentUser];
            state.posts = state.posts.map((post: any) =>
                post._id === payload._id ?
                    {
                        ...post,
                        comments: post.comments.map(
                            (cmnt: any) =>
                                cmnt._id === payload.commentId ?
                                    {
                                        ...cmnt,
                                        replies: cmnt.replies.map(
                                            (rep: any) =>
                                                rep._id === payload.replyId ?
                                                    {
                                                        ...rep,
                                                        likes: rep.likes.find((user: any) => user._id === payload.currentUser._id) ? rep.likes.filter((user: any) => user._id !== payload.currentUser._id) : [...rep.likes, payload.currentUser]
                                                    } :
                                                    rep
                                        )
                                    } :
                                    cmnt
                        )
                    } :
                    post
            );
        },
    }
})

// export const addComment = createAsyncThunk('comments/addComment', async (payload, thunkApi) => {
//     const { postId, comment } = payload;
//     const response: any = await patch(`posts/comment/${postId}`, comment)
//     console.log(response);
//     thunkApi.dispatch(setSavedPosts(response.savedPosts))
// })

export const { setPosts, likePost, commentOnPost, likeComment, replyToComment, likeReply } = CardSlice.actions;

export default CardSlice.reducer;