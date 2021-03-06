import React, { useCallback, useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button, Divider, Menu, Stack, SvgIcon } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Backdrop from '@mui/material/Backdrop';

import "./Navbar.scss";
import { authenticationService } from "../../utils/auth.service";
import Logo from '../../stories/assets/Logo.svg'
import { Redirect } from "react-router-dom";
import history from "../../routes/history";
import { baseURL } from "../../utils/constants/urls";
import ProfileUpdateModal from "../modal/ProfileUpdateModal";

export type NavbarProps = {
	/**
	 * To be triggered on logout click
	 */
	onLogout?: any;
	userInfo: any;
};

export const Navbar = React.memo((props: any) => {

	const { page, handlePage } = props;

	console.log("Navbar 2")
	const currentUser = authenticationService.currentUserValue;

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		authenticationService.localLogout();
	}



	const [open, setOpen] = React.useState(false);
	const handleOpenModal = () => setOpen(true);
	const handleCloseModal = () => setOpen(false);

	/* useEffect(() => {
		console.log("redirect call")
		// handleRedirect();
	}, []) */

	/* const handlePage = async (value: any) => {
		setPage(value);
		console.log("page set")
		history.push(`/${value}`)
	} */

	/* const pageValue = useMemo(() => {
		return page
	}, [page]) */

	/* const handleRedirect = () => {
		console.log("Redirect")
		history.push(`/${page}`);
		// return (<Redirect to={`/${pageValue}`} />)
	} */

	// handleRedirect();

	return (
		<AppBar position="fixed" color="inherit" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Toolbar variant="dense" sx={{ width: '70%', minWidth: '450px', justifyContent: 'space-between', alignItems: 'center' }}>
				<img src={Logo} alt="logo"></img>
				{/* <Typography
					variant="h6"
					color="inherit"
					component="div"
					style={{ flex: 1, marginLeft: 10 }}
					fontFamily='Montserrat'
					fontSize={20}
					fontWeight={600}
				>
					Life @ AM
				</Typography> */}
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
				>
					<IconButton aria-label="home" onClick={() => handlePage('home')}>
						{
							page === 'home' ?
								<HomeIcon /> :
								<HomeOutlinedIcon />
						}
					</IconButton>
					<IconButton aria-label="add_photo" onClick={() => handlePage('add_photo')}>
						{
							page === 'add_photo' ?
								<AddAPhotoIcon /> :
								<AddAPhotoOutlinedIcon />
						}
					</IconButton>
					<IconButton aria-label="savedPosts" onClick={() => handlePage('savedPosts')}>
						{
							page === 'savedPosts' ?
								<BookmarkIcon /> :
								<BookmarkBorderOutlinedIcon />
						}
					</IconButton>
					<Button sx={{ textTransform: 'none' }} onClick={handleClick}>
						<IconButton sx={{ ml: 2, p: 0 }} aria-controls={openMenu ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined}>
							<Avatar sx={{ width: 28, height: 28, fontSize: 17 }} aria-label="profile_pic" src={`${baseURL}/${currentUser?.image}`}>
								{currentUser?.firstname.charAt(0) + currentUser?.lastname.charAt(0)}
							</Avatar>
						</IconButton>
						<Typography variant="body2" component={'div'} color='text.primary' ml={1} >
							Shrikant Nale
							{/* {currentUser.firstname + ' ' + currentUser.lastname} */}
						</Typography>
					</Button>

				</Stack>
				{/* <Tooltip title="Logout">
          <Button variant="text" onClick={onLogout}>
            <Logout />
          </Button>
        </Tooltip> */}
			</Toolbar>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openMenu}
			// onClick={handleClose}
			>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={openMenu}
					onClose={handleClose}
					// onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 0.5,
							borderRadius: 2,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 32,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
				>
					{/* <MenuItem>
						<Avatar /> Profile
					</MenuItem>
					<MenuItem>
						<Avatar /> My account
					</MenuItem> */}
					<MenuItem onClick={handleOpenModal}>
						<ListItemIcon>
							<ManageAccountsOutlinedIcon fontSize="small" />
						</ListItemIcon>
						Edit Profile
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<LockResetOutlinedIcon fontSize="small" />
						</ListItemIcon>
						Change Password
					</MenuItem>

					<Divider />

					<MenuItem onClick={onLogout}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
				<ProfileUpdateModal open={open} handleCloseModal={handleCloseModal} />
			</Backdrop>
		</AppBar>
	);
});

// export default React.memo(Navbar);