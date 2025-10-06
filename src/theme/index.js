import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8B1538', // Burdeos elegante
    accent: '#FFD700', // Dorado
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#00000061',
    placeholder: '#00000061',
    backdrop: '#00000099',
    notification: '#F50057',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
  },
  roundness: 8,
};

export const colors = {
  primary: '#8B1538', // Burdeos elegante (color principal de IAEDU)
  primaryDark: '#6B0F2A',
  primaryLight: '#A63D5C',
  secondary: '#FFD700', // Dorado para acentos
  secondaryDark: '#FFC107',
  background: '#F5F5F5', // Fondo claro y limpio
  surface: '#FFFFFF',
  error: '#B00020',
  errorLight: '#CF6679',
  text: '#000000',
  textSecondary: '#757575',
  textLight: '#FFFFFF',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Risk levels
  riskHigh: '#F44336',
  riskMedium: '#FF9800',
  riskLow: '#4CAF50',
  riskNone: '#2196F3',
  
  // Grade colors
  gradeExcellent: '#4CAF50',
  gradeGood: '#8BC34A',
  gradeAverage: '#FFC107',
  gradePoor: '#FF9800',
  gradeFail: '#F44336',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 32,
};

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

