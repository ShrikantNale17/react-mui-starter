import React from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { authenticationService } from "../../utils/auth.service";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;

};

export const Navbar = ({ onLogout }: NavbarProps) => {

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{ flex: 1 }}
        >
          MUI Template
        </Typography>
        <Tooltip title="Logout">
          <Button variant="text" style={{ color: '#fff' }} onClick={onLogout}>
            <Logout />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
