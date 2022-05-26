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
import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { Paper } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch } from 'react-redux'

import Content from './CardContent';
import Actions from './CardActions';
import Media from './CardMedia';
import CardCarousel from './Carousel';
import { likePost } from './card-slice/CardSlice';


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

    const [loading, setLoading] = React.useState(true)
    const [expanded, setExpanded] = React.useState(false);
    const [play, setPlay] = React.useState(false);

    const handleExpandClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const isLoaded = async () => {
        setLoading(false)
    }

    const isInViewport = (id: any) => {
        const el: any = document.getElementById(`${id}`)

        const rect = el.getBoundingClientRect();
        console.log(id);
        console.log(rect);
        console.log(window.innerHeight);
        return (
            rect?.top >= 0 &&
            rect?.left >= 0 &&
            rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            // rect?.bottom >= 0 &&
            rect?.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
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
        <Paper elevation={12} sx={{ width: 400, my: 2 }} >
            <CardHeader
                avatar={
                    createdBy ?
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="profile_pic" src={`http://localhost:8080/${createdBy.image}`}>
                            {createdBy.firstname.charAt(0) + createdBy.lastname.charAt(0)}
                        </Avatar> :
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={createdBy ?
                    createdBy.firstname + ' ' + createdBy.lastname :
                    <Skeleton
                        animation="wave"
                        height={25}
                        width="80%"
                    // style={{ marginBottom: 2 }}
                    />}
                subheader={_id ?
                    _id :
                    <Skeleton
                        animation="wave"
                        height={15}
                        width="60%"
                    // style={{ marginBottom: 6 }}
                    />}
            />
            {/* {image ?
                loading ?
                    <>
                        <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
                        <CardMedia
                            component="img"
                            width='100%'
                            image={`http://localhost:8080/${image[0].filename}`}
                            alt="Paella dish"
                            onLoad={() => isLoaded()}
                            sx={{ objectFit: 'cover', maxHeight: '300px', display: 'none' }}
                        />
                    </> :
                    <CardMedia
                        component="img"
                        width='100%'
                        image={`http://localhost:8080/${image[0].filename}`}
                        alt="Paella dish"
                        onLoad={() => isLoaded()}
                        sx={{ objectFit: 'cover', maxHeight: '300px' }}
                    />
                :
                <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
            } */}
            {image ?
                loading ?
                    <>
                        <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
                        <CardMedia
                            component="img"
                            width='100%'
                            image={`http://localhost:8080/${image[0].filename}`}
                            alt="Paella dish"
                            onLoad={() => isLoaded()}
                            sx={{ objectFit: 'cover', maxHeight: '300px', display: 'none' }}
                        />
                    </> :
                    <VisibilitySensor
                        onChange={(isVisible: any) => {
                            setPlay(isVisible)
                        }}
                    >
                        <Media image={image} postId={_id} isInViewport={isInViewport} play={play} />
                    </VisibilitySensor>
                :
                <Skeleton sx={{ width: '100%', height: '300px' }} animation="wave" variant="rectangular" />
            }
            {/* <CardCarousel image={image} /> */}
            {/* <Content caption={m_caption} /> */}
            <CardContent>
                {
                    caption ?
                        <Typography variant="body2" color="text.secondary">
                            {caption}
                        </Typography> :
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        // style={{ marginBottom: 2 }}
                        />
                }
            </CardContent>
            {/* <Actions setLoading={setLoading} likes={m_likes} comments={m_comments} expanded={expanded} handleExpandClick={handleExpandClick} /> */}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    {
                        likes?.includes(currentUser._id) ?
                            <FavoriteIcon color='error' /> :
                            <FavoriteIcon />
                    }

                    {likes?.length}
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentOutlinedIcon />
                    {comments?.length}
                </ExpandMore>
                <IconButton aria-label="save post" sx={{ marginLeft: 'auto' }}>
                    <BookmarkBorderRoundedIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    {/* <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography> */}
                </CardContent>
            </Collapse>
        </Paper>
    );
}
