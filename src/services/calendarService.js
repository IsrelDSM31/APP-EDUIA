import { ENDPOINTS } from '../config/api';
import apiService from './apiService';

class CalendarService {
  // Obtener eventos del calendario
  async getEvents(filters = {}) {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_EVENTS, { params: filters });
      return response;
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  // Obtener eventos por fecha
  async getEventsByDate(startDate, endDate) {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_EVENTS, {
        params: { start_date: startDate, end_date: endDate }
      });
      return response;
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            id: 1,
            title: 'Reunión de Facultad',
            description: 'Reunión mensual del departamento',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            type: 'meeting',
            location: 'Sala de Juntas'
          },
          {
            id: 2,
            title: 'Clase de Matemáticas',
            description: 'Clase regular de matemáticas avanzadas',
            start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            end_date: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
            type: 'class',
            location: 'Aula 201'
          }
        ],
      };
    }
  }

  // Crear evento
  async createEvent(eventData) {
    try {
      const response = await apiService.post(ENDPOINTS.CALENDAR_CREATE_EVENT, eventData);
      return response;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Actualizar evento
  async updateEvent(eventId, eventData) {
    try {
      const response = await apiService.put(ENDPOINTS.CALENDAR_UPDATE_EVENT(eventId), eventData);
      return response;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  // Eliminar evento
  async deleteEvent(eventId) {
    try {
      const response = await apiService.delete(ENDPOINTS.CALENDAR_DELETE_EVENT(eventId));
      return response;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Obtener próximos exámenes
  async getUpcomingExams() {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_UPCOMING_EXAMS);
      return response;
    } catch (error) {
      // Error silencioso - retornar datos de ejemplo
      return {
        success: false,
        data: [
          {
            id: 1,
            title: 'Examen Final de Matemáticas',
            subject_name: 'Matemáticas Avanzadas',
            start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 120,
            location: 'Aula 201'
          },
          {
            id: 2,
            title: 'Examen de Programación',
            subject_name: 'Programación Web',
            start_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 90,
            location: 'Lab. Computación 1'
          }
        ],
      };
    }
  }

  // Obtener recordatorios
  async getReminders() {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_REMINDERS);
      return response;
    } catch (error) {
      console.error('Error getting reminders:', error);
      throw error;
    }
  }

  // Crear recordatorio
  async createReminder(reminderData) {
    try {
      const response = await apiService.post(ENDPOINTS.CALENDAR_CREATE_REMINDER, reminderData);
      return response;
    } catch (error) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  }

  // Sincronizar con Google Calendar
  async syncWithGoogleCalendar() {
    try {
      const response = await apiService.post(ENDPOINTS.CALENDAR_SYNC_GOOGLE);
      return response;
    } catch (error) {
      // Error silencioso - la función de sincronización no está disponible
      return { success: false, message: 'Función no disponible' };
    }
  }

  // Sincronizar con Outlook
  async syncWithOutlook() {
    try {
      const response = await apiService.post(ENDPOINTS.CALENDAR_SYNC_OUTLOOK);
      return response;
    } catch (error) {
      // Error silencioso - la función de sincronización no está disponible
      return { success: false, message: 'Función no disponible' };
    }
  }

  // Obtener configuración de sincronización
  async getSyncSettings() {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_SYNC_SETTINGS);
      return response;
    } catch (error) {
      // Error silencioso - retornar configuración por defecto
      return {
        success: false,
        data: {
          google_calendar_enabled: false,
          outlook_enabled: false,
        },
      };
    }
  }

  // Actualizar configuración de sincronización
  async updateSyncSettings(settings) {
    try {
      const response = await apiService.put(ENDPOINTS.CALENDAR_SYNC_SETTINGS, settings);
      return response;
    } catch (error) {
      console.error('Error updating sync settings:', error);
      throw error;
    }
  }

  // Exportar calendario
  async exportCalendar(format = 'ical') {
    try {
      const response = await apiService.get(ENDPOINTS.CALENDAR_EXPORT, { params: { format } });
      return response;
    } catch (error) {
      console.error('Error exporting calendar:', error);
      throw error;
    }
  }
}

export const calendarService = new CalendarService();

