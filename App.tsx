import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './src/screens/Dashboard';
import theme from './src/global/styles/theme';

interface Props {}

const App = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
