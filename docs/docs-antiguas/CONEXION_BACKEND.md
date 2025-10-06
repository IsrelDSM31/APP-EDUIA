# 🔌 Configuración de Conexión con Backend Laravel

## ✅ **Configuración Aplicada**

### 📍 **Backend Detectado:**
Tu backend Laravel está en: `C:\xampp\htdocs\IAEDU1\`

### 🌐 **URL Configurada en la App:**
```javascript
BASE_URL: 'http://192.168.1.72/IAEDU1/public/api'
```

**Nota:** Esta es tu IP local. Si cambias de red, deberás actualizar la IP en `src/config/api.js`

---

## 🚀 **Pasos para Conectar:**

### 1️⃣ **Iniciar XAMPP** ✅ (Ya lo abrí)

En el **Panel de Control de XAMPP** que se abrió:
1. Presiona el botón **"Start"** junto a **Apache**
2. Presiona el botón **"Start"** junto a **MySQL**
3. Espera a que ambos servicios muestren el fondo **verde**

### 2️⃣ **Verificar que el Backend Responda**

Abre tu navegador y visita:
```
http://localhost/IAEDU1/public/api/students
```

o

```
http://192.168.1.72/IAEDU1/public/api/students
```

Deberías ver datos JSON de estudiantes.

### 3️⃣ **Crear Usuario de Prueba**

Ve a tu backend Laravel y ejecuta:

```bash
cd C:\xampp\htdocs\IAEDU1
php artisan tinker
```

Luego ejecuta este código:
```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'name' => 'Admin EduIA',
    'email' => 'admin@eduia.com',
    'password' => Hash::make('admin123'),
    'role' => 'admin'
]);

// Mostrar el usuario creado
User::where('email', 'admin@eduia.com')->first();
```

Presiona `Ctrl+D` para salir de tinker.

---

## 🔑 **Credenciales de Acceso**

Una vez creado el usuario, usa estas credenciales en la app móvil:

```
📧 Email:    admin@eduia.com
🔑 Password: admin123
```

---

## 🔄 **Recargar la App Móvil**

1. En la terminal donde corre Expo, presiona **`r`** para recargar
2. O en tu dispositivo móvil, **sacude el teléfono** y presiona **"Reload"**
3. Intenta hacer login con las credenciales de arriba

---

## 🐛 **Si Sigue Sin Conectar:**

### Opción A: Verificar la IP
Obtén tu IP local actual:
```bash
ipconfig
```

Busca "Dirección IPv4" en la sección de tu adaptador de red activo.

Si tu IP cambió, actualiza `src/config/api.js`:
```javascript
BASE_URL: 'http://TU_IP_AQUI/IAEDU1/public/api'
```

### Opción B: Usar para Emulador Android
Si usas el emulador de Android Studio, cambia en `src/config/api.js`:
```javascript
BASE_URL: 'http://10.0.2.2/IAEDU1/public/api'
```

### Opción C: Verificar CORS en Laravel
Edita `C:\xampp\htdocs\IAEDU1\config\cors.php`:
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
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

## 📝 **Endpoints Actualizados**

La app ahora usa estos endpoints (compatibles con tu backend):

- ✅ `POST /api/auth/login` - Iniciar sesión
- ✅ `POST /api/auth/logout` - Cerrar sesión
- ✅ `GET /api/auth/user` - Usuario actual
- ✅ `GET /api/students` - Lista de estudiantes
- ✅ `GET /api/grades` - Lista de calificaciones
- ✅ `GET /api/attendance` - Lista de asistencias
- ✅ `GET /api/alerts` - Lista de alertas

---

## ✅ **Checklist de Verificación:**

- [ ] XAMPP Apache está corriendo (verde)
- [ ] XAMPP MySQL está corriendo (verde)
- [ ] Backend responde en: http://localhost/IAEDU1/public/api/students
- [ ] Usuario creado en la base de datos
- [ ] App móvil recargada (presiona `r` en Expo)
- [ ] IP configurada correctamente en `src/config/api.js`

---

## 🎯 **Probar Conexión Rápidamente:**

1. Abre tu navegador
2. Ve a: http://192.168.1.72/IAEDU1/public/api/students
3. Si ves datos JSON → ✅ Backend funciona
4. Si ves error → ❌ Verifica que XAMPP esté corriendo

---

**¡Tu app móvil está configurada para conectarse con tu backend Laravel en XAMPP!** 🎉

