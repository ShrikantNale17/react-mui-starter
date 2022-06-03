import { Box, CardMedia, Grid, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authenticationService } from '../../utils/auth.service'
import { getSavedPosts } from './savePost-slice/SavedPostSlice'
import { AppDispatch } from '../../redux/store/Store'
import PostModal from '../../components/modal/PostModal'

const Saved = () => {
    console.log("Saved")
    const savedPosts = useSelector((state: any) => state.savedPosts.savedPosts)
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = React.useState(false);
    const [postData, setPostData] = useState({});

    const handleOpen = (post: any) => {
        // setPlay(false)
        setPostData(post);
        setOpen(true);
    }
    const handleClose = () => {
        setPostData({})
        setOpen(false);
        // setPlay(true)
    }

    console.log(savedPosts);

    useEffect(() => {
        console.log("first")
        dispatch(getSavedPosts());
    }, [])
    return (
        <Box mt={10} display={'flex'} justifyContent='center' alignItems={'center'}>
            {/* <Stack width={'70%'} flexDirection={'row'} alignItems='center' gap={5}> */}
            <Grid container width={'70%'} minWidth='450px' spacing={3}>
                {
                    savedPosts?.map((post: any) => {
                        return (
                            <Grid item xs={4} key={post._id} sx={{ height: 280 }}>
                                <CardMedia
                                    component="img"
                                    width='100%'
                                    height='100%'
                                    image={`http://localhost:8080/${post.image[0].filename}`}
                                    alt={post.image[0].filename}
                                    sx={{ objectFit: 'cover', maxHeight: '250px', cursor: 'pointer' }}
                                    onClick={() => handleOpen(post)}
                                />
                            </Grid>
                        )
                    })
                }
                {
                    Array.from(Array(12)).map((_, index) => {
                        console.log("saved Skeleton")
                        return (
                            <Grid item xs={4}>
                                <Skeleton variant='rectangular' height={'100%'} width='100%' sx={{ maxHeight: '250px', minHeight: '250px' }} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/* </Stack> */}
            <PostModal open={open} handleClose={handleClose} {...postData} />
        </Box>
    )
}

export default Saved;