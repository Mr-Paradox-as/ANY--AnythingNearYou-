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

const pages = ['Users', 'Feeds', 'Message'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const CustomLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="150" height="50">
      <circle cx="200" cy="100" r="80" fill="#b3ffff" opacity="0.1"/>
      <path d="M160 120 C140 120, 140 80, 160 80 C180 80, 180 120, 160 120Z" fill="#4A90E2"/>
      <path d="M240 120 C220 120, 220 80, 240 80 C260 80, 260 120, 240 120Z" fill="#4A90E2"/>
      <path d="M180 100 L220 100" stroke="#4A90E2" stroke-width="4"/>
      <path d="M200 60 L210 75 Q200 90 190 75Z" fill="#FF6B6B"/>
      <text x="200" y="150" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#2C3E50">
        AnythingNearYou
      </text>
      <text x="200" y="170" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" fill="#666">
        Connect • Share • Thrive
      </text>
    </svg>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#808080',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#333', // Darken on hover
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CustomLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  transform: 'scale(1.5)', // Scale on hover
                },
              }}
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    color: '#00BFFF', // Change color on hover
                    transform: 'scale(1.1)', // Scale button on hover
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  '&:hover': {
                    transform: 'scale(1.1)', // Scale avatar on hover
                  },
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
