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
import LoadingScreen from '../../components/common/LoadingScreen';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../services/profileService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Error', 'El email es requerido');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'El formato del email no es válido');
      return;
    }

    // Validar cambio de contraseña
    if (showPasswordFields) {
      if (!formData.current_password) {
        Alert.alert('Error', 'Debes ingresar tu contraseña actual');
        return;
      }

      if (!formData.password) {
        Alert.alert('Error', 'Debes ingresar una nueva contraseña');
        return;
      }

      if (formData.password.length < 6) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        return;
      }

      if (formData.password !== formData.password_confirmation) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      if (showPasswordFields && formData.password) {
        updateData.current_password = formData.current_password;
        updateData.password = formData.password;
        updateData.password_confirmation = formData.password_confirmation;
      }

      const response = await profileService.updateProfile(updateData);

      if (response.success) {
        // Actualizar el contexto de usuario
        if (updateUser) {
          updateUser(response.data);
        }

        Alert.alert(
          'Éxito',
          'Perfil actualizado correctamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Ocurrió un error al actualizar el perfil'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Actualizando perfil..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <CustomInput
            label="Nombre completo"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            icon="account"
          />

          <CustomInput
            label="Email"
            placeholder="tu@email.com"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            icon="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
          <Text style={styles.sectionDescription}>
            Deja estos campos vacíos si no deseas cambiar tu contraseña
          </Text>

          {!showPasswordFields ? (
            <CustomButton
              title="Cambiar Contraseña"
              variant="outline"
              onPress={() => setShowPasswordFields(true)}
            />
          ) : (
            <>
              <CustomInput
                label="Contraseña Actual"
                placeholder="Ingresa tu contraseña actual"
                value={formData.current_password}
                onChangeText={(value) => handleInputChange('current_password', value)}
                icon="lock"
                secureTextEntry
              />

              <CustomInput
                label="Nueva Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                icon="lock-outline"
                secureTextEntry
              />

              <CustomInput
                label="Confirmar Nueva Contraseña"
                placeholder="Repite la nueva contraseña"
                value={formData.password_confirmation}
                onChangeText={(value) => handleInputChange('password_confirmation', value)}
                icon="lock-check"
                secureTextEntry
              />

              <CustomButton
                title="Cancelar Cambio de Contraseña"
                variant="outline"
                onPress={() => {
                  setShowPasswordFields(false);
                  setFormData(prev => ({
                    ...prev,
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                  }));
                }}
                style={styles.cancelButton}
              />
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Guardar Cambios"
            onPress={handleSubmit}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  saveButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
});

export default EditProfileScreen;





