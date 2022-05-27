import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button, Stack, SvgIcon } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import "./Navbar.scss";
import { authenticationService } from "../../utils/auth.service";
import Logo from '../../stories/assets/logo.svg'

export type NavbarProps = {
	/**
	 * To be triggered on logout click
	 */
	onLogout?: any;

};

export const Navbar = ({ onLogout }: NavbarProps) => {

	const currentUser = authenticationService.currentUserValue;

	const [page, setPage] = useState('home')

	const handlePage = (value: any) => {
		setPage(value);
	}
	return (
		<AppBar position="fixed" color="inherit" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Toolbar variant="dense" sx={{ width: '70%', minWidth: '450px', justifyContent: 'space-between', alignItems: 'center' }}>
				<img src={Logo} alt="logo"></img>
				<Typography
					variant="h6"
					color="inherit"
					component="div"
					style={{ flex: 1, marginLeft: 10 }}
					fontFamily='Montserrat'
					fontSize={20}
					fontWeight={600}
				>
					Life @ AM
				</Typography>
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
					<IconButton aria-label="saved_posts" onClick={() => handlePage('saved_posts')}>
						{
							page === 'saved_posts' ?
								<BookmarkIcon /> :
								<BookmarkBorderOutlinedIcon />
						}
					</IconButton>
					<Button sx={{ textTransform: 'none' }}>
						<Avatar sx={{ width: 25, height: 25 }} aria-label="profile_pic" src={`http://localhost:8080/${currentUser.image}`}>
							{currentUser.firstname.charAt(0) + currentUser.lastname.charAt(0)}
						</Avatar>
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
		</AppBar>
	);
};
