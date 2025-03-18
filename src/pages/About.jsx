// src/pages/About.jsx
import React from 'react';
import ImageComponent from '../components/ImageComponent';
import profilePic from '../assets/profile_pic.JPG'; // Adjust the path as needed

const About = () => {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>About Me</h1>
      <ImageComponent src={profilePic} alt="Profile Picture" width="200px" />
      <p>
        Welcome to my portfolio! Here you can learn more about my background,
        experience, and projects.
      </p>
      {/* Add additional content as desired */}
    </section>
  );
};

export default About;