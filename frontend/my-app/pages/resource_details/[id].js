import * as React from 'react';
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/header";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BioCard from '@/components/profile_card';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/resources/${id}`);  // Fetch resource details from your API
    if (!res.ok) {
      throw new Error(`Failed to fetch resource with ID: ${id}`);
    }

    const data = await res.json();
    return {
      props: {
        resource: data,
      },
    };
  } catch (err) {
    console.error("Error fetching resource:", err);
    return {
      notFound: true,  // Return 404 if resource not found
    };
  }
}

export default function ResourceDetails({ resource }) {
  if (!resource) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Resource Not Found</h1>
          <p>Sorry, the resource you are looking for does not exist or has been removed.</p>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{resource.title} - Resource Details</title>
        <meta
          name="description"
          content={`Details of resource: ${resource.title}`}
        />
        <meta
          name="keywords"
          content={`${resource.title}, resources, ${resource.category}`}
        />
      </Head>
      <ResponsiveAppBar />
      <div className={styles.page}>
        <main 
          className={styles.main} 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            position: 'relative', // For absolute positioning of the profile card
          }}
        >
          {/* Left Card Section */}
          <Card
            sx={{
              minHeight: '550px',
              minWidth: '550px',
              flexShrink: 0,
              position: 'relative',
              transform: 'translate(-300px, -70px)', // Adjust position left and up
            }}
          >
            <CardCover>
              <img
                src={resource.photo || "/placeholder.png"}
                alt={resource.title || "Placeholder"}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 300px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 400px)',
              }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography level="title-lg" textColor="#fff">
                {resource.title}
              </Typography>
              <Typography
                startDecorator={<LocationOnRoundedIcon />}
                textColor="neutral.300"
              >
                {resource.location || "Location not specified"}
              </Typography>
            </CardContent>
          </Card>

          {/* Profile Card Section */}
          {/* <div
            style={{
              position: 'absolute', // Absolute positioning
              top: -90, // Aligns to the top
              right: -300, // Aligns to the right
              margin: '20px', // Adds some spacing
              zIndex: 1, // Ensures it stays on top
            }}
          >
            <BioCard />
          </div> */}

          {/* Right Details Section */}
          <div className={styles.details} style={{ flexGrow: 1, marginLeft: '20px' }}>
            <p>
              <strong>Description:</strong> {resource.description}
            </p>
            <p>
              <strong>Category:</strong> {resource.category}
            </p>
            <p>
              <strong>Condition:</strong> {resource.condition}
            </p>
            <p>
              <strong>Price:</strong> ₹{resource.price}
            </p>
            <p>
              <strong>Posted by:</strong> {resource.owner_name}
            </p>
            <p>
              <strong>Available:</strong> {resource.is_available ? "Yes" : "No"}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
