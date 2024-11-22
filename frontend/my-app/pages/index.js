import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import ProductCard from "@/components/resource_card";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "@/components/header";
import Typography from '@mui/joy/Typography';

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

const callAPI = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/resources`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

export default function Home() {
  const [resources, setResources] = useState([]);
  const [pageTitle, setPageTitle] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const data = await callAPI();
      if (data && data.length > 0) {
        setResources(data);
        setPageTitle(data[0].title || "Resources");
      } else {
        setPageTitle("No Resources Available");
      }
    };
    fetchData();
  }, []);

  console.log(resources);

  return (
    <>
      <ResponsiveAppBar />
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <div>
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
                padding: "10px 0",   // Reduced padding
                marginBottom: "15px"  // Reduced margin-bottom
              }}
            >
              Find, Share & Thrive: A Marketplace for Essential Resources!
            </Typography>
            <Typography 
              align="center" 
              sx={{
                fontSize: "1.2rem", 
                color: "#7F8C8D", 
                marginBottom: "20px",  // Reduced margin-bottom
                fontStyle: "italic"
              }}
            >
              From One City to Another – Grab What You Need, Give What You Don't!
            </Typography>
            <div className={styles.resources}>
              {resources.length > 0 ? (
                resources.map((resource, index) => (
                  <ProductCard
                    key={index}
                    image={resource.photo}
                    title={resource.title}
                    description={resource.description}
                    price={"₹" + resource.price}
                    owner={resource.owner_name}
                    location={resource.location}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
