import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function BioCard() {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
        bgcolor: '#1E1E1E', // Black background
        color: 'white', // Text color
        border: '1px solid #333', // Subtle border for definition
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar
          src="/static/images/avatar/1.jpg"
          sx={{
            '--Avatar-size': '4rem',
            border: '2px solid #444', // Subtle border for avatar
          }}
        />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: '#1E1E1E',
            color: '#FFF',
            backgroundColor: '#333',
          }}
        >
          PRO
        </Chip>
        <Typography level="title-lg" sx={{ color: 'white' }}>
          Josephine Blanton
        </Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch', color: '#aaa' }}>
          Hello, this is my bio and I am a PRO member of MUI. I am a developer and I
          love to code.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
            '& > button': { borderRadius: '2rem' },
          }}
        >
          <IconButton
            size="sm"
            variant="plain"
            sx={{ color: '#ECF0F1', '&:hover': { bgcolor: '#ECF0F1' } }}
          >
            <SvgIcon>
              {/* Add your SVG path here */}
            </SvgIcon>
          </IconButton>
          {/* Repeat IconButton components for other icons */}
        </Box>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button>Message</Button>
            <Button>Connect</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>

    </Card>
  );
}
