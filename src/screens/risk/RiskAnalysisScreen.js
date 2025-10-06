import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import LoadingScreen from '../../components/common/LoadingScreen';
import RiskBadge from '../../components/common/RiskBadge';
import { riskAnalysisService } from '../../services/riskAnalysisService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const RiskAnalysisScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statistics, setStatistics] = useState({
    total_students: 0,
    high_risk: 0,
    medium_risk: 0,
    low_risk: 0,
    no_risk: 0,
  });
  const [riskStudents, setRiskStudents] = useState([]);

  useEffect(() => {
    loadRiskData();
  }, []);

  const loadRiskData = async () => {
    try {
      const statsResponse = await riskAnalysisService.getRiskStatistics();
      const statsData = statsResponse?.data?.data || statsResponse?.data || {};
      setStatistics(statsData);

      const analysisResponse = await riskAnalysisService.getAllRiskAnalysis();
      const analysisData = Array.isArray(analysisResponse.data) 
        ? analysisResponse.data 
        : (analysisResponse.data?.data || []);
      
      // Mostrar TODOS los estudiantes (incluye alto, medio y bajo)
      setRiskStudents(analysisData);
    } catch (error) {
      console.error('Error loading risk data:', error);
      setStatistics({
        total_students: 0,
        high_risk: 0,
        medium_risk: 0,
        low_risk: 0,
        no_risk: 0,
      });
      setRiskStudents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRiskData();
  };

  if (loading) {
    return <LoadingScreen message="Analizando datos con IA..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="brain" size={40} color={colors.primary} />
          <Text style={styles.headerTitle}>Análisis de Riesgo con IA</Text>
          <Text style={styles.headerSubtitle}>
            Sistema inteligente de detección temprana
          </Text>
        </View>
      </Card>

      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Estadísticas Generales</Text>
        <View style={styles.statsGrid}>
          <StatItem
            icon="account-group"
            label="Total Estudiantes"
            value={statistics.total_students}
            color={colors.primary}
          />
          <StatItem
            icon="shield-alert"
            label="Riesgo Alto"
            value={statistics.high_risk}
            color={colors.riskHigh}
          />
          <StatItem
            icon="shield-check"
            label="Riesgo Medio"
            value={statistics.medium_risk}
            color={colors.riskMedium}
          />
          <StatItem
            icon="shield"
            label="Riesgo Bajo"
            value={statistics.low_risk}
            color={colors.riskLow}
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Todos los Estudiantes ({riskStudents.length})</Text>
        {riskStudents.length > 0 ? (
          riskStudents.map((item) => (
            <Card key={item.id} style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{item.student_name}</Text>
                  <Text style={styles.studentCode}>{item.student_code}</Text>
                </View>
                <RiskBadge level={item.risk_level} size="small" />
              </View>
              {item.risk_factors && item.risk_factors.length > 0 && (
                <View style={styles.factorsContainer}>
                  <Text style={styles.factorsTitle}>Factores de Riesgo:</Text>
                  {item.risk_factors.map((factor, index) => (
                    <View key={index} style={styles.factorItem}>
                      <Icon name="circle-small" size={16} color={colors.textSecondary} />
                      <Text style={styles.factorText}>{factor}</Text>
                    </View>
                  ))}
                </View>
              )}
              {item.recommendations && (
                <View style={styles.recommendationsContainer}>
                  <Text style={styles.recommendationsTitle}>Recomendaciones IA:</Text>
                  <Text style={styles.recommendationsText}>{item.recommendations}</Text>
                </View>
              )}
            </Card>
          ))
        ) : (
          <Text style={styles.noRiskText}>
            ✓ No hay estudiantes registrados
          </Text>
        )}
      </Card>

      <Card style={styles.infoCard}>
        <Icon name="information" size={24} color={colors.info} />
        <Text style={styles.infoText}>
          El sistema analiza múltiples factores como asistencia, calificaciones, 
          comportamiento y participación para identificar estudiantes en riesgo 
          de manera temprana.
        </Text>
      </Card>
    </ScrollView>
  );
};

const StatItem = ({ icon, label, value, color }) => (
  <View style={styles.statItem}>
    <Icon name={icon} size={32} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    margin: spacing.md,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  statsCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  section: {
    margin: spacing.md,
    marginTop: 0,
  },
  studentCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.background,
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
  factorsContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  factorsTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  factorText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  recommendationsContainer: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 8,
  },
  recommendationsTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  recommendationsText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 18,
  },
  noRiskText: {
    fontSize: fontSize.md,
    color: colors.success,
    textAlign: 'center',
    padding: spacing.lg,
  },
  infoCard: {
    margin: spacing.md,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.info + '10',
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    marginLeft: spacing.md,
    lineHeight: 20,
  },
});

export default RiskAnalysisScreen;

