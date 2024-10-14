import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/Home'; 

// Cria uma instância do stack navigator
const Stack = createNativeStackNavigator();

// Função principal do aplicativo
export default function App() {
  return (
    // Envolve o aplicativo no container de navegação
    <NavigationContainer>
      {/* Define o stack navigator com a tela inicial sendo a de login */}
      <Stack.Navigator initialRouteName="Login">
        {/* Define a tela de login no stack navigator */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Define a tela de cadastro no stack navigator */}
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        {/* Define a tela inicial (home) no stack navigator */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}