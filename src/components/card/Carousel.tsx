import { CardMedia } from '@mui/material';
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const CardCarousel = (props: any) => {
    const { image } = props;
    return (
        <Carousel>
            {
                image?.map((item: any, i: number) =>
                    <CardMedia
                        component="img"
                        width='100%'
                        image={`http://localhost:8080/${item.filename}`}
                        alt="Paella dish"
                        // onLoad={() => isLoaded()}
                        sx={{ objectFit: 'cover', maxHeight: '300px' }}
                    />)
            }
        </Carousel>

    )
}

export default CardCarousel