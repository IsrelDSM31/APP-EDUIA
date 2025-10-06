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
import { teacherService } from '../../services/teacherService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const TeachersListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [searchQuery, teachers]);

  const loadTeachers = async () => {
    try {
      const response = await teacherService.getAllTeachers();
      const teachersData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      setTeachers(teachersData);
      setFilteredTeachers(teachersData);
    } catch (error) {
      console.error('Error loading teachers:', error);
      setTeachers([]);
      setFilteredTeachers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterTeachers = () => {
    if (!searchQuery.trim()) {
      setFilteredTeachers(teachers);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = teachers.filter(
      (teacher) =>
        teacher.name?.toLowerCase().includes(query) ||
        teacher.email?.toLowerCase().includes(query) ||
        teacher.subject?.toLowerCase().includes(query)
    );
    setFilteredTeachers(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTeachers();
  };

  const renderTeacher = ({ item }) => (
    <Card
      style={styles.teacherCard}
      onPress={() => navigation.navigate('TeacherDetail', { teacherId: item.id })}
    >
      <View style={styles.teacherHeader}>
        <View style={styles.teacherInfo}>
          <Text style={styles.teacherName}>{item.name}</Text>
          <Text style={styles.teacherSubject}>{item.subject || 'Sin materia asignada'}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
      <View style={styles.teacherDetails}>
        <DetailItem icon="email" text={item.email} />
        <DetailItem icon="phone" text={item.phone || 'Sin teléfono'} />
      </View>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando profesores..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar profesores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <FlatList
        data={filteredTeachers}
        renderItem={renderTeacher}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="account-tie"
            title="No hay profesores"
            message="No se encontraron profesores registrados"
            actionText="Agregar Profesor"
            onAction={() => navigation.navigate('AddEditTeacher')}
          />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditTeacher')}
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
  teacherCard: {
    marginBottom: spacing.md,
  },
  teacherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  teacherSubject: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  teacherDetails: {
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

export default TeachersListScreen;

