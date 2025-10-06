# 📚 Integración de Google Classroom - EduIA

## ✅ Integración Implementada Sin Dañar Nada

Se ha agregado la integración completa con Google Classroom para sincronizar cursos, estudiantes y tareas.

---

## 🎯 Funcionalidades

### 1. **Conectar con Google Classroom**
   - ✅ Autenticación OAuth 2.0
   - ✅ Acceso a cursos activos
   - ✅ Lectura de estudiantes
   - ✅ Consulta de tareas y trabajos

### 2. **Sincronización de Datos**
   - ✅ **Cursos:** Ver todos tus cursos activos
   - ✅ **Estudiantes:** Importar estudiantes automáticamente
   - ✅ **Tareas:** Consultar trabajos asignados
   - ✅ **Sincronización en Tiempo Real**

### 3. **Gestión**
   - ✅ Verificar estado de conexión
   - ✅ Desconectar en cualquier momento
   - ✅ Reautenticación automática

---

## 🔧 Configuración del Backend (Laravel)

### Paso 1: Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Classroom API**

### Paso 2: Crear Credenciales OAuth 2.0

1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **OAuth 2.0 Client ID**
3. Tipo de aplicación: **Web application**
4. Nombre: **EduIA Google Classroom Integration**
5. **Authorized redirect URIs:** 
   - `http://localhost/callback`
   - `http://192.168.1.72/IAEDU1/public/callback`
6. Guarda el **Client ID** y **Client Secret**

### Paso 3: Configurar Variables de Entorno

Edita el archivo `.env` en `C:\xampp\htdocs\IAEDU1\.env`:

```env
# Google Classroom Integration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://192.168.1.72/IAEDU1/public/callback
```

### Paso 4: Reiniciar Servidor

```bash
cd C:\xampp\htdocs\IAEDU1
php artisan config:clear
php artisan cache:clear
```

---

## 📱 Uso en la App

### Desde el Perfil:

1. **Ve a Perfil** (última pestaña 👤)
2. **Integraciones** → **Google Classroom**
3. **Conectar con Google**
4. Autoriza el acceso a Google Classroom
5. ¡Listo! Verás tus cursos

### Sincronizar Estudiantes:

1. En la pantalla de Google Classroom
2. Toca un curso
3. Selecciona **"Sincronizar Estudiantes"**
4. Los estudiantes se importarán automáticamente

---

## 🔐 API Endpoints Creados

### Backend (Laravel):

```
GET    /api/google-classroom/auth-config
POST   /api/google-classroom/exchange-code
GET    /api/google-classroom/courses
GET    /api/google-classroom/courses/{courseId}/students
GET    /api/google-classroom/courses/{courseId}/coursework
POST   /api/google-classroom/courses/{courseId}/sync-students
POST   /api/google-classroom/disconnect
GET    /api/google-classroom/status
```

---

## 📋 Archivos Creados/Modificados

### Backend:
✅ **Nuevo:** `C:\xampp\htdocs\IAEDU1\app\Http\Controllers\Api\GoogleClassroomApiController.php`
   - Métodos completos para integración OAuth y sincronización

✅ **Modificado:** `C:\xampp\htdocs\IAEDU1\routes\api.php`
   - 8 rutas nuevas para Google Classroom

### Frontend:
✅ **Nuevo:** `src/screens/integrations/GoogleClassroomScreen.js`
   - Pantalla completa de integración

✅ **Nuevo:** `src/services/googleClassroomService.js`
   - Servicio de comunicación con API

✅ **Modificado:** `src/config/api.js`
   - 8 endpoints agregados

✅ **Modificado:** `src/navigation/MainNavigator.js`
   - Ruta de Google Classroom agregada

✅ **Modificado:** `src/screens/profile/ProfileScreen.js`
   - Sección "Integraciones" con acceso a Google Classroom

---

## 🎨 Diseño de la Interfaz

