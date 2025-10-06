# Guía de Configuración - EduIA Mobile

## 🎯 Guía Paso a Paso

### 1. Instalación Inicial

#### A. Requisitos del Sistema

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 16 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`

2. **npm** (viene con Node.js)
   - Verifica la instalación: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

#### B. Instalar Dependencias del Proyecto

```bash
# Navega a la carpeta del proyecto
cd APP-EDUIA

# Instala las dependencias
npm install
```

Este comando instalará todas las bibliotecas necesarias listadas en `package.json`.

---

### 2. Configuración del Backend

#### A. Configurar la URL del Backend Laravel

Edita el archivo: `src/config/api.js`

**Para desarrollo local:**

```javascript
export const API_CONFIG = {
  // Elige según tu caso:
  
  // Opción 1: Emulador Android
  BASE_URL: 'http://10.0.2.2:8000/api',
  
  // Opción 2: iOS Simulator
  // BASE_URL: 'http://localhost:8000/api',
  
  // Opción 3: Dispositivo físico (cambia por tu IP)
  // BASE_URL: 'http://192.168.1.100:8000/api',
  
  TIMEOUT: 30000,
};
```

**Para producción:**

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://tu-dominio.com/api',
  TIMEOUT: 30000,
};
```

#### B. Cómo Obtener tu IP Local (para dispositivos físicos)

**Windows:**
```bash
ipconfig
# Busca "Dirección IPv4"
```

**Mac/Linux:**
```bash
ifconfig
# Busca "inet" en tu conexión activa
```

---

### 3. Configuración del Backend Laravel

Tu backend Laravel debe tener estos endpoints configurados. Aquí hay un ejemplo básico de rutas:

```php
// routes/api.php

// Autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/recent-activities', [DashboardController::class, 'recentActivities']);
    
    // Estudiantes
    Route::apiResource('students', StudentController::class);
    Route::get('/students/{id}/grades', [StudentController::class, 'grades']);
    Route::get('/students/{id}/attendance', [StudentController::class, 'attendance']);
    Route::get('/students/{id}/alerts', [StudentController::class, 'alerts']);
    Route::get('/students/{id}/risk-analysis', [StudentController::class, 'riskAnalysis']);
    
    // Profesores
    Route::apiResource('teachers', TeacherController::class);
    Route::get('/teachers/{id}/students', [TeacherController::class, 'students']);
    Route::get('/teachers/{id}/courses', [TeacherController::class, 'courses']);
    
    // Calificaciones
    Route::apiResource('grades', GradeController::class);
    
    // Asistencias
    Route::apiResource('attendance', AttendanceController::class);
    Route::post('/attendance/mark', [AttendanceController::class, 'mark']);
    
    // Alertas
    Route::apiResource('alerts', AlertController::class);
    Route::get('/alerts/unread', [AlertController::class, 'unread']);
    Route::patch('/alerts/{id}/read', [AlertController::class, 'markAsRead']);
    
    // Análisis de Riesgo
    Route::get('/risk-analysis', [RiskAnalysisController::class, 'index']);
    Route::get('/risk-analysis/statistics', [RiskAnalysisController::class, 'statistics']);
    Route::post('/risk-analysis/predict', [RiskAnalysisController::class, 'predict']);
});
```

#### Configurar CORS en Laravel

Edita `config/cors.php`:

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

---

### 4. Ejecutar la Aplicación

#### A. Iniciar el Servidor de Desarrollo

```bash
npm start
```

o

```bash
expo start
```

Este comando abrirá:
- Una página web con un código QR
- Opciones para ejecutar en emulador/simulador
- Terminal con opciones de comandos

#### B. Ejecutar en Emulador Android

```bash
npm run android
```

**Requisitos:**
- Android Studio instalado
- Emulador Android configurado

#### C. Ejecutar en Simulador iOS (solo Mac)

```bash
npm run ios
```

**Requisitos:**
- Xcode instalado
- Simulador iOS configurado

#### D. Ejecutar en Dispositivo Físico con Expo Go

1. **Instala Expo Go en tu móvil:**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Ejecuta el proyecto:**
   ```bash
   npm start
   ```

3. **Escanea el código QR:**
   - Android: Abre Expo Go y escanea el QR
   - iOS: Abre la cámara y escanea el QR

4. **¡Listo!** La app se cargará en tu dispositivo

---

### 5. Verificar la Conexión con el Backend

#### A. Probar Endpoints Manualmente

Usa Postman o curl para probar:

```bash
# Probar login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"password123"}'
```

