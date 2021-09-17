import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './src/screens/Dashboard';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';
import Register from './src/screens/Register/index';
import CategorySelect from './src/screens/CategorySelect';

interface Props {}

const App = (props: Props) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
};

export default App;
