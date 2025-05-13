// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import Dropdown from './Dropdown';
import CustomLink from './CustomLink';

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.desktop} {
    justify-content: center;
  }
`;

const TitleWrapper = styled.div`
  flex: 1;
  text-align: center;
  @media ${device.desktop} {
    display: none;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 1rem;

  @media ${device.desktop} {
    display: flex;
    align-items: center;
  }
`;

const MobileNav = styled.div`
  flex: 0 0 40px;
  @media ${device.desktop} {
    display: none;
  }
`;

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;

  @media ${device.desktop} {
    display: none;
  }
`;

const Spacer = styled.div`
  flex:0 0 40px;
  @media ${device.desktop} {
    display: none;
  }
`;

const Header = () => {
  const location = useLocation();

  // Helper function to map paths to titles
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/about':
        return 'About';
      case '/projects':
        return 'Projects';
      case '/education-experience':
        return 'Education & Experience';
      case '/contact':
        return 'Contact Me';
      default:
        return '';
    }
  };

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/education-experience", label: "Education & Experience" },
    { href: "/contact", label: "Contact" }
  ];

  const currentPage = getPageTitle(location.pathname);

  return (
    <StyledHeader>

      <MobileNav>
        <Dropdown items={navItems} />
      </MobileNav>
      
      <TitleWrapper>
        <PageTitle>{currentPage}</PageTitle>
      </TitleWrapper>

      <Spacer />

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