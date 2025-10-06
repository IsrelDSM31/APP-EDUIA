import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../theme';
import CustomButton from './CustomButton';

const EmptyState = ({
  icon = 'inbox',
  title = 'No hay datos',
  message = 'No se encontraron resultados',
  actionText,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={80} color={colors.textSecondary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionText && onAction && (
        <CustomButton
          title={actionText}
          onPress={onAction}
          variant="primary"
          size="medium"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default EmptyState;

