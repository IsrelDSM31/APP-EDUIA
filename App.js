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
    // SOLUCIÓN DEFINITIVA: Limpiar sesión cada vez que inicia la app
    // Esto garantiza que SIEMPRE veas el login hasta que hagas login exitoso
    const initializeApp = async () => {
      try {
        console.log('🧹 Limpiando cualquier sesión anterior...');
        
        // FORZAR limpieza de sesión al inicio
        await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'userData']);
        
        console.log('✅ Sesión limpiada completamente');
        console.log('✅ Mostrando pantalla de LOGIN');
        
        // Pequeña pausa para asegurar que se limpió todo
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('❌ Error limpiando sesión:', error);
        // Intentar limpiar de todas formas
        try {
          await AsyncStorage.clear();
          console.log('✅ Storage limpiado completamente como respaldo');
        } catch (clearError) {
          console.error('❌ Error crítico:', clearError);
        }
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

