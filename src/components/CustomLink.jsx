// src/components/CustomLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 700;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.highlight};
    outline: none;
  }
`;

const CustomLink = ({ to, children, ...rest }) => {
  return (
    <StyledLink to={to} {...rest}>
      {children}
    </StyledLink>
  );
};

export default CustomLink;