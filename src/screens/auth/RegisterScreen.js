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

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (!result.success) {
      Alert.alert(
        'Error de registro',
        result.error?.message || 'No se pudo crear la cuenta'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header con diseño elegante */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name="account-plus" 
              size={50} 
              color={colors.textLight} 
            />
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate en EduIA</Text>
        </View>

        {/* Formulario con fondo blanco */}
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <CustomInput
              label="Nombre Completo"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              placeholder="Juan Pérez"
              icon="account"
              error={errors.name}
            />

            <CustomInput
              label="Correo Electrónico"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              icon="email"
              error={errors.email}
            />

            <CustomInput
              label="Contraseña"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              placeholder="••••••••"
              secureTextEntry
              icon="lock"
              error={errors.password}
            />

            <CustomInput
              label="Confirmar Contraseña"
              value={formData.password_confirmation}
              onChangeText={(text) => updateFormData('password_confirmation', text)}
              placeholder="••••••••"
              secureTextEntry
              icon="lock-check"
              error={errors.password_confirmation}
            />

            <CustomButton
              title="Registrarse"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <CustomButton
              title="¿Ya tienes cuenta? Inicia Sesión"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.loginButton}
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
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xxl * 1.5,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 40,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: spacing.lg,
  },
  form: {
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  registerButton: {
    marginTop: spacing.lg,
  },
  loginButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});

export default RegisterScreen;

