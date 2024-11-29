import * as React from 'react';
import { Typography } from '@mui/joy';
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/header";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

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
        <main className={styles.main}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              gap: '210px',  // Increased the gap for more separation
              width: '100%',
              padding: '20px',
            }}
          >
            {/* Card Section */}
            <Card
              sx={{
                minHeight: '550px',
                minWidth: '550px',
                flexShrink: 0,
                position: 'relative',
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

            {/* Details Section */}
            <div
              style={{
                flex: '1',
                padding: '30px',
                backgroundColor: '#000',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                color: '#fff',
                fontFamily: '"Poppins", sans-serif', // Modern font
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h5"
                style={{ color: '#fff', fontWeight: 'bold', marginBottom: '16px' }}
              >
                <span style={{ borderBottom: '4px solid #fff', paddingBottom: '8px' }}>
                  Resource Details
                </span>
              </Typography>
              <div style={{ marginBottom: '20px' }}>
                <Typography variant="body1" style={{ color: '#fff', marginBottom: '8px' }}>
                  <strong>Description :</strong> {resource.description}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                  <strong>Location :</strong> {resource.location }
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', marginBottom: '8px' }}>
                  <strong>Category :</strong> {resource.category}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', marginBottom: '8px' }}>
                  <strong>Condition :</strong> {resource.condition}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', marginBottom: '8px' }}>
                  <strong>Price :</strong> ₹{resource.price}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                  <strong>Available :</strong> {resource.is_available ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                  <strong>Negotiable :</strong> {resource.is_negotiable? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', marginBottom: '8px' }}>
                  <strong>Posted by :</strong> {resource.owner_name}
                </Typography>
              
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
