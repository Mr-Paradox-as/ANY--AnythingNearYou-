import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "@/components/header";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token"); // Fetch token from localStorage

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch profile data
        const profileResponse = await fetch("http://127.0.0.1:8000/api/users/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch resources tied to the profile ID
        const resourceResponse = await fetch(
          `http://localhost:8000/api/resources/owner/${profileData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(resourceResponse)

        if (!resourceResponse.ok) {
          throw new Error("Failed to fetch resources.");
        }

        const resourceData = await resourceResponse.json();
        setResources(resourceData);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={pageStyle}>
      <ResponsiveAppBar/>

      {/* Main Content */}
      <div style={containerStyle}>
        {/* Left Column */}
        <div style={leftColumnStyle}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              style={avatarStyle}
            />
          </div>
          <h2>{profile?.full_name || "Name not available"}</h2>
          <p>
    {"Contact No: "} 
    {profile?.phone_number || "Contact information not provided."}
  </p>          <button style={editButtonStyle}>Edit</button>
        </div>

        {/* Right Column */}
        <div style={rightColumnStyle}>
          <section style={sectionStyle}>
            <h3>About Me</h3>
            {"Institution Name :  "}
            {profile?.institution || "No description provided."}
            <p>{profile?.user_type || "nope"}</p>
          </section>

          <section style={sectionStyle}>
            <h3>Resources I Have</h3>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <div style={resourceCardStyle} key={resource.id}>
                  <img
                    src={resource.photo}
                    alt={resource.name}
                    style={resourceImageStyle}
                  />
                  <div>
                    <h4>{resource.name}</h4>
                    <p>{resource.description}</p>
                  </div>
                  <div style={resourceButtonsStyle}>
                    <button style={editButtonStyle}>Edit</button>
                    <button style={deleteButtonStyle}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No resources found.</p>
            )}            <button style={addButtonStyle}>+ Add Resource</button>

          </section>
        </div>
      </div>
    </div>
  );
};

// Existing styles
const pageStyle = {
  backgroundColor: "#121212",
  color: "#e0e0e0",
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  padding: "0",
  margin: "0",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#1f1f1f",
  padding: "10px 20px",
  borderBottom: "1px solid #333",
};

const navButtonStyle = {
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  margin: "0 5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const containerStyle = {
  display: "flex",
  padding: "20px",
};

const leftColumnStyle = {
  flex: "1",
  textAlign: "center",
  padding: "20px",
  borderRight: "1px solid #333",
};

const avatarStyle = {
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  marginBottom: "15px",
};

const editButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px 0",
};

const rightColumnStyle = {
  flex: "2",
  padding: "20px",
};

const sectionStyle = {
  marginBottom: "20px",
};

const addButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const resourceCardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#1c1c1c",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "10px",
};

const resourceImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "8px",
  marginRight: "20px",
};

const resourceButtonsStyle = {
  marginLeft: "auto",
};

const deleteButtonStyle = {
  ...editButtonStyle,
  backgroundColor: "#dc3545",
};

export default ProfilePage;
