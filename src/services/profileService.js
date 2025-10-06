import { ENDPOINTS } from '../config/api';
import { apiService } from './apiService';

export const profileService = {
  // Obtener perfil del usuario
  getProfile: async () => {
    try {
      return await apiService.get(ENDPOINTS.PROFILE);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar perfil del usuario
  updateProfile: async (profileData) => {
    try {
      return await apiService.put(ENDPOINTS.PROFILE_UPDATE, profileData);
    } catch (error) {
      throw error;
    }
  },

  // Subir avatar
  uploadAvatar: async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      return await apiService.post(ENDPOINTS.PROFILE_AVATAR, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw error;
    }
  },
};





