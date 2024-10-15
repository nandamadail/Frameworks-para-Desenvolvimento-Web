import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Componente de tela de login
export default function LoginScreen({ navigation }) {
  // Estados para armazenar os valores dos campos de entrada e mensagens de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  // Função para lidar com o login do usuário
  const handleLogin = async () => {
    let valid = true;
    setEmailError('');
    setSenhaError('');

    // Valida o campo de e-mail
    if (!email) {
      setEmailError('Por favor, insira seu e-mail.');
      valid = false;
    }

    // Valida o campo de senha
    if (!senha) {
      setSenhaError('Por favor, insira sua senha.');
      valid = false;
    }

    // Se houver erros de validação, interrompe o processo de login
    if (!valid) {
      return;
    }

    try {
      console.log('Enviando solicitação para a API...');
      // Envia uma solicitação POST para a API de login
      const response = await fetch('http://localhost:3000/api/login', { // URL Insomnia
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      console.log('Resposta recebida:', response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Erro na resposta:', errorData);
        Alert.alert('Erro', errorData.message || 'E-mail ou senha incorretos.');
        return;
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);

      // Exibe um alerta de sucesso e navega para a tela inicial
      Alert.alert('Login bem-sucedido!', `Bem-vindo, ${data.usuario.nome}!`);
      navigation.navigate('Home', { usuario: data.usuario }); // Redireciona para a HomePage com os dados do usuário

    } catch (error) {
      // Exibe um alerta de erro em caso de falha na comunicação com o servidor
      console.error('Erro de comunicação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao se comunicar com o servidor.');
    }
  };

  return (
    // Aplica um gradiente de fundo à tela
    <LinearGradient
      colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Exibe o logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {/* Título da tela */}
        <Text style={styles.title}>Login</Text>
        {/* Campo de entrada para o e-mail */}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail:"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#d3d3d3"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        {/* Campo de entrada para a senha */}
        <TextInput
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholder="Senha:"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholderTextColor="#d3d3d3"
        />
        {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}
        {/* Botão para realizar o login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        {/* Botão para navegar para a tela de cadastro */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// styles do componente de tela de login 
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
  // logo da tela de login
  logo: {
    width: 177,
    height: 177,
    marginBottom: 20,
    borderRadius: 100,
  },
  // título da tela de login
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#ffffff',
  },
  // campo de entrada de dados email e senha
  input: {
    width: '100%',
    backgroundColor: '#6a11cb',
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#4c1d95',
  },
  // retorno de erro na cor vermelhas
  inputError: {
    borderColor: 'red',
  },
  // tamanho de texto de erro
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  // style do botão
  button: {
    width: '100%',
    backgroundColor: '#4c1d95',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  // texto do botão
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});