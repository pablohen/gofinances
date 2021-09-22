import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';

interface Props {}

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = (props: Props) => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};

export default AuthRoutes;
