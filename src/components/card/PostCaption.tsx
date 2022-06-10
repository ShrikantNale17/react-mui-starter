import React from 'react'
import { CardContent, Skeleton, Stack, Typography } from '@mui/material';

const PostCaption = (props: any) => {
    const { caption, createdBy } = props
    // console.log("content...............")
    return (
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
    )
}

export default React.memo(PostCaption)