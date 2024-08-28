import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const Page2: React.FC = () => {
  const handleButtonPress = () => {
    Alert.alert('Button on Page 2 Pressed!', 'You pressed the button on Page 2.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page 2</Text>
      <Text style={styles.subtitle}>This is the second page.</Text>
      <Button title="Go Back" onPress={() => Alert.alert('Going Back!')} />
      <Button title="Press me" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});

export default Page2;
