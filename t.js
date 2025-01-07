import React from "react";

const ProfilePage = () => {
  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1>ANY - Anything Near You!</h1>
        <div>
          <button style={navButtonStyle}>Account</button>
          <button style={navButtonStyle}>Logout</button>
        </div>
      </header>

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
          <h2>Abhishek</h2>
          <p>
            I am pursuing B.Tech from AKGEC, 3rd year, from Electronics and
            Communication
          </p>
          <button style={editButtonStyle}>Edit</button>
        </div>

        {/* Right Column */}
        <div style={rightColumnStyle}>
          <section style={sectionStyle}>
            <h3>About Me</h3>
            <p>
              I have also an interest toward web development and programming
            </p>
          </section>

          <section style={sectionStyle}>
            <h3>Resource I Need</h3>
            <button style={addButtonStyle}>+ Add Resource</button>
          </section>

          <section style={sectionStyle}>
            <h3>Resources I Have</h3>
            <div style={resourceCardStyle}>
              <img
                src="https://via.placeholder.com/100"
                alt="Resource"
                style={resourceImageStyle}
              />
              <div>
                <h4>Resource Title</h4>
                <p>Resource description goes here</p>
              </div>
              <div style={resourceButtonsStyle}>
                <button style={editButtonStyle}>Edit</button>
                <button style={deleteButtonStyle}>Delete</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

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
