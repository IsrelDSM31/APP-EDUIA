import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
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
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { attendanceService } from '../../services/attendanceService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const RegisterAttendanceScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    subject_id: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'presente',
    observaciones: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.student_id || !formData.subject_id) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      setLoading(true);
      await attendanceService.createAttendance(formData);
      
      Alert.alert('Éxito', 'Asistencia registrada correctamente', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error creating attendance:', error);
      Alert.alert('Error', 'No se pudo registrar la asistencia');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'presente', label: 'Presente', icon: 'check-circle', color: colors.success },
    { value: 'ausente', label: 'Ausente', icon: 'close-circle', color: colors.error },
    { value: 'tardanza', label: 'Tardanza', icon: 'clock-alert', color: colors.warning },
    { value: 'justificado', label: 'Justificado', icon: 'file-document', color: colors.info },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Text style={styles.title}>Registrar Asistencia</Text>
          <Text style={styles.subtitle}>Completa la información</Text>

          <CustomInput
            label="ID del Estudiante *"
            value={formData.student_id}
            onChangeText={(text) => setFormData({ ...formData, student_id: text })}
            placeholder="Ej: 1"
            keyboardType="numeric"
            icon="account"
          />

          <CustomInput
            label="ID de la Materia *"
            value={formData.subject_id}
            onChangeText={(text) => setFormData({ ...formData, subject_id: text })}
            placeholder="Ej: 1"
            keyboardType="numeric"
            icon="book"
          />

          <CustomInput
            label="Fecha *"
            value={formData.fecha}
            onChangeText={(text) => setFormData({ ...formData, fecha: text })}
            placeholder="YYYY-MM-DD"
            icon="calendar"
          />

          <Text style={styles.label}>Estado *</Text>
          <View style={styles.statusGrid}>
            {statusOptions.map((option) => (
              <Card
                key={option.value}
                style={[
                  styles.statusOption,
                  formData.estado === option.value && {
                    backgroundColor: option.color + '20',
                    borderColor: option.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setFormData({ ...formData, estado: option.value })}
              >
                <Icon name={option.icon} size={32} color={option.color} />
                <Text style={styles.statusLabel}>{option.label}</Text>
              </Card>
            ))}
          </View>

          <CustomInput
            label="Observaciones (Opcional)"
            value={formData.observaciones}
            onChangeText={(text) => setFormData({ ...formData, observaciones: text })}
            placeholder="Agregar nota..."
            icon="note-text"
            multiline
            numberOfLines={3}
          />
        </Card>

        <View style={styles.actions}>
          <CustomButton
            title={loading ? "Guardando..." : "Registrar Asistencia"}
            onPress={handleSubmit}
            disabled={loading}
          />
          <CustomButton
            title="Cancelar"
            onPress={() => navigation.goBack()}
            variant="outline"
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
  card: {
    margin: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statusOption: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  actions: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});

export default RegisterAttendanceScreen;


