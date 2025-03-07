import React from "react";
import "./AboutUs.css"; // Import styles for consistent formatting

const ContentBox = ({ title, description }) => {
  return (
    <div className="content-box">
      <h3 className="content-box-title">{title}</h3>
      <div className="content-box-divider"></div>
      <p>{description}</p>
    </div>
  );
};

export default ContentBox;
