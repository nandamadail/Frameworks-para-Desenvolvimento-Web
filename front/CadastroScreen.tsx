import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Componente de tela de cadastro
export default function CadastroScreen({ navigation }) {
  // Estados para armazenar os valores dos campos de entrada
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  // Função para lidar com o cadastro do usuário
  const handleCadastro = async () => {
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

    // Se houver erros de validação, interrompe o processo de cadastro
    if (!valid) {
      return;
    }

    try {
      // Envia uma solicitação POST para a API de cadastro
      const response = await fetch('http://localhost:3000/api/cadastrar', { // URL Insomnia
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      // Converte a resposta em JSON
      const data = await response.json();
      if (response.ok) {
        // Exibe um alerta de sucesso e navega para a tela de login
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        // Exibe um alerta de erro com a mensagem retornada pela API
        Alert.alert('Erro', data.message || 'Erro ao realizar cadastro.');
      }
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
        <Text style={styles.title}>Cadastro</Text>
        {/* Campo de entrada para o nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome:"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#d3d3d3"
        />
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
        {/* Botão para realizar o cadastro */}
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        {/* Botão para voltar à tela de login */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// CSS
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
    width: 177,
    height: 177,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#ffffff',
  },
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#4c1d95',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});