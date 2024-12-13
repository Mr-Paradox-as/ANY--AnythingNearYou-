import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import SvgIcon from '@mui/joy/SvgIcon';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';

export default function Biocard({ users }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      }}
    >
      {users.length > 0 ? (
        users.map((user, index) => (
          <Card
            key={user.id || index}
            sx={{
              width: 360,
              maxWidth: '100%',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              borderRadius: '20px',
              overflow: 'hidden',
              bgcolor: '#fff',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              },
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                py: 4,
                background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
              }}
            >
              <Avatar
                src="/static/images/avatar/1.jpg"
                sx={{
                  '--Avatar-size': '6rem',
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
                }}
              />
              <Typography
                level="h5"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  color: '#333',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {user.full_name}
              </Typography>
              <Chip
                size="sm"
                variant="soft"
                color="primary"
                sx={{
                  mb: 1.5,
                  px: 3,
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                }}
              >
                {user.user_type}
              </Chip>
              <Typography
                level="body-sm"
                sx={{
                  maxWidth: '28ch',
                  mb: 2,
                  color: 'text.secondary',
                  fontStyle: 'italic',
                }}
              >
                {user.institution || 'No institution provided'}
              </Typography>
              <Divider sx={{ width: '80%', mx: 'auto', mb: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <IconButton size="sm" variant="soft" color="primary">
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
                <IconButton size="sm" variant="soft" color="primary">
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
              </Box>
              <TextField
                placeholder="Message this user"
                variant="soft"
                sx={{
                  width: '80%',
                  mt: 2,
                  borderRadius: '10px',
                  background: '#f9f9f9',
                }}
              />
              <Button
                variant="solid"
                color="primary"
                sx={{ mt: 2, px: 4, borderRadius: '20px', fontWeight: 'bold' }}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}
