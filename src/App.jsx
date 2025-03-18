import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MainContent>
        <h1>Welcome to My Portfolio</h1>
        <p>This is the main section where you can introduce yourself or your work.</p>
      </MainContent>
      <Footer />
    </div>
  );
};

export default App;
