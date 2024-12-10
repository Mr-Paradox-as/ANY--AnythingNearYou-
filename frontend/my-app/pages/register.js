import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
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

const TypewriterText = styled('div')({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#3b75ab',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  borderRight: '3px solid transparent',
  width: '100%',
  animation: 'typing 3s steps(40, end), blink 0.75s step-end infinite',
  '@keyframes typing': {
    from: { width: '0%' },
    to: { width: '100%' },
  },
  '@keyframes blink': {
    from: { borderColor: 'transparent' },
    to: { borderColor: '#FFD700' },
  },
});


export default function RegisterPage() {
  const router = useRouter();

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
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
            color: '#ECF0F1'
          }}
        >
          <CustomLogo />
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <TypewriterText>Connect - Share - Thrive</TypewriterText>
          </Box>
          <TextField fullWidth variant="outlined" size="small" label="Full Name" sx={{ marginBottom: 2 }} />
          <TextField fullWidth variant="outlined" size="small" label="Email" sx={{ marginBottom: 2 }} />
          <TextField fullWidth variant="outlined" size="small" label="Password" type="password" sx={{ marginBottom: 2 }} />
          <TextField fullWidth variant="outlined" size="small" label="Phone Number" sx={{ marginBottom: 2 }} />
          <TextField fullWidth variant="outlined" size="small" label="User Type" sx={{ marginBottom: 2 }} />
          <TextField fullWidth variant="outlined" size="small" label="Institution" sx={{ marginBottom: 3 }} />
          <Button
            variant="contained"
            fullWidth
            sx={{
            backgroundColor: '#4A90E2', // Base color matching header
            color: '#ECF0F1', // Text color for good contrast
            fontWeight: 'bold',
            padding: '10px 0',
            borderRadius: '8px',
              '&:hover': {
              backgroundColor: '#357ABD', 
          },
          }}
          >
          Register
          </Button>

          <Typography
            variant="body2"
            sx={{
              marginTop: 3,
              color: '#2C3E50',
            }}
          >
            Already have an account?{' '}
            <span
              onClick={() => router.push('/login')}
              style={{
                color: '#4A90E2',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              Login here
            </span>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}
