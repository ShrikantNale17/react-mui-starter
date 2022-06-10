import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import history from "../../../routes/history";
import { Divider, Stack } from "@mui/material";
import google_logo from '../../../stories/assets/flat-color-icons_google.svg'

export default function Login() {
	// Initial hooks
	const [isButtonDisabled, setButtonDisabled] = useState(false);
	const { register, handleSubmit } = useForm();
	const theme = createTheme();
	console.log("called")
	/*
	 * Verify Credentials
	 */
	const doLogin = (formData: any) => {
		console.log(formData)
		setButtonDisabled(true);
		authenticationService
			.verifyCredentials(formData)
			.then((response: any) => {
				setButtonDisabled(false);
			})
			.catch((error) => {
				setButtonDisabled(false);
			});
	};
	/*
	 * Render
	 */
	return (
		<ThemeProvider theme={theme}>
			<Stack height={'100vh'} maxWidth="xs" alignItems={'center'} justifyContent={'center'}>
				<CssBaseline />
				<Box
					sx={{
						// marginTop: 10,
						width: '400px',
						minWidth: '450px',
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: '32px',
						padding: '32px 16px',
						boxShadow: '-1px -1px 4px rgba(33, 43, 54, 0.1), 2px 2px 4px rgba(33, 43, 54, 0.2)',
						borderRadius: '8px'
					}}
				>
					<Typography fontSize={24} fontWeight={700} fontStyle='normal' fontFamily={'Public Sans'} color='#212B36'>
						Sign in to Social Feed
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(doLogin)}
						noValidate
						gap={'15px'}
						sx={{ width: '95%', display: 'flex', flexDirection: 'column' }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							defaultValue="shrikantnale17@gmail.com"
							id="email"
							label="Email Address"
							// name="email"
							autoComplete="email"
							{...register('email', { required: 'email is required' })}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							// name="password"
							label="Password"
							defaultValue="Shrikant@123"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password', { required: 'password is required' })}
						/>
						{/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							loading={isButtonDisabled}
						>
							Sign In
						</LoadingButton>
						{/* <Grid container> */}
						{/* <Grid item xs> */}
						<Link underline="none" color={'#637381'} sx={{ cursor: 'pointer' }} variant="body1" fontSize={16} fontWeight={400} fontFamily='Public Sans' ml={'auto'}>
							Forgot password?
						</Link>
						{/* </Grid> */}
						{/* <Grid item> */}
						<Typography color={'#637381'} variant="body1" fontSize={16} fontWeight={400} fontFamily='Public Sans' mr={'auto'}>
							{"Don't have an account? "}
							<Link underline="none" onClick={() => history.push('/auth/register')} sx={{ cursor: 'pointer' }} variant="body1" fontSize={16} fontWeight={400} fontFamily='Public Sans'>
								Sign Up
							</Link>
						</Typography>

						<Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent='center' alignItems={'center'} overflow='hidden'>
							<Divider sx={{ width: '100%' }} />
							<Typography variant="subtitle2" fontSize={14} fontWeight={600} fontFamily='Public Sans' color={'#637381'}>
								OR
							</Typography>
							<Divider sx={{ width: '100%' }} />

						</Box>
						<Link underline="none" sx={{ cursor: 'pointer' }}>
							<Box m={'0 auto'} width={'70%'} gap={'8px'} border={'1px solid rgba(145, 158, 171, 0.24)'} borderRadius={'8px'} p={'11px 22px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
								<img src={google_logo} alt='google-logo' width={'24px'} height={'24px'}></img>
								<Typography fontSize={15} fontWeight={600} fontFamily={'Public Sans'} color='rgba(145, 158, 171, 0.8)'>
									Sign in with Google
								</Typography>
							</Box>
						</Link>
						{/* </Grid> */}
						{/* </Grid> */}
					</Box>
				</Box>
			</Stack>
		</ThemeProvider>
	);
}
