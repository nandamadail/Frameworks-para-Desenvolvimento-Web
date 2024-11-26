import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/Home';  // Certifique-se de que o nome do arquivo e o componente sejam consistentes

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
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} // Ajuste o título que será exibido na barra de navegação
        />
        {/* Define a tela de cadastro no stack navigator */}
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Cadastro' }} // Ajuste o título que será exibido na barra de navegação
        />
        {/* Define a tela inicial (home) no stack navigator */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Bem-vindo' }} // Ajuste o título que será exibido na barra de navegação
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
