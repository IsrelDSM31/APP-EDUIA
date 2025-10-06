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
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import { gamificationService } from '../../services/gamificationService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const StudentGamificationScreen = ({ route }) => {
  const { studentId, studentName } = route.params;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [points, setPoints] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [rank, setRank] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, [studentId]);

  const loadData = async () => {
    try {
      const [pointsRes, achievementsRes, rankRes, historyRes] = await Promise.all([
        gamificationService.getStudentPoints(studentId),
        gamificationService.getStudentAchievements(studentId),
        gamificationService.getStudentRank(studentId),
        gamificationService.getPointsHistory(studentId),
      ]);

      if (pointsRes.success) setPoints(pointsRes.data);
      if (achievementsRes.success) setAchievements(achievementsRes.data?.unlocked || []);
      if (rankRes.success) setRank(rankRes.data);
      if (historyRes.success) setHistory(historyRes.data?.slice(0, 10) || []);
    } catch (error) {
      // Error silencioso - los servicios manejan los datos de respaldo
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <LoadingScreen message="Cargando datos..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header con puntos y nivel */}
      <Card style={styles.headerCard}>
        <View style={styles.header}>
          <View style={styles.levelBadge}>
            <Icon name="star" size={40} color={colors.warning} />
            <Text style={styles.levelText}>Nivel {points?.level || 1}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.studentName}>{studentName}</Text>
            <Text style={styles.totalPoints}>{points?.total_points || 0} puntos</Text>
            {rank && (
              <Text style={styles.rankText}>
                Posición #{rank.rank} de {rank.total_students}
              </Text>
            )}
          </View>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>
            Progreso al Nivel {(points?.level || 1) + 1}
          </Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${points?.progress_percentage || 0}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {points?.progress_to_next_level || 0} / {points?.points_to_next_level || 100} pts
          </Text>
        </View>
      </Card>

      {/* Desglose de puntos */}
      <Card style={styles.breakdownCard}>
        <Text style={styles.sectionTitle}>Desglose de Puntos</Text>
        <View style={styles.breakdown}>
          <BreakdownItem
            icon="calendar-check"
            label="Asistencia"
            points={points?.points_breakdown?.attendance || 0}
            color={colors.success}
          />
          <BreakdownItem
            icon="book-education"
            label="Calificaciones"
            points={points?.points_breakdown?.grades || 0}
            color={colors.info}
          />
          <BreakdownItem
            icon="hand-wave"
            label="Participación"
            points={points?.points_breakdown?.participation || 0}
            color={colors.secondary}
          />
          <BreakdownItem
            icon="trophy"
            label="Logros"
            points={points?.points_breakdown?.achievements || 0}
            color={colors.warning}
          />
        </View>
      </Card>

      {/* Logros desbloqueados */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.sectionTitle}>
          Logros Desbloqueados ({achievements.length})
        </Text>
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Icon name={achievement.icon} size={28} color={colors.warning} />
              <View style={styles.achievementDetails}>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
              </View>
              <View style={styles.achievementPoints}>
                <Text style={styles.achievementPointsText}>+{achievement.points}</Text>
              </View>
            </View>
          ))
        ) : (
          <EmptyState
            icon="trophy-outline"
            title="Sin logros aún"
            message="¡Sigue participando para desbloquear logros!"
          />
        )}
      </Card>

      {/* Historial reciente */}
      {history.length > 0 && (
        <Card style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Historial Reciente</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Icon 
                name={
                  item.type === 'attendance' ? 'calendar-check' :
                  item.type === 'grade' ? 'book-education' :
                  item.type === 'participation' ? 'hand-wave' : 'trophy'
                } 
                size={20} 
                color={colors.primary} 
              />
              <Text style={styles.historyDescription}>{item.description}</Text>
              <Text style={[
                styles.historyPoints,
                item.points > 0 ? styles.historyPointsPositive : styles.historyPointsNegative
              ]}>
                {item.points > 0 ? '+' : ''}{item.points}
              </Text>
            </View>
          ))}
        </Card>
      )}
    </ScrollView>
  );
};

const BreakdownItem = ({ icon, label, points, color }) => (
  <View style={styles.breakdownItem}>
    <Icon name={icon} size={24} color={color} />
    <Text style={styles.breakdownLabel}>{label}</Text>
    <Text style={[styles.breakdownPoints, { color }]}>{points}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  levelBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.warning,
    marginTop: spacing.xs,
  },
  headerInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  totalPoints: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  rankText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressContainer: {
    marginTop: spacing.sm,
  },
  progressLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  breakdownCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  breakdown: {
    gap: spacing.md,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  breakdownLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  breakdownPoints: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  achievementsCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  achievementDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  achievementPoints: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  achievementPointsText: {
    fontSize: fontSize.sm,
    color: colors.success,
    fontWeight: fontWeight.bold,
  },
  historyCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyDescription: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  historyPoints: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  historyPointsPositive: {
    color: colors.success,
  },
  historyPointsNegative: {
    color: colors.error,
  },
});

export default StudentGamificationScreen;


