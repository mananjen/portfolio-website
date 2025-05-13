// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from '../components/ImageComponent';
import CustomLink from '../components/CustomLink';
import profilePic from '../assets/profile_pic.JPG';
import Description from '../components/Description';
import PageContainer from '../components/PageContainer';

const ProfileImage = styled(ImageComponent)`
  width: 200px;
  height: 200px;
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
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;

   @media ${device.desktop} {
     text-align: left;
     align-items: flex-start;
     width: auto;
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
  font-size: 2rem;
  margin-bottom: 0;
  color: ${props => props.theme.colors.text};

  @media ${device.desktop} {
    font-size: 3rem;
    margin-bottom: 0;
  }
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
    <PageContainer center>
      <TextContent>
        <TitleImageWrapper>
          <Title>Hi, I'm Manan Jain 👋</Title>
          <ProfileImage src={profilePic} alt="Manan Jain Profile" />
        </TitleImageWrapper>
        <Description lhDesktop="1.8" mbMobile="0rem" mbDesktop="0rem">
          I am a Software Engineer and AI enthusiast with extensive experience in developing practical and impactful solutions leveraging Deep Learning, Computer Vision, NLP, and Web technologies. My passion for innovation is showcased by diverse projects—from creating multilingual sarcasm detectors and AI-powered video enhancement tools, to immersive VR experiences and intuitive database interfaces. Driven by curiosity and a commitment to quality, I continually explore new technologies, aiming to develop solutions that are user-centric, scalable, and impactful.
        </Description>
        <Description lhDesktop="1.8" mbDesktop="2rem" >
          Outside of coding, I enjoy exploring new tech trends, gaming, painting, and reading fantasy books to discover new inspirations.
        </Description>
        <LinksContainer>
          <CustomLink to="/projects">View My Projects</CustomLink>
          <CustomLink to="/contact">Contact Me</CustomLink>
        </LinksContainer>
      </TextContent>
    </PageContainer>
  );
};

export default About;