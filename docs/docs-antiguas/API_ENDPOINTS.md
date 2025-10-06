# Documentación de Endpoints API - EduIA

Esta documentación describe todos los endpoints que la aplicación móvil espera recibir del backend Laravel.

## 🔐 Autenticación

Todos los endpoints (excepto login y register) requieren autenticación mediante token Bearer en el header:

```
Authorization: Bearer {token}
```

---

## 📋 Endpoints

### Autenticación

#### POST /api/login
Inicia sesión de usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "refresh_token_here",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "usuario@ejemplo.com",
    "role": "admin"
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

#### POST /api/register
Registra un nuevo usuario.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "nuevo@ejemplo.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "nuevo@ejemplo.com"
  }
}
```

---

#### POST /api/logout
Cierra sesión del usuario.

**Headers:**
```
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

#### GET /api/me
Obtiene información del usuario autenticado.

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "usuario@ejemplo.com",
    "role": "admin"
  }
}
```

---

### Dashboard

#### GET /api/dashboard/stats
Obtiene estadísticas generales del dashboard.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "total_students": 150,
    "total_teachers": 25,
    "total_alerts": 8,
    "high_risk_students": 5
  }
}
```

---

#### GET /api/dashboard/recent-activities
Obtiene actividades recientes.

**Query Parameters:**
- `limit` (opcional): número de actividades a retornar

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "grade",
      "description": "Nueva calificación registrada",
      "student_name": "María González",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Estudiantes

#### GET /api/students
Lista todos los estudiantes.

**Query Parameters:**
- `search` (opcional): búsqueda por nombre, email o código
- `grade` (opcional): filtrar por grado
- `page` (opcional): número de página
- `per_page` (opcional): elementos por página

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "María González",
      "email": "maria@ejemplo.com",
      "student_code": "EST-2024-001",
      "phone": "+1234567890",
      "birth_date": "2005-03-15",
      "grade": "5to Grado",
      "address": "Calle 123",
      "risk_level": "low"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total": 150
  }
}
```

---

#### GET /api/students/{id}
Obtiene un estudiante específico.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "María González",
    "email": "maria@ejemplo.com",
    "student_code": "EST-2024-001",
    "phone": "+1234567890",
    "birth_date": "2005-03-15",
    "grade": "5to Grado",
    "address": "Calle 123",
    "risk_level": "low"
  }
}
```

---

#### POST /api/students
Crea un nuevo estudiante.

**Request Body:**
```json
{
  "name": "Pedro López",
  "email": "pedro@ejemplo.com",
  "student_code": "EST-2024-002",
  "phone": "+1234567890",
  "birth_date": "2006-05-20",
  "grade": "4to Grado",
  "address": "Calle 456"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Estudiante creado exitosamente",
  "data": {
    "id": 2,
    "name": "Pedro López",
    ...
  }
}
```

---

#### PUT /api/students/{id}
Actualiza un estudiante.

**Request Body:**
```json
{
  "name": "Pedro López Actualizado",
  "email": "pedro.nuevo@ejemplo.com",
  "phone": "+9876543210"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Estudiante actualizado exitosamente",
  "data": {
    "id": 2,
    "name": "Pedro López Actualizado",
    ...
  }
}
```

---

#### DELETE /api/students/{id}
Elimina un estudiante.

**Response Success (200):**
```json
{
  "success": true,
  "message": "Estudiante eliminado exitosamente"
}
```

---

#### GET /api/students/{id}/grades
Obtiene las calificaciones de un estudiante.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "course_name": "Matemáticas",
      "assignment": "Examen Final",
      "grade": 95,
      "date": "2024-01-15"
    }
  ]
}
```

---

#### GET /api/students/{id}/attendance
Obtiene las asistencias de un estudiante.

**Query Parameters:**
- `start_date` (opcional): fecha inicial
- `end_date` (opcional): fecha final

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "course_name": "Matemáticas",
      "date": "2024-01-15",
      "time": "08:00",
      "status": "present",
      "notes": null
    }
  ]
}
```

---

#### GET /api/students/{id}/alerts
Obtiene las alertas de un estudiante.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "title": "Bajo rendimiento",
      "message": "El estudiante ha mostrado una disminución en sus calificaciones",
      "severity": "medium",
      "is_read": false,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### GET /api/students/{id}/risk-analysis
