import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const CustomLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="150" height="50">
    <circle cx="200" cy="100" r="80" fill="#b3ffff" opacity="0.1" />
    <path d="M160 120 C140 120, 140 80, 160 80 C180 80, 180 120, 160 120Z" fill="#4A90E2" />
    <path d="M240 120 C220 120, 220 80, 240 80 C260 80, 260 120, 240 120Z" fill="#4A90E2" />
    <path d="M180 100 L220 100" stroke="#4A90E2" strokeWidth="4" />
    <path d="M200 60 L210 75 Q200 90 190 75Z" fill="#FF6B6B" />
    <text
      x="200"
      y="150"
      fontFamily="Arial, sans-serif"
      fontSize="24"
      fontWeight="bold"
      textAnchor="middle"
      fill="#FFFFFF"
    >
      AnythingNearYou
    </text>
    <text x="200" y="170" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" fill="#FFFFFF">
      Connect • Share • Thrive
    </text>
  </svg>
);

export default function ResponsiveAppBar({ pages = ['Users', 'Resource', 'Inbox', 'Account'], settings = ['Profile', 'Logout'] }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login status

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#2C3E50',
        borderRadius: '0 0 16px 16px',
        marginBottom: 3, // Added marginBottom here for spacing below the AppBar
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 24px',
        }}
      >
        {/* Custom Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)', // Floating effect
            },
          }}
        >
          <CustomLogo />
        </Box>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#4A90E2' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '60%',
              borderRadius: '8px',
              backgroundColor: '#ECF0F1',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1ABC9C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A90E2',
                },
              },
            }}
          />
        </Box>

        {/* Navigation Menu */}
        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            justifyContent: 'flex-end', // Align items to the right
            gap: 2,
          }}
        >
          {pages.map((page) => (
            <Link
              key={page}
              href={
                page === 'Users'
                  ? '/users' // Always redirect to /users
                  : page === 'Resource'
                  ? '/resources'
                  : page === 'Account' && !isLoggedIn
                  ? '/login'
                  : `/${page.toLowerCase()}`
              }
              passHref
            >
              <Button
                key={page}
                onClick={() => {
                  if (page === 'Account' && !isLoggedIn) {
                    window.location.href = '/login'; // Redirect if not logged in
                  } else {
                    handleCloseNavMenu();
                  }
                }}
                sx={{
                  my: 2,
                  color: '#ECF0F1',
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: '#1ABC9C',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {page === 'Account' && !isLoggedIn ? 'Login' : page}
              </Button>
            </Link>
          ))}
        </Box>

        {/* User Menu */}
        {isLoggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
