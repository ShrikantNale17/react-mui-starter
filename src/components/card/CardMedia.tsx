import React, { useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CardMedia from '@mui/material/CardMedia';
import { useInViewport } from 'react-in-viewport';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { useIntersection } from './useIntersection';
import HOC from './HOC';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const Media = (props: any) => {
    const { image, postId, activeStep, maxSteps, play, handleNext, handleBack, handleStepChange } = props
    const theme = useTheme();

    // const ref = useRef<any>();
    // const inViewport = useIntersection(ref, '0px');
    const myRef = useRef<any>();

    // const [activeStep, setActiveStep] = React.useState(0);
    // const maxSteps = image?.length;

    // const [play, setPlay] = useState(false);

    // const isInViewport = () => {
    //     const el = document.getElementById(`${postId}`)
    //     // console.log(el)
    //     const rect = el.getBoundingClientRect();
    //     console.log(postId);
    //     console.log(rect);
    //     console.log(window.innerHeight);
    //     return (
    //         rect?.top >= 0 &&
    //         rect?.left >= 0 &&
    //         rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         // rect?.bottom >= 0 &&
    //         rect?.right <= (window.innerWidth || document.documentElement.clientWidth)

    //     );
    // }

    // const handleNext = () => {
    //     console.log("next")
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     handlePlay();
    // };

    // const handleBack = () => {
    //     console.log("back")
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //     handlePlay();
    // };

    // const handleStepChange = (step: number) => {
    //     console.log("change");
    //     setActiveStep(step);
    //     handlePlay();
    // };

    // window.onscroll = () => {
    //     console.log("scroll");
    //     handlePlay()
    // }

    // const handlePlay = () => {
    //     if (isInViewport()) {
    //         console.log("true");
    //         setPlay(true)
    //     } else {
    //         console.log("false");
    //         setPlay(false)
    //     }
    // }


    return (
        <>
            {postId && image.length > 1 ?
                <>
                    <AutoPlaySwipeableViews
                        key={postId}
                        id={postId}
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                        autoplay={play}
                        ref={myRef}
                    >
                        {image?.map((data: any, index: any) => (
                            <div key={index}>
                                {Math.abs(activeStep - index) <= 2 ? (

                                    <CardMedia
                                        component="img"
                                        width='100%'
                                        image={`http://localhost:8080/${data.filename}`}
                                        alt="Paella dish"
                                        // onLoad={() => isLoaded()}
                                        sx={{ objectFit: 'cover', maxHeight: '300px' }}
                                    // ref={ref}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </ AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </> :
                <CardMedia
                    component="img"
                    width='100%'
                    image={`http://localhost:8080/${image?.[0].filename}`}
                    alt="Paella dish"
                    // onLoad={() => isLoaded()}
                    sx={{ objectFit: 'cover', maxHeight: '300px' }}
                />
            }

        </>
    )
}

export default HOC(Media)


{/* <Box
                            component="img"
                            sx={{
                                height: 300,
                                display: 'block',
                                maxWidth: 400,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            src={`http://localhost:8080/${step.filename}`}
                            alt={'step.label'}
                        /> */}