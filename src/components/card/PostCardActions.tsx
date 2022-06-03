import React from 'react'
import { CardActions, IconButton, IconButtonProps, styled } from '@mui/material'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch } from 'react-redux';

import { likePost } from './card-slice/CardSlice';
import { authenticationService } from '../../utils/auth.service';


const Actions = (props: any) => {

    const dispatch = useDispatch();
    const currentUser = authenticationService.currentUserValue;

    console.log("Actions..................")
    const { likes, comments, handleOpen, handleLike } = props;

    return (
        <CardActions disableSpacing sx={{ py: 0, height: 40 }}>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
                {
                    likes?.includes(currentUser._id) ?
                        <FavoriteIcon sx={{ color: '#ff0000', height: 30 }} /> :
                        <FavoriteBorderIcon />
                }
            </IconButton>
            <IconButton aria-label="comments" onClick={handleOpen}>
                <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <IconButton aria-label="save post" sx={{ marginLeft: 'auto' }}>
                <BookmarkBorderRoundedIcon />
            </IconButton>
        </CardActions>
    )
}

export default React.memo(Actions)