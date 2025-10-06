import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const teacherService = {
  // Obtener todos los profesores
  getAllTeachers: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${ENDPOINTS.TEACHERS}?${queryString}` : ENDPOINTS.TEACHERS;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener profesor por ID
  getTeacherById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.TEACHER_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Crear profesor
  createTeacher: async (teacherData) => {
    try {
      return await apiService.post(ENDPOINTS.TEACHERS, teacherData);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar profesor
  updateTeacher: async (id, teacherData) => {
    try {
      return await apiService.put(ENDPOINTS.TEACHER_BY_ID(id), teacherData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar profesor
  deleteTeacher: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.TEACHER_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener estudiantes de un profesor
  getTeacherStudents: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.TEACHER_STUDENTS(id));
    } catch (error) {
      throw error;
    }
  },

  // Obtener cursos de un profesor
  getTeacherCourses: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.TEACHER_COURSES(id));
    } catch (error) {
      throw error;
    }
  },
};

