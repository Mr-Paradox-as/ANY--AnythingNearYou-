import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "@/components/header";
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
import Biocard from "@/components/profile_card";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/users/allusers/`);
    const data = await res.json();
    return {
      props: {
        users: data,
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: {
        users: [],
      },
    };
  }
}

export default function Users({ users }) {
  return (
    <>
      <ResponsiveAppBar />
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <Typography
            level="h2"
            align="center"
            sx={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              color: "#2C3E50",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              lineHeight: "1.6",
              background: "linear-gradient(to right, #1D976C, #93F9B9)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              padding: "0px 0",
              marginBottom: "15px",
              animation: "bounceIn 2s ease-out forwards",
              '@keyframes bounceIn': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.5) translateY(30px)',
                },
                '60%': {
                  opacity: 1,
                  transform: 'scale(1.1) translateY(-10px)',
                },
                '100%': {
                  transform: 'scale(1) translateY(0)',
                },
              },
            }}
          >
            Meet Our Users – Connecting and Sharing Seamlessly!
          </Typography>
          <Typography
            align="center"
            sx={{
              fontSize: "1.2rem",
              color: "#7F8C8D",
              marginBottom: "20px",
              fontStyle: "italic",
            }}
          >
            Connecting people for easier transitions – find users, make friends, and exchange resources and skills.
          </Typography>
          <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {users.length > 0 ? (
        users.map((user, index) => (
          <Card
            key={user.id || index}
            sx={{
              width: 340,
              maxWidth: '100%',
              boxShadow: 'xl',
              borderRadius: 'md',
              overflow: 'hidden',
              bgcolor: 'background.level2',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                py: 3,
              }}
            >
              <Avatar
                src="/static/images/avatar/1.jpg"
                sx={{ '--Avatar-size': '5rem', mb: 2, border: '2px solid', borderColor: 'primary.main' }}
              />
              <Typography level="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                {user.full_name}
              </Typography>
              <Chip
                size="sm"
                variant="soft"
                color="primary"
                sx={{ mb: 1, px: 2, fontWeight: 'bold', fontSize: '0.875rem' }}
              >
                {user.user_type}
              </Chip>
              <Typography level="body-sm" sx={{ maxWidth: '28ch', mb: 2, color: 'text.secondary' }}>
                {user.institution || 'No institution provided'}
              </Typography>
              <Divider sx={{ width: '80%', mx: 'auto', mb: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1.5,
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
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
        </main>
      </div>
    </>
  );
}
