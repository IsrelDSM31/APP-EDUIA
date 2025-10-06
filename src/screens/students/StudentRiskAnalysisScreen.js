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
import { studentService } from '../../services/studentService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentRiskAnalysisScreen = ({ route }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    loadRiskAnalysis();
  }, [studentId]);

  const loadRiskAnalysis = async () => {
    try {
      const response = await studentService.getStudentRiskAnalysis(studentId);
      const data = response.data?.data || response.data || null;
      setRiskData(data);
    } catch (error) {
      console.error('Error loading risk analysis:', error);
      setRiskData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRiskAnalysis();
  };

  if (loading) {
    return <LoadingScreen message="Analizando con IA..." />;
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
          <Text style={styles.headerTitle}>{studentName}</Text>
          <Text style={styles.headerSubtitle}>Análisis de Riesgo con IA</Text>
        </View>
      </Card>

      {riskData ? (
        <>
          <Card style={styles.section}>
            <View style={styles.riskHeader}>
              <Text style={styles.sectionTitle}>Nivel de Riesgo</Text>
              <RiskBadge level={riskData.risk_level} />
            </View>
            {riskData.risk_score && (
              <Text style={styles.scoreText}>Puntuación: {riskData.risk_score}</Text>
            )}
          </Card>

          {riskData.risk_factors && riskData.risk_factors.length > 0 && (
            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Factores de Riesgo</Text>
              {riskData.risk_factors.map((factor, index) => (
                <View key={index} style={styles.factorItem}>
                  <Icon name="circle-small" size={20} color={colors.error} />
                  <Text style={styles.factorText}>{factor}</Text>
                </View>
              ))}
            </Card>
          )}

          {riskData.recommendations && (
            <Card style={styles.recommendationsCard}>
              <View style={styles.recommendationsHeader}>
                <Icon name="lightbulb" size={24} color={colors.primary} />
                <Text style={styles.sectionTitle}>Recomendaciones de IA</Text>
              </View>
              <Text style={styles.recommendationsText}>{riskData.recommendations}</Text>
            </Card>
          )}

          <Card style={styles.infoCard}>
            <Icon name="information" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              Última actualización: {riskData.last_analysis || 'No disponible'}
            </Text>
          </Card>
        </>
      ) : (
        <Card style={styles.emptyCard}>
          <Icon name="chart-line" size={60} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Sin análisis disponible</Text>
          <Text style={styles.emptyMessage}>
            Este estudiante aún no tiene un análisis de riesgo generado
          </Text>
        </Card>
      )}
    </ScrollView>
  );
};

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
  section: {
    margin: spacing.md,
    marginTop: 0,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  scoreText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  factorText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  recommendationsCard: {
    margin: spacing.md,
    marginTop: 0,
    backgroundColor: colors.primaryLight + '10',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recommendationsText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  infoCard: {
    margin: spacing.md,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.info + '10',
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  emptyCard: {
    margin: spacing.md,
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyMessage: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export default StudentRiskAnalysisScreen;


