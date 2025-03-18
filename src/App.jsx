// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import AppRoutes from './routes/AppRoutes';
import { theme } from './theme';
import { device } from './constants/screenSizes';

const GlobalStyle = createGlobalStyle`
  /* Import Montserrat from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  body {
    margin: 0;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.main};
    font-weight: 400;
    font-size: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  
  @media ${device.mobile} {
    body {
      font-size: 18px;
    }
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header />
          <MainContent>
            <AppRoutes />
          </MainContent>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;