import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons from Expo's vector icons
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import Transactions from './Transactions';

export default function NavBarExp() {
  const navigation = useNavigation(); // Initialize navigation
  const handleTransactionsPress = () => {
    navigation.navigate('Transactions'); // Navigate to the 'Transaction' screen
  };

  const handleHomePress = () => {
    navigation.navigate('home'); // Navigate to the 'Home' screen
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="star-outline" size={24} color="#000" />
        <Text style={styles.navText}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="stats-chart-outline" size={24} color="#000" />
        <Text style={styles.navText}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={handleTransactionsPress}>
        <Ionicons name="wallet-outline" size={24} color="#000" />
        <Text style={styles.navText}>Transactions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
});
