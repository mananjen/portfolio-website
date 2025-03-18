import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import Dropdown from './Dropdown';
import CustomLink from './CustomLink';

const StyledHeader = styled.header`
  color: #fff;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Display navigation links only on desktop screens
const DesktopNav = styled.div`
  display: none;
  
  @media ${device.desktop} {
    display: flex;
    gap: 1rem;
  }
`;

// Display the dropdown only on mobile screens
const MobileNav = styled.div`
  display: block;
  
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
      <Nav>
        {/* Desktop Navigation */}
        <DesktopNav>
          {navItems.map((item, index) => (
            <CustomLink key={index} to={item.href}>
              {item.label}
            </CustomLink>
          ))}
        </DesktopNav>
        {/* Mobile Navigation */}
        <MobileNav>
          <Dropdown items={navItems} />
        </MobileNav>
      </Nav>
    </StyledHeader>
  );
};

export default Header;