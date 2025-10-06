# EduIA - Sistema de Gestión Educativa con IA

Aplicación móvil desarrollada con **Expo/React Native** que se conecta a un backend **Laravel** para gestionar un sistema educativo completo con análisis de riesgo utilizando inteligencia artificial.

## 🚀 Características

### Módulos Principales

1. **Autenticación**
   - Login y registro de usuarios
   - Gestión de sesiones con tokens JWT
   - Actualización automática de tokens

2. **Dashboard**
   - Estadísticas generales del sistema
   - Accesos rápidos a módulos principales
   - Visualización de métricas clave

3. **Gestión de Estudiantes**
   - Lista de estudiantes con búsqueda
   - Creación, edición y eliminación de estudiantes
   - Vista detallada con información académica
   - Indicadores de riesgo por estudiante

4. **Gestión de Profesores**
   - Lista de profesores con búsqueda
   - Creación, edición y eliminación de profesores
   - Vista detallada con cursos y estudiantes asignados

5. **Calificaciones**
   - Visualización de todas las calificaciones
   - Indicadores visuales por nivel de rendimiento
   - Filtros por estudiante y curso

6. **Asistencias**
   - Registro de asistencias por estudiante
   - Estados: Presente, Ausente, Tarde, Justificado
   - Filtros por fecha y estudiante

7. **Sistema de Alertas**
   - Notificaciones en tiempo real
   - Alertas de riesgo académico
   - Marcado de alertas como leídas
   - Niveles de severidad

8. **Análisis de Riesgo con IA**
   - Detección temprana de estudiantes en riesgo
   - Análisis de múltiples factores
   - Recomendaciones automatizadas
   - Estadísticas y visualización de datos

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Backend Laravel configurado y en ejecución

## 🔧 Instalación

1. **Clonar el repositorio o descargar los archivos**

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la conexión con el backend**

   Edita el archivo `src/config/api.js` y configura la URL de tu backend Laravel:

   ```javascript
   export const API_CONFIG = {
     BASE_URL: 'http://tu-dominio.com/api', // Cambia esto por tu URL
     TIMEOUT: 30000,
   };
   ```

   **Notas importantes:**
   - Para **emulador Android**: usa `http://10.0.2.2:8000/api`
   - Para **iOS Simulator**: usa `http://localhost:8000/api`
   - Para **dispositivo físico**: usa la IP de tu computadora (ej: `http://192.168.1.100:8000/api`)
   - Para **producción**: usa tu dominio real (ej: `https://api.tuapp.com/api`)

## 🚀 Ejecución

### Iniciar el proyecto

```bash
npm start
```

### Ejecutar en Android

```bash
npm run android
```

### Ejecutar en iOS

```bash
npm run ios
```

### Ejecutar en navegador web

```bash
npm run web
```

## 📱 Uso con Expo Go

1. Instala **Expo Go** en tu dispositivo móvil desde:
   - [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)

2. Ejecuta `npm start` en tu terminal

3. Escanea el código QR que aparece con:
   - **Android**: App Expo Go
   - **iOS**: Cámara del iPhone

4. La aplicación se cargará en tu dispositivo

## 🏗️ Estructura del Proyecto

```
APP-EDUIA/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── common/         # Componentes comunes (botones, inputs, etc.)
│   ├── config/             # Configuraciones
│   │   └── api.js         # Configuración de API y endpoints
│   ├── context/            # Context API para estado global
│   │   └── AuthContext.js # Contexto de autenticación
│   ├── navigation/         # Configuración de navegación
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── MainNavigator.js
│   ├── screens/            # Pantallas de la aplicación
│   │   ├── auth/          # Pantallas de autenticación
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── students/      # Gestión de estudiantes
│   │   ├── teachers/      # Gestión de profesores
│   │   ├── grades/        # Calificaciones
│   │   ├── attendance/    # Asistencias
│   │   ├── alerts/        # Alertas
│   │   ├── risk/          # Análisis de riesgo IA
│   │   └── profile/       # Perfil de usuario
│   ├── services/          # Servicios para llamadas API
│   │   ├── apiService.js
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   ├── teacherService.js
│   │   ├── gradeService.js
│   │   ├── attendanceService.js
│   │   ├── alertService.js
│   │   ├── riskAnalysisService.js
│   │   └── dashboardService.js
│   └── theme/             # Tema y estilos globales
│       └── index.js
├── App.js                 # Componente principal
├── app.json              # Configuración de Expo
├── package.json          # Dependencias del proyecto
└── babel.config.js       # Configuración de Babel
```

