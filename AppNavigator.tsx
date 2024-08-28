// app/(tabs)/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './index'; // Página inicial
import Page2 from './Page2'; // Segunda página

// Define os tipos das rotas
export type RootStackParamList = {
  Home: undefined; // Sem parâmetros
  Page2: undefined; // Sem parâmetros
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Page2" component={Page2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
