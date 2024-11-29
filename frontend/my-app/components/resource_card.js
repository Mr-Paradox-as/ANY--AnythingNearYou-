import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getServerSideProps } from '@/pages/resources';

export default function ProductCard({ image, title, description, price, owner, location,resource_id, condition, negotiable, post_date }) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
        borderRadius: '16px', // Add rounded corners for a modern look
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)', // Slight zoom effect for hover
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(169, 169, 169, 0.5)",
          backgroundColor: '#f1f1f1', // Change background color on hover
        },
      }}
    >
      <CardOverflow sx={{ borderRadius: '16px 16px 0 0' }}>
        <AspectRatio sx={{ minWidth: 200, borderRadius: '16px 16px 0 0' }}>
          <img
            src={image || "https://via.placeholder.com/300"}
            loading="lazy"
            alt={title || "Product image"}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{"Location ~ " + location || "Default Product"}</Typography>
        <Link
          href={`/resource_details/${resource_id}`} // Link to the resource_details page
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
          sx={{
            fontWeight: 'md',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#00BFFF',
            },
          }}
        >
          {title || "No description available"}
        </Link>
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
                {negotiable ? "Negotiable" : "Not Negotiable"}
            </Chip>
          }
        >
          {price || "Price not available"}
        </Typography>
        <Typography level="body-sm">
          (Owner ~ <b>{owner || 0}</b> )
        </Typography>
      </CardContent>
      <CardOverflow sx={{ borderRadius: '0 0 16px 16px' }}>
        
        <Button
          variant="solid"
          size="lg"
          sx={{
            backgroundColor: "#87CEEB", // Sky blue color
            color: "#ffffff", // White text color
            borderRadius: '8px',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              backgroundColor: "#00BFFF", // Slightly darker sky blue on hover
              transform: 'scale(1.1)', // Button grows slightly on hover
            },
          }}
        >
          Request resource
        </Button>
      </CardOverflow>
    </Card>
  );
}
