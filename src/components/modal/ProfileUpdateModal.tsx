import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring/dist/react-spring.cjs';
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';


import addPhotoIcon from '../../stories/assets/ic_add_a_photo.svg';

interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 17,
    height: 17,
    padding: 3,
    background: '#FAFAFA',
    border: '1px solid #DCE0E4',
    // border: `2px solid ${theme.palette.background.paper}`,
}));

export default function ProfileUpdateModal(props: any) {

    const { open, handleCloseModal } = props;

    const { register, handleSubmit, control, formState: { errors }, getValues, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            address: '',
            state: '',
            city: '',
            DOB: null,
            gender: '',
            password: '',
            hobbies: [],
            cs: ''
        }
    })

    const handlePhoneNumber = (value: any) => {
        console.log(value)
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton sx={{ position: 'absolute', top: '0px', right: '5px' }}>
                        x
                    </IconButton>
                    <Stack gap={2}>
                        <Stack alignItems={'center'} gap={2}>
                            <Typography id="spring-modal-title" fontSize={24} fontWeight={700} fontFamily={'Public Sans'} color='#212B36'>
                                Profile Update
                            </Typography>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt="Remy Sharp" src={addPhotoIcon} />
                                }
                            >
                                <Avatar alt="Travis Howard" src="" sx={{ width: 60, height: 60 }} />
                            </Badge>
                        </Stack>
                        <Stack gap={2}>
                            <TextField
                                margin="none"
                                size='small'
                                // required
                                fullWidth
                                // defaultValue="shrikantnale17@gmail.com"
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete='off'
                            // {...register('email', { required: 'email is required' })}
                            />
                            <TextField
                                margin="none"
                                size='small'
                                // required
                                fullWidth
                                // defaultValue="shrikantnale17@gmail.com"
                                id="email"
                                label="Email id"
                                name="email"
                                autoComplete="off"
                            // {...register('email', { required: 'email is required' })}
                            />
                            <TextField
                                id="outlined-textarea"
                                // label="Bio"
                                placeholder="Enter your bio here.."
                                multiline
                                rows={3}
                            />
                            <FormControl sx={{ color: '#919EAB' }}>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 16 }}>Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="male" control={<Radio color='success' />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio color='success' />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio color='success' />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormControl>
                                    <Controller
                                        render={({ field }) =>
                                            <DatePicker
                                                // disableFuture
                                                label="Date of Birth"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                inputFormat={'dd/MM/yyyy'}
                                                value={getValues('DOB')}
                                                onChange={field.onChange}

                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        }
                                        {...register('DOB', {
                                            required: 'please enter your DOB'
                                        })}
                                        control={control}
                                    />
                                    {/* <FormHelperText>{errors.DOB?.message}</FormHelperText> */}
                                </FormControl>
                            </LocalizationProvider>
                            <MuiPhoneNumber defaultCountry={'in'} onChange={handlePhoneNumber} />
                        </Stack>
                        <Button variant='contained' sx={{ textTransform: 'none' }}>
                            Save Profile
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
