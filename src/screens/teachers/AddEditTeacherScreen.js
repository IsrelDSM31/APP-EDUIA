import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { teacherService } from '../../services/teacherService';
import { colors, spacing } from '../../theme';

const AddEditTeacherScreen = ({ route, navigation }) => {
  const teacher = route.params?.teacher;
  const isEditing = !!teacher;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    specialty: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        subject: teacher.subject || '',
        specialty: teacher.specialty || '',
        address: teacher.address || '',
      });
    }
  }, [teacher]);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await teacherService.updateTeacher(teacher.id, formData);
        Alert.alert('Éxito', 'Profesor actualizado correctamente');
      } else {
        await teacherService.createTeacher(formData);
        Alert.alert('Éxito', 'Profesor creado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'No se pudo guardar el profesor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomInput
          label="Nombre Completo *"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
          placeholder="María García"
          icon="account"
          error={errors.name}
        />

        <CustomInput
          label="Correo Electrónico *"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text)}
          placeholder="profesor@ejemplo.com"
          keyboardType="email-address"
          icon="email"
          error={errors.email}
        />

        <CustomInput
          label="Teléfono"
          value={formData.phone}
          onChangeText={(text) => updateFormData('phone', text)}
          placeholder="+1234567890"
          keyboardType="phone-pad"
          icon="phone"
          error={errors.phone}
        />

        <CustomInput
          label="Materia"
          value={formData.subject}
          onChangeText={(text) => updateFormData('subject', text)}
          placeholder="Matemáticas"
          icon="book-open-variant"
          error={errors.subject}
        />

        <CustomInput
          label="Especialidad"
          value={formData.specialty}
          onChangeText={(text) => updateFormData('specialty', text)}
          placeholder="Álgebra Avanzada"
          icon="badge-account"
          error={errors.specialty}
        />

        <CustomInput
          label="Dirección"
          value={formData.address}
          onChangeText={(text) => updateFormData('address', text)}
          placeholder="Calle 123, Ciudad"
          icon="home"
          multiline
          numberOfLines={3}
          error={errors.address}
        />

        <CustomButton
          title={isEditing ? 'Actualizar Profesor' : 'Crear Profesor'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});

export default AddEditTeacherScreen;

