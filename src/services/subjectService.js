import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const subjectService = {
  // Obtener todas las materias
  getAllSubjects: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${ENDPOINTS.SUBJECTS}?${queryString}` : ENDPOINTS.SUBJECTS;
      return await apiService.get(url);
    } catch (error) {
      console.error('Error getting subjects:', error);
      // Retornar datos de ejemplo si hay error de conexión
      return {
        success: false,
        data: [],
      };
    }
  },

  // Obtener materia por ID
  getSubjectById: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.SUBJECT_BY_ID(id));
    } catch (error) {
      console.error('Error getting subject by id:', error);
      throw error;
    }
  },

  // Obtener materias actuales (en curso)
  getCurrentSubjects: async () => {
    try {
      const response = await apiService.get(ENDPOINTS.CURRENT_SUBJECTS);
      return response;
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            id: 1,
            name: 'Matemáticas Avanzadas',
            code: 'MAT-301',
            teacher: 'Dr. García',
            schedule: 'Lunes, Miércoles, Viernes 8:00-10:00',
            classroom: 'Aula 201',
            status: 'active',
            progress: 65,
            next_class: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            name: 'Programación Web',
            code: 'PRO-401',
            teacher: 'Ing. Martínez',
            schedule: 'Martes, Jueves 14:00-16:00',
            classroom: 'Lab. Computación 1',
            status: 'active',
            progress: 80,
            next_class: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            name: 'Base de Datos',
            code: 'BD-301',
            teacher: 'MSc. López',
            schedule: 'Lunes, Miércoles 10:00-12:00',
            classroom: 'Aula 105',
            status: 'active',
            progress: 45,
            next_class: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
          }
        ],
      };
    }
  },

  // Obtener materias próximas
  getUpcomingSubjects: async () => {
    try {
      const response = await apiService.get(ENDPOINTS.UPCOMING_SUBJECTS);
      return response;
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            id: 4,
            name: 'Inteligencia Artificial',
            code: 'IA-501',
            teacher: 'Dr. Rodríguez',
            schedule: 'Martes, Jueves 16:00-18:00',
            classroom: 'Lab. IA',
            status: 'upcoming',
            start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Curso avanzado de técnicas de IA y machine learning'
          },
          {
            id: 5,
            name: 'Seguridad Informática',
            code: 'SEG-401',
            teacher: 'Ing. Torres',
            schedule: 'Lunes, Miércoles 18:00-20:00',
            classroom: 'Aula 301',
            status: 'upcoming',
            start_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Fundamentos de ciberseguridad y protección de datos'
          },
          {
            id: 6,
            name: 'Desarrollo Móvil',
            code: 'MOV-401',
            teacher: 'MSc. Herrera',
            schedule: 'Viernes 14:00-18:00',
            classroom: 'Lab. Móvil',
            status: 'upcoming',
            start_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Desarrollo de aplicaciones móviles nativas e híbridas'
          }
        ],
      };
    }
  },

  // Obtener horario de una materia
  getSubjectSchedule: async (id) => {
    try {
      return await apiService.get(ENDPOINTS.SUBJECT_SCHEDULE(id));
    } catch (error) {
      console.error('Error getting subject schedule:', error);
      throw error;
    }
  },

  // Crear materia
  createSubject: async (subjectData) => {
    try {
      return await apiService.post(ENDPOINTS.SUBJECTS, subjectData);
    } catch (error) {
      console.error('Error creating subject:', error);
      throw error;
    }
  },

  // Actualizar materia
  updateSubject: async (id, subjectData) => {
    try {
      return await apiService.put(ENDPOINTS.SUBJECT_BY_ID(id), subjectData);
    } catch (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
  },

  // Eliminar materia
  deleteSubject: async (id) => {
    try {
      return await apiService.delete(ENDPOINTS.SUBJECT_BY_ID(id));
    } catch (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
  },
};
