import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '../card/CardMedia';
import { Divider, IconButton, Stack, TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import PostCardHeader from '../card/PostCardHeader';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function BasicModal(props: any) {

    const { open, handleClose, image, _id, play, createdBy } = props;
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [comment, setComment] = React.useState('')


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display={'flex'} justifyContent='center'>
                <Box maxWidth={400}>
                    <CardMedia image={image} postId={_id} play={play} />
                </Box>
                <Stack width={300}>
                    <PostCardHeader _id={_id} createdBy={createdBy} />
                    <Divider />
                    <Stack flexDirection={'row'} alignItems='center' sx={{ width: 300, height: 40, bottom: 0, position: 'fixed' }}>
                        {/* <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> */}
                        <IconButton aria-label="emoji" sx={{ marginLeft: '5px' }}>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <TextField
                            id="standard-multiline-flexible"
                            // label="add comment"
                            placeholder='Add your comment...'
                            multiline
                            maxRows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            variant="standard"
                            sx={{ width: '90%' }}
                            InputProps={{ disableUnderline: true, style: { fontSize: 14, fontFamily: 'Public Sans', fontWeight: 400, marginTop: 4 } }}
                        />
                        <Button sx={{ textTransform: 'none' }}>
                            <Typography component={'div'} fontSize={15} fontWeight={600} color='#1890FF' >
                                Post
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
