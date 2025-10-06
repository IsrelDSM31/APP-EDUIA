import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import RiskBadge from '../../components/common/RiskBadge';
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentsListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, students]);

  const loadStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      console.log('Students response:', response);
      
      // Manejar tanto respuesta directa como paginada
      const studentsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterStudents = () => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query) ||
        student.student_code?.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStudents();
  };

  const renderStudent = ({ item }) => (
    <Card
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
    >
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentCode}>{item.student_code}</Text>
        </View>
        {item.risk_level && <RiskBadge level={item.risk_level} size="small" />}
      </View>
      <View style={styles.studentDetails}>
        <DetailItem icon="email" text={item.email} />
        <DetailItem icon="school" text={item.grade || 'Sin grado'} />
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando estudiantes..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar estudiantes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="account-group"
            title="No hay estudiantes"
            message="No se encontraron estudiantes registrados"
            actionText="Agregar Estudiante"
            onAction={() => navigation.navigate('AddEditStudent')}
          />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditStudent')}
      >
        <Icon name="plus" size={24} color={colors.textLight} />
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 80,
  },
  studentCard: {
    marginBottom: spacing.md,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  studentCode: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  studentDetails: {
    marginTop: spacing.sm,
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
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default StudentsListScreen;

