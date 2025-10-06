import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { attendanceService } from '../../services/attendanceService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const JustifyAttendanceScreen = ({ route, navigation }) => {
  const { studentId, studentName, subjectId, subjectName, date } = route.params;
  
  const [justificationType, setJustificationType] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);

  const justificationTypes = [
    { value: 'Enfermedad', icon: 'hospital-box', color: colors.error },
    { value: 'Cita Médica', icon: 'medical-bag', color: colors.warning },
    { value: 'Asunto Personal', icon: 'account', color: colors.info },
    { value: 'Emergencia Familiar', icon: 'home-alert', color: colors.error },
    { value: 'Otro', icon: 'help-circle', color: colors.textSecondary },
  ];

  const handleSubmit = async () => {
    if (!justificationType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de justificación');
      return;
    }

    try {
      setLoading(true);
      
      await attendanceService.justifyAttendance({
        student_id: studentId,
        subject_id: subjectId,
        justification_type: justificationType,
        observaciones: observaciones,
      });

      Alert.alert('Éxito', 'Asistencia justificada correctamente', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error justifying attendance:', error);
      const message = error.response?.data?.message || 'No se pudo justificar la asistencia';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="account-alert" size={40} color={colors.error} />
            <View style={styles.infoText}>
              <Text style={styles.studentName}>{studentName}</Text>
              <Text style={styles.subjectName}>{subjectName}</Text>
              <Text style={styles.date}>Fecha: {date}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.title}>Tipo de Justificación *</Text>
          <Text style={styles.subtitle}>Selecciona la razón de la ausencia</Text>

          <View style={styles.typesGrid}>
            {justificationTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeOption,
                  justificationType === type.value && {
                    backgroundColor: type.color + '20',
                    borderColor: type.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setJustificationType(type.value)}
              >
                <Icon name={type.icon} size={32} color={type.color} />
                <Text style={styles.typeLabel}>{type.value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomInput
            label="Observaciones (Opcional)"
            value={observaciones}
            onChangeText={setObservaciones}
            placeholder="Describe los detalles de la justificación..."
            icon="note-text"
            multiline
            numberOfLines={4}
          />

          <View style={styles.note}>
            <Icon name="information" size={20} color={colors.info} />
            <Text style={styles.noteText}>
              Esta justificación se aplicará a la última inasistencia sin justificar de esta materia.
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <CustomButton
            title={loading ? "Guardando..." : "Justificar Asistencia"}
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
  infoCard: {
    margin: spacing.md,
    backgroundColor: colors.error + '10',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoText: {
    flex: 1,
  },
  studentName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subjectName: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    marginBottom: 2,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  card: {
    margin: spacing.md,
    marginTop: 0,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typeOption: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  typeLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.info + '10',
    borderRadius: 8,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  noteText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  actions: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});

export default JustifyAttendanceScreen;


