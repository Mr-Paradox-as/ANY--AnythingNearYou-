import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveAppBar from "@/components/header";

// Custom Logo Component
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

// Typewriter Effect Component
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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    user_type: '',
    institution: '',
  });

  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('🎉 Registration successful! Redirecting to login...', {
          position: 'top-right',
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <ToastContainer />
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
            color: '#ECF0F1',
          }}
        >
          <CustomLogo />
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <TypewriterText>Connect - Share - Thrive</TypewriterText>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="User Type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              sx={{ marginBottom: 3 }}
            />
            {error && (
              <Typography variant="body2" sx={{ color: 'red', marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#4A90E2',
                color: '#ECF0F1',
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
          </form>
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
