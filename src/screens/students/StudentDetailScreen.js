import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import LoadingScreen from '../../components/common/LoadingScreen';
import RiskBadge from '../../components/common/RiskBadge';
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentDetailScreen = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    try {
      const response = await studentService.getStudentById(studentId);
      if (response.data) {
        setStudent(response.data);
      }
    } catch (error) {
      console.error('Error loading student:', error);
      Alert.alert('Error', 'No se pudo cargar la información del estudiante');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Estudiante',
      '¿Estás seguro de que deseas eliminar este estudiante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await studentService.deleteStudent(studentId);
              Alert.alert('Éxito', 'Estudiante eliminado correctamente');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el estudiante');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingScreen message="Cargando información..." />;
  }

  if (!student) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.code}>{student.student_code}</Text>
          </View>
          {student.risk_level && <RiskBadge level={student.risk_level} />}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddEditStudent', { student })}
          >
            <Icon name="pencil" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Icon name="delete" size={20} color={colors.error} />
            <Text style={[styles.actionText, { color: colors.error }]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <InfoRow icon="email" label="Correo" value={student.email} />
        <InfoRow icon="phone" label="Teléfono" value={student.phone || 'No registrado'} />
        <InfoRow icon="calendar" label="Fecha de Nacimiento" value={student.birth_date || 'No registrado'} />
        <InfoRow icon="school" label="Grado" value={student.grade || 'No asignado'} />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Académicos</Text>
        <CustomButton
          title="Ver Calificaciones"
          onPress={() => navigation.navigate('StudentGrades', { studentId, studentName: student.name })}
          variant="outline"
          style={styles.dataButton}
        />
        <CustomButton
          title="Ver Asistencias"
          onPress={() => navigation.navigate('StudentAttendanceDetail', { studentId, studentName: student.name })}
          variant="outline"
          style={styles.dataButton}
        />
        <CustomButton
          title="Ver Alertas"
          onPress={() => navigation.navigate('StudentAlerts', { studentId, studentName: student.name })}
          variant="outline"
          style={styles.dataButton}
        />
        <CustomButton
          title="Análisis de Riesgo IA"
          onPress={() => navigation.navigate('StudentRiskAnalysis', { studentId, studentName: student.name })}
          variant="outline"
          style={styles.dataButton}
        />
        <CustomButton
          title="🏆 Gamificación"
          onPress={() => navigation.navigate('StudentGamification', { studentId, studentName: student.name })}
          variant="outline"
          style={styles.dataButton}
        />
      </Card>
    </ScrollView>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={20} color={colors.textSecondary} />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    margin: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  code: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: fontSize.md,
    color: colors.primary,
    marginLeft: spacing.sm,
    fontWeight: fontWeight.medium,
  },
  section: {
    margin: spacing.md,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  dataButton: {
    marginBottom: spacing.sm,
  },
});

export default StudentDetailScreen;

