import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import SendIcon from '@mui/icons-material/Send';

export default function Biocard({ full_name, email, institution, active }) {
  const [message, setMessage] = React.useState('');
  const [messageSent, setMessageSent] = React.useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessageSent(message);
      setMessage('');
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: 360,
          height: 'auto',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(29,29,29,0.9), rgba(45,45,45,0.9))',
          position: 'relative',
          border: '#2C3E50',
          overflow: 'hidden',
        }}
      >
        {/* User Details */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            py: 2,  // Reduced padding for less gap
            marginTop: 0,  // Ensured no top margin to reduce gap
          }}
        >
          <Avatar
            src="/static/images/avatar/1.jpg"
            sx={{
              '--Avatar-size': '80px',
              mb: 2,
              border: '4px solid',
              
            }}
          />
          <Typography
            level="h4"
            fontWeight="bold"
            sx={{
              color: '#ECF0F1', // Neon text color
              mb: 1,
              textShadow: '0 0 5px rgba(0,255,255,0.5)', // Neon glow
            }}
          >
            {full_name || 'John Doe'}
          </Typography>
          
          {/* Active status chip */}
          <Chip
            size="md"
            variant="solid"
            color={active ? 'success' : 'error'}
            sx={{
              mb: 2,
              background: active ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)',
              color: '#fff',
              border: '1px solid #00ff00',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {active ? 'Active' : 'Inactive'}
          </Chip>

          <Typography
            level="body-sm"
            sx={{ color: '#ECF0F1', fontSize: '14px' }}
          >
            {institution || 'Institution Name'}
          </Typography>
          <Divider
            sx={{
              width: '100%',
              mt: 2,
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          />
        </CardContent>

        {/* Messaging Part */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            pb: 2,
          }}
        >
          <Input
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              flex: 1,
              borderRadius: '8px',
              background: '#2a2a2e',
              color: '#fff',
              // border: '1px solid #00ffff',
              boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)',
              '&:focus-within': {
                borderColor: '#ff00ff', // Pink focus neon effect
              },
              transition: 'all 0.2s ease-in-out',
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{
              ml: 1,
              background:
                'linear-gradient(145deg, rgba(0,255,255,0.9), rgba(255,0,255,0.9))',
              color: '#fff',
              '&:hover': {
                background:
                  'linear-gradient(145deg, rgba(0,255,255,1), rgba(255,0,255,1))',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        {/* Sent Message */}
        {messageSent && (
          <Box
            sx={{
              textAlign: 'center',
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: '#00ff00',
                fontWeight: 'medium',
                textShadow: '0 0 5px rgba(0,255,0,0.5)',
              }}
            >
              Sent: "{messageSent}"
            </Typography>
          </Box>
        )}
      </Card>
    </div>
  );
}
