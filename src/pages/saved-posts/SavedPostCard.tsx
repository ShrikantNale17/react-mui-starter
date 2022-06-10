import { CardMedia, Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'

const SavedPostCard = (props: any) => {
    const { post, handleOpen } = props;

    const [loading, setLoading] = useState(true);

    const handleLoading = () => {
        console.log("loaded");
        setLoading(false);
    }

    return (
        <>
            {
                !loading ?
                    <CardMedia
                        component="img"
                        width='100%'
                        height='100%'
                        image={`http://localhost:8080/${post.image[0].filename}`}
                        alt={post.image[0].filename}
                        sx={{ objectFit: 'cover', maxHeight: '250px', cursor: 'pointer' }}
                        onClick={() => handleOpen(post)}
                    /> :
                    <>
                        <Skeleton variant='rectangular' width={'100%'} height={'100%'} />
                        <CardMedia
                            component="img"
                            width='100%'
                            height='100%'
                            image={`http://localhost:8080/${post.image[0].filename}`}
                            onLoad={() => handleLoading()}
                            alt={post.image[0].filename}
                            sx={{ objectFit: 'cover', maxHeight: '250px', cursor: 'pointer', display: 'none' }}
                        />
                    </>
            }
        </>
    )
}

export default SavedPostCard