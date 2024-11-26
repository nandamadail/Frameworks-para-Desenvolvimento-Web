import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from './navigation'; // Ajuste no caminho da importação
import { StackNavigationProp } from '@react-navigation/stack';

// Define a prop para a navegação tipada da HomeScreen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const influencers = [
  { id: '1', name: 'Virginia Fonseca', followers: '42M' },
  { id: '2', name: 'Carlinhos Maia', followers: '30M' },
];

const brands = [
  { id: '1', name: 'Blaze' },
  { id: '2', name: 'Bet da Sorte' },
];

export default function HomeScreen({ route }) {
  const { usuario } = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tiktokInfluencers, setTikTokInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar dados do TikTok
  const fetchTikTokData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://seu-backend.com/api/tiktok', {
        headers: {
          Authorization: `Bearer YOUR_TIKTOK_API_KEY`, // Substitua pelo seu token
        },
      });
      setTikTokInfluencers(response.data.influencers);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados do TikTok', error);
      setLoading(false);
    }
  };

  // Função para redirecionar para a página de autenticação do TikTok
  const handleConnectTikTok = () => {
    const tiktokAuthUrl = 'https://www.tiktok.com/auth/authorize/?client_key=sbawrd4we8f67k3ki4&response_type=code&scope=user.info.basic&redirect_uri=http://localhost:3000/api/tiktok/callback&state=xyz';
    Linking.openURL(tiktokAuthUrl).catch(err => console.error('Erro ao abrir URL de autenticação do TikTok:', err));
  };

  const renderInfluencer = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.followers} seguidores</Text>
    </Card>
  );

  const renderBrand = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </Card>
  );

  return (
    <LinearGradient colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pulse Influencers</Text>
        <Text style={styles.intro}>Bem-vindo, {usuario ? usuario.nome : 'Visitante'}!</Text>

        <Text style={styles.sectionTitle}>Influenciadores</Text>
        <FlatList
          data={tiktokInfluencers.length > 0 ? tiktokInfluencers : influencers}
          renderItem={renderInfluencer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Marcas</Text>
        <FlatList
          data={brands}
          renderItem={renderBrand}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? 'Carregando...' : 'Conectar com TikTok'}
            onPress={handleConnectTikTok}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  intro: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#8B59BD',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});
