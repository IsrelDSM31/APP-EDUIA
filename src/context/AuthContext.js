import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        // Si hay token, verificar que sea válido consultando al servidor
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
          console.log('[AUTH] Usuario autenticado:', userData.email || userData.name);
        } catch (verifyError) {
          // Si el token no es válido, limpiar todo y mostrar login
          console.warn('[AUTH] Token inválido, limpiando sesión...');
          await authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('[AUTH] No hay sesión activa, mostrando login');
      }
    } catch (error) {
      console.error('[AUTH] Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const updateUser = async (userData = null) => {
    try {
      if (userData) {
        // Si se proporcionan datos, actualizar directamente
        setUser(userData);
        await authService.storeUser(userData);
        return { success: true, data: userData };
      } else {
        // Si no, obtener del servidor
        const freshUserData = await authService.getCurrentUser();
        setUser(freshUserData);
        return { success: true, data: freshUserData };
      }
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

