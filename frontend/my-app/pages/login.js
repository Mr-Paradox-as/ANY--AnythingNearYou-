import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import ResponsiveAppBar from "@/components/header";

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

const AnimatedBox = styled(Box)({
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
});

const AnimatedText = styled(Typography)({
  animation: 'textAnimation 3s ease-out forwards',
  '@keyframes textAnimation': {
    '0%': {
      transform: 'translateY(50px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
});

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      {/* Responsive AppBar */}
      <ResponsiveAppBar />
      
      {/* Animated Title Text */}
      <AnimatedText
  variant="h4"
  sx={{
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: -15, // Reduced gap between tagline and card
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  }}
>
  Moving One City to Another <br />
  <span style={{ color: '#FFD700' }}>Grab What You Need, Give What You Don't!</span>
</AnimatedText>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    marginTop: 1, // Reduced gap between tagline and card
  }}
>
  <Paper
    elevation={12}
    sx={{
      width: '100%',
      maxWidth: 400,
      padding: 4,
      borderRadius: '16px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #8585ad, #ffffff)',
    }}
  >
    <AnimatedBox sx={{ marginBottom: 3 }}>
      <CustomLogo />
    </AnimatedBox>

    <Typography variant="h5" fontWeight="bold" sx={{ color: '#2C3E50', marginBottom: 2 }}>
      Welcome Back!
    </Typography>
    <Typography variant="body1" sx={{ color: '#7F8C8D', marginBottom: 4 }}>
      Login to your account to continue.
    </Typography>

    <TextField fullWidth variant="outlined" size="small" label="Email" sx={{ marginBottom: 2 }} />
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      label="Password"
      type="password"
      sx={{ marginBottom: 3 }}
    />
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#4A90E2',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px 0',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: '#357ABD',
        },
      }}
    >
      Login
    </Button>

    <Typography
      variant="body2"
      sx={{
        color: '#4A90E2',
        marginTop: 2,
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      Forgot your password?
    </Typography>

    {/* Register Link */}
    <Typography
      variant="body2"
      sx={{
        marginTop: 3,
        color: '#2C3E50',
      }}
    >
      Don't have an account?{' '}
      <span
        onClick={() => router.push('/register')}
        style={{
          color: '#4A90E2',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Register here
      </span>
    </Typography>
  </Paper>
</Box>
    </div>
  );
}
