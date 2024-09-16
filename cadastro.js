import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [genero, setGenero] = useState('');

  const handleCadastro = () => {
    // Lógica de cadastro aqui
    console.log('Cadastro realizado');
  };

  const handleFacebookLogin = () => {
    // Lógica de login com Facebook aqui
    console.log('Login com Facebook');
  };

  const handleGmailLogin = () => {
    // Lógica de login com Gmail aqui
    console.log('Login com Gmail');
  };

  const handleAppleLogin = () => {
    // Lógica de login com Apple aqui
    console.log('Login com Apple');
  };

  return (
    <LinearGradient
      colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('./assets/logodapag.png')} style={styles.gamerLogo} />
        <Text style={styles.cadastroText}>Cadastro</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sobrenome:"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>
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
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Conf. Senha:"
            value={confSenha}
            onChangeText={setConfSenha}
            secureTextEntry
          />
        </View>
        <Text style={styles.generoText}>Gênero:</Text>
        <View style={styles.generoContainer}>
          <TouchableOpacity style={styles.generoOptionContainer} onPress={() => setGenero('Masculino')}>
            <View style={styles.ellipse}>
              {genero === 'Masculino' && <View style={styles.selectedEllipse} />}
            </View>
            <Text style={styles.generoOption}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.generoOptionContainer} onPress={() => setGenero('Feminino')}>
            <View style={styles.ellipse}>
              {genero === 'Feminino' && <View style={styles.selectedEllipse} />}
            </View>
            <Text style={styles.generoOption}>Feminino</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <Image source={require('./assets/facebook.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGmailLogin}>
            <Image source={require('./assets/gmail.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAppleLogin}>
            <Image source={require('./assets/logotipo-da-apple.png')} style={styles.icon} />
          </TouchableOpacity>
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

  // Logo da pagina de cadastro
  gamerLogo: {
    width: 177,
    height: 177,
    marginBottom: 20,
    borderRadius: 100,
  },

  // Texto de cadastro na pagina
  cadastroText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 35,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  //
  inputContainer: {
    width: '100%',
    backgroundColor: '#8B59BD',
    borderRadius: 100,
    marginBottom: 25,
    paddingHorizontal: 25,
  },

  // Formato de texto do cadastro tamanho e cor
  input: {
    height: 43,
    color: 'white',
  },

  // Formato de texto do genero
  generoText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 18,
    color: '#000000',
    marginBottom: 10,
  },

  //
  generoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },

  generoOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  //
  ellipse: {
    width: 20,
    height: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedEllipse: {
    width: 10,
    height: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  generoOption: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    marginLeft: 5,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#8B59BD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CadastroScreen;