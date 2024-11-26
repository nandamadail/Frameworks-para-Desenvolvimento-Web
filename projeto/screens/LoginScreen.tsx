import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
    androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
  });

  // Função para login com email e senha
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Login bem-sucedido!', `Bem-vindo, ${data.usuario.nome}!`);
        await AsyncStorage.setItem('token', data.token);
        console.log('Redirecionando para Home...');
        // Redirecionar para Home
        navigation.navigate('Home', { nome: data.usuario.nome });
      } else {
        Alert.alert('Erro', data.message || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro de comunicação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao se comunicar com o servidor.');
    }
  };

  // Função para login com Facebook
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: 'YOUR_FACEBOOK_APP_ID',
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (result.type === 'success') {
        Alert.alert('Login bem-sucedido com Facebook!');
        navigation.navigate('Home', { nome: 'Usuário do Facebook' });
      } else {
        Alert.alert('Login cancelado.');
      }
    } catch (error) {
      Alert.alert(`Erro de login com Facebook: ${error.message}`);
    }
  };

  // Efeito quando a resposta do Google é recebida
  useEffect(() => {
    if (response?.type === 'success') {
      Alert.alert('Login bem-sucedido com Google!');
      navigation.navigate('Home', { nome: 'Usuário do Google' });
    }
  }, [response]);

  return (
    <LinearGradient colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail:"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha:"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.socialText}>Ou acesse com</Text>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={handleFacebookLogin}>
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]} disabled={!request} onPress={() => promptAsync()}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.instagramButton]}>
            <Text style={styles.socialButtonText}>Instagram</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Faz o logo ser redondo
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff',
  },
  input: {
    width: '100%',
    backgroundColor: '#8B59BD',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    height: 50,
  },
  loginButton: {
    backgroundColor: '#4c1d95',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#6a11cb',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row', // Alinha os botões em linha em telas grandes
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap', // Permite que os botões mudem para a próxima linha se não houver espaço
  },
  socialButton: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5, // Espaçamento vertical entre os botões
    width: '30%', // Largura do botão em telas grandes
  },
  facebookButton: {
    backgroundColor: '#3b5998', // Cor do Facebook
  },
  googleButton: {
    backgroundColor: '#DB4437', // Cor do Google
  },
  instagramButton: {
    backgroundColor: '#C13584', // Cor do Instagram
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto do botão
  },
});
