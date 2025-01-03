import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import ResponsiveAppBar from '@/components/header';

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token'); // Fetch token from localStorage

      if (!token) {
        setError('Unauthorized. Please log in.');
        setLoading(false);
        router.push('/login'); // Redirect to login page if token is missing
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
    <ResponsiveAppBar/>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, width: '80%', maxWidth: '400px' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3, textAlign: 'center' }}>
          My Profile
        </Typography>
        <Typography variant="body1">
          <strong>ID:</strong> {profile.id}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="body1">
          <strong>Full Name:</strong> {profile.full_name}
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {profile.phone_number}
        </Typography>
        <Typography variant="body1">
          <strong>User Type:</strong> {profile.user_type}
        </Typography>
        <Typography variant="body1">
          <strong>Institution:</strong> {profile.institution}
        </Typography>
        <Typography variant="body1">
          <strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          <strong>Active:</strong> {profile.is_active ? 'Yes' : 'No'}
        </Typography>
      </Paper>
    </Box>
    </div>
  );
}
