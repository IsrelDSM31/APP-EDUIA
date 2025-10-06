# 🚀 Inicio Rápido - EduIA Mobile

## Pasos para ejecutar en 5 minutos

### 1️⃣ Instalar Dependencias
```bash
npm install
```

### 2️⃣ Configurar Backend URL
Edita `src/config/api.js` y cambia la URL:

```javascript
export const API_CONFIG = {
  // Para emulador Android:
  BASE_URL: 'http://10.0.2.2:8000/api',
  
  // Para iOS Simulator:
  // BASE_URL: 'http://localhost:8000/api',
  
  // Para dispositivo físico (usa tu IP local):
  // BASE_URL: 'http://192.168.1.XXX:8000/api',
  
  TIMEOUT: 30000,
};
```

### 3️⃣ Iniciar la App
```bash
npm start
```

### 4️⃣ Abrir en tu dispositivo
- **Escanea el código QR** con Expo Go
- O presiona `a` para Android / `i` para iOS

---

## 📱 Instalar Expo Go

- **Android:** [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS:** [App Store](https://apps.apple.com/app/expo-go/id982107779)

---

## 🔑 Credenciales de Prueba

Usa estas credenciales si tu backend tiene datos de prueba:

```
Email: usuario@ejemplo.com
Password: password123
```

O crea una cuenta nueva desde la app.

---

## ❓ Problemas Comunes

### "Network request failed"
✅ Verifica que tu backend Laravel esté corriendo
✅ Confirma la URL en `src/config/api.js`

### "Port already in use"
```bash
expo start -c
```

### Reinstalar todo
```bash
rm -rf node_modules
npm install
expo start -c
```

---

## 📚 Documentación Completa

- 📖 [README.md](README.md) - Documentación completa
- 🔧 [SETUP_GUIDE.md](SETUP_GUIDE.md) - Guía detallada de configuración
- 🌐 [API_ENDPOINTS.md](API_ENDPOINTS.md) - Documentación de endpoints

---

## ✨ Características Principales

✅ Login y Registro
✅ Dashboard con estadísticas
✅ Gestión de Estudiantes
✅ Gestión de Profesores
✅ Calificaciones
✅ Asistencias
✅ Sistema de Alertas
✅ Análisis de Riesgo con IA

---

**¡Listo para empezar! 🎉**

