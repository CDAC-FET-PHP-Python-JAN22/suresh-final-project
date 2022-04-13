import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={Link} to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}
          >
            Home
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                component = {Link} to="/publish"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Publish News
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                component = {Link} to="/yournews"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Your News
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
              <MenuItem component={Link} to="/publish">
                Publish News
              </MenuItem>
              <MenuItem component={Link} to="/yournews">
                Your News
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

          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={Link} to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}
          >
            Logout
          </Typography>

          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={Link} to="/"
            sx={{mr:2, display: { xs: 'flex', md: 'none' }, textDecoration: 'none' }}
          >
            Logout
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
