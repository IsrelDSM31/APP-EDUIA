import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const dashboardService = {
  // Obtener estadísticas del dashboard
  getStats: async () => {
    try {
      return await apiService.get(ENDPOINTS.DASHBOARD_STATS);
    } catch (error) {
      throw error;
    }
  },

  // Obtener actividades recientes
  getRecentActivities: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString 
        ? `${ENDPOINTS.DASHBOARD_RECENT_ACTIVITIES}?${queryString}` 
        : ENDPOINTS.DASHBOARD_RECENT_ACTIVITIES;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },
};

