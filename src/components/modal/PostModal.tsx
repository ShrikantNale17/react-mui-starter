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
import { useDispatch, useSelector } from 'react-redux';
// import { FixedSizeList, ListChildComponentProps } from 'react-window';

import PostCardHeader from '../card/PostCardHeader';
import { authenticationService } from '../../utils/auth.service';
import PostCardComment from '../card/PostCardComment';
import CommentField from '../card/CommentField';
import { patch } from '../../utils/http/httpMethods';
import { likeComment, likePost, likeReply, replyToComment } from '../card/card-slice/CardSlice';

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

    const dispatch = useDispatch();
    const savedPosts = useSelector((state: any) => state.savedPosts.savedPosts);
    // console.log(savedPosts);
    const { open, handleClose, handleLike, handleComment, handleSavedPosts, caption, location, likes, image, _id, play, comments, createdBy } = props;
    const currentUser: any = authenticationService.currentUserValue;
    // const [comment, setComment] = React.useState('')
    const [isSaved, setIsSaved] = React.useState(true);
    console.log(isSaved);
    const [replyCred, setReplyCred] = React.useState({
        commentId: '',
        replyTo: ''
    });
    const focusRef = React.useRef(null);

    /* React.useEffect(() => {
        const temp = savedPosts.find((post: any) => post._id === _id) ? true : false;
        console.log(temp);
        setIsSaved(prev => temp);
    }, []) */

    const handleSaved = () => {
        console.log(isSaved);
        setIsSaved(prev => !prev);
        handleSavedPosts();
    }

    const handleLikeComment = (commentId: any) => {
        patch(`/posts/comments/${commentId}/like`)
        dispatch(likeComment({ _id, commentId, currentUser: { _id: currentUser._id, firstname: currentUser.firstname, lastname: currentUser.lastname, image: currentUser.image, email: currentUser.email } }))
    }

    const handleReplyFocus = (payload: any) => {
        // patch(`/posts/comments/${commentId}/reply`)
        console.log("@" + payload.commentedBy.firstname)
        setReplyCred(prev => ({ replyTo: "@" + payload.commentedBy.firstname, commentId: payload._id }));
        focusRef.current && focusRef.current.focus()
    }

    const handleReply = async ({ commentId, reply }: any) => {
        const res = await patch(`/posts/comments/${commentId}/reply`, { reply });
        console.log(res);
        // const commentObj = {
        //     comment: { comment },
        //     commentedBy: {
        //         ...currentUser
        //     },
        //     replies: []
        // }
        // const temp_comments = [...comments, res];
        // console.log(temp_comments);
        dispatch(replyToComment({ postId: _id, commentId, reply: res }));
    }

    const handleLikeReply = ({ commentId, replyId }: any) => {
        patch(`/posts/comments/replies/${replyId}/like`)
        dispatch(likeReply({ _id, commentId, replyId, currentUser: { _id: currentUser._id, firstname: currentUser.firstname, lastname: currentUser.lastname, image: currentUser.image, email: currentUser.email } }))
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display={'flex'} justifyContent='center'>

                <Box maxWidth={450} width={450}>
                    <CardMedia height={450} image={image} postId={_id} play={play} />
                </Box>
                <Divider orientation={'vertical'} />
                <Stack width={350} alignItems='flex-start' sx={{ ml: 'auto' }}>

                    <Stack alignItems={'flex-start'}>

                        <Stack width={350} flexDirection={'row'} alignItems='center' justifyContent={'space-between'}>
                            <PostCardHeader _id={_id} createdBy={createdBy} location={location} />
                            <Typography mr={3} fontSize={12} fontWeight={400} color='#637381' fontFamily='Public Sans'>
                                3 hrs
                            </Typography>
                        </Stack>

                        <Stack padding={'2px 16px 5px 66px'}>
                            <Typography variant='body2' fontSize={14} fontWeight={400} fontFamily='Public Sans'>
                                {caption}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Divider sx={{ width: '100%' }} />

                    <Stack width={'100%'} flexDirection={'row'} overflow={'auto'}>

                        <Stack width={'100%'} padding={'8px 16px'} gap={2}>
                            {
                                comments && [...comments].reverse().map((cmnt: any) => <PostCardComment key={cmnt._id} {...cmnt} likeComment={handleLikeComment} handleReply={handleReplyFocus} likeReply={handleLikeReply} />)
                            }
                        </Stack>

                    </Stack>

                    <Stack sx={{ width: '100%', marginTop: 'auto' }} >
                        {/* <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> */}
                        <Divider />
                        <CardActions disableSpacing sx={{ py: 0, height: 30 }}>
                            <IconButton aria-label="add to favorites" onClick={handleLike} sx={{ height: 30 }}>
                                {
                                    likes?.find((user: any) => user._id === currentUser._id) ?
                                        <FavoriteIcon sx={{ color: '#ff0000', height: 30 }} /> :
                                        <FavoriteBorderIcon />
                                }
                            </IconButton>
                            <IconButton aria-label="save post" sx={{ marginLeft: 'auto' }} onClick={handleSaved}>
                                {
                                    isSaved ?
                                        <BookmarkRoundedIcon /> :
                                        <BookmarkBorderRoundedIcon />
                                }
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
                        <CommentField handleComment={handleComment} handleReply={handleReply} focusRef={focusRef} replyCred={replyCred} />

                    </Stack>

                </Stack>

            </Box>
        </Modal>
    );
}
