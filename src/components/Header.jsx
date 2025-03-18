import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.headerBackground};
  color: #fff;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        <Dropdown title="Contents" items={navItems} />
      </Nav>
    </StyledHeader>
  );
};

export default Header;