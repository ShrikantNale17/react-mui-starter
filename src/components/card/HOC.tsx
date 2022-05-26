import React, { useRef, useState } from 'react'

const HOC = (Component: any) => {
    const NewComponent = (props: any) => {

        const { image, isInViewport } = props
        const [postId, setPostId] = useState(props.postId)
        // const theme = useTheme();

        // const ref = useRef<any>();
        // const inViewport = useIntersection(ref, '0px');
        const myRef = useRef<any>();

        const [activeStep, setActiveStep] = React.useState(0);
        const maxSteps = image?.length;

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

        const handleNext = () => {
            console.log("next")
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            // handlePlay(postId);
        };

        const handleBack = () => {
            console.log("back")
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            // handlePlay(postId);
        };

        const handleStepChange = (step: number) => {
            // console.log("change");
            setActiveStep(step);
            // handlePlay(postId);
        };

        window.onscroll = () => {
            // console.log("scroll");
            // handlePlay(postId)
        }

        // const handlePlay = (id: any) => {
        //     if (isInViewport(id)) {
        //         console.log("true");
        //         setPlay(true)
        //     } else {
        //         console.log("false");
        //         setPlay(false)
        //     }
        // }
        return (
            <Component handleStepChange={handleStepChange} handleBack={handleBack} handleNext={handleNext} maxSteps={maxSteps} activeStep={activeStep} {...props} />
        )
    }
    return (
        NewComponent
    )
}

export default HOC