## 🔌 Integración con Backend Laravel

### Endpoints esperados por la aplicación:

#### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/register` - Registrar usuario
- `POST /api/logout` - Cerrar sesión
- `GET /api/me` - Obtener usuario actual

#### Estudiantes
- `GET /api/students` - Listar estudiantes
- `GET /api/students/{id}` - Obtener estudiante
- `POST /api/students` - Crear estudiante
- `PUT /api/students/{id}` - Actualizar estudiante
- `DELETE /api/students/{id}` - Eliminar estudiante
- `GET /api/students/{id}/grades` - Calificaciones del estudiante
- `GET /api/students/{id}/attendance` - Asistencias del estudiante
- `GET /api/students/{id}/alerts` - Alertas del estudiante
- `GET /api/students/{id}/risk-analysis` - Análisis de riesgo del estudiante

#### Profesores
- `GET /api/teachers` - Listar profesores
- `GET /api/teachers/{id}` - Obtener profesor
- `POST /api/teachers` - Crear profesor
- `PUT /api/teachers/{id}` - Actualizar profesor
- `DELETE /api/teachers/{id}` - Eliminar profesor
- `GET /api/teachers/{id}/students` - Estudiantes del profesor
- `GET /api/teachers/{id}/courses` - Cursos del profesor

#### Calificaciones
- `GET /api/grades` - Listar calificaciones
- `GET /api/grades/{id}` - Obtener calificación
- `POST /api/grades` - Crear calificación
- `PUT /api/grades/{id}` - Actualizar calificación
- `DELETE /api/grades/{id}` - Eliminar calificación

#### Asistencias
- `GET /api/attendance` - Listar asistencias
- `GET /api/attendance/{id}` - Obtener asistencia
- `POST /api/attendance/mark` - Marcar asistencia
- `PUT /api/attendance/{id}` - Actualizar asistencia
- `DELETE /api/attendance/{id}` - Eliminar asistencia

#### Alertas
- `GET /api/alerts` - Listar alertas
- `GET /api/alerts/{id}` - Obtener alerta
- `GET /api/alerts/unread` - Alertas no leídas
- `PATCH /api/alerts/{id}/read` - Marcar como leída
- `POST /api/alerts` - Crear alerta
- `DELETE /api/alerts/{id}` - Eliminar alerta

#### Análisis de Riesgo
- `GET /api/risk-analysis` - Listar análisis
- `GET /api/students/{id}/risk-analysis` - Análisis por estudiante
- `POST /api/risk-analysis/predict` - Predecir riesgo
- `GET /api/risk-analysis/statistics` - Estadísticas de riesgo

#### Dashboard
- `GET /api/dashboard/stats` - Estadísticas generales
- `GET /api/dashboard/recent-activities` - Actividades recientes

### Formato de respuesta esperado:

```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { /* datos */ }
}
```

Para errores:
```json
{
  "success": false,
  "message": "Mensaje de error",
  "errors": { /* errores de validación */ }
}
```

## 🎨 Personalización

### Cambiar colores del tema

Edita el archivo `src/theme/index.js`:

```javascript
export const colors = {
  primary: '#6200EE',      // Color principal
  secondary: '#03DAC6',    // Color secundario
  // ... más colores
};
```

### Modificar configuración de la app

Edita `app.json` para cambiar:
- Nombre de la aplicación
- Icono y splash screen
- Configuración de build para iOS/Android

## 🔒 Seguridad

- Los tokens se almacenan de forma segura usando AsyncStorage
- Refresh automático de tokens cuando expiran
- Interceptores de Axios para manejo centralizado de autenticación
- Validación de formularios en cliente y servidor

## 📦 Dependencias Principales

- **expo** - Framework para React Native
- **react-navigation** - Navegación
- **axios** - Cliente HTTP
- **react-native-paper** - Componentes UI
- **react-native-vector-icons** - Iconos
- **@react-native-async-storage/async-storage** - Almacenamiento local

## 🐛 Solución de Problemas

### Error de conexión con el backend

1. Verifica que el backend Laravel esté ejecutándose
2. Confirma que la URL en `src/config/api.js` sea correcta
3. En Android, usa `http://10.0.2.2:8000/api` para localhost
4. En dispositivo físico, usa la IP de tu computadora

### Errores de instalación

```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules
rm package-lock.json
npm install
```

### Problemas con Expo

```bash
# Limpiar cache de Expo
expo start -c
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte y preguntas, por favor abre un issue en el repositorio del proyecto.

---

**Desarrollado con ❤️ usando Expo y React Native**



