// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; {new Date().getFullYear()} Manan Jain. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;