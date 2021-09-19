import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Register from './../screens/Register/index';

const { Navigator, Screen } = createBottomTabNavigator();

interface Props {}

const AppRoutes = (props: Props) => {
  return (
    <Navigator>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
    </Navigator>
  );
};

export default AppRoutes;