Obtiene el análisis de riesgo de un estudiante.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "student_id": 1,
    "student_name": "María González",
    "risk_level": "medium",
    "risk_score": 65,
    "risk_factors": [
      "Asistencia irregular (75%)",
      "Disminución en calificaciones recientes"
    ],
    "recommendations": "Se recomienda una tutoría personalizada en matemáticas y seguimiento semanal de asistencia",
    "last_analysis": "2024-01-15T10:30:00Z"
  }
}
```

---

### Profesores

Los endpoints de profesores siguen la misma estructura que los de estudiantes:

- `GET /api/teachers` - Listar profesores
- `GET /api/teachers/{id}` - Obtener profesor
- `POST /api/teachers` - Crear profesor
- `PUT /api/teachers/{id}` - Actualizar profesor
- `DELETE /api/teachers/{id}` - Eliminar profesor
- `GET /api/teachers/{id}/students` - Estudiantes del profesor
- `GET /api/teachers/{id}/courses` - Cursos del profesor

**Estructura de Profesor:**
```json
{
  "id": 1,
  "name": "Ana Martínez",
  "email": "ana@ejemplo.com",
  "phone": "+1234567890",
  "subject": "Matemáticas",
  "specialty": "Álgebra Avanzada",
  "address": "Calle 789"
}
```

---

### Calificaciones

#### GET /api/grades
Lista todas las calificaciones.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "student_name": "María González",
      "course_id": 1,
      "course_name": "Matemáticas",
      "assignment": "Examen Final",
      "grade": 95,
      "date": "2024-01-15",
      "teacher_name": "Ana Martínez"
    }
  ]
}
```

---

#### POST /api/grades
Crea una nueva calificación.

**Request Body:**
```json
{
  "student_id": 1,
  "course_id": 1,
  "assignment": "Examen Parcial",
  "grade": 88,
  "date": "2024-01-20"
}
```

---

### Asistencias

#### GET /api/attendance
Lista todas las asistencias.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "student_name": "María González",
      "course_id": 1,
      "course_name": "Matemáticas",
      "date": "2024-01-15",
      "time": "08:00",
      "status": "present",
      "notes": null
    }
  ]
}
```

**Posibles valores de `status`:**
- `present` / `presente`
- `absent` / `ausente`
- `late` / `tarde`
- `excused` / `justificado`

---

#### POST /api/attendance/mark
Marca asistencia para un estudiante.

**Request Body:**
```json
{
  "student_id": 1,
  "course_id": 1,
  "date": "2024-01-15",
  "time": "08:00",
  "status": "present",
  "notes": "Llegó a tiempo"
}
```

---

### Alertas

#### GET /api/alerts
Lista todas las alertas.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "student_name": "María González",
      "title": "Bajo rendimiento académico",
      "message": "El estudiante ha mostrado una disminución significativa en sus calificaciones en las últimas 3 semanas",
      "severity": "high",
      "is_read": false,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Posibles valores de `severity`:**
- `high` / `alta`
- `medium` / `media`
- `low` / `baja`

---

#### GET /api/alerts/unread
Obtiene solo las alertas no leídas.

---

#### PATCH /api/alerts/{id}/read
Marca una alerta como leída.

**Response Success (200):**
```json
{
  "success": true,
  "message": "Alerta marcada como leída"
}
```

---

### Análisis de Riesgo IA

#### GET /api/risk-analysis
Lista todos los análisis de riesgo.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": 1,
      "student_name": "María González",
      "student_code": "EST-2024-001",
      "risk_level": "medium",
      "risk_score": 65,
      "risk_factors": [
        "Asistencia irregular (75%)",
        "Disminución en calificaciones"
      ],
      "recommendations": "Tutoría personalizada recomendada",
      "last_analysis": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Posibles valores de `risk_level`:**
- `high` / `alto`
- `medium` / `medio`
- `low` / `bajo`
- `none` / `ninguno`

---

#### GET /api/risk-analysis/statistics
Obtiene estadísticas generales de riesgo.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "total_students": 150,
    "high_risk": 5,
    "medium_risk": 15,
    "low_risk": 30,
    "no_risk": 100
  }
}
```

---

#### POST /api/risk-analysis/predict
Ejecuta una predicción de riesgo para un estudiante.

**Request Body:**
```json
{
  "student_id": 1
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "student_id": 1,
    "risk_level": "medium",
    "risk_score": 65,
    "risk_factors": [
      "Asistencia irregular",
      "Disminución en calificaciones"
    ],
    "recommendations": "Se recomienda intervención temprana",
    "confidence": 0.85
  }
}
```

---

## 📝 Notas Importantes

### Formato de Fechas
Todas las fechas deben estar en formato ISO 8601: `YYYY-MM-DDTHH:MM:SSZ`

### Paginación
Los endpoints que retornan listas incluyen metadata de paginación:

```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "total_pages": 10,
    "per_page": 20,
    "total": 200
  }
}
```

### Manejo de Errores
Todos los errores siguen este formato:

```json
{
  "success": false,
  "message": "Mensaje descriptivo del error",
  "errors": {
    "campo": ["Error de validación específico"]
  }
}
```

### Códigos de Estado HTTP
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity (errores de validación)
- `500` - Internal Server Error

---

## 🔧 Testing de Endpoints

Puedes usar estos ejemplos con curl o Postman para probar los endpoints:

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"password123"}'

# Obtener estudiantes (con token)
curl -X GET http://localhost:8000/api/students \
  -H "Authorization: Bearer {tu_token}" \
  -H "Content-Type: application/json"

# Crear estudiante
curl -X POST http://localhost:8000/api/students \
  -H "Authorization: Bearer {tu_token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo Estudiante","email":"nuevo@ejemplo.com","student_code":"EST-2024-999"}'
```

---

**Última actualización:** Enero 2024

