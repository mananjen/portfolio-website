// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from '../components/ImageComponent';
import CustomLink from '../components/CustomLink';
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
    align-items: center;
  }
`;

const ProfileImage = styled(ImageComponent)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 2rem;

  @media ${device.desktop} {
    width: 300px;
    height: 300px;
    margin-top: 0;
  }
`;

const TextContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    text-align: left;
    align-items: flex-start;
  }
`;

const TitleImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0;
  color: ${props => props.theme.colors.text};

  @media ${device.desktop} {
    font-size: 3rem;
    margin-bottom: 0;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media ${device.desktop} {
    justify-content: flex-start;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <TextContent>
        <TitleImageWrapper>
          <Title>Hi, I'm Manan Jain 👋</Title>
          <ProfileImage src={profilePic} alt="Manan Jain Profile" />
        </TitleImageWrapper>
        <Description>
          I am a Software Engineer and AI enthusiast with extensive experience in developing practical and impactful solutions leveraging Deep Learning, Computer Vision, NLP, and Web technologies. My passion for innovation is showcased by diverse projects—from creating multilingual sarcasm detectors and AI-powered video enhancement tools, to immersive VR experiences and intuitive database interfaces. Driven by curiosity and a commitment to quality, I continually explore new technologies, aiming to develop solutions that are user-centric, scalable, and impactful.
        </Description>
        <LinksContainer>
          <CustomLink to="/projects">View My Projects</CustomLink>
          <CustomLink to="/contact">Contact Me</CustomLink>
        </LinksContainer>
        <Description>
          Outside of coding, I enjoy exploring new tech trends, gaming, painting, and reading fantasy books to discover new inspirations.
        </Description>
      </TextContent>
    </AboutContainer>
  );
};

export default About;