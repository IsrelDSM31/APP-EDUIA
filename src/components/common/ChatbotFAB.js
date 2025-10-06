import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../theme';

const ChatbotFAB = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Profile', {
      screen: 'ChatbotScreen',
    });
  };

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Icon name="robot" size={28} color={colors.textLight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md + 60, // Por encima del tab bar
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
});

export default ChatbotFAB;

