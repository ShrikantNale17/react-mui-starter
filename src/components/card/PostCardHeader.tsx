import React from 'react'
import { Avatar, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { red } from '@mui/material/colors';


const PostCardHeader = (props: any) => {

    const { _id, createdBy } = props;

    return (
        <CardHeader
            sx={{ height: 20 }}
            avatar={
                createdBy ?
                    <Avatar sx={{ bgcolor: red[500], height: 35, width: 35 }} aria-label="profile_pic" src={`http://localhost:8080/${createdBy.image}`}>
                        {createdBy.firstname.charAt(0) + createdBy.lastname.charAt(0)}
                    </Avatar> :
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={createdBy ?
                <Typography fontSize={14} fontWeight={600} fontFamily='Public Sans'>
                    {createdBy.firstname + ' ' + createdBy.lastname}
                </Typography> :
                <Skeleton
                    animation="wave"
                    height={25}
                    width="80%"
                />}
            subheader={_id ?
                <Typography fontSize={12} fontWeight={400} fontFamily='Public Sans' color='#637381'>
                    {_id}
                </Typography> :
                <Skeleton
                    animation="wave"
                    height={15}
                    width="60%"
                />}
        />
    )
}

export default PostCardHeader