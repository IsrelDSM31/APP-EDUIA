import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const attendanceService = {
  // Obtener todas las asistencias con filtros
  getAllAttendance: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const url = queryString ? `${ENDPOINTS.ATTENDANCE}?${queryString}` : ENDPOINTS.ATTENDANCE;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener asistencia por ID
  getAttendanceById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.ATTENDANCE_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Registrar asistencia única
  createAttendance: async (attendanceData) => {
    try {
      return await apiService.post(ENDPOINTS.ATTENDANCE, attendanceData);
    } catch (error) {
      throw error;
    }
  },

  // Registrar asistencias múltiples (por día)
  bulkCreateAttendance: async (bulkData) => {
    try {
      return await apiService.post(`${ENDPOINTS.ATTENDANCE}/bulk`, bulkData);
    } catch (error) {
      throw error;
    }
  },

  // Justificar asistencia
  justifyAttendance: async (justificationData) => {
    try {
      return await apiService.post(`${ENDPOINTS.ATTENDANCE}/justify`, justificationData);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar asistencia
  updateAttendance: async (id, attendanceData) => {
    try {
      return await apiService.put(ENDPOINTS.ATTENDANCE_BY_ID(id), attendanceData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar asistencia
  deleteAttendance: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.ATTENDANCE_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },
};

