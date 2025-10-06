import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const AttendanceScreen = ({ navigation }) => {
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
    const filtered = students.filter(student =>
      student.name?.toLowerCase().includes(query) ||
      student.student_code?.toLowerCase().includes(query) ||
      student.grade?.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStudents();
  };

  const renderStudent = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('StudentAttendanceDetail', {
        studentId: item.id,
        studentName: item.name,
      })}
    >
      <Card style={styles.studentCard}>
        <View style={styles.studentHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="account" size={40} color={colors.primary} />
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.studentCode}>Matrícula: {item.student_code}</Text>
            <Text style={styles.studentGrade}>{item.grade}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingScreen message="Cargando asistencias..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar estudiante..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
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
            icon="account-school"
            title="No hay estudiantes"
            message={searchQuery ? "No se encontraron estudiantes" : "No hay estudiantes registrados"}
          />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('RegisterAttendance')}
      >
        <Icon name="plus" size={28} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
};

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
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: 0,
    paddingBottom: 80,
  },
  studentCard: {
    marginBottom: spacing.md,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  studentCode: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  studentGrade: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default AttendanceScreen;

