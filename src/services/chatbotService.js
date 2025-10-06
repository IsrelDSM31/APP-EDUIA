import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const chatbotService = {
  // Enviar mensaje al chatbot
  sendMessage: async (message, conversationId = null) => {
    try {
      return await apiService.post(ENDPOINTS.CHATBOT_MESSAGE, {
        message,
        conversation_id: conversationId,
      });
    } catch (error) {
      throw error;
    }
  },

  // Obtener historial de conversación
  getHistory: async (conversationId) => {
    try {
      const url = conversationId 
        ? `${ENDPOINTS.CHATBOT_HISTORY}?conversation_id=${conversationId}`
        : ENDPOINTS.CHATBOT_HISTORY;
      return await apiService.get(url);
    } catch (error) {
      throw error;
    }
  },
};





