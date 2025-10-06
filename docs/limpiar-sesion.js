/**
 * Script para limpiar la sesión guardada en AsyncStorage
 * Ejecutar solo si la app no muestra el login después de reiniciar
 * 
 * USO:
 * 1. Importar este archivo temporalmente en App.js
 * 2. Llamar clearSession() al iniciar
 * 3. Recargar la app
 * 4. Remover el import y la llamada
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearSession = async () => {
  try {
    console.log('🧹 Limpiando sesión...');
    await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
    console.log('✅ Sesión limpiada correctamente');
    console.log('✅ Recarga la app para ver el login');
  } catch (error) {
    console.error('❌ Error limpiando sesión:', error);
  }
};

export const clearAllStorage = async () => {
  try {
    console.log('🧹 Limpiando TODO el AsyncStorage...');
    await AsyncStorage.clear();
    console.log('✅ Storage completamente limpiado');
    console.log('✅ Recarga la app para ver el login');
  } catch (error) {
    console.error('❌ Error limpiando storage:', error);
  }
};

export const showStoredData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const userData = await AsyncStorage.getItem('userData');
    
    console.log('📦 Datos en AsyncStorage:');
    console.log('  authToken:', token ? token.substring(0, 30) + '...' : 'No hay token');
    console.log('  userData:', userData ? JSON.parse(userData).email : 'No hay datos');
  } catch (error) {
    console.error('❌ Error leyendo storage:', error);
  }
};

