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
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Grid, Link, ListItemButton, Menu, Paper, Stack, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch } from 'react-redux'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';


import PostCaption from './PostCaption';
import Actions from './PostCardActions';
import Media from './CardMedia';
import { commentOnPost, likePost } from './card-slice/CardSlice';
import PostModal from '../modal/PostModal'
import PostCardHeader from './PostCardHeader';
import PostCardActions from './PostCardActions';
import CommentField from './CommentField';
import { baseURL } from '../../utils/constants/urls';
import { patch } from '../../utils/http/httpMethods';
import { savePost } from '../../pages/saved-posts/savePost-slice/SavedPostSlice';


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

const emojiArr = ["😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😍", "🥰", "😇", "🤩", "🤑", "🤪", "🤔"]

function Post(props: any) {

    const dispatch = useDispatch();
    var currentUser: any = localStorage.getItem("currentUser")
    currentUser = JSON.parse(currentUser);

    const { _id, caption, location, comments, image, likes, createdBy, createdAt } = props;

    const [loading, setLoading] = React.useState(true)
    const [expanded, setExpanded] = React.useState(false);
    const [play, setPlay] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    // console.log(page)

    const handleClicked = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosed = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setPlay(false)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setPlay(true)
    }

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
        patch(`/posts/${_id}/like`);
        // const temp_likes = likes.find((user: any) => user._id === currentUser._id) ? likes.filter((user: any) => user._id !== currentUser._id) : [...likes, { _id: currentUser._id, firstname: currentUser.firstname, lastname: currentUser.lastname, image: currentUser.image, email: currentUser.email }];
        // console.log({ ...props, likes: temp_likes })
        const payload = {
            _id,
            currentUser: {
                _id: currentUser._id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                image: currentUser.image,
                email: currentUser.email
            }
        }
        dispatch(likePost(payload));
    }

    const handleComment = async (comment: String) => {
        const res = await patch(`/posts/${_id}/comment`, { comment });
        console.log(res);
        // const commentObj = {
        //     comment: { comment },
        //     commentedBy: {
        //         ...currentUser
        //     },
        //     replies: []
        // }
        const temp_comments = [...comments, res];
        console.log(temp_comments);
        dispatch(commentOnPost({ ...props, comments: temp_comments }));
    }

    const handleSavedPosts = () => {
        patch(`/users/${currentUser._id}/savePost/${_id}`);
        dispatch(savePost({ ...props }))
    }

    return (
        <Paper elevation={2} sx={{ width: 400, my: 2, fontFamily: 'Public Sans' }} >

            <PostCardHeader _id={_id} createdBy={createdBy} location={location} />
            <Divider />
            {image ?
                loading ?
                    <>
                        <Skeleton sx={{ width: '100%', height: '400px' }} animation="wave" variant="rectangular" />
                        <CardMedia
                            component="img"
                            width='100%'
                            image={`${baseURL}/${image[0]?.filename}`}
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
                        <Media height={'350px'} image={image} postId={_id} play={play} />
                    </VisibilitySensor>
                :
                <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
            }
            <Divider />

            <PostCardActions handleLike={handleLike} handleOpen={handleOpen} handleSavedPosts={handleSavedPosts} {...props} />

            {likes?.length > 0 &&
                <CardContent sx={{ py: '2px' }}>
                    <Typography variant="body2" color="#000000" fontSize={14} fontWeight={400} fontFamily='Public Sans' >
                        {likes.length > 1 ? `${likes.length} likes` : `1 like`}
                    </Typography>
                </CardContent>
            }

            <PostCaption {...props} />
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

            {/* <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ pb: 0 }}>
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
            </Collapse> */}

            <CardContent sx={{ py: '3px' }}>
                <Typography fontSize={12} fontWeight={400} color="#637381" fontFamily='Public Sans' >
                    3 hrs ago
                </Typography>
            </CardContent>

            <Divider />

            {/* <Stack flexDirection={'row'} alignItems='center' sx={{ width: 400, height: 40 }}>
                {/* <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> 
                <IconButton aria-label="emoji" sx={{ marginLeft: '5px' }}>
                    <SentimentSatisfiedAltIcon />
                </IconButton>
                <TextField
                    id="standard-multiline-flexible"
                    // label="add comment"
                    placeholder='Add your comment...'
                    multiline
                    maxRows={1}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="standard"
                    sx={{ width: '100%' }}
                    InputProps={{ disableUnderline: true, style: { fontSize: 14, fontFamily: 'Public Sans', fontWeight: 400, marginTop: 4 } }}
                />
                <Button sx={{ textTransform: 'none' }}>
                    <Typography component={'div'} fontSize={15} fontWeight={600} fontFamily='Public Sans' color='#1890FF' >
                        Post
                    </Typography>
                </Button>
            </Stack> */}
            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClosed}
            > */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClosed}
                onClick={handleClosed}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                        borderRadius: 2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: 0,
                            left: 15,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <Grid width={'250px'} container columnSpacing={0}>
                    {
                        emojiArr.map((emoji, index) => {
                            return (
                                <Grid item sm={2.4} justifyContent={'center'} alignItems={'center'}>
                                    <IconButton>
                                        <Avatar src={emoji} sx={{ ml: '0px' }} />
                                    </IconButton>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {/* <MenuItem>
						<Avatar /> Profile
					</MenuItem>
					<MenuItem>
						<Avatar /> My account
					</MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        {/* <ManageAccountsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Edit Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <LockResetOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Change Password
                </MenuItem>

                <Divider />

                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem> */}
            </Menu>
            {/* </Backdrop> */}
            <CommentField handleComment={handleComment} handleClicked={handleClicked} />

            <PostModal open={open} handleClose={handleClose} handleLike={handleLike} handleComment={handleComment} handleSavedPosts={handleSavedPosts} {...props} />

        </Paper >
    );
}

export default React.memo(Post);
