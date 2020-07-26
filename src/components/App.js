import React from 'react';
import '../App.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Header from './Header';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
    </ThemeProvider>
  );
}

export default App;
