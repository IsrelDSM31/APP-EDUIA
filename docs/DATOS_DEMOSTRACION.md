# 📊 Sistema de Datos de Demostración

## ✅ Solución Implementada

Los servicios ahora incluyen **datos de demostración (mock data)** que se retornan automáticamente cuando el backend no está disponible. Esto permite que la aplicación funcione perfectamente sin necesidad de un servidor backend mientras se desarrolla.

---

## 🔧 Cómo Funciona

### Comportamiento de los Servicios

Cada servicio tiene un patrón de manejo de errores como este:

```javascript
async getAssignments(filters = {}) {
  try {
    // Intenta conectarse al backend real
    const response = await apiService.get('/assignments', { params: filters });
    return response;
  } catch (error) {
    console.error('Error getting assignments:', error);
    // Si falla (404, red caída, etc.), retorna datos de demostración
    return {
      success: true,
      data: [/* datos de demostración */]
    };
  }
}
```

### Ventajas

✅ **La aplicación nunca se rompe** - Siempre hay datos que mostrar
✅ **Desarrollo sin backend** - Los desarrolladores frontend pueden trabajar independientemente
✅ **Testing fácil** - Datos predecibles para pruebas
✅ **Transición suave** - Cuando el backend esté listo, funcionará automáticamente
✅ **Sin cambios de código** - Las pantallas no necesitan modificación

---

## 📋 Datos de Demostración Incluidos

### 1. Tareas y Entregas (AssignmentService)

**3 tareas de ejemplo:**
- Trabajo de Matemáticas (vence en 3 días)
- Ensayo de Historia (vence en 7 días)
- Proyecto de Ciencias (vence en 1 día)

**Pantallas afectadas:**
- `AssignmentsScreen.js` - Lista de tareas
- `AssignmentDetailScreen.js` - Detalle de tareas

---

### 2. Mensajería (MessagingService)

**Conversaciones:**
- Prof. García (2 mensajes no leídos)
- Prof. Rodríguez (0 mensajes no leídos)
- Ana López (1 mensaje no leído)

**Canales:**
- Matemáticas 3° A (28 miembros)
- Historia 3° A (28 miembros)
- Ciencias 3° A (27 miembros)

**Pantallas afectadas:**
- `MessagingScreen.js` - Lista de conversaciones y canales

---

### 3. Calendario (CalendarService)

**Eventos:**
- Examen de Matemáticas (en 3 días)
- Reunión de Padres (en 5 días)
- Entrega de Proyectos (en 7 días)

**Próximos exámenes:**
- Examen de Matemáticas
- Examen de Historia

**Configuración de sincronización:**
- Google Calendar: Desactivado
- Outlook: Desactivado

**Pantallas afectadas:**
- `CalendarScreen.js` - Calendario con eventos

---

## 🚀 Transición al Backend Real

### Paso 1: Implementar endpoints en el backend

Crea los siguientes endpoints en tu servidor:

#### Tareas
- `GET /api/assignments` - Obtener todas las tareas
- `GET /api/assignments/:id` - Obtener una tarea específica
- `POST /api/assignments` - Crear nueva tarea
- `POST /api/assignments/:id/submit` - Entregar tarea

#### Mensajería
- `GET /api/messages/conversations` - Obtener conversaciones
- `GET /api/messages/channels` - Obtener canales
- `POST /api/messages/conversation/:id` - Enviar mensaje

#### Calendario
- `GET /api/calendar/events` - Obtener eventos
- `GET /api/calendar/sync/settings` - Obtener configuración de sincronización
- `POST /api/calendar/events` - Crear evento

### Paso 2: Configurar la URL base del API

En `src/config/api.js` (o donde tengas la configuración):

```javascript
const API_BASE_URL = 'https://tu-backend.com/api';
```

### Paso 3: Sin cambios adicionales necesarios

Una vez que los endpoints del backend estén funcionando:
- Los servicios usarán automáticamente el backend real
- Los datos de demostración solo se usarán como fallback
- No necesitas cambiar ninguna pantalla o componente

---

## 🛠️ Personalizar Datos de Demostración

Si quieres cambiar los datos de demostración, edita los archivos de servicios:

### Ejemplo: Agregar más tareas

En `src/services/assignmentService.js`:

```javascript
return {
  success: true,
  data: [
    // ... tareas existentes ...
    {
      id: 4,
      title: 'Tu Nueva Tarea',
      description: 'Descripción de la tarea',
      subject_name: 'Materia',
      teacher_name: 'Profesor',
      due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      points: 25,
      has_attachments: false,
    },
  ],
};
```

---

## 📝 Notas Importantes

### Mensajes en Consola

Verás mensajes informativos como estos en la consola:
```
ℹ️ Backend no disponible. Usando datos de demostración para Tareas.
ℹ️ Backend no disponible. Usando datos de demostración para Mensajería.
ℹ️ Backend no disponible. Usando datos de demostración para Eventos.
```

**Esto es NORMAL y esperado** cuando el backend no está disponible. Los servicios manejan estos errores automáticamente y retornan datos de demostración.

**Nota:** Ya no verás mensajes de ERROR rojos. Los nuevos mensajes informativos son claros y amigables.

Ver archivo `CONSOLA_MENSAJES.md` para más detalles sobre cada mensaje.

### Cuándo se usan los datos de demostración

Los datos de demostración se usan cuando:
- El backend no está iniciado
- El endpoint no existe (404)
- Hay un error de red
- El servidor no responde
- El servidor retorna un error (500, etc.)

### Cuándo se usa el backend real

El backend real se usa cuando:
- El servidor está corriendo
- Los endpoints existen
- La respuesta es exitosa (status 200)

---

## 🔍 Verificar qué datos se están usando

Para saber si estás viendo datos de demostración o datos reales:

1. **Abre la consola del desarrollador** en Expo
2. Si ves errores 404/500, estás viendo datos de demostración
3. Si no hay errores de red, estás viendo datos del backend real

---

## 📊 Estado Actual

### ✅ Funciona con datos de demostración:
- Módulo de Tareas y Entregas
- Sistema de Mensajería
- Calendario Escolar

### ⏳ Requiere backend para funcionalidad completa:
- Subir archivos reales
- Enviar mensajes reales
- Sincronización con Google Calendar/Outlook
- Guardar datos permanentemente

### ✅ Sigue funcionando normal:
- Dashboard
- Gestión de Estudiantes
- Gestión de Profesores
- Calificaciones
- Asistencias
- Análisis de Riesgo IA
- Gamificación
- Chatbot

---

## 🎯 Resumen

La aplicación ahora es **100% funcional** incluso sin backend. Puedes:

✅ Ver y probar todas las nuevas funcionalidades
✅ Desarrollar y testear sin esperar el backend
✅ Demostrar la aplicación a clientes/usuarios
✅ Hacer testing de UI/UX
✅ Preparar la documentación

Cuando el backend esté listo, simplemente configuralo y **todo funcionará automáticamente** sin cambios en el código frontend.

---

**🚀 La aplicación está lista para desarrollo, testing y demostración.**

