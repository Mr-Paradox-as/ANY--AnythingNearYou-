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
import { userAgentFromString } from "next/server";

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
            {/* Loop through the users array */}
            {users.map((user) => (
              <Biocard
                key={user.id} // Ensure a unique key for each user
                email={user.email}
                full_name={user.full_name}
                institution={user.institution}
                active={user.is_active}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
