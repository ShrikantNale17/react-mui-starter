import React, { useEffect } from 'react'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker from 'emoji-picker-react';

import { showErrorToast } from '../../utils/toastUtil';

const CommentField = (props: any) => {

    const { handleComment, handleClicked, handleReply, focusRef, replyCred } = props;

    const [comment, setComment] = React.useState('');

    useEffect(() => {
        replyCred?.replyTo && setComment(replyCred.replyTo + ' ');
    }, [replyCred])

    const addComment = () => {
        if (comment !== '') {
            handleComment(comment);
            setComment('')
        } else {
            showErrorToast('Invalid comment');
        }
    }

    const addReply = () => {
        if (comment !== '' && comment.includes(replyCred.replyTo)) {
            // console.log(comment.slice(replyCred.replyTo.length));
            // console.log(comment.includes(replyCred.replyTo));

            let reply = comment.slice(replyCred.replyTo.length).trim();
            console.log(reply.length)
            if (reply.length > 1) {
                handleReply({ reply: reply, commentId: replyCred.commentId });
                setComment('')
            }
            else {
                showErrorToast('Invalid reply');
            }
        } else {
            showErrorToast('Invalid reply');
        }
    }

    return (
        <Stack flexDirection={'row'} alignItems='center'>
            <IconButton aria-label="emoji" sx={{ marginLeft: '5px' }} onClick={handleClicked}>
                <SentimentSatisfiedAltIcon />
            </IconButton>
            <TextField
                id="standard-multiline-flexible"
                // label="add comment"
                placeholder='Add your comment...'
                multiline
                maxRows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="standard"
                sx={{ width: '90%' }}
                InputProps={{ disableUnderline: true, inputRef: focusRef, style: { fontSize: 14, fontFamily: 'Public Sans', fontWeight: 400, marginTop: 4 } }}
            />
            {
                comment.includes('@') ?
                    <Button sx={{ textTransform: 'none' }} onClick={addReply}>
                        <Typography component={'div'} fontSize={15} fontWeight={600} fontFamily='Public Sans' color='#1890FF' >
                            Reply
                        </Typography>
                    </Button> :
                    <Button sx={{ textTransform: 'none' }} onClick={addComment}>
                        <Typography component={'div'} fontSize={15} fontWeight={600} fontFamily='Public Sans' color='#1890FF' >
                            Post
                        </Typography>
                    </Button>
            }

        </Stack>
    )
}

export default CommentField