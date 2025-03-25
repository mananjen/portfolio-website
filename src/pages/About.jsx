// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from '../components/ImageComponent';
import profilePic from '../assets/profile_pic.JPG';

const AboutContainer = styled.section`
  padding: 3rem;
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
  }
`;

const ProfileImage = styled(ImageComponent)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${device.desktop} {
    width: 300px;
    height: 300px;
    margin-bottom: 0;
  }
`;

const TextContent = styled.div`
  text-align: center;

  @media ${device.desktop} {
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
`;

const About = () => {
  return (
    <AboutContainer>
      <TextContent>
        <Title>Hi, I'm Manan Jain 👋</Title>
        <ProfileImage src={profilePic} alt="Manan Jain Profile" />
        <Description>
        I am a Software Engineer and AI enthusiast with extensive experience in developing practical and impactful solutions leveraging Deep Learning, Computer Vision, NLP, and IoT technologies. At Lowe’s India, I significantly improved customer engagement and efficiency through optimized web applications, streamlined content delivery, and analytics enhancements recognized for clarity and performance. My passion for innovation is showcased by diverse projects—from creating multilingual sarcasm detectors and AI-powered video enhancement tools, to immersive VR experiences and intuitive database interfaces. Driven by curiosity and a commitment to quality, I continually explore new technologies, aiming to develop solutions that are user-centric, scalable, and impactful.
        </Description>
        <Description>
          Outside of coding, I enjoy exploring new tech trends, gaming, painting, and reading fantasy books to discover new inspirations.
        </Description>
      </TextContent>
    </AboutContainer>
  );
};

export default About;