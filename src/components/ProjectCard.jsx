// src/components/ProjectCard.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from './ImageComponent';
import CustomLink from './CustomLink';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;

  @media ${device.desktop} {
    flex-direction: ${props => props.flip ? 'row-reverse' : 'row'};
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
`;

const TextArea = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;

  @media ${device.desktop} {
    font-size: 2rem;
  }
`;

const DateRange = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.8rem;
`;

const DescriptionArea = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: #555;

  @media ${device.desktop} {
    font-size: 1.2rem;
  }
`;

const TechList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;

  li {
    background: #f0f0f0;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

const LinksArea = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  a {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const ImageArea = styled.div`
  margin-top: 1.5rem;

  img {
    border-radius: 8px;
    max-width: 100%;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  @media ${device.desktop} {
    flex: 0 0 40%;
    margin-top: 0;
  }
`;

const formatDate = (timestamp) => {
  if (!timestamp) return "Present";
  const date = timestamp.toDate();
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

const ProjectCard = ({ title, description, technologies, githubUrl, imageUrl, projectWebsiteUrl, documentUrl, startDate, endDate, flip }) => (
  <CardContainer flip={flip}>
    <TextArea>
      <Title>{title}</Title>
      {(startDate || endDate) && (
        <DateRange>
          {formatDate(startDate)} - {formatDate(endDate)}
        </DateRange>
      )}
      <DescriptionArea>{description}</DescriptionArea>
      {technologies && (
        <TechList>
          {technologies.map((tech, idx) => <li key={idx}>{tech}</li>)}
        </TechList>
      )}
      <LinksArea>
        {githubUrl && <CustomLink to={githubUrl} target="_blank">GitHub</CustomLink>}
        {projectWebsiteUrl && <CustomLink to={projectWebsiteUrl} target="_blank">Live Demo</CustomLink>}
        {documentUrl && <CustomLink to={documentUrl} target="_blank">Documentation</CustomLink>}
      </LinksArea>
    </TextArea>

    {imageUrl && (
      <ImageArea>
        <ImageComponent src={imageUrl} alt={`Project ${title}`} />
      </ImageArea>
    )}
  </CardContainer>
);

export default ProjectCard;