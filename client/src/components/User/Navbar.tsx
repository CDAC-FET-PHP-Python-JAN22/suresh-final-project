import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from 'react-router-dom';
import { type } from "@testing-library/user-event/dist/type";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type NavbarProps = {
  isLoggedin: boolean;
}

function Navbar({ isLoggedin }: NavbarProps) {

  const publishLink = isLoggedin ? <Link to="newspublish" style={{ textDecoration: 'none', color: "inherit" }}>Create Story</Link> : <Link to="login" style={{ textDecoration: 'none', color: "inherit" }}>Create Story</Link>

  const authLink = isLoggedin ? <Link to="logout" style={{ textDecoration: 'none', color: "inherit" }}>Logout</Link> : <Link to="login" style={{ textDecoration: 'none', color: "inherit" }}>Login</Link>
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={Link} to="/newspublish"
           
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}
          >
            {publishLink}
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
          </Box>


          <Button color="inherit" component={Link} to="/">
            <Box component="span" >Home</Box>
          </Button>
          <Button color="inherit" component={Link} to="/login">
            <Box component="span" >{authLink}</Box>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
