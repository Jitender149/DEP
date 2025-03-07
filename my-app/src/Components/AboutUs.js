import React from "react";
import "./AboutUs.css"; // Import the CSS file
import ContentBox from "./ContentBox";

const AboutUs = () => {
  return (
    <div>
      {/* Title Bar */}
      <div className="title-bar">About Us</div>

      {/* Content Section */}
      <div className="content-container">
        {/* General Introduction */}
        <div className="content-box">
          <h3 className="content-box-title">General Introduction</h3>
          <div className="content-box-divider"></div>
          <p>
            Welcome to our organization. We are dedicated to excellence in our field and committed to providing the
            highest quality services to our clients. Our team consists of experienced professionals who are passionate
            about what they do and strive to make a positive impact in the community.
          </p>
          <p>
            Founded in 2010, we have grown from a small startup to a recognized leader in our industry. Our mission is
            to innovate, educate, and collaborate with partners worldwide to address the challenges of today and
            tomorrow.
          </p>
        </div>

        {/* Floating Content Boxes */}
        <ContentBox
          title="Resource Sharing"
          description="We believe in the power of shared knowledge. Our resource sharing platform enables professionals and students to access cutting-edge research, tools, and educational materials. By fostering a culture of collaboration, we aim to accelerate innovation and learning across disciplines."
        />

        <ContentBox
          title="Intern and Placements"
          description="Our internship and placement programs provide valuable opportunities for students and recent graduates to gain hands-on experience in the industry. We partner with leading universities and institutions to identify talented individuals and help them launch successful careers."
        />

        <ContentBox
          title="Maths Community"
          description="Our mathematics community brings together enthusiasts, educators, and researchers to explore the beauty and applications of mathematical concepts. Through workshops, seminars, and collaborative projects, we aim to make mathematics accessible and engaging for everyone."
        />
      </div>
    </div>
  );
};

export default AboutUs;
