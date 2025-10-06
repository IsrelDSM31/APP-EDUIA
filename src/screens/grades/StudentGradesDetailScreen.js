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
import { gradeManagementService } from '../../services/gradeManagementService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentGradesDetailScreen = ({ route, navigation }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    loadStudentGrades();
  }, [studentId]);

  const loadStudentGrades = async () => {
    try {
      const response = await gradeManagementService.getStudentGrades(studentId);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error loading student grades:', error);
      Alert.alert('Error', 'No se pudieron cargar las calificaciones');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStudentGrades();
  };

  const handleEditGrade = (subjectId, subjectName, subjectData) => {
    navigation.navigate('EditSubjectGrade', {
      studentId,
      studentName,
      subjectId,
      subjectName,
      currentData: subjectData,
      onSave: loadStudentGrades,
    });
  };

  const handleDeleteGrade = (subjectId, subjectName) => {
    Alert.alert(
      'Eliminar calificaciones',
      `¿Estás seguro de eliminar las calificaciones de ${subjectName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await gradeManagementService.deleteGrade(studentId, subjectId);
              Alert.alert('Éxito', 'Calificaciones eliminadas');
              loadStudentGrades();
            } catch (error) {
              Alert.alert('Error', 'No se pudieron eliminar las calificaciones');
            }
          },
        },
      ]
    );
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return colors.success;
      case 'Riesgo':
        return colors.warning;
      case 'Reprobado':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const renderSubjectGrade = (subjectId, subjectData) => (
    <Card key={subjectId} style={styles.subjectCard}>
      <View style={styles.subjectHeader}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{subjectData.subject_name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(subjectData.estado) }]}>
              <Text style={styles.estadoText}>{subjectData.estado}</Text>
            </View>
            {subjectData.faltantes > 0 && (
              <Text style={styles.faltantesText}>
                Faltan {subjectData.faltantes.toFixed(2)} puntos
              </Text>
            )}
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{subjectData.score.toFixed(2)}</Text>
          <Text style={styles.scoreLabel}>Promedio</Text>
        </View>
      </View>

      <View style={styles.evaluationsPreview}>
        <Text style={styles.evaluationsTitle}>Evaluaciones:</Text>
        <View style={styles.evaluationsRow}>
          {subjectData.evaluations.map((evaluation, index) => (
            <View key={index} style={styles.evalPreview}>
              <Text style={styles.evalNumber}>U{index + 1}</Text>
              <Text style={styles.evalProm}>{evaluation.Prom.toFixed(1)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditGrade(subjectId, subjectData.subject_name, subjectData)}
        >
          <Icon name="pencil" size={18} color={colors.textLight} />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        
        {subjectData.grade_id && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteGrade(subjectId, subjectData.subject_name)}
          >
            <Icon name="delete" size={18} color={colors.textLight} />
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando calificaciones..." />;
  }

  if (!studentData) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Error"
        message="No se pudieron cargar las calificaciones"
      />
    );
  }

  const subjects = Object.entries(studentData.grades_by_subject || {});

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
            icon="clipboard-text"
            title="Sin calificaciones"
            message="Este estudiante aún no tiene calificaciones registradas"
          />
        ) : (
          subjects.map(([subjectId, subjectData]) => renderSubjectGrade(subjectId, subjectData))
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estadoBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  estadoText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  faltantesText: {
    fontSize: fontSize.xs,
    color: colors.error,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  scoreValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  evaluationsPreview: {
    marginBottom: spacing.md,
  },
  evaluationsTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  evaluationsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  evalPreview: {
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
    minWidth: 60,
  },
  evalNumber: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  evalProm: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
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
  deleteButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
});

export default StudentGradesDetailScreen;

