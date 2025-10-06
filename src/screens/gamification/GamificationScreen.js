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
import LoadingScreen from '../../components/common/LoadingScreen';
import { gamificationService } from '../../services/gamificationService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const GamificationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('ranking'); // ranking, achievements

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <LoadingScreen message="Cargando gamificación..." />;
  }

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'ranking' && styles.tabActive]}
          onPress={() => setSelectedTab('ranking')}
        >
          <Icon 
            name="podium" 
            size={20} 
            color={selectedTab === 'ranking' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.tabText, selectedTab === 'ranking' && styles.tabTextActive]}>
            Ranking
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Icon 
            name="trophy" 
            size={20} 
            color={selectedTab === 'achievements' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
            Logros
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {selectedTab === 'ranking' ? (
          <RankingTab navigation={navigation} />
        ) : (
          <AchievementsTab navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
};

// Tab de Ranking
const RankingTab = ({ navigation }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      const response = await gamificationService.getGlobalRanking('all_time', 20);
      if (response.success) {
        setRanking(response.data?.ranking || []);
      }
    } catch (error) {
      // Error silencioso - los servicios manejan los datos de respaldo
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Cargando ranking..." />;
  }

  return (
    <View style={styles.tabContent}>
      <Card style={styles.headerCard}>
        <View style={styles.rankingHeader}>
          <Icon name="trophy" size={40} color={colors.warning} />
          <Text style={styles.headerTitle}>Ranking de Estudiantes</Text>
          <Text style={styles.headerSubtitle}>
            Los mejores {ranking.length} estudiantes
          </Text>
        </View>
      </Card>

      {ranking.map((item, index) => (
        <Card key={item.id} style={styles.rankCard}>
          <View style={styles.rankContent}>
            {/* Posición */}
            <View style={[
              styles.rankBadge,
              index === 0 && styles.rankBadgeGold,
              index === 1 && styles.rankBadgeSilver,
              index === 2 && styles.rankBadgeBronze,
            ]}>
              {index < 3 ? (
                <Icon 
                  name={index === 0 ? 'crown' : index === 1 ? 'medal' : 'medal-outline'} 
                  size={24} 
                  color={colors.textLight} 
                />
              ) : (
                <Text style={styles.rankNumber}>#{item.rank}</Text>
              )}
            </View>

            {/* Info del estudiante */}
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.student_name}</Text>
              <Text style={styles.studentCode}>{item.matricula}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Icon name="star" size={14} color={colors.warning} />
                  <Text style={styles.statText}>Nivel {item.level}</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="fire" size={14} color={colors.error} />
                  <Text style={styles.statText}>{item.streak_days} días</Text>
                </View>
              </View>
            </View>

            {/* Puntos */}
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsValue}>{item.total_points}</Text>
              <Text style={styles.pointsLabel}>puntos</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

// Tab de Logros
const AchievementsTab = ({ navigation }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await gamificationService.getAllAchievements();
      if (response.success) {
        setAchievements(response.data?.achievements || []);
      }
    } catch (error) {
      // Error silencioso - los servicios manejan los datos de respaldo
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return colors.warning;
      case 'epic': return colors.primary;
      case 'rare': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'Legendario';
      case 'epic': return 'Épico';
      case 'rare': return 'Raro';
      default: return 'Común';
    }
  };

  if (loading) {
    return <LoadingScreen message="Cargando logros..." />;
  }

  return (
    <View style={styles.tabContent}>
      <Card style={styles.headerCard}>
        <View style={styles.achievementsHeader}>
          <Icon name="trophy-award" size={40} color={colors.warning} />
          <Text style={styles.headerTitle}>Logros Disponibles</Text>
          <Text style={styles.headerSubtitle}>
            {achievements.length} logros para desbloquear
          </Text>
        </View>
      </Card>

      {achievements.map((achievement) => (
        <Card key={achievement.id} style={styles.achievementCard}>
          <View style={styles.achievementContent}>
            <View style={[
              styles.achievementIcon,
              { backgroundColor: getRarityColor(achievement.rarity) + '20' }
            ]}>
              <Icon 
                name={achievement.icon} 
                size={32} 
                color={getRarityColor(achievement.rarity)} 
              />
            </View>

            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <View style={styles.achievementMeta}>
                <View style={[
                  styles.rarityBadge,
                  { backgroundColor: getRarityColor(achievement.rarity) + '20' }
                ]}>
                  <Text style={[
                    styles.rarityText,
                    { color: getRarityColor(achievement.rarity) }
                  ]}>
                    {getRarityLabel(achievement.rarity)}
                  </Text>
                </View>
                <View style={styles.pointsBadge}>
                  <Icon name="star" size={14} color={colors.warning} />
                  <Text style={styles.pointsText}>+{achievement.points} pts</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: spacing.md,
  },
  headerCard: {
    marginBottom: spacing.md,
  },
  rankingHeader: {
    alignItems: 'center',
  },
  achievementsHeader: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.sm,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  rankCard: {
    marginBottom: spacing.sm,
  },
  rankContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rankBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeGold: {
    backgroundColor: '#FFD700',
  },
  rankBadgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  rankBadgeBronze: {
    backgroundColor: '#CD7F32',
  },
  rankNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  studentCode: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
    gap: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  pointsLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  achievementCard: {
    marginBottom: spacing.sm,
  },
  achievementContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  achievementDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  achievementMeta: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  rarityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.warning + '20',
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: fontSize.xs,
    color: colors.warning,
    fontWeight: fontWeight.semibold,
  },
});

export default GamificationScreen;


