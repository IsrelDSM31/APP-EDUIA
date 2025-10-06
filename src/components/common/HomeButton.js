import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';

/**
 * Botón para volver al Dashboard principal desde cualquier pantalla
 * Se usa en el header de navegación
 */
const HomeButton = ({ navigation }) => {
  const handlePress = () => {
    // Navegar al Dashboard principal (tab + screen principal)
    navigation.navigate('Dashboard', { screen: 'DashboardHome' });
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons 
        name="home" 
        size={24} 
        color={colors.primary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 21, 56, 0.1)', // Color primario con transparencia
  },
});

export default HomeButton;

