import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import { attendanceManagementService } from '../../services/attendanceManagementService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const ViewSubjectAttendanceScreen = ({ route, navigation }) => {
  const { studentId, studentName, subjectId, subjectName, records } = route.params;
  const [attendanceRecords, setAttendanceRecords] = useState(records || []);

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

  const handleDelete = (attendanceId, date) => {
    Alert.alert(
      'Eliminar asistencia',
      `¿Estás seguro de eliminar la asistencia del ${date}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await attendanceManagementService.deleteAttendance(studentId, attendanceId);
              setAttendanceRecords(prev => prev.filter(r => r.id !== attendanceId));
              Alert.alert('Éxito', 'Asistencia eliminada');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la asistencia');
            }
          },
        },
      ]
    );
  };

  const handleJustify = (record) => {
    navigation.navigate('JustifyAttendance', {
      studentId,
      studentName,
      subjectId,
      subjectName,
      date: record.date,
    });
  };

  const renderRecord = ({ item }) => (
    <Card style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Icon 
          name={getStatusIcon(item.status)} 
          size={32} 
          color={getStatusColor(item.status)} 
        />
        <View style={styles.recordInfo}>
          <Text style={styles.recordDate}>{item.date}</Text>
          {item.justification_type && (
            <Text style={styles.justificationText}>
              Justificación: {item.justification_type}
            </Text>
          )}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>

      {item.observations && (
        <View style={styles.observations}>
          <Icon name="note-text" size={16} color={colors.textSecondary} />
          <Text style={styles.observationsText}>{item.observations}</Text>
        </View>
      )}

      <View style={styles.recordActions}>
        {(item.status === 'absent' || item.status === 'ausente') && !item.justification_type && (
          <TouchableOpacity
            style={[styles.recordButton, styles.justifyButton]}
            onPress={() => handleJustify(item)}
          >
            <Icon name="file-edit" size={16} color={colors.primary} />
            <Text style={styles.justifyButtonText}>Justificar</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.recordButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id, item.date)}
        >
          <Icon name="delete" size={16} color={colors.error} />
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.header}>
        <Text style={styles.headerTitle}>{studentName}</Text>
        <Text style={styles.headerSubtitle}>{subjectName}</Text>
      </Card>

      <FlatList
        data={attendanceRecords}
        renderItem={renderRecord}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-check"
            title="No hay registros"
            message="No hay asistencias registradas para esta materia"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    margin: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  recordCard: {
    marginBottom: spacing.md,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  recordInfo: {
    flex: 1,
  },
  recordDate: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  justificationText: {
    fontSize: fontSize.sm,
    color: colors.info,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  observations: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  observationsText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  recordActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  recordButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  justifyButton: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  justifyButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error + '20',
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.error,
  },
});

export default ViewSubjectAttendanceScreen;


