import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentAlertsScreen = ({ route }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, [studentId]);

  const loadAlerts = async () => {
    try {
      const response = await studentService.getStudentAlerts(studentId);
      const alertsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error loading alerts:', error);
      setAlerts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAlerts();
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'alta':
        return colors.error;
      case 'medium':
      case 'media':
        return colors.warning;
      case 'low':
      case 'baja':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'alta':
        return 'alert-circle';
      case 'medium':
      case 'media':
        return 'alert';
      case 'low':
      case 'baja':
        return 'information';
      default:
        return 'bell';
    }
  };

  const renderAlert = ({ item }) => (
    <Card style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <Icon 
          name={getSeverityIcon(item.severity || item.tipo)} 
          size={24} 
          color={getSeverityColor(item.severity || item.tipo)} 
        />
        <View style={styles.alertInfo}>
          <Text style={styles.alertTitle}>
            {item.title || item.tipo || 'Alerta'}
          </Text>
          <Text style={styles.alertDate}>{item.created_at || item.fecha || 'Fecha desconocida'}</Text>
        </View>
      </View>
      <Text style={styles.alertMessage}>{item.message || item.mensaje || 'Sin mensaje'}</Text>
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando alertas..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{studentName}</Text>
        <Text style={styles.headerSubtitle}>Alertas</Text>
      </View>

      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="bell-outline"
            title="No hay alertas"
            message="Este estudiante no tiene alertas registradas"
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
  alertCard: {
    marginBottom: spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  alertTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  alertDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  alertMessage: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 20,
  },
});

export default StudentAlertsScreen;


