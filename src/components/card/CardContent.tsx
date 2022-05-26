import React from 'react'
import { CardContent, Skeleton, Typography } from '@mui/material';

const Content = (props: any) => {
    const { caption } = props
    console.log("content...............")
    return (
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
    )
}

export default React.memo(Content)