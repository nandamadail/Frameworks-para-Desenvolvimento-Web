import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Lista de influenciadores com dados fictícios
const influencers = [
  { id: '1', name: 'Virginia Fonseca', followers: '42M' },
  { id: '2', name: 'Carlinhos Maia', followers: '30M' },
  // Adicione mais influenciadores aqui
];

// Lista de marcas com dados fictícios
const brands = [
  { id: '1', name: 'Blaze' },
  { id: '2', name: 'Bet da Sorte' },
  // Adicione mais marcas aqui
];

// Componente de tela inicial (home)
export default function HomeScreen({ route }) {
  // Extrai o usuário dos parâmetros da rota
  const { usuario } = route.params;
  const navigation = useNavigation();

  // Função para renderizar cada influenciador
  const renderInfluencer = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.followers} seguidores</Text>
    </Card>
  );

  // Função para renderizar cada marca
  const renderBrand = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </Card>
  );

  return (
    // Aplica um gradiente de fundo à tela
    <LinearGradient
      colors={['#210042', '#4c1d95', '#6a11cb', '#b3a1e6']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho da tela */}
        <Text style={styles.header}>Pulse Influencers</Text>
        {/* Mensagem de boas-vindas */}
        <Text style={styles.intro}>
          Bem-vindo, {usuario.nome}! Vincule-se a grandes e pequenas marcas e expanda sua influência.
        </Text>

        {/* Seção de influenciadores */}
        <Text style={styles.sectionTitle}>Influenciadores</Text>
        <FlatList
          data={influencers}
          renderItem={renderInfluencer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Seção de marcas */}
        <Text style={styles.sectionTitle}>Marcas</Text>
        <FlatList
          data={brands}
          renderItem={renderBrand}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Seção de dashboard */}
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <View style={styles.dashboard}>
          <Card style={styles.dashboardCard}>
            <Text style={styles.dashboardTitle}>Total de Influenciadores</Text>
            <Text style={styles.dashboardValue}>10</Text>
          </Card>
          <Card style={styles.dashboardCard}>
            <Text style={styles.dashboardTitle}>Total de Marcas</Text>
            <Text style={styles.dashboardValue}>5</Text>
          </Card>
          {/* Adicione mais cartões de dashboard aqui */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
// CSS
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
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  dashboardCard: {
    backgroundColor: '#8B59BD',
    borderRadius: 10,
    padding: 15,
    width: '48%',
  },
  dashboardTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  dashboardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
});