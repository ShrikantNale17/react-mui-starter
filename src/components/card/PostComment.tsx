import { Avatar, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PostComment = (props: any) => {
    const { commentedBy, comment } = props;
    return (
        <Stack flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
            <Stack flexDirection={'row'} gap={'16px'} alignItems={'center'}>
                {
                    commentedBy ?
                        <Avatar sx={{ bgcolor: red[500], height: 35, width: 35 }} aria-label="profile_pic" src={`http://localhost:8080/${commentedBy.image}`}>
                            {commentedBy.firstname.charAt(0) + commentedBy.lastname.charAt(0)}
                        </Avatar> :
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                <Stack alignItems={'flex-start'} gap={'4px'}>
                    <Stack flexDirection={'row'} gap={'12px'}>
                        {commentedBy ?
                            <Typography fontSize={14} fontWeight={600} fontFamily='Public Sans'>
                                {commentedBy.firstname}
                            </Typography> :
                            <Skeleton
                                animation="wave"
                                height={25}
                                width="80%"
                            />
                        }
                        {comment ?
                            <Typography fontSize={14} fontWeight={400} fontFamily='Public Sans' color='#919EAB'>
                                {comment.comment}
                            </Typography> :
                            <Skeleton
                                animation="wave"
                                height={15}
                                width="60%"
                            />
                        }
                    </Stack>
                    <Stack flexDirection={'row'} alignItems='flex-start' gap={'16px'}>
                        <Typography fontSize={12} fontWeight={400} fontFamily='Public Sans' color='#919EAB'>
                            {`1 min`}
                        </Typography>
                        <Typography fontSize={12} fontWeight={700} fontFamily='Public Sans' color='#919EAB'>
                            {`Reply`}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <IconButton aria-label="like comment">
                <FavoriteBorderIcon sx={{ height: '20px' }} />
            </IconButton>
        </Stack>
    )
}

export default PostComment