import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '../card/CardMedia';
import { Avatar, CardActions, CardContent, Divider, IconButton, List, ListItem, Stack, TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { red } from '@mui/material/colors';
// import { FixedSizeList, ListChildComponentProps } from 'react-window';

import PostCardHeader from '../card/PostCardHeader';
import { authenticationService } from '../../utils/auth.service';
import PostCardComment from '../card/PostCardComment';
import CommentField from '../card/CommentField';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 450,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function BasicModal(props: any) {

    const { open, handleClose, handleLike, likes, image, _id, play, comments, createdBy } = props;
    const currentUser: any = authenticationService.currentUserValue;
    // const [comment, setComment] = React.useState('')

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display={'flex'} justifyContent='center'>

                <Box maxWidth={450}>
                    <CardMedia height={450} image={image} postId={_id} play={play} />
                </Box>

                <Stack width={350} alignItems='flex-start' sx={{ ml: 'auto' }}>

                    <Stack alignItems={'flex-start'}>

                        <Stack width={'100%'} flexDirection={'row'} alignItems='center' justifyContent={'space-between'}>
                            <PostCardHeader _id={_id} createdBy={createdBy} />
                            <Typography mr={1} fontSize={12} fontWeight={400} color='#637381' fontFamily='Public Sans'>
                                3 hrs
                            </Typography>
                        </Stack>

                        <Stack padding={'2px 16px 5px 66px'}>
                            <Typography variant='body2' fontSize={14} fontWeight={400} fontFamily='Public Sans'>
                                The place of colorful lights with lots of darkness...
                            </Typography>
                        </Stack>

                    </Stack>

                    <Divider sx={{ width: '100%' }} />

                    <Stack width={'100%'} flexDirection={'row'} overflow={'auto'}>

                        <Stack width={'100%'} padding={'8px 16px'} gap={2}>
                            {
                                comments?.map((cmnt: any) => <PostCardComment key={cmnt._id} {...cmnt} />)
                            }
                        </Stack>

                    </Stack>

                    <Stack sx={{ width: '100%', marginTop: 'auto' }} >
                        {/* <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> */}
                        <Divider />
                        <CardActions disableSpacing sx={{ py: 0, height: 30 }}>
                            <IconButton aria-label="add to favorites" onClick={handleLike} sx={{ height: 30 }}>
                                {
                                    likes?.includes(currentUser._id) ?
                                        <FavoriteIcon sx={{ color: '#ff0000', height: 30 }} /> :
                                        <FavoriteBorderIcon />
                                }
                            </IconButton>
                            <IconButton aria-label="save post" sx={{ marginLeft: 'auto' }}>
                                <BookmarkBorderRoundedIcon />
                            </IconButton>
                        </CardActions>
                        {likes?.length > 0 &&
                            <CardContent sx={{ py: '0px' }}>
                                <Typography variant="body2" color="#000000" fontSize={14} fontWeight={400} fontFamily='Public Sans' >
                                    {likes.length > 1 ? `${likes.length} likes` : `1 like`}
                                </Typography>
                            </CardContent>
                        }
                        <CardContent sx={{ py: '2px' }}>
                            <Typography fontSize={12} fontWeight={400} color="#637381" fontFamily='Public Sans' >
                                3 hrs ago
                            </Typography>
                        </CardContent>

                        <Divider />

                        {/* <Stack flexDirection={'row'} alignItems='center'>
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
                            <Button sx={{ textTransform: 'none' }}>
                                <Typography component={'div'} fontSize={15} fontWeight={600} fontFamily='Public Sans' color='#1890FF' >
                                    Post
                                </Typography>
                            </Button>

                        </Stack> */}
                        <CommentField />

                    </Stack>

                </Stack>

            </Box>
        </Modal>
    );
}
