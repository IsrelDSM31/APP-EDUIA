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
import { studentService } from '../../services/studentService';
import { colors, spacing } from '../../theme';

const AddEditStudentScreen = ({ route, navigation }) => {
  const student = route.params?.student;
  const isEditing = !!student;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    student_code: '',
    birth_date: '',
    grade: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        student_code: student.student_code || '',
        birth_date: student.birth_date || '',
        grade: student.grade || '',
        address: student.address || '',
      });
    }
  }, [student]);

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

    if (!formData.student_code.trim()) {
      newErrors.student_code = 'El código de estudiante es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await studentService.updateStudent(student.id, formData);
        Alert.alert('Éxito', 'Estudiante actualizado correctamente');
      } else {
        await studentService.createStudent(formData);
        Alert.alert('Éxito', 'Estudiante creado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'No se pudo guardar el estudiante'
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
          placeholder="Juan Pérez"
          icon="account"
          error={errors.name}
        />

        <CustomInput
          label="Código de Estudiante *"
          value={formData.student_code}
          onChangeText={(text) => updateFormData('student_code', text)}
          placeholder="EST-2024-001"
          icon="identifier"
          error={errors.student_code}
        />

        <CustomInput
          label="Correo Electrónico *"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text)}
          placeholder="estudiante@ejemplo.com"
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
          label="Fecha de Nacimiento"
          value={formData.birth_date}
          onChangeText={(text) => updateFormData('birth_date', text)}
          placeholder="YYYY-MM-DD"
          icon="calendar"
          error={errors.birth_date}
        />

        <CustomInput
          label="Grado"
          value={formData.grade}
          onChangeText={(text) => updateFormData('grade', text)}
          placeholder="5to Grado"
          icon="school"
          error={errors.grade}
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
          title={isEditing ? 'Actualizar Estudiante' : 'Crear Estudiante'}
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

export default AddEditStudentScreen;

