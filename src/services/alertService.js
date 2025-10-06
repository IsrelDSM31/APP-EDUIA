import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const alertService = {
  // Obtener todas las alertas
  getAllAlerts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${ENDPOINTS.ALERTS}?${queryString}` : ENDPOINTS.ALERTS;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener alerta por ID
  getAlertById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.ALERT_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener alertas no leídas
  getUnreadAlerts: async () => {
    try {
      return await apiService.get(ENDPOINTS.ALERTS_UNREAD);
    } catch (error) {
      throw error;
    }
  },

  // Marcar alerta como leída
  markAlertAsRead: async (id) => {
    try {
      return await apiService.patch(ENDPOINTS.MARK_ALERT_READ(id));
    } catch (error) {
      throw error;
    }
  },

  // Crear alerta
  createAlert: async (alertData) => {
    try {
      return await apiService.post(ENDPOINTS.ALERTS, alertData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar alerta
  deleteAlert: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.ALERT_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },
};

