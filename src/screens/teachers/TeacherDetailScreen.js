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
import { teacherService } from '../../services/teacherService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const TeacherDetailScreen = ({ route, navigation }) => {
  const { teacherId } = route.params;
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    loadTeacher();
  }, [teacherId]);

  const loadTeacher = async () => {
    try {
      const response = await teacherService.getTeacherById(teacherId);
      if (response.data) {
        setTeacher(response.data);
      }
    } catch (error) {
      console.error('Error loading teacher:', error);
      Alert.alert('Error', 'No se pudo cargar la información del profesor');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Profesor',
      '¿Estás seguro de que deseas eliminar este profesor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await teacherService.deleteTeacher(teacherId);
              Alert.alert('Éxito', 'Profesor eliminado correctamente');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el profesor');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingScreen message="Cargando información..." />;
  }

  if (!teacher) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <View style={styles.header}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject || 'Sin materia asignada'}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddEditTeacher', { teacher })}
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
        <InfoRow icon="email" label="Correo" value={teacher.email} />
        <InfoRow icon="phone" label="Teléfono" value={teacher.phone || 'No registrado'} />
        <InfoRow icon="book-open-variant" label="Materia" value={teacher.subject || 'No asignada'} />
        <InfoRow icon="badge-account" label="Especialidad" value={teacher.specialty || 'No especificada'} />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Gestión Académica</Text>
        <CustomButton
          title="Ver Estudiantes"
          onPress={() => {}}
          variant="outline"
          style={styles.dataButton}
        />
        <CustomButton
          title="Ver Cursos"
          onPress={() => {}}
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
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subject: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.medium,
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

export default TeacherDetailScreen;

