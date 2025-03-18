import React, { Component } from 'react';
import { render } from 'react-dom';
// import './MainContent.css'; // Optional: add styles specific to MainContent

const MainContent = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default MainContent;
