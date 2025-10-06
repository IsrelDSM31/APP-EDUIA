import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { useAuth } from '../../context/AuthContext';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert(
        'Error de inicio de sesión',
        result.error?.message || 'Usuario o contraseña incorrectos'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header con diseño elegante IAEDU */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name="school" 
              size={60} 
              color={colors.textLight} 
            />
          </View>
          <Text style={styles.title}>EduIA</Text>
          <Text style={styles.subtitle}>Sistema de Gestión Educativa con IA</Text>
        </View>

        {/* Formulario con fondo blanco */}
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <CustomInput
              label="Correo Electrónico"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: '' });
              }}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              icon="email"
              error={errors.email}
            />

            <CustomInput
              label="Contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: '' });
              }}
              placeholder="••••••••"
              secureTextEntry
              icon="lock"
              error={errors.password}
            />

            <CustomButton
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <CustomButton
              title="Crear Cuenta"
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Fondo burdeos elegante
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 50,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.display * 1.2,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: spacing.xl,
  },
  form: {
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  loginButton: {
    marginTop: spacing.lg,
  },
  registerButton: {
    marginTop: spacing.md,
  },
});

export default LoginScreen;

