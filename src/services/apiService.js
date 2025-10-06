import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`[AUTH TOKEN] Token agregado a la petición: ${token.substring(0, 20)}...`);
      } else {
        console.warn('[AUTH TOKEN] No hay token disponible');
      }
      return config;
    } catch (error) {
      console.error('[AUTH TOKEN ERROR]', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró o no es válido
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn('[AUTH] Error 401 - Token inválido o expirado');
      originalRequest._retry = true;
      
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          console.log('[AUTH] Intentando refrescar token...');
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}/refresh`,
            { refresh_token: refreshToken }
          );
          
          const { token } = response.data;
          await AsyncStorage.setItem('authToken', token);
          console.log('[AUTH] Token refrescado exitosamente');
          
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        } else {
          console.warn('[AUTH] No hay refresh token disponible');
          // No hay refresh token, limpiar y requerir nuevo login
          await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
        }
      } catch (refreshError) {
        console.error('[AUTH] Error al refrescar token:', refreshError.message);
        // Si falla el refresh, limpiar tokens
        await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Funciones helper para las peticiones
export const apiService = {
  get: async (url, config = {}) => {
    try {
      console.log(`[API GET] ${API_CONFIG.BASE_URL}${url}`);
      const response = await apiClient.get(url, config);
      console.log(`[API GET SUCCESS] ${url}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[API GET ERROR] ${url}`, error.message);
      throw handleError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      console.log(`[API POST] ${API_CONFIG.BASE_URL}${url}`, data);
      const response = await apiClient.post(url, data, config);
      console.log(`[API POST SUCCESS] ${url}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[API POST ERROR] ${url}`, error.message, error.response?.data);
      throw handleError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      console.log(`[API PUT] ${API_CONFIG.BASE_URL}${url}`, data);
      const response = await apiClient.put(url, data, config);
      console.log(`[API PUT SUCCESS] ${url}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[API PUT ERROR] ${url}`, error.message);
      throw handleError(error);
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      console.log(`[API PATCH] ${API_CONFIG.BASE_URL}${url}`, data);
      const response = await apiClient.patch(url, data, config);
      console.log(`[API PATCH SUCCESS] ${url}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[API PATCH ERROR] ${url}`, error.message);
      throw handleError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      console.log(`[API DELETE] ${API_CONFIG.BASE_URL}${url}`);
      const response = await apiClient.delete(url, config);
      console.log(`[API DELETE SUCCESS] ${url}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[API DELETE ERROR] ${url}`, error.message);
      throw handleError(error);
    }
  },
};

// Función para manejar errores
const handleError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de error
    const status = error.response.status;
    
    // No mostrar errores 404 como críticos
    if (status === 404) {
      return {
        status: 404,
        message: 'Recurso no encontrado',
        errors: {},
        data: null,
      };
    }
    
    return {
      status: status,
      message: error.response.data?.message || 'Error en el servidor',
      errors: error.response.data?.errors || {},
      data: error.response.data,
    };
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    return {
      status: 0,
      message: 'No se pudo conectar con el servidor',
      errors: {},
      data: null,
    };
  } else {
    // Algo pasó al configurar la petición
    return {
      status: -1,
      message: error.message || 'Error desconocido',
      errors: {},
      data: null,
    };
  }
};

export default apiClient;

