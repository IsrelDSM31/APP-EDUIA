import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentGradesScreen = ({ route }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    loadGrades();
  }, [studentId]);

  const loadGrades = async () => {
    try {
      const response = await studentService.getStudentGrades(studentId);
      const gradesData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      setGrades(gradesData);
    } catch (error) {
      console.error('Error loading grades:', error);
      setGrades([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadGrades();
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return colors.gradeExcellent;
    if (grade >= 80) return colors.gradeGood;
    if (grade >= 70) return colors.gradeAverage;
    if (grade >= 60) return colors.gradePoor;
    return colors.gradeFail;
  };

  const renderGrade = ({ item }) => (
    <Card style={styles.gradeCard}>
      <View style={styles.gradeHeader}>
        <View style={styles.gradeInfo}>
          <Text style={styles.courseName}>{item.subject_name || item.course_name || 'Materia'}</Text>
          <Text style={styles.assignment}>{item.assignment || 'Evaluación'}</Text>
        </View>
        <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(item.grade || item.promedio_final || 0) }]}>
          <Text style={styles.gradeValue}>{item.grade || item.promedio_final || 0}</Text>
        </View>
      </View>
      <View style={styles.gradeDetails}>
        <DetailItem icon="calendar" text={item.date || item.created_at || 'Sin fecha'} />
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando calificaciones..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{studentName}</Text>
        <Text style={styles.headerSubtitle}>Calificaciones</Text>
      </View>
      
      <FlatList
        data={grades}
        renderItem={renderGrade}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="clipboard-text"
            title="No hay calificaciones"
            message="Este estudiante aún no tiene calificaciones registradas"
          />
        }
      />
    </View>
  );
};

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <Icon name={icon} size={16} color={colors.textSecondary} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  gradeCard: {
    marginBottom: spacing.md,
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gradeInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  assignment: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  gradeBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
  },
  gradeDetails: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  detailText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});

export default StudentGradesScreen;


