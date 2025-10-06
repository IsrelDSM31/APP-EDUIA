import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const gamificationService = {
  // Obtener puntos de un estudiante
  getStudentPoints: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_POINTS(studentId));
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: {
          total_points: 1250,
          level: 5,
          points_to_next_level: 250,
          points_breakdown: {
            attendance: 400,
            grades: 350,
            participation: 300,
            achievements: 200
          }
        },
      };
    }
  },

  // Obtener logros de un estudiante
  getStudentAchievements: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_ACHIEVEMENTS(studentId));
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            id: 1,
            name: 'Primera Asistencia',
            description: 'Asistir a la primera clase',
            icon: 'trophy',
            points: 50,
            earned_at: new Date().toISOString(),
            unlocked: true
          },
          {
            id: 2,
            name: 'Estudiante Ejemplar',
            description: 'Obtener calificación perfecta',
            icon: 'star',
            points: 100,
            earned_at: new Date().toISOString(),
            unlocked: true
          },
          {
            id: 3,
            name: 'Participación Activa',
            description: 'Participar en 10 clases',
            icon: 'hand-wave',
            points: 75,
            earned_at: null,
            unlocked: false
          }
        ],
      };
    }
  },

  // Obtener ranking de un estudiante
  getStudentRank: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_RANK(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener historial de puntos
  getPointsHistory: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_POINTS_HISTORY(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los logros disponibles
  getAllAchievements: async () => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_ALL_ACHIEVEMENTS);
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: {
          achievements: [
            {
              id: 1,
              name: 'Primera Asistencia',
              description: 'Asistir a la primera clase',
              icon: 'trophy',
              points: 50,
              rarity: 'common'
            },
            {
              id: 2,
              name: 'Estudiante Ejemplar',
              description: 'Obtener calificación perfecta',
              icon: 'star',
              points: 100,
              rarity: 'rare'
            },
            {
              id: 3,
              name: 'Participación Activa',
              description: 'Participar en 10 clases',
              icon: 'hand-wave',
              points: 75,
              rarity: 'common'
            },
            {
              id: 4,
              name: 'Asistencia Perfecta',
              description: 'Asistir a todas las clases del mes',
              icon: 'calendar-check',
              points: 200,
              rarity: 'epic'
            },
            {
              id: 5,
              name: 'Maestro del Conocimiento',
              description: 'Aprobar todos los exámenes con excelencia',
              icon: 'school',
              points: 300,
              rarity: 'legendary'
            }
          ]
        },
      };
    }
  },

  // Obtener ranking global
  getGlobalRanking: async (period = 'all_time', limit = 50) => {
    try {
      return await apiService.get(`${ENDPOINTS.GAMIFICATION_RANKING}?period=${period}&limit=${limit}`);
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            rank: 1,
            student_name: 'María García',
            total_points: 2150,
            level: 8,
            avatar: null
          },
          {
            rank: 2,
            student_name: 'Carlos López',
            total_points: 1980,
            level: 7,
            avatar: null
          },
          {
            rank: 3,
            student_name: 'Ana Martínez',
            total_points: 1850,
            level: 7,
            avatar: null
          },
          {
            rank: 4,
            student_name: 'Pedro Rodríguez',
            total_points: 1650,
            level: 6,
            avatar: null
          },
          {
            rank: 5,
            student_name: 'Laura Sánchez',
            total_points: 1520,
            level: 6,
            avatar: null
          }
        ],
      };
    }
  },

  // Agregar puntos a un estudiante
  addPoints: async (studentId, points, type, description, metadata = null) => {
    try {
      return await apiService.post(ENDPOINTS.GAMIFICATION_ADD_POINTS, {
        student_id: studentId,
        points,
        type,
        description,
        metadata,
      });
    } catch (error) {
      throw error;
    }
  },

  // Obtener ranking por filtros (asistencia, tareas, participación)
  getRankingByCategory: async (category, period = 'all_time', limit = 50) => {
    try {
      return await apiService.get(`${ENDPOINTS.GAMIFICATION_RANKING}?category=${category}&period=${period}&limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },

  // Obtener estadísticas de gamificación del estudiante
  getStudentStats: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_STATS(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener badges/insignias del estudiante
  getStudentBadges: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_BADGES(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener racha actual del estudiante
  getStudentStreak: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_STUDENT_STREAK(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Reclamar recompensa
  claimReward: async (studentId, rewardId) => {
    try {
      return await apiService.post(ENDPOINTS.GAMIFICATION_CLAIM_REWARD, {
        student_id: studentId,
        reward_id: rewardId,
      });
    } catch (error) {
      throw error;
    }
  },

  // Obtener recompensas disponibles
  getAvailableRewards: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_REWARDS(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener desafíos activos
  getActiveChallenges: async () => {
    try {
      return await apiService.get(ENDPOINTS.GAMIFICATION_CHALLENGES);
    } catch (error) {
      throw error;
    }
  },

  // Participar en un desafío
  joinChallenge: async (studentId, challengeId) => {
    try {
      return await apiService.post(ENDPOINTS.GAMIFICATION_JOIN_CHALLENGE, {
        student_id: studentId,
        challenge_id: challengeId,
      });
    } catch (error) {
      throw error;
    }
  },
};


