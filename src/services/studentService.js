import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const studentService = {
  // Obtener todos los estudiantes
  getAllStudents: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${ENDPOINTS.STUDENTS}?${queryString}` : ENDPOINTS.STUDENTS;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener estudiante por ID
  getStudentById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.STUDENT_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Crear estudiante
  createStudent: async (studentData) => {
    try {
      return await apiService.post(ENDPOINTS.STUDENTS, studentData);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar estudiante
  updateStudent: async (id, studentData) => {
    try {
      return await apiService.put(ENDPOINTS.STUDENT_BY_ID(id), studentData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar estudiante
  deleteStudent: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.STUDENT_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener calificaciones de un estudiante
  getStudentGrades: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.STUDENT_GRADES(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener asistencias de un estudiante
  getStudentAttendance: async (id, params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString 
        ? `${ENDPOINTS.STUDENT_ATTENDANCE(id)}?${queryString}` 
        : ENDPOINTS.STUDENT_ATTENDANCE(id);
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener alertas de un estudiante
  getStudentAlerts: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.STUDENT_ALERTS(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener análisis de riesgo de un estudiante
  getStudentRiskAnalysis: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.STUDENT_RISK_ANALYSIS(id));
    } catch (error) {
      throw error;
    }
  },
};

