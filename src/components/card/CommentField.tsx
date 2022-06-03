import React from 'react'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { showErrorToast } from '../../utils/toastUtil';

const CommentField = (props: any) => {

    const { handleComment } = props;

    const [comment, setComment] = React.useState('');

    const addComment = () => {
        if (comment !== '') {
            handleComment(comment);
            setComment('')
        } else {
            showErrorToast('Invalid comment');
        }
    }

    return (
        <Stack flexDirection={'row'} alignItems='center'>
            <IconButton aria-label="emoji" sx={{ marginLeft: '5px' }}>
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
                InputProps={{ disableUnderline: true, style: { fontSize: 14, fontFamily: 'Public Sans', fontWeight: 400, marginTop: 4 } }}
            />
            <Button sx={{ textTransform: 'none' }} onClick={addComment}>
                <Typography component={'div'} fontSize={15} fontWeight={600} fontFamily='Public Sans' color='#1890FF' >
                    Post
                </Typography>
            </Button>

        </Stack>
    )
}

export default CommentField