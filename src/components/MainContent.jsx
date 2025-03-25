import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';

const StyledMain = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; // center horizontally without overflow
  padding: 2rem;

  @media ${device.mobile} {
    padding: 1rem;
  }
`;

const MainContent = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default MainContent;