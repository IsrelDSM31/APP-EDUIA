import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Icon name="account" size={60} color={colors.textLight} />
          </View>
          <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@ejemplo.com'}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Icon name="pencil" size={20} color={colors.primary} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <MenuItem
          icon="robot"
          title="Asistente IA (Chatbot)"
          subtitle="Pregunta lo que necesites"
          onPress={() => navigation.navigate('ChatbotScreen')}
          iconColor={colors.primary}
        />
        <MenuItem
          icon="bell-outline"
          title="Alertas"
          onPress={() => navigation.navigate('AlertsScreen')}
        />
        <MenuItem
          icon="brain"
          title="Análisis de Riesgo IA"
          onPress={() => navigation.navigate('RiskAnalysisScreen')}
        />
        <MenuItem
          icon="cog"
          title="Ajustes"
          onPress={() => Alert.alert('Ajustes', 'Función en desarrollo')}
        />
        <MenuItem
          icon="help-circle"
          title="Ayuda"
          onPress={() => Alert.alert('Ayuda', 'Función en desarrollo')}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Gamificación</Text>
        <MenuItem
          icon="trophy"
          title="Ranking y Logros"
          subtitle="Ver ranking de estudiantes y logros"
          onPress={() => navigation.navigate('GamificationScreen')}
          iconColor={colors.warning}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Integraciones</Text>
        <MenuItem
          icon="google-classroom"
          title="Google Classroom"
          subtitle="Sincronizar cursos y estudiantes"
          onPress={() => navigation.navigate('GoogleClassroomScreen')}
          iconColor={colors.info}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>
        <MenuItem
          icon="information"
          title="Acerca de"
          onPress={() => Alert.alert('EduIA', 'Versión 1.0.0\nSistema de Gestión Educativa con IA')}
        />
        <MenuItem
          icon="file-document"
          title="Términos y Condiciones"
          onPress={() => Alert.alert('Términos', 'Función en desarrollo')}
        />
        <MenuItem
          icon="shield-check"
          title="Política de Privacidad"
          onPress={() => Alert.alert('Privacidad', 'Función en desarrollo')}
        />
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const MenuItem = ({ icon, title, subtitle, onPress, iconColor }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={24} color={iconColor || colors.textSecondary} />
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuText}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtext}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileCard: {
    margin: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight + '30',
    borderRadius: 20,
    gap: spacing.xs,
  },
  editButtonText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  userName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuText: {
    fontSize: fontSize.lg,
    color: colors.text,
  },
  menuSubtext: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.error + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
});

export default ProfileScreen;

