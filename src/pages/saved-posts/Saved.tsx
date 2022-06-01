import { Box, CardMedia, Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticationService } from '../../utils/auth.service'
import { getSavedPosts } from './savePost-slice/SavedPostSlice'
import { AppDispatch } from '../../redux/store/Store'

const Saved = () => {
    console.log("Saved")
    const savedPosts = useSelector((state: any) => state.savedPosts.savedPosts)
    const dispatch = useDispatch<AppDispatch>();

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
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    width='100%'
                                    height='100%'
                                    image={`http://localhost:8080/${post.image[2].filename}`}
                                    alt={post.image[2].filename}
                                    sx={{ objectFit: 'cover', maxHeight: '250px' }}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/* </Stack> */}
        </Box>
    )
}

export default Saved;