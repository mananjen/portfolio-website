// src/components/ProjectCard.jsx
import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { device } from '../constants/screenSizes';
import ImageComponent from './ImageComponent';
import Description from './Description';
import CustomLink from './CustomLink';

const CardContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
  cursor: ${p => (p.collapsed ? 'pointer' : 'default')};   /* click anywhere when collapsed */
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

  @media ${device.desktop} { display: none; }   /* hide on desktop */
`;

const DateArrowRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
  font-size: 0.9rem;

  @media ${device.desktop} { display: none; }   /* hide on desktop */
`;

const TechListRow = styled.div`
  display: flex;
  // gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: ${p => (p.open ? '0' : '1.2rem')};
  transition: margin-top 0.4s ease;
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

const ExpandArea = styled.div`
  overflow: hidden;
  max-height: ${p => (p.open ? '2000px' : '0')};
  opacity: ${p => (p.open ? 1 : 0)};
  margin-top: ${p => (p.open ? '1.2rem' : '0')};
  transition:
    max-height 0.4s ease,
    opacity    0.4s ease,
    margin-top 0.4s ease;

  @media ${device.desktop} {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-direction: ${p => (p.flip ? 'row-reverse' : 'row')};
  }
`;

const TextBlock = styled.div` flex:1; `;

const TechList = styled.ul`
  margin:0; padding:0; display:flex; flex-wrap:wrap; gap:0.5rem; list-style:none;
  li{
    background:#f0f0f0; padding:0.4rem 0.8rem; border-radius:4px; font-size:0.9rem;
  }
`;

const ImageWrap = styled.div`
  margin-top:1.5rem;
  img{ max-width:100%; border-radius:8px; box-shadow:0 6px 12px rgba(0,0,0,0.1); }
  @media ${device.desktop}{ flex:0 0 40%; margin-top:0; }
`;

const fmt = ts =>
  ts ? ts.toDate().toLocaleString('default',{month:'short',year:'numeric'}) : 'Present';

const ProjectCard = ({
  title, description, technologies,
  githubUrl, projectWebsiteUrl, documentUrl,
  imageUrl, startDate, endDate, flip=false
}) => {

  const [open,setOpen] = useState(false);

  /* click‑anywhere expand (only when collapsed) */
  const handleCardClick = useCallback(()=>{
    if (!open) setOpen(true);
  },[open]);

  /* arrow toggles both ways */
  const toggle = e => {
    e.stopPropagation();
    setOpen(prev=>!prev);
  };

  /* link clicks never toggle */
  const stop = e => e.stopPropagation();

  return (
    <CardContainer collapsed={!open} onClick={handleCardClick}>
      <HeaderRow>
        {/* Title always shown */}
        <Title>{title}</Title>

        {/* Desktop: dates + links + arrow in one line */}
        <DateLinksDesk>
          <DateRange>{fmt(startDate)} – {fmt(endDate)}</DateRange>
          
          {githubUrl && <CustomLink to={githubUrl} target="_blank" onClick={stop}>GitHub</CustomLink>}
          {projectWebsiteUrl && <CustomLink to={projectWebsiteUrl} target="_blank" onClick={stop}>Site</CustomLink>}
          {documentUrl && <CustomLink to={documentUrl} target="_blank" onClick={stop}>Doc</CustomLink>}
          
          <Arrow onClick={toggle} open={open}>▼</Arrow>
        </DateLinksDesk>

      </HeaderRow>

      {/* Mobile‑only links row */}
      <LinksRow>
        {githubUrl && <CustomLink to={githubUrl} target="_blank" onClick={stop}>GitHub</CustomLink>}
        {projectWebsiteUrl && <CustomLink to={projectWebsiteUrl} target="_blank" onClick={stop}>Site</CustomLink>}
        {documentUrl && <CustomLink to={documentUrl} target="_blank" onClick={stop}>Doc</CustomLink>}
      </LinksRow>

      {/* Mobile‑only date + arrow row */}
      <DateArrowRow>
        <DateRange>{fmt(startDate)} – {fmt(endDate)}</DateRange>
        <Arrow onClick={toggle} open={open}>▼</Arrow>
      </DateArrowRow>

      <ExpandArea open={open} flip={flip}>
        <TextBlock>
          <Description>{description}</Description>
        </TextBlock>

        {imageUrl && (
          <ImageWrap>
            <ImageComponent src={imageUrl} alt={`Project ${title}`} />
          </ImageWrap>
        )}
      </ExpandArea>

      {technologies?.length>0 && (
        <TechListRow open={open}>
          <TechList>
            {technologies.map((t,i)=><li key={i}>{t}</li>)}
          </TechList>
        </TechListRow>
      )}
    </CardContainer>
  );
};

export default ProjectCard;