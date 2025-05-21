// src/components/ProjectCard.jsx
import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from './ImageComponent';
import Description from './Description';
import CustomLink from './CustomLink';
import ExpandableSection from './ExpandableSection';
import TechPillList from './TechPillList';

const CardContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
  cursor: ${p => (p.collapsed ? 'pointer' : 'default')};
`;

const HeaderRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  user-select:none;
`;

const Title = styled.h2`
  font-size:1.6rem;
  margin:0;
  color:${p=>p.theme.colors.text};

  @media ${device.desktop}{ font-size:2rem; }
`;

const LinksRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
  font-size: 0.9rem;

  a { font-weight: 600; }

  @media ${device.desktop} { display: none; }
`;

const DateArrowRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
  font-size: 0.9rem;

  @media ${device.desktop} { display: none; }
`;

const DateLinksDesk = styled.div`
  display: none;

  @media ${device.desktop} {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.9rem;
    a { font-weight: 600; }
  }
`;

const DateRange = styled.span`
  color:#888;
`;

const Arrow = styled.span`
  font-size:1.2rem;
  transition: transform 0.3s ease;
  margin-left:0.25rem;
  ${p => p.open && css`transform: rotate(180deg);`}
  cursor:pointer;
`;

const TextBlock = styled.div` flex:1; `;

const ImageWrap = styled.div`
  margin-top:1.5rem;
  img{ max-width:100%; border-radius:8px; box-shadow:0 6px 12px rgba(0,0,0,0.1); }
  @media ${device.desktop}{ flex:0 0 40%; margin-top:0; }
`;

const PillRow = styled.div`
  margin-top: 1rem;
  @media ${device.desktop} {
    margin-top: 1.2rem;
  }
`;

const fmt = ts =>
  ts ? ts.toDate().toLocaleString('default',{month:'short',year:'numeric'}) : 'Present';

const ProjectCard = ({
  title, description, technologies,
  githubUrl, projectWebsiteUrl, documentUrl,
  imageUrl, startDate, endDate, flip=false
}) => {

  const [open,setOpen] = useState(false);

  const handleCardClick = useCallback(()=>{
    setOpen(!open);
  },[open]);

  const toggle = e => {
    e.stopPropagation();
    setOpen(prev=>!prev);
  };

  const stop = e => e.stopPropagation();

  return (
    <CardContainer collapsed={!open} onClick={handleCardClick}>
      <HeaderRow>
        <Title>{title}</Title>

        <DateLinksDesk>
          <DateRange>{fmt(startDate)} – {fmt(endDate)}</DateRange>
          
          {githubUrl && <CustomLink to={githubUrl} target="_blank" onClick={stop}>GitHub</CustomLink>}
          {projectWebsiteUrl && <CustomLink to={projectWebsiteUrl} target="_blank" onClick={stop}>Site</CustomLink>}
          {documentUrl && <CustomLink to={documentUrl} target="_blank" onClick={stop}>Doc</CustomLink>}
          
          <Arrow onClick={toggle} open={open}>▼</Arrow>
        </DateLinksDesk>

      </HeaderRow>

      <LinksRow>
        {githubUrl && <CustomLink to={githubUrl} target="_blank" onClick={stop}>GitHub</CustomLink>}
        {projectWebsiteUrl && <CustomLink to={projectWebsiteUrl} target="_blank" onClick={stop}>Site</CustomLink>}
        {documentUrl && <CustomLink to={documentUrl} target="_blank" onClick={stop}>Doc</CustomLink>}
      </LinksRow>

      <DateArrowRow>
        <DateRange>{fmt(startDate)} – {fmt(endDate)}</DateRange>
        <Arrow onClick={toggle} open={open}>▼</Arrow>
      </DateArrowRow>

      <ExpandableSection open={open} flip={flip}>
        <TextBlock>
          <Description>{description}</Description>
        </TextBlock>

        {imageUrl && (
          <ImageWrap>
            <ImageComponent src={imageUrl} alt={`Project ${title}`} />
          </ImageWrap>
        )}
      </ExpandableSection>

      {technologies?.length > 0 && (
        <PillRow>
          <TechPillList items={technologies} />
        </PillRow>
      )}
    </CardContainer>
  );
};

export default ProjectCard;