// src/App.jsx
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import AppRoutes from './routes/AppRoutes';
import { theme } from './theme';
import { device } from './constants/screenSizes';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; // prevents horizontal scrolling
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.main};
    font-weight: 400;
    font-size: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box; // critical to avoid horizontal overflow
  }

  @media ${device.mobile} {
    body {
      font-size: 18px;
    }
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-x: hidden;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header />
          <ContentWrapper>
            <MainContent>
              <AppRoutes />
            </MainContent>
          </ContentWrapper>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;