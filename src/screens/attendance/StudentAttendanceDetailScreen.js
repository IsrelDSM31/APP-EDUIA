import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { attendanceManagementService } from '../../services/attendanceManagementService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentAttendanceDetailScreen = ({ route, navigation }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    loadStudentAttendance();
  }, [studentId]);

  const loadStudentAttendance = async () => {
    try {
      const response = await attendanceManagementService.getStudentAttendance(studentId);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error loading student attendance:', error);
      Alert.alert('Error', 'No se pudieron cargar las asistencias');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStudentAttendance();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
      case 'presente':
        return colors.success;
      case 'absent':
      case 'ausente':
        return colors.error;
      case 'late':
      case 'tarde':
      case 'tardanza':
        return colors.warning;
      case 'justified':
      case 'justificado':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
      case 'presente':
        return 'Presente';
      case 'absent':
      case 'ausente':
        return 'Ausente';
      case 'late':
      case 'tarde':
      case 'tardanza':
        return 'Tardanza';
      case 'justified':
      case 'justificado':
        return 'Justificado';
      default:
        return status || 'N/A';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
      case 'presente':
        return 'check-circle';
      case 'absent':
      case 'ausente':
        return 'close-circle';
      case 'late':
      case 'tarde':
      case 'tardanza':
        return 'clock-alert';
      case 'justified':
      case 'justificado':
        return 'file-document-check';
      default:
        return 'help-circle';
    }
  };

  const handleEditAttendance = (subjectId, subjectName, subjectData) => {
    navigation.navigate('EditSubjectAttendance', {
      studentId,
      studentName,
      subjectId,
      subjectName,
      currentData: subjectData,
      onSave: loadStudentAttendance,
    });
  };

  const handleDeleteAttendance = (attendanceId, subjectName, date) => {
    Alert.alert(
      'Eliminar asistencia',
      `¿Estás seguro de eliminar la asistencia de ${subjectName} del ${date}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await attendanceManagementService.deleteAttendance(studentId, attendanceId);
              Alert.alert('Éxito', 'Asistencia eliminada');
              loadStudentAttendance();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la asistencia');
            }
          },
        },
      ]
    );
  };

  const getAttendanceRateColor = (rate) => {
    if (rate >= 90) return colors.success;
    if (rate >= 80) return colors.warning;
    return colors.error;
  };

  const renderSubjectAttendance = (subjectId, subjectData) => (
    <Card key={subjectId} style={styles.subjectCard}>
      <View style={styles.subjectHeader}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{subjectData.subject_name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="check-circle" size={16} color={colors.success} />
              <Text style={styles.statText}>{subjectData.statistics.present}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="close-circle" size={16} color={colors.error} />
              <Text style={styles.statText}>{subjectData.statistics.absent}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="clock-alert" size={16} color={colors.warning} />
              <Text style={styles.statText}>{subjectData.statistics.late}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.rateContainer, { backgroundColor: getAttendanceRateColor(subjectData.statistics.attendance_rate) + '20' }]}>
          <Text style={[styles.rateValue, { color: getAttendanceRateColor(subjectData.statistics.attendance_rate) }]}>
            {subjectData.statistics.attendance_rate}%
          </Text>
          <Text style={styles.rateLabel}>Asistencia</Text>
        </View>
      </View>

      {subjectData.records.length > 0 && (
        <View style={styles.recordsPreview}>
          <Text style={styles.recordsTitle}>Últimos registros ({subjectData.records.length}):</Text>
          {subjectData.records.slice(0, 3).map((record) => (
            <View key={record.id} style={styles.recordRow}>
              <Icon name={getStatusIcon(record.status)} size={20} color={getStatusColor(record.status)} />
              <Text style={styles.recordDate}>{record.date}</Text>
              <View style={[styles.recordBadge, { backgroundColor: getStatusColor(record.status) }]}>
                <Text style={styles.recordBadgeText}>{getStatusLabel(record.status)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditAttendance(subjectId, subjectData.subject_name, subjectData)}
        >
          <Icon name="calendar-edit" size={18} color={colors.textLight} />
          <Text style={styles.actionButtonText}>Registrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => navigation.navigate('ViewSubjectAttendance', {
            studentId,
            studentName,
            subjectId,
            subjectName: subjectData.subject_name,
            records: subjectData.records,
          })}
        >
          <Icon name="eye" size={18} color={colors.textLight} />
          <Text style={styles.actionButtonText}>Ver Todo</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando asistencias..." />;
  }

  if (!studentData) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Error"
        message="No se pudieron cargar las asistencias"
      />
    );
  }

  const subjects = Object.entries(studentData.attendance_by_subject || {});

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <View style={styles.studentHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="account" size={50} color={colors.primary} />
          </View>
          <View style={styles.studentHeaderInfo}>
            <Text style={styles.studentHeaderName}>{studentData.nombre}</Text>
            <Text style={styles.studentHeaderMatricula}>Matrícula: {studentData.matricula}</Text>
            <Text style={styles.studentHeaderGroup}>{studentData.group}</Text>
          </View>
        </View>
      </Card>

      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectsTitle}>Materias ({subjects.length})</Text>
        {subjects.length === 0 ? (
          <EmptyState
            icon="calendar-check"
            title="Sin asistencias"
            message="Este estudiante aún no tiene asistencias registradas"
          />
        ) : (
          subjects.map(([subjectId, subjectData]) => renderSubjectAttendance(subjectId, subjectData))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    margin: spacing.md,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  studentHeaderInfo: {
    flex: 1,
  },
  studentHeaderName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  studentHeaderMatricula: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  studentHeaderGroup: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  subjectsContainer: {
    padding: spacing.md,
    paddingTop: 0,
  },
  subjectsTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subjectCard: {
    marginBottom: spacing.md,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  rateContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  rateValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  rateLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recordsPreview: {
    marginBottom: spacing.md,
  },
  recordsTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  recordDate: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  recordBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  recordBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  viewButton: {
    backgroundColor: colors.info,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
});

export default StudentAttendanceDetailScreen;

