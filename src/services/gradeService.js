import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const gradeService = {
  // Obtener todas las calificaciones
  getAllGrades: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${ENDPOINTS.GRADES}?${queryString}` : ENDPOINTS.GRADES;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener calificación por ID
  getGradeById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.GRADE_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener calificaciones por curso
  getGradesByCourse: async (courseId) => {
    try {
      return await apiService.get(ENDPOINTS.GRADES_BY_COURSE(courseId));
    } catch (error) {
      throw error;
    }
  },

  // Crear calificación
  createGrade: async (gradeData) => {
    try {
      return await apiService.post(ENDPOINTS.GRADES, gradeData);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar calificación
  updateGrade: async (id, gradeData) => {
    try {
      return await apiService.put(ENDPOINTS.GRADE_BY_ID(id), gradeData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar calificación
  deleteGrade: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.GRADE_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },
};

