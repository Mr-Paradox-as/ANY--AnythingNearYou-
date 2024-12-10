import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import ProductCard from "@/components/resource_card";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "@/components/header";
import Typography from "@mui/joy/Typography";

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
    const res = await fetch(`http://127.0.0.1:8000/api/resources`);
    const data = await res.json();
    return {
      props: {
        resources: data,
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: {
        resources: [],
      },
    };
  }
}

export default function Resources({ resources }) {
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
              padding: "10px 0",
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
            Making Transitions Easy - Connect, Share, and Settle In Effortlessly.
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
            Moving One City to Another – Grab What You Need, Give What You Don't!
          </Typography>
          <div className={styles.resources}>
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <ProductCard
                  key={resource.resource_id || index}
                  image={resource.photo}
                  title={resource.title}
                  description={resource.description}
                  price={"₹" + resource.price}
                  owner={resource.owner_name}
                  location={resource.location}
                  resource_id={resource.resource_id}
                  condition = {resource.condition}
                  negotiable = {resource.is_negotiable}
                  post_date = {resource.posted_date}
                />
              ))
            ) : (
              <p>No resources available</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
