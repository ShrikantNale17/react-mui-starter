import { Box, CardMedia, Grid, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authenticationService } from '../../utils/auth.service'
import { commentOnPost, getSavedPosts, likePost, savePost } from './savePost-slice/SavedPostSlice'
import { AppDispatch } from '../../redux/store/Store'
import PostModal from '../../components/modal/PostModal'
import { patch } from '../../utils/http/httpMethods'
import SavedPostCard from './SavedPostCard'

const Saved = () => {

    const savedPosts = useSelector((state: any) => state.savedPosts.savedPosts)
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = authenticationService.currentUserValue;

    const [open, setOpen] = React.useState(false);
    const [postData, setPostData] = useState<any>({});

    const handleOpen = (post: any) => {
        // setPlay(false)
        setPostData(post);
        setOpen(true);
    }
    const handleClose = () => {
        setPostData({})
        setOpen(false);
        dispatch(getSavedPosts())
        // setPlay(true)
    }

    const handleLike = () => {
        patch(`/posts/${postData._id}/like`);
        // const temp_likes = likes.find((user: any) => user._id === currentUser._id) ? likes.filter((user: any) => user._id !== currentUser._id) : [...likes, { _id: currentUser._id, firstname: currentUser.firstname, lastname: currentUser.lastname, image: currentUser.image, email: currentUser.email }];
        // console.log({ ...props, likes: temp_likes })
        const payload = {
            _id: postData._id,
            currentUser: {
                _id: currentUser._id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                image: currentUser.image,
                email: currentUser.email
            }
        }
        dispatch(likePost(payload));
    }

    const handleComment = async (comment: String) => {
        const res = await patch(`/posts/${postData._id}/comment`, { comment });
        console.log(res);

        // const temp_comments = [...postData.comments, res];
        // console.log(temp_comments);
        dispatch(commentOnPost({ _id: postData._id, comment: res }));
    }

    const handleSavedPosts = () => {
        patch(`/users/${currentUser._id}/savePost/${postData._id}`);
        // dispatch(savePost(postData));
    }

    console.log(savedPosts);
    useEffect(() => {
        postData && setPostData((post: any) => savedPosts.find((sp: any) => sp._id === postData._id))
    }, [savedPosts])

    useEffect(() => {
        console.log("first")
        dispatch(getSavedPosts());
    }, [])

    return (
        <Box mt={10} display={'flex'} justifyContent='center' alignItems={'center'}>
            {/* <Stack width={'70%'} flexDirection={'row'} alignItems='center' gap={5}> */}
            <Grid container width={'70%'} minWidth='450px' spacing={3}>
                {
                    savedPosts && [...savedPosts]?.reverse().map((post: any) => {
                        return (
                            <Grid item xs={4} key={post._id} sx={{ height: 280 }}>
                                <SavedPostCard post={post} handleOpen={handleOpen} />
                            </Grid>
                        )
                    })
                }
                {/* {
                    Array.from(Array(12)).map((_, index) => {
                        console.log("saved Skeleton")
                        return (
                            <Grid item xs={4} key={index}>
                                <Skeleton variant='rectangular' height={'100%'} width='100%' sx={{ maxHeight: '250px', minHeight: '250px' }} />
                            </Grid>
                        )
                    })
                } */}
            </Grid>
            {/* </Stack> */}
            <PostModal open={open} handleClose={handleClose} handleLike={handleLike} handleComment={handleComment} handleSavedPosts={handleSavedPosts} {...postData} />
        </Box>
    )
}

export default React.memo(Saved);