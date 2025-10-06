import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import ChatbotFAB from '../../components/common/ChatbotFAB';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total_students: 0,
    total_teachers: 0,
    total_alerts: 0,
    high_risk_students: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardService.getStats();
      if (response && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      // Si falla, usar datos por defecto
      setStats({
        total_students: 0,
        total_teachers: 0,
        total_alerts: 0,
        high_risk_students: 0,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (loading) {
    return <LoadingScreen message="Cargando dashboard..." />;
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
          <Text style={styles.greeting}>EDUIA</Text>
          <Text style={styles.subtitle}>Sistema de Gestión Educativa</Text>
        </View>

        <View style={styles.statsGrid}>
        <StatCard
          icon="account-group"
          title="Estudiantes"
          value={stats.total_students}
          color={colors.primary}
          onPress={() => navigation.navigate('Students')}
        />
        <StatCard
          icon="account-tie"
          title="Profesores"
          value={stats.total_teachers}
          color={colors.secondary}
          onPress={() => navigation.navigate('Teachers')}
        />
        <StatCard
          icon="alert-circle"
          title="Alertas"
          value={stats.total_alerts}
          color={colors.warning}
          onPress={() => navigation.navigate('Profile', { screen: 'AlertsScreen' })}
        />
        <StatCard
          icon="shield-alert"
          title="Riesgo Alto"
          value={stats.high_risk_students}
          color={colors.error}
          onPress={() => navigation.navigate('Profile', { screen: 'RiskAnalysisScreen' })}
        />
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <QuickAccessItem
          icon="book-education"
          title="Calificaciones"
          onPress={() => navigation.navigate('Academic', { screen: 'GradesScreen' })}
        />
        <QuickAccessItem
          icon="calendar-check"
          title="Asistencias"
          onPress={() => navigation.navigate('Academic', { screen: 'AttendanceScreen' })}
        />
        <QuickAccessItem
          icon="calendar-month"
          title="Calendario Escolar"
          onPress={() => navigation.navigate('Calendar', { screen: 'CalendarHome' })}
        />
        <QuickAccessItem
          icon="brain"
          title="Análisis de Riesgo IA"
          onPress={() => navigation.navigate('Profile', { screen: 'RiskAnalysisScreen' })}
        />
      </Card>
      </ScrollView>
      
      <ChatbotFAB />
    </View>
  );
};

const StatCard = ({ icon, title, value, color, onPress }) => (
  <Card style={styles.statCard} onPress={onPress}>
    <Icon name={icon} size={32} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </Card>
);

const QuickAccessItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.quickAccessItem} onPress={onPress}>
    <Icon name={icon} size={24} color={colors.primary} />
    <Text style={styles.quickAccessText}>{title}</Text>
    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
  </TouchableOpacity>
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
    padding: spacing.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 42,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.lg,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.sm,
  },
  statTitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    margin: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  quickAccessText: {
    flex: 1,
    fontSize: fontSize.lg,
    color: colors.text,
    marginLeft: spacing.md,
  },
});

export default DashboardScreen;

