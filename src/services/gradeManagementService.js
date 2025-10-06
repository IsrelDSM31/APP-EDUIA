import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const gradeManagementService = {
  // Obtener lista de estudiantes para calificaciones
  getAllStudents: async (search = '') => {
    try {
      const url = search 
        ? `${ENDPOINTS.GRADE_MANAGEMENT_STUDENTS}?search=${search}` 
        : ENDPOINTS.GRADE_MANAGEMENT_STUDENTS;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Obtener calificaciones completas de un estudiante
  getStudentGrades: async (studentId) => {
    try {
      return await apiService.get(ENDPOINTS.GRADE_MANAGEMENT_STUDENT_GRADES(studentId));
    } catch (error) {
      throw error;
    }
  },

  // Guardar o actualizar calificaciones
  saveGrade: async (studentId, gradeData) => {
    try {
      return await apiService.post(ENDPOINTS.GRADE_MANAGEMENT_STUDENT_GRADES(studentId), gradeData);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar calificación
  deleteGrade: async (studentId, subjectId) => {
    try {
      return await apiService.delete(ENDPOINTS.GRADE_MANAGEMENT_DELETE(studentId, subjectId));
    } catch (error) {
      throw error;
    }
  },
};