#### B. Ver Logs en la App

La aplicación mostrará errores de conexión en:
- Terminal de Expo
- Consola de DevTools (presiona `j` en la terminal de Expo)
- Alert en la app móvil

---

### 6. Solución de Problemas Comunes

#### Error: "Network request failed"

**Causa:** La app no puede conectarse al backend

**Soluciones:**
1. Verifica que Laravel esté corriendo (`php artisan serve`)
2. Confirma la URL en `src/config/api.js`
3. En Android, usa `http://10.0.2.2:8000/api`
4. En dispositivo físico, usa tu IP local
5. Desactiva temporalmente el firewall
6. Verifica CORS en Laravel

#### Error: "Unable to resolve module"

**Causa:** Dependencias faltantes o corruptas

**Solución:**
```bash
# Limpiar cache
npm cache clean --force

# Reinstalar
rm -rf node_modules
rm package-lock.json
npm install

# Reiniciar Expo
expo start -c
```

#### Error: "Port 19000 is already in use"

**Causa:** Otra instancia de Expo corriendo

**Solución:**
```bash
# Windows
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:19000 | xargs kill -9
```

#### Error de autenticación 401

**Causa:** Token expirado o inválido

**Solución:**
1. Cierra sesión en la app
2. Vuelve a iniciar sesión
3. Verifica la configuración de tokens en Laravel

---

### 7. Desarrollo y Depuración

#### A. Ver Logs en Tiempo Real

```bash
# Iniciar con logs detallados
expo start --dev-client --clear
```

#### B. Abrir DevTools

En la terminal de Expo, presiona:
- `j` - Abrir DevTools del navegador
- `i` - Ejecutar en iOS Simulator
- `a` - Ejecutar en Android Emulator
- `w` - Ejecutar en navegador web
- `r` - Recargar app
- `m` - Cambiar menú de desarrollo

#### C. Hot Reload

Por defecto, la app se recarga automáticamente cuando guardas cambios en el código.

Para recargar manualmente:
- Sacude el dispositivo físico
- Presiona `Cmd + D` (iOS) o `Cmd + M` (Android) en simulador

---

### 8. Preparar para Producción

#### A. Actualizar Configuración

1. **Cambiar URL del API a producción:**
   ```javascript
   // src/config/api.js
   BASE_URL: 'https://api.tudominio.com/api'
   ```

2. **Actualizar app.json:**
   ```json
   {
     "expo": {
       "name": "EduIA",
       "slug": "eduia-app",
       "version": "1.0.0",
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png"
       }
     }
   }
   ```

#### B. Build para Android

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login en Expo
eas login

# Configurar proyecto
eas build:configure

# Crear build APK
eas build --platform android --profile preview

# Crear build AAB para Play Store
eas build --platform android --profile production
```

#### C. Build para iOS

```bash
# Crear build para App Store
eas build --platform ios --profile production
```

---

### 9. Estructura de Datos Esperada

#### Formato de Usuario (Login/Register Response)

```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "admin"
  }
}
```

#### Formato de Estudiante

```json
{
  "id": 1,
  "name": "María González",
  "email": "maria@ejemplo.com",
  "student_code": "EST-2024-001",
  "phone": "+1234567890",
  "birth_date": "2005-03-15",
  "grade": "5to Grado",
  "address": "Calle 123, Ciudad",
  "risk_level": "low"
}
```

#### Formato de Análisis de Riesgo

```json
{
  "id": 1,
  "student_id": 1,
  "student_name": "María González",
  "student_code": "EST-2024-001",
  "risk_level": "medium",
  "risk_factors": [
    "Asistencia irregular",
    "Disminución en calificaciones"
  ],
  "recommendations": "Se recomienda una tutoría personalizada y seguimiento semanal",
  "last_analysis": "2024-01-15T10:30:00Z"
}
```

---

### 10. Recursos Adicionales

- **Documentación de Expo:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **React Native Paper:** https://callstack.github.io/react-native-paper/
- **Axios:** https://axios-http.com/

---

## ✅ Checklist Final

Antes de considerar la configuración completa, verifica:

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] URL del backend configurada en `src/config/api.js`
- [ ] Backend Laravel corriendo
- [ ] CORS configurado en Laravel
- [ ] Endpoints de API funcionando
- [ ] App ejecutándose en Expo (`npm start`)
- [ ] Login exitoso desde la app
- [ ] Datos cargando correctamente

---

**¿Necesitas ayuda?** Abre un issue en el repositorio del proyecto.

