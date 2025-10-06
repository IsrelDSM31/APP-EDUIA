import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const googleClassroomService = {
  // Obtener configuración de autenticación
  getAuthConfig: async () => {
    try {
      return await apiService.get(ENDPOINTS.GOOGLE_CLASSROOM_AUTH_CONFIG);
    } catch (error) {
      throw error;
    }
  },

  // Intercambiar código por token
  exchangeCode: async (code) => {
    try {
      return await apiService.post(ENDPOINTS.GOOGLE_CLASSROOM_EXCHANGE_CODE, { code });
    } catch (error) {
      throw error;
    }
  },

  // Obtener cursos
  getCourses: async () => {
    try {
      return await apiService.get(ENDPOINTS.GOOGLE_CLASSROOM_COURSES);
    } catch (error) {
      throw error;
    }
  },

  // Obtener estudiantes de un curso
  getCourseStudents: async (courseId) => {
    try {
      return await apiService.get(ENDPOINTS.GOOGLE_CLASSROOM_COURSE_STUDENTS(courseId));
    } catch (error) {
      throw error;
    }
  },

  // Obtener tareas de un curso
  getCourseWork: async (courseId) => {
    try {
      return await apiService.get(ENDPOINTS.GOOGLE_CLASSROOM_COURSE_WORK(courseId));
    } catch (error) {
      throw error;
    }
  },

  // Sincronizar estudiantes de un curso
  syncCourseStudents: async (courseId) => {
    try {
      return await apiService.post(ENDPOINTS.GOOGLE_CLASSROOM_SYNC_STUDENTS(courseId));
    } catch (error) {
      throw error;
    }
  },

  // Desconectar
  disconnect: async () => {
    try {
      return await apiService.post(ENDPOINTS.GOOGLE_CLASSROOM_DISCONNECT);
    } catch (error) {
      throw error;
    }
  },

  // Verificar estado de conexión
  getConnectionStatus: async () => {
    try {
      return await apiService.get(ENDPOINTS.GOOGLE_CLASSROOM_STATUS);
    } catch (error) {
      throw error;
    }
  },
};





