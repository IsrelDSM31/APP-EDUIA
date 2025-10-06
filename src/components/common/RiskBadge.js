import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const RiskBadge = ({ level, size = 'medium' }) => {
  const getRiskColor = () => {
    switch (level?.toLowerCase()) {
      case 'high':
      case 'alto':
        return colors.riskHigh;
      case 'medium':
      case 'medio':
        return colors.riskMedium;
      case 'low':
      case 'bajo':
        return colors.riskLow;
      default:
        return colors.riskNone;
    }
  };

  const getRiskLabel = () => {
    switch (level?.toLowerCase()) {
      case 'high':
      case 'alto':
        return 'Alto';
      case 'medium':
      case 'medio':
        return 'Medio';
      case 'low':
      case 'bajo':
        return 'Bajo';
      default:
        return 'Sin Riesgo';
    }
  };

  const sizeStyle = size === 'small' ? styles.small : styles.medium;

  return (
    <View style={[styles.badge, { backgroundColor: getRiskColor() }, sizeStyle]}>
      <Text style={[styles.text, size === 'small' && styles.smallText]}>
        {getRiskLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  medium: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  smallText: {
    fontSize: fontSize.xs,
  },
});

export default RiskBadge;

