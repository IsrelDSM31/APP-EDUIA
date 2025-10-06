import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { googleClassroomService } from '../../services/googleClassroomService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const GoogleClassroomScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await googleClassroomService.getConnectionStatus();
      setIsConnected(response.data?.is_connected || false);
      
      if (response.data?.is_connected) {
        loadCourses();
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await googleClassroomService.getCourses();
      if (response.success) {
        setCourses(response.data?.courses || []);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      Alert.alert('Error', 'No se pudieron cargar los cursos');
    }
  };

  const handleConnect = () => {
    Alert.alert(
      'Conectar con Google Classroom',
      'Para conectar con Google Classroom, necesitas configurar las credenciales de OAuth en el backend.\n\n' +
      '1. Ve a Google Cloud Console\n' +
      '2. Crea un proyecto\n' +
      '3. Habilita Google Classroom API\n' +
      '4. Crea credenciales OAuth 2.0\n' +
      '5. Agrega las credenciales al archivo .env del backend',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Configurar',
          onPress: () => {
            Alert.alert(
              'Configuración',
              'Agrega estas variables en el archivo .env del backend:\n\n' +
              'GOOGLE_CLIENT_ID=tu_client_id\n' +
              'GOOGLE_CLIENT_SECRET=tu_client_secret\n' +
              'GOOGLE_REDIRECT_URI=http://localhost/callback'
            );
          },
        },
      ]
    );
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Desconectar',
      '¿Estás seguro de que deseas desconectar Google Classroom?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desconectar',
          style: 'destructive',
          onPress: async () => {
            try {
              await googleClassroomService.disconnect();
              setIsConnected(false);
              setCourses([]);
              Alert.alert('Éxito', 'Desconectado de Google Classroom');
            } catch (error) {
              Alert.alert('Error', 'No se pudo desconectar');
            }
          },
        },
      ]
    );
  };

  const handleSyncStudents = async (courseId, courseName) => {
    Alert.alert(
      'Sincronizar Estudiantes',
      `¿Deseas sincronizar los estudiantes del curso "${courseName}"?\n\nEsto importará los estudiantes de Google Classroom al sistema.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sincronizar',
          onPress: async () => {
            try {
              setLoading(true);
              const response = await googleClassroomService.syncCourseStudents(courseId);
              
              if (response.success) {
                Alert.alert(
                  'Éxito',
                  `Se sincronizaron ${response.data?.synced_count || 0} estudiantes de ${response.data?.total_students || 0} encontrados.`
                );
              }
            } catch (error) {
              Alert.alert('Error', 'No se pudieron sincronizar los estudiantes');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    checkConnection();
    setRefreshing(false);
  };

  const renderCourse = ({ item }) => (
    <Card
      style={styles.courseCard}
      onPress={() => {
        Alert.alert(
          item.name,
          `Sección: ${item.section || 'N/A'}\n\n` +
          `${item.description || 'Sin descripción'}\n\n` +
          `Aula: ${item.room || 'N/A'}`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Sincronizar Estudiantes',
              onPress: () => handleSyncStudents(item.id, item.name),
            },
          ]
        );
      }}
    >
      <View style={styles.courseHeader}>
        <View style={styles.courseIcon}>
          <Icon name="google-classroom" size={32} color={colors.primary} />
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>{item.name}</Text>
          {item.section && <Text style={styles.courseSection}>{item.section}</Text>}
        </View>
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
      {item.enrollment_code && (
        <View style={styles.enrollmentCode}>
          <Icon name="key" size={16} color={colors.info} />
          <Text style={styles.enrollmentCodeText}>{item.enrollment_code}</Text>
        </View>
      )}
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando Google Classroom..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Icon name="google-classroom" size={40} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Google Classroom</Text>
          <Text style={styles.headerSubtitle}>
            {isConnected ? 'Conectado' : 'No conectado'}
          </Text>
        </View>

        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Icon
              name={isConnected ? 'check-circle' : 'alert-circle'}
              size={24}
              color={isConnected ? colors.success : colors.warning}
            />
            <Text style={styles.statusTitle}>
              {isConnected ? 'Conexión Activa' : 'Sin Conexión'}
            </Text>
          </View>
          
          {!isConnected ? (
            <>
              <Text style={styles.statusDescription}>
                Conecta con Google Classroom para sincronizar tus cursos, estudiantes y tareas.
              </Text>
              <CustomButton
                title="Conectar con Google"
                onPress={handleConnect}
                icon={<Icon name="google" size={20} color={colors.textLight} style={{ marginRight: spacing.sm }} />}
              />
            </>
          ) : (
            <>
              <Text style={styles.statusDescription}>
                Conectado exitosamente. Puedes sincronizar tus cursos y estudiantes.
              </Text>
              <CustomButton
                title="Desconectar"
                variant="outline"
                onPress={handleDisconnect}
              />
            </>
          )}
        </Card>

        {isConnected && (
          <View style={styles.coursesSection}>
            <Text style={styles.sectionTitle}>Mis Cursos</Text>
            {courses.length > 0 ? (
              <FlatList
                data={courses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <EmptyState
                icon="book-open-variant"
                title="No hay cursos"
                message="No se encontraron cursos en Google Classroom"
              />
            )}
          </View>
        )}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Funcionalidades</Text>
          <View style={styles.featureList}>
            <FeatureItem
              icon="import"
              title="Sincronizar Estudiantes"
              description="Importa estudiantes desde tus cursos"
            />
            <FeatureItem
              icon="book"
              title="Ver Cursos"
              description="Accede a todos tus cursos activos"
            />
            <FeatureItem
              icon="clipboard-text"
              title="Tareas y Trabajos"
              description="Consulta las tareas asignadas"
            />
            <FeatureItem
              icon="sync"
              title="Sincronización Automática"
              description="Mantén los datos actualizados"
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={24} color={colors.primary} />
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statusCard: {
    margin: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  statusTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statusDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  coursesSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  courseCard: {
    marginBottom: spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  courseSection: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  enrollmentCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.info + '20',
    borderRadius: 8,
    gap: spacing.xs,
  },
  enrollmentCodeText: {
    fontSize: fontSize.sm,
    color: colors.info,
    fontWeight: fontWeight.medium,
  },
  infoCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  infoTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  featureList: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

export default GoogleClassroomScreen;


