import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const attendanceManagementService = {
  // Obtener asistencias de un estudiante agrupadas por materia
  getStudentAttendance: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.ATTENDANCE_MANAGEMENT_STUDENT(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Guardar o actualizar asistencia
  saveAttendance: async (studentId, attendanceData) => {
    try {
      return await apiService.post(ENDPOINTS.ATTENDANCE_MANAGEMENT_STUDENT(studentId), attendanceData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar asistencia
  deleteAttendance: async (studentId, attendanceId) => {
    try {
      return await apiService.delete(ENDPOINTS.ATTENDANCE_MANAGEMENT_DELETE(studentId, attendanceId));
    } catch (error) {
      throw error;
    }
  },
};