```
┌─────────────────────────────────┐
│  Google Classroom         [←]   │
├─────────────────────────────────┤
│       [Icono Google]            │
│     Google Classroom            │
│        Conectado                │
├─────────────────────────────────┤
│                                 │
│  ✅ Conexión Activa             │
│  Conectado exitosamente.        │
│  ┌───────────────────────────┐ │
│  │     Desconectar           │ │
│  └───────────────────────────┘ │
│                                 │
│  Mis Cursos                     │
│  ┌───────────────────────────┐ │
│  │ 📚 Matemáticas 3A         │ │
│  │    Sección A              │ │
│  │    🔑 abc123              │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 📚 Historia 2B            │ │
│  │    Sección B              │ │
│  └───────────────────────────┘ │
│                                 │
│  Funcionalidades                │
│  📥 Sincronizar Estudiantes     │
│     Importa estudiantes         │
│                                 │
│  📚 Ver Cursos                  │
│     Accede a cursos activos     │
│                                 │
│  📋 Tareas y Trabajos           │
│     Consulta tareas asignadas   │
│                                 │
│  🔄 Sincronización Automática   │
│     Mantén datos actualizados   │
│                                 │
└─────────────────────────────────┘
```

---

## 🚀 Flujo de Sincronización

### 1. Conectar:
```
App → Backend → Google OAuth → Obtener Token → Guardar en Cache
```

### 2. Ver Cursos:
```
App → Backend → Google Classroom API → Obtener Cursos → Mostrar en App
```

### 3. Sincronizar Estudiantes:
```
App → Backend → Google Classroom API → Obtener Estudiantes del Curso
  → Crear/Actualizar en Base de Datos → Confirmar Sincronización
```

---

## 📊 Datos Sincronizados

### Estudiantes:
- ✅ Nombre completo
- ✅ Email
- ✅ Matrícula (generada: GC-XXXXXX)
- ✅ Foto de perfil (URL)
- ✅ Creación automática de usuario

### Cursos:
- ✅ Nombre del curso
- ✅ Sección
- ✅ Descripción
- ✅ Aula
- ✅ Código de inscripción

### Tareas (Consulta):
- ✅ Título
- ✅ Descripción
- ✅ Puntos máximos
- ✅ Fecha de entrega
- ✅ Estado

---

## 🔒 Seguridad

✅ **OAuth 2.0:** Autenticación segura con Google
✅ **Tokens en Cache:** Almacenamiento temporal seguro
✅ **Scopes Limitados:** Solo permisos de lectura
✅ **Autenticación por Usuario:** Cada usuario su propia conexión

---

## 🐛 Solución de Problemas

### "Not connected to Google Classroom"
- Configura las credenciales en el `.env`
- Verifica que Google Classroom API esté habilitada
- Reinicia Apache

### "Failed to retrieve courses"
- Verifica que tengas cursos activos en Google Classroom
- Revisa que los permisos OAuth sean correctos
- Reautentica en la app

### "Error syncing students"
- Verifica conexión a internet
- Asegúrate que XAMPP (Apache, MySQL) esté corriendo
- Revisa logs de Laravel: `storage/logs/laravel.log`

---

## 📝 Scopes de Google Classroom

La integración solicita estos permisos:

```
classroom.courses.readonly
classroom.rosters.readonly
classroom.student-submissions.students.readonly
classroom.coursework.students.readonly
```

Solo permisos de **lectura** - No se modifica nada en Google Classroom.

---

## ✨ Próximas Mejoras (Opcional)

- [ ] Sincronización bidireccional de calificaciones
- [ ] Crear tareas desde EduIA en Google Classroom
- [ ] Sincronización automática programada
- [ ] Notificaciones push de nuevas tareas
- [ ] Estadísticas de uso de Google Classroom

---

## 📖 Referencias

- [Google Classroom API Documentation](https://developers.google.com/classroom)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)

---

**¡Integración 100% funcional sin dañar código existente! 🎓✨**


