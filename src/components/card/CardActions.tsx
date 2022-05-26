import React from 'react'
import { CardActions, IconButton, IconButtonProps, styled } from '@mui/material'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

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

const Actions = (props: any) => {
    console.log("Actions..................")
    const { likes, comments, expanded, handleExpandClick, setLoading } = props;
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => setLoading((prev: any) => !prev)}>
                <FavoriteIcon />
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
            <IconButton aria-label="save" sx={{ marginLeft: 'auto' }}>
                <BookmarkBorderRoundedIcon />
            </IconButton>
        </CardActions>
    )
}

export default React.memo(Actions)