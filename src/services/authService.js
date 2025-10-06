import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await apiService.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      console.log('[LOGIN] Respuesta completa:', response);

      // El backend Laravel devuelve: { success, message, data: { user, token } }
      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;
      const refreshToken = response.data?.refresh_token || response.refresh_token;

      console.log('[LOGIN] Tokens extraídos:', { 
        hasToken: !!token, 
        hasUser: !!user,
        hasRefreshToken: !!refreshToken 
      });

      if (token) {
        await AsyncStorage.setItem('authToken', token);
        console.log('[LOGIN] ✅ Token guardado:', token.substring(0, 20) + '...');
        
        if (refreshToken) {
          await AsyncStorage.setItem('refreshToken', refreshToken);
          console.log('[LOGIN] ✅ Refresh token guardado');
        }
        if (user) {
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          console.log('[LOGIN] ✅ Datos de usuario guardados:', user.email || user.name);
        }

        // Devolver en el formato esperado por el contexto
        return {
          success: true,
          token: token,
          user: user,
          data: response.data
        };
      } else {
        console.error('[LOGIN] ❌ No se recibió token en la respuesta');
        throw new Error('No se recibió token del servidor');
      }
    } catch (error) {
      console.error('[LOGIN ERROR]', error.message);
      throw error;
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await apiService.post(ENDPOINTS.REGISTER, userData);
      
      // El backend Laravel devuelve: { success, message, data: { user, token } }
      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;
      
      if (token) {
        await AsyncStorage.setItem('authToken', token);
        console.log('[REGISTER] ✅ Token guardado');
        
        if (user) {
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          console.log('[REGISTER] ✅ Datos de usuario guardados');
        }

        return {
          success: true,
          token: token,
          user: user,
          data: response.data
        };
      }

      return response;
    } catch (error) {
      console.error('[REGISTER ERROR]', error.message);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiService.post(ENDPOINTS.LOGOUT);
    } catch (error) {
      console.log('Error al hacer logout en el servidor:', error);
    } finally {
      // Limpiar datos locales independientemente del resultado
      await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
    }
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    try {
      const response = await apiService.get(ENDPOINTS.ME);
      if (response.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      }
      return response.user;
    } catch (error) {
      throw error;
    }
  },

  // Verificar si hay sesión activa
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  // Obtener datos del usuario almacenados
  getStoredUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Guardar datos del usuario
  storeUser: async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error storing user data:', error);
      return false;
    }
  },
};

