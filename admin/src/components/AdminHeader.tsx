import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { type } from "@testing-library/user-event/dist/type";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';

type NavbarProps = {
  isLoggedin:boolean;
}

function Navbar({isLoggedin}:NavbarProps) {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const authLink = isLoggedin ? <Link to="logout" style={{textDecoration: 'none', color: "inherit"}}>Logout</Link> : <Link to="login" style={{textDecoration: 'none', color: "inherit"}}>Login</Link>
  return (
    <AppBar position="static">
      <Container maxWidth="xl">

        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                component = {Link} to="/admin/allnews"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                All News
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                component = {Link} to="/admin/statistics"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Statistics
              </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to="/admin/allnews">
                All News
              </MenuItem>
              <MenuItem component={Link} to="/admin/statistics">
                Statistics
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={Link} to="/"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', textDecoration: 'none' } }}
          >
            Home
          </Typography>

          <Button color="inherit" component={Link} to="/Admin/logout">
            <Box component="span" >logout</Box>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
