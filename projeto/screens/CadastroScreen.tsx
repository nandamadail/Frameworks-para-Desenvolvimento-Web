import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCadastro = async () => {
    let valid = true;
    setNomeError('');
    setEmailError('');
    setSenhaError('');

    if (!nome) {
      setNomeError('Por favor, insira seu nome.');
      valid = false;
    }

    if (!email) {
      setEmailError('Por favor, insira seu e-mail.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Insira um e-mail válido.');
      valid = false;
    }

    if (!senha) {
      setSenhaError('Por favor, insira sua senha.');
      valid = false;
    } else if (!validatePassword(senha)) {
      setSenhaError(
        'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.'
      );
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch('http://localhost:3000/api/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      console.error('Erro de comunicação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao se comunicar com o servidor.');
    }
  };

  return (
    <LinearGradient colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Cadastro</Text>
        
        <TextInput
          style={[styles.input, nomeError ? styles.inputError : null]}
          placeholder="Nome:"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#d3d3d3"
        />
        {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

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
        
        <TextInput
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholder="Senha:"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholderTextColor="#d3d3d3"
        />
        {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}
        
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Voltar ao Login</Text>
        </TouchableOpacity>
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
