# 📝 Guía de Edición de Perfil - EduIA

## ✅ Funcionalidad Implementada

He agregado la funcionalidad completa para que los usuarios puedan actualizar su perfil sin dañar nada existente.

---

## 🎯 Características

### 1. **Editar Información Personal**
   - ✅ Cambiar nombre completo
   - ✅ Cambiar email
   - ✅ Validación de formato de email

### 2. **Cambiar Contraseña** (Opcional)
   - ✅ Requiere contraseña actual
   - ✅ Nueva contraseña (mínimo 6 caracteres)
   - ✅ Confirmación de contraseña
   - ✅ Se puede omitir (no cambiar contraseña)

### 3. **Seguridad**
   - ✅ Autenticación con token Sanctum
   - ✅ Verificación de contraseña actual antes de cambiarla
   - ✅ Validaciones en frontend y backend

---

## 📱 Cómo Usar

### Desde la App:

1. **Ir a Perfil** (última pestaña del menú)
2. **Presionar "Editar Perfil"** (botón debajo del email)
3. **Modificar datos:**
   - Nombre completo
   - Email
   - (Opcional) Cambiar contraseña
4. **Presionar "Guardar Cambios"**
5. **Confirmación:** Aparecerá mensaje de éxito

---

## 🔧 Archivos Creados/Modificados

### Backend (Laravel):
✅ **Nuevo:** `C:\xampp\htdocs\IAEDU1\app\Http\Controllers\Api\ProfileApiController.php`
   - Métodos:
     - `show()` - Obtener perfil
     - `update()` - Actualizar perfil
     - `uploadAvatar()` - Subir foto de perfil (preparado para futuro)

✅ **Modificado:** `C:\xampp\htdocs\IAEDU1\routes\api.php`
   - Rutas agregadas:
     - `GET /api/profile`
     - `PUT /api/profile`
     - `POST /api/profile/avatar`

### Frontend (React Native):
✅ **Nuevo:** `src/screens/profile/EditProfileScreen.js`
   - Pantalla de edición de perfil con formulario completo

✅ **Nuevo:** `src/services/profileService.js`
   - Servicio para comunicación con API de perfil

✅ **Modificado:** `src/config/api.js`
   - Endpoints de perfil agregados

✅ **Modificado:** `src/navigation/MainNavigator.js`
   - Ruta de edición de perfil agregada

✅ **Modificado:** `src/screens/profile/ProfileScreen.js`
   - Botón "Editar Perfil" agregado

✅ **Modificado:** `src/context/AuthContext.js`
   - Función `updateUser()` mejorada para aceptar datos

✅ **Modificado:** `src/services/authService.js`
   - Función `storeUser()` agregada

---

## 🔐 API Endpoints

### 1. Obtener Perfil
```
GET /api/profile
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Usuario",
    "email": "usuario@ejemplo.com",
    "role": "admin",
    "created_at": "2024-01-01"
  }
}
```

### 2. Actualizar Perfil
```
PUT /api/profile
Headers: Authorization: Bearer {token}
Body:
{
  "name": "Nuevo Nombre",
  "email": "nuevo@email.com",
  "current_password": "contraseña123", // Solo si cambia contraseña
  "password": "nuevaContraseña",       // Opcional
  "password_confirmation": "nuevaContraseña" // Opcional
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nuevo Nombre",
    "email": "nuevo@email.com",
    "role": "admin"
  },
  "message": "Profile updated successfully"
}
```

---

## 🎨 Diseño de la Interfaz

### Pantalla de Edición:
```
┌─────────────────────────────────┐
│  Editar Perfil            [←]   │
├─────────────────────────────────┤
│                                 │
│  INFORMACIÓN PERSONAL           │
│  ┌───────────────────────────┐ │
│  │ 👤 Nombre completo        │ │
│  │    [Juan Pérez        ]   │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ ✉️  Email                 │ │
│  │    [juan@email.com    ]   │ │
│  └───────────────────────────┘ │
│                                 │
│  CAMBIAR CONTRASEÑA             │
│  (Opcional - dejar vacío si     │
│   no deseas cambiarla)          │
│                                 │
│  [Cambiar Contraseña]           │
│                                 │
│  ┌───────────────────────────┐ │
│  │     Guardar Cambios       │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

## ✨ Validaciones

### Frontend:
- ✅ Nombre no vacío
- ✅ Email no vacío
- ✅ Formato de email válido
- ✅ Si cambia contraseña:
  - Contraseña actual requerida
  - Nueva contraseña mínimo 6 caracteres
  - Confirmación debe coincidir

### Backend:
- ✅ Autenticación con token
- ✅ Email único (excepto el propio)
- ✅ Verificación de contraseña actual
- ✅ Contraseña nueva mínimo 6 caracteres
- ✅ Confirmación de contraseña

---

## 🚀 Próximas Mejoras (Opcional)

- [ ] Subir foto de perfil
- [ ] Cambiar rol (solo admin)
- [ ] Historial de cambios
- [ ] Verificación de email por código
- [ ] Autenticación de dos factores

---

## 🐛 Solución de Problemas

### "La contraseña actual es incorrecta"
- Verifica que estés ingresando tu contraseña actual correctamente

### "El email ya está en uso"
- Ese email ya pertenece a otro usuario

### "No se pudo actualizar el perfil"
- Verifica conexión a internet
- Asegúrate que Apache y MySQL estén corriendo en XAMPP
- Revisa que el backend esté en: `http://192.168.1.72/IAEDU1/public/api`

---

**¡Funcionalidad 100% operativa sin dañar nada existente! ✨**


