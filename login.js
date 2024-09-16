import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    // Se a autenticação for bem-sucedida, navegue para a tela Home
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={{ uri: './assets/logodapag.png' }} style={styles.gamerLogo} />
        <View style={styles.rectangle1}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail:"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha:"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Entrar" onPress={handleLogin} color="#00000" />
          </View>
          <View style={styles.buttonCadastro}>
            <Button title="Cadastro" onPress={handleLogin} color="#00000" />
          </View>

          <View style={styles.iconContainer}>
            <Image source={{ uri: '/assets/facebook.png' }} style={styles.icon} />
            <Image source={{ uri: '/assets/gmail.png' }} style={styles.icon} />
            <Image source={{ uri: '/assets/logotipo-da-apple.png' }} style={styles.icon} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

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

  // frame com os componentes de login
  rectangle1: {
    width: '100%',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },

  // formato de texto do login
  loginText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 35,
    color: '#000000',
    marginBottom: 20,
  },

  // conteiner do input de login e senha
  inputContainer: {
    width: '100%',
    backgroundColor: '#8B59BD',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  // tamanho do input de login e senha
  input: {
    color: 'white',
    height: 32,
    margin: 12,
  },

  // botão entrar
  buttonContainer: {
    width: '60%',
    backgroundColor: '#210042',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },

  // botao casdastro
  buttonCadastro: {
    width: '60%',
    backgroundColor: '#210042',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0.1,
    marginBottom: 20,

  },

  // icones de login espaco dos icones entre os botoes de login e cadastro
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },

  // icones de login imagens
  icon: {
    width: 40,
    height: 40,
  },

  // icone de login
  gamerLogo: {
    width: 177,
    height: 177,
    marginBottom: 20,
    borderRadius: 100,
  },
});

export default LoginScreen;