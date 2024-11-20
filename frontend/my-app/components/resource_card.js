import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ title, description,owner,price,condition }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 300, // Set a fixed height for the card
        width: 300, // Optional: set a width
      }}
    >
      <CardMedia
        sx={{ height: 140,
          width: 300,
          }}
        image="https://images.unsplash.com/photo-1709884732297-4b3c1a3f725b?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title || "No title available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || "No description available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price || "No description available"}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}