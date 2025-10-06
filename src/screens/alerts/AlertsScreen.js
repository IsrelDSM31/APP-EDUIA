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
import { alertService } from '../../services/alertService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const AlertsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await alertService.getAllAlerts();
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

  const handleMarkAsRead = async (alertId) => {
    try {
      await alertService.markAlertAsRead(alertId);
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
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
    <Card 
      style={[styles.alertCard, !item.is_read && styles.unreadCard]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.alertHeader}>
        <Icon 
          name={getSeverityIcon(item.severity)} 
          size={24} 
          color={getSeverityColor(item.severity)} 
        />
        <View style={styles.alertInfo}>
          <Text style={[styles.alertTitle, !item.is_read && styles.unreadText]}>
            {item.title || 'Alerta'}
          </Text>
          <Text style={styles.alertDate}>{item.created_at || 'Fecha desconocida'}</Text>
        </View>
        {!item.is_read && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.alertMessage}>{item.message || 'Sin mensaje'}</Text>
      {item.student_name && (
        <View style={styles.studentInfo}>
          <Icon name="account" size={16} color={colors.textSecondary} />
          <Text style={styles.studentName}>{item.student_name}</Text>
        </View>
      )}
    </Card>
  );

  if (loading) {
    return <LoadingScreen message="Cargando alertas..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="bell-outline"
            title="No hay alertas"
            message="No tienes alertas pendientes"
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
  listContent: {
    padding: spacing.md,
  },
  alertCard: {
    marginBottom: spacing.md,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
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
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  unreadText: {
    fontWeight: fontWeight.bold,
  },
  alertDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  alertMessage: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  studentName: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});

export default AlertsScreen;

