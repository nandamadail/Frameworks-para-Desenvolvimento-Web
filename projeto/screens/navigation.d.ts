// src/navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Definindo os tipos das rotas do stack navigator
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: { usuario: { nome: string } };
};

// Tipos para serem usados nas props de navegação e rotas nas telas
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
