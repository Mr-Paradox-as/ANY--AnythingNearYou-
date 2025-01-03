import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper, Avatar, Divider, Grid, Button, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import ResponsiveAppBar from '@/components/header';

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('access_token'); // Fetch token from localStorage

      if (!token) {
        setError('Unauthorized. Please log in.');
        setLoading(false);
        router.push('/login'); // Redirect to login page if token is missing
        return;
      }

      try {
        const profileResponse = await fetch('http://127.0.0.1:8000/api/users/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const resourceResponse = await fetch('http://127.0.0.1:8000/api/resources/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok || !resourceResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const profileData = await profileResponse.json();
        const resourceData = await resourceResponse.json();

        setProfile(profileData);
        setResources(resourceData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px', backgroundColor: '#121212', color: '#fff' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 4,
          backgroundColor: '#121212',
          color: '#fff',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 4,
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#1E1E1E',
            color: '#fff',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Avatar
              alt={profile.full_name}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: 2 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {profile.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.email}
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 3, backgroundColor: '#424242' }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>ID:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {profile.id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Phone Number:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {profile.phone_number}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>User Type:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {profile.user_type}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Institution:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {profile.institution}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Created At:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {new Date(profile.created_at).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Active:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color={profile.is_active ? 'green' : 'red'}>
                {profile.is_active ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 3, backgroundColor: '#424242' }} />
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Resources You Are Sharing
          </Typography>
          {resources.length > 0 ? (
            <List>
              {resources.map((resource) => (
                <ListItem key={resource.id} sx={{ backgroundColor: '#2E2E2E', borderRadius: 2, marginBottom: 1 }}>
                  <ListItemText
                    primary={resource.name}
                    secondary={`Category: ${resource.category} | Status: ${resource.status}`}
                    sx={{ color: '#fff' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              You are not sharing any resources.
            </Typography>
          )}
          <Divider sx={{ marginY: 3, backgroundColor: '#424242' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={() => router.push('/edit-profile')}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                localStorage.removeItem('access_token');
                router.push('/login');
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
