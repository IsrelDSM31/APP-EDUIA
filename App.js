import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Limpiar sesión inválida al iniciar (solo una vez)
    const initializeApp = async () => {
      try {
        // Verificar si hay un token guardado
        const token = await AsyncStorage.getItem('authToken');
        
        if (token) {
          console.log('🔍 Token encontrado, verificando validez...');
          
          // Intentar verificar el token con una petición simple
          try {
            const response = await fetch('http://192.168.1.69:8000/api/auth/user', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              // Token inválido, limpiar
              console.log('❌ Token inválido, limpiando sesión...');
              await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
              console.log('✅ Sesión limpiada, mostrando login');
            } else {
              console.log('✅ Token válido, sesión activa');
            }
          } catch (error) {
            // Si hay error de red o el servidor no responde, limpiar por seguridad
            console.log('⚠️ No se pudo verificar token, limpiando sesión...');
            await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
          }
        } else {
          console.log('ℹ️ No hay token guardado, mostrando login');
        }
      } catch (error) {
        console.error('Error inicializando app:', error);
      } finally {
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <ActivityIndicator size="large" color="#8B1538" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

