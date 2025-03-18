// src/App.jsx
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  /* Import Montserrat from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  body {
    margin: 0;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.main};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Header />
        <MainContent>
          <h1>Welcome to My Portfolio</h1>
          <p>This is the main section where you can introduce yourself or your work.</p>
        </MainContent>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;