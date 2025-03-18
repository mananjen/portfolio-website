import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
`;

const MainContent = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default MainContent;
