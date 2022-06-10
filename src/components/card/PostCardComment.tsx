import { Avatar, IconButton, Link, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { baseURL } from '../../utils/constants/urls';
import { authenticationService } from '../../utils/auth.service';

const PostCardComment = (props: any) => {
    const { commentedBy, comment, _id, likes, likeComment, replies, handleReply, likeReply } = props;

    const currentUser = authenticationService.currentUserValue;

    const [showReplies, setShowReplies] = useState(false);

    return (
        <>
            <Stack flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                <Stack flexDirection={'row'} gap={'16px'} alignItems={'flex-start'}>
                    {
                        commentedBy ?
                            <Avatar sx={{ bgcolor: red[500], height: 35, width: 35 }} aria-label="profile_pic" src={`${baseURL}/${commentedBy.image}`}>
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
                                    {comment}
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
                            <Link underline='none' onClick={() => handleReply({ _id, commentedBy })}>
                                <Typography fontSize={12} fontWeight={700} fontFamily='Public Sans' color='#919EAB' sx={{ cursor: 'pointer' }}>
                                    {`Reply`}
                                </Typography>
                            </Link>
                        </Stack>
                        {
                            replies?.length > 0 &&
                            <Stack flexDirection={'row'} alignItems='flex-start' gap={'16px'}>
                                <Typography lineHeight={0.8} fontSize={12} fontWeight={400} fontFamily='Public Sans' color='#919EAB'>
                                    ___
                                </Typography>
                                <Link underline='none' onClick={() => setShowReplies(prev => !prev)}>
                                    <Typography fontSize={12} fontWeight={400} fontFamily='Public Sans' color='#919EAB' sx={{ cursor: 'pointer' }}>
                                        {`${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`}
                                    </Typography>
                                </Link>
                            </Stack>
                        }
                    </Stack>
                </Stack>
                <Stack alignItems={'center'}>
                    <IconButton aria-label="like comment" sx={{ p: `0 5px` }} onClick={() => likeComment(_id)}>
                        {
                            likes?.find((user: any) => user._id === currentUser._id) ?
                                <FavoriteIcon sx={{ color: '#ff0000', height: '17px' }} /> :
                                <FavoriteBorderIcon sx={{ height: '17px' }} />
                        }
                    </IconButton>
                    {
                        likes?.length > 0 &&
                        <Typography color="#919EAB" fontSize={12} fontWeight={400} fontFamily='Public Sans' >
                            {likes.length > 1 ? `${likes.length} likes` : `1 like`}
                        </Typography>
                    }
                </Stack>
            </Stack>
            {showReplies &&
                <Stack paddingLeft={6} gap='10px'>
                    {
                        replies?.map((reply: any) =>
                            <Stack key={reply._id} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                <Stack flexDirection={'row'} gap={'16px'} alignItems={'flex-start'}>
                                    {
                                        reply.repliedBy ?
                                            <Avatar sx={{ bgcolor: red[500], height: 30, width: 30 }} aria-label="profile_pic" src={`${baseURL}/${reply.repliedBy.image}`}>
                                                {reply.repliedBy.firstname.charAt(0) + reply.repliedBy.lastname.charAt(0)}
                                            </Avatar> :
                                            <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                    }
                                    <Stack alignItems={'flex-start'} gap={'4px'}>
                                        <Stack flexDirection={'row'} gap={'12px'}>
                                            {
                                                reply.repliedBy ?
                                                    <Typography fontSize={14} fontWeight={600} fontFamily='Public Sans'>
                                                        {reply.repliedBy.firstname}
                                                    </Typography> :
                                                    <Skeleton
                                                        animation="wave"
                                                        height={25}
                                                        width="80%"
                                                    />
                                            }
                                            {
                                                reply.reply ?
                                                    <Typography fontSize={14} fontWeight={400} fontFamily='Public Sans' color='#919EAB'>
                                                        {reply.reply}
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
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack alignItems={'center'}>
                                    <IconButton aria-label="like comment" sx={{ p: `0 5px` }} onClick={() => likeReply({ commentId: _id, replyId: reply._id })}>
                                        {
                                            reply.likes?.find((user: any) => user._id === currentUser._id) ?
                                                <FavoriteIcon sx={{ color: '#ff0000', height: '17px' }} /> :
                                                <FavoriteBorderIcon sx={{ height: '17px' }} />
                                        }
                                    </IconButton>
                                    {
                                        reply.likes?.length > 0 &&
                                        <Typography color="#919EAB" fontSize={12} fontWeight={400} fontFamily='Public Sans' >
                                            {reply.likes.length > 1 ? `${reply.likes.length} likes` : `1 like`}
                                        </Typography>
                                    }
                                </Stack>
                            </Stack>

                        )
                    }
                </Stack>
            }
        </>
    )
}

export default PostCardComment