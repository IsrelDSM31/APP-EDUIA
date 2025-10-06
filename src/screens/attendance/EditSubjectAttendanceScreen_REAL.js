import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import { attendanceManagementService } from '../../services/attendanceManagementService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const EditSubjectAttendanceScreen = ({ route, navigation }) => {
  const { studentId, studentName, subjectId, subjectName, currentData, onSave } = route.params;
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    observations: '',
  });
  const [saving, setSaving] = useState(false);

  const statusOptions = [
    { value: 'present', label: 'Presente', icon: 'check-circle', color: colors.success },
    { value: 'absent', label: 'Ausente', icon: 'close-circle', color: colors.error },
    { value: 'late', label: 'Tardanza', icon: 'clock-alert', color: colors.warning },
    { value: 'justified', label: 'Justificado', icon: 'file-document-check', color: colors.info },
  ];

  const handleSave = async () => {
    try {
      setSaving(true);
      
      await attendanceManagementService.saveAttendance(studentId, {
        subject_id: subjectId,
        date: formData.date,
        status: formData.status,
        observations: formData.observations || null,
      });

      Alert.alert('Éxito', 'Asistencia registrada correctamente', [
        {
          text: 'OK',
          onPress: () => {
            if (onSave) onSave();
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving attendance:', error);
      Alert.alert('Error', 'No se pudo guardar la asistencia');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>{studentName}</Text>
          <Text style={styles.infoSubject}>{subjectName}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.label}>Fecha *</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
            placeholder="YYYY-MM-DD"
          />

          <Text style={styles.label}>Estado *</Text>
          <View style={styles.statusGrid}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.statusOption,
                  formData.status === option.value && {
                    backgroundColor: option.color + '20',
                    borderColor: option.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setFormData({ ...formData, status: option.value })}
              >
                <Icon name={option.icon} size={32} color={option.color} />
                <Text style={styles.statusLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Observaciones (Opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.observations}
            onChangeText={(text) => setFormData({ ...formData, observations: text })}
            placeholder="Agregar nota..."
            multiline
            numberOfLines={3}
          />
        </Card>

        <View style={styles.footer}>
          <CustomButton
            title={saving ? "Guardando..." : "Guardar Asistencia"}
            onPress={handleSave}
            disabled={saving}
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
  infoCard: {
    margin: spacing.md,
  },
  infoTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoSubject: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  card: {
    margin: spacing.md,
    marginTop: 0,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  statusLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});

export default EditSubjectAttendanceScreen;


