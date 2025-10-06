# 🔑 CREDENCIALES DE ACCESO - EduIA Mobile

## ✅ **USUARIOS CREADOS EXITOSAMENTE**

### 👤 **Usuario Admin**
```
📧 Email:    admin@eduia.com
🔑 Password: admin123
👔 Rol:      admin
```

### 👨‍🏫 **Usuario Profesor**
```
📧 Email:    profesor@eduia.com
🔑 Password: profesor123
👔 Rol:      teacher
```

### 👨‍🎓 **Usuario Estudiante**
```
📧 Email:    estudiante@eduia.com
🔑 Password: estudiante123
👔 Rol:      student
```

---

## 🌐 **Configuración de Conexión**

### **Backend Laravel:**
- **Ubicación:** `C:\xampp\htdocs\IAEDU1\`
- **URL Local:** `http://192.168.1.72/IAEDU1/public/api`

### **App Móvil:**
- **Configurada en:** `src/config/api.js`
- **Conecta a:** `http://192.168.1.72/IAEDU1/public/api`

---

## 📱 **Pasos para Iniciar Sesión:**

### 1. **Asegúrate que XAMPP esté corriendo:**
   - Abre **XAMPP Control Panel**
   - **Apache** debe estar en verde (corriendo)
   - **MySQL** debe estar en verde (corriendo)

### 2. **Recarga la app móvil:**
   - En Expo Go, **sacude tu dispositivo**
   - Presiona **"Reload"** o **"R, R"**

### 3. **Inicia sesión:**
   - Usa cualquiera de las credenciales de arriba
   - Recomiendo empezar con el usuario **Admin**

---

## 🔧 **Verificación Rápida:**

### **¿Apache está corriendo?**
Abre tu navegador y ve a:
```
http://localhost/IAEDU1/public/api/students
```

Si ves datos JSON → ✅ Todo bien
Si ves error → ❌ Inicia Apache en XAMPP

### **¿La app se conecta?**
Si después de recargar sigue diciendo "No se pudo conectar":

1. **Verifica tu IP actual:**
   ```bash
   ipconfig
   ```
   Busca "Dirección IPv4"

2. **Actualiza la IP en** `src/config/api.js` si cambió:
   ```javascript
   BASE_URL: 'http://TU_IP_AQUI/IAEDU1/public/api'
   ```

3. **Recarga Expo:**
   En la terminal de Expo, presiona `r`

---

## 🎯 **Probar Login Directamente:**

Puedes probar el login desde tu navegador con esta URL:

**Método POST:**
```
http://192.168.1.72/IAEDU1/public/api/auth/login
```

**Body (JSON):**
```json
{
  "email": "admin@eduia.com",
  "password": "admin123"
}
```

Usa Postman o cualquier herramienta similar.

---

## ✨ **Siguiente Paso:**

1. Abre **Expo Go** en tu móvil
2. Escanea el código QR de la terminal
3. En la pantalla de login, ingresa:
   - **Email:** `admin@eduia.com`
   - **Password:** `admin123`
4. Presiona **"Iniciar Sesión"**

---

**¡Todo está configurado y listo para funcionar!** 🚀

Si tienes algún problema, avísame y te ayudo a solucionarlo.

