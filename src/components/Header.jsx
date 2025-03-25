// src/components/Header.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import Dropdown from './Dropdown';
import CustomLink from './CustomLink';

const StyledHeader = styled.header`
  width: 100%;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
`;

// Desktop navigation: centered links
const DesktopNav = styled.nav`
  display: none;
  
  @media ${device.desktop} {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

// Mobile navigation: hamburger icon in top left corner
const MobileNav = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 10;
  
  @media ${device.desktop} {
    display: none;
  }
`;

const Header = () => {
  const navItems = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <StyledHeader>
      {/* Mobile Navigation: Hamburger in top left */}
      <MobileNav>
        <Dropdown items={navItems} />
      </MobileNav>
      
      {/* Desktop Navigation: Centered links */}
      <DesktopNav>
        {navItems.map((item, index) => (
          <CustomLink key={index} to={item.href}>
            {item.label}
          </CustomLink>
        ))}
      </DesktopNav>
    </StyledHeader>
  );
};

export default Header;