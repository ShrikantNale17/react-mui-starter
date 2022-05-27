import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Link, ListItemButton, Paper, Stack, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch } from 'react-redux'
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Content from './CardContent';
import Actions from './PostCardActions';
import Media from './CardMedia';
import CardCarousel from './Carousel';
import { likePost } from './card-slice/CardSlice';
import PostModal from '../modal/PostModal'
import PostCardHeader from './PostCardHeader';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})
    (({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
        // marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

export default function Post(props: any) {

    const dispatch = useDispatch();
    var currentUser: any = localStorage.getItem("currentUser")
    currentUser = JSON.parse(currentUser);

    const { _id, caption, comments, image, likes, createdBy, createdAt } = props;

    console.log(comments);

    const [loading, setLoading] = React.useState(true)
    const [expanded, setExpanded] = React.useState(false);
    const [play, setPlay] = React.useState(false);
    const [comment, setComment] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setPlay(false)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setPlay(true)
    }

    const handleExpandClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const isLoaded = async () => {
        setLoading(false)
    }

    const m_caption = React.useMemo(() => {
        // console.log("caption");
        return caption
    }, [caption])

    const m_likes = React.useMemo(() => {
        // console.log("likes");
        return likes
    }, [likes])

    const m_comments = React.useMemo(() => {
        // console.log("comments");
        return comments
    }, [comments])

    const handleLike = async () => {
        const temp_likes = likes.includes(currentUser._id) ? likes.filter((uid: any) => uid !== currentUser._id) : [...likes, currentUser._id];
        console.log({ ...props, likes: temp_likes })
        dispatch(likePost({ ...props, likes: temp_likes }));
    }

    return (
        <Paper elevation={2} sx={{ width: 400, my: 2, fontFamily: 'Public Sans' }} >

            <PostCardHeader _id={_id} createdBy={createdBy} />

            {image ?
                loading ?
                    <>
                        <Skeleton sx={{ width: '100%', height: '400px' }} animation="wave" variant="rectangular" />
                        <CardMedia
                            component="img"
                            width='100%'
                            image={`http://localhost:8080/${image[0].filename}`}
                            alt="Paella dish"
                            onLoad={() => isLoaded()}
                            sx={{ objectFit: 'cover', maxHeight: '400px', display: 'none' }}
                        />
                    </> :
                    <VisibilitySensor
                        onChange={(isVisible: any) => {
                            setPlay(isVisible)
                        }}
                    >
                        <Media image={image} postId={_id} play={play} />
                    </VisibilitySensor>
                :
                <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
            }
            {/* <CardCarousel image={image} /> */}

            {/* <Actions setLoading={setLoading} likes={m_likes} comments={m_comments} expanded={expanded} handleExpandClick={handleExpandClick} /> */}
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
            {likes?.length > 0 &&
                <CardContent sx={{ py: '2px' }}>
                    <Typography variant="body2" color="#000000" fontSize={14} fontWeight={400} fontFamily='Public Sans' >
                        {likes.length > 1 ? `${likes.length} likes` : `1 like`}
                    </Typography>
                </CardContent>
            }

            {/* <Content caption={m_caption} /> */}
            <CardContent sx={{ py: '0px' }}>
                {
                    caption ?
                        <Stack flexDirection={'row'} alignItems='center' gap={1}>
                            <Typography variant="subtitle2" color="#212B36" fontSize={14} fontWeight={600} fontFamily='Public Sans' >
                                {createdBy.firstname + ' ' + createdBy.lastname}
                            </Typography>
                            <Typography variant="body2" color="#000000" fontSize={14} fontWeight={400} fontFamily='Public Sans' >
                                {caption}
                            </Typography>
                        </Stack> :
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        />
                }
            </CardContent>
            {
                comments?.length > 0 &&
                <CardContent sx={{ py: '0px' }}>
                    <Link underline='none' sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                        <Typography variant="body2" color="text.secondary" fontFamily='Public Sans'>
                            {comments.length > 1 ? `View all ${comments?.length} comments` : `View comment`}
                        </Typography>
                    </Link>
                </CardContent>
            }

            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ pb: 0 }}>
                <CardContent sx={{ py: '0px' }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                            comments?.map((comment: any, index: number) => {
                                return (
                                    <ListItem key={comment._id} alignItems="flex-start" disablePadding>
                                        <ListItemButton sx={{ paddingLeft: '0px', alignItems: 'flex-start' }}>
                                            <ListItemAvatar sx={{ minWidth: '35px', mt: '0.1rem' }}>
                                                {
                                                    comment.commentedBy.image ?
                                                        <Avatar sx={{ bgcolor: red[500], width: 30, height: 30 }} aria-label="profile_pic" src={`http://localhost:8080/${comment?.commentedBy?.image}`}>
                                                            {comment.commentedBy.firstname.charAt(0) + comment.commentedBy.lastname.charAt(0)}
                                                        </Avatar> :
                                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                                }
                                            </ListItemAvatar>
                                            <ListItemText
                                                // primary={comment.commentedBy.firstname + " " + comment.commentedBy.lastname}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                            fontFamily='Public Sans'
                                                        >
                                                            {comment.commentedBy.firstname + " " + comment.commentedBy.lastname}
                                                        </Typography>
                                                        {` — ${comment.comment}…`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </CardContent>
            </Collapse>
            <CardContent sx={{ py: '3px' }}>
                <Typography fontSize={12} fontWeight={400} color="#637381" fontFamily='Public Sans' >
                    3 hrs ago
                </Typography>
            </CardContent>
            <Divider />
            <Stack flexDirection={'row'} alignItems='center' sx={{ width: 400, height: 40 }}>
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
                    sx={{ width: '100%' }}
                    InputProps={{ disableUnderline: true, style: { fontSize: 14, fontFamily: 'Public Sans', fontWeight: 400, marginTop: 4 } }}
                />
                <Button sx={{ textTransform: 'none' }}>
                    <Typography component={'div'} fontSize={15} fontWeight={600} color='#1890FF' >
                        Post
                    </Typography>
                </Button>
            </Stack>
            <PostModal open={open} handleClose={handleClose} image={image} _id={_id} {...props} />

        </Paper >
    );
}
