import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Defina os tipos das rotas
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Defina o tipo da prop navigation
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

// Defina o tipo das props do componente
type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Lógica de criação de conta
    Alert.alert('Conta Criada', `Nome: ${name}, Email: ${email}`);
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});