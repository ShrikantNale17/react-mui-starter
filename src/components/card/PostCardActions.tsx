import React from 'react'
import { CardActions, IconButton, IconButtonProps, styled } from '@mui/material'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';

import { likePost } from './card-slice/CardSlice';
import { authenticationService } from '../../utils/auth.service';


const Actions = (props: any) => {

    const dispatch = useDispatch();
    const currentUser = authenticationService.currentUserValue;

    const savedPosts = useSelector((state: any) => state.savedPosts.savedPosts)

    // console.log("Actions..................")
    const { _id, likes, comments, handleOpen, handleLike, handleSavedPosts } = props;

    return (
        <CardActions disableSpacing sx={{ py: 0, height: 40 }}>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
                {
                    likes?.find((user: any) => user._id === currentUser._id) ?
                        <FavoriteIcon sx={{ color: '#ff0000', height: 30 }} /> :
                        <FavoriteBorderIcon />
                }
            </IconButton>
            <IconButton aria-label="comments" onClick={handleOpen}>
                <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <IconButton aria-label="save post" sx={{ marginLeft: 'auto' }} onClick={handleSavedPosts}>
                {
                    savedPosts.find((post: any) => post._id === _id) ?
                        <BookmarkRoundedIcon /> :
                        <BookmarkBorderRoundedIcon />
                }
            </IconButton>
        </CardActions>
    )
}

export default React.memo(Actions)