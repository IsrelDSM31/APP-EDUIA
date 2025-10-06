# 📚 Guía Backend - Calendario y Mensajería

## ✅ Configuración Completada

Los servicios de **Calendario** y **Mensajería** están correctamente configurados y listos para conectarse al backend.

---

## 🔗 Endpoints Configurados

### 📅 Calendario

#### Base URL
```
http://192.168.1.72/IAEDU1/public/api
```

#### Endpoints disponibles:

1. **GET** `/calendar/events`
   - Obtener todos los eventos del calendario
   - Query params opcionales: `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`

2. **GET** `/calendar/events/upcoming-exams`
   - Obtener próximos exámenes
   - Sin parámetros

3. **GET** `/calendar/sync/settings`
   - Obtener configuración de sincronización
   - Sin parámetros

4. **POST** `/calendar/events`
   - Crear nuevo evento
   - Body: `{ title, description, start_date, end_date, type }`

5. **PUT** `/calendar/events/:id`
   - Actualizar evento existente
   - Body: `{ title, description, start_date, end_date, type }`

6. **DELETE** `/calendar/events/:id`
   - Eliminar evento

7. **GET** `/calendar/reminders`
   - Obtener recordatorios

8. **POST** `/calendar/reminders`
   - Crear recordatorio

9. **POST** `/calendar/sync/google`
   - Sincronizar con Google Calendar

10. **POST** `/calendar/sync/outlook`
    - Sincronizar con Outlook

11. **GET** `/calendar/export`
    - Exportar calendario
    - Query param: `?format=ical`

---

### 💬 Mensajería

#### Endpoints disponibles:

1. **GET** `/messages/conversations`
   - Obtener lista de conversaciones del usuario
   - Sin parámetros

2. **GET** `/messages/conversations/:id`
   - Obtener mensajes de una conversación específica

3. **POST** `/messages/conversations`
   - Crear nueva conversación
   - Body: `{ participants: [userId1, userId2] }`

4. **POST** `/messages/conversations/:id/messages`
   - Enviar mensaje en una conversación
   - Body: `{ content: "texto del mensaje" }`

5. **POST** `/messages/conversations/:id/read`
   - Marcar conversación como leída

6. **GET** `/messages/channels`
   - Obtener canales grupales (por materia)

7. **GET** `/messages/channels/:id`
   - Obtener mensajes de un canal

8. **POST** `/messages/channels/:id/messages`
   - Enviar mensaje en un canal
   - Body: `{ content: "texto del mensaje" }`

9. **GET** `/messages/users/search`
   - Buscar usuarios para iniciar conversación
   - Query param: `?q=nombre`

10. **GET** `/messages/unread-count`
    - Obtener cantidad de mensajes no leídos

---

## 📝 Formato de Respuestas Esperado

### Calendario - Eventos

#### GET /calendar/events
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Examen de Matemáticas",
      "description": "Examen del capítulo 5",
      "type": "exam",
      "start_date": "2024-10-15T09:00:00Z",
      "end_date": "2024-10-15T11:00:00Z",
      "subject_name": "Matemáticas"
    },
    {
      "id": 2,
      "title": "Reunión de Padres",
      "description": "Reunión trimestral",
      "type": "meeting",
      "start_date": "2024-10-20T15:00:00Z",
      "end_date": "2024-10-20T17:00:00Z",
      "subject_name": null
    }
  ]
}
```

**Tipos de eventos válidos:**
- `exam` - Examen
- `class` - Clase
- `meeting` - Reunión
- `holiday` - Festivo
- `assignment` - Entrega de tarea
- `other` - Otro

#### GET /calendar/events/upcoming-exams
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Examen de Matemáticas",
      "subject_name": "Matemáticas",
      "start_date": "2024-10-15T09:00:00Z",
      "type": "exam"
    }
  ]
}
```

#### GET /calendar/sync/settings
```json
{
  "success": true,
  "data": {
    "google_calendar_enabled": false,
    "outlook_enabled": false,
    "last_sync_google": null,
    "last_sync_outlook": null
  }
}
```

---

### Mensajería - Conversaciones

#### GET /messages/conversations
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "other_user_id": 5,
      "other_user_name": "Prof. García",
      "other_user_avatar": "https://...",
      "last_message": "¿Ya entregaste la tarea?",
      "last_message_time": "2024-10-05T14:30:00Z",
      "unread_count": 2
    }
  ]
}
```

#### GET /messages/conversations/:id
```json
{
  "success": true,
  "data": {
    "conversation_id": 1,
    "messages": [
      {
        "id": 1,
        "sender_id": 5,
        "sender_name": "Prof. García",
        "content": "Hola, ¿cómo estás?",
        "created_at": "2024-10-05T14:00:00Z",
        "is_read": true
      },
      {
        "id": 2,
        "sender_id": 10,
        "sender_name": "Estudiante",
        "content": "Bien, gracias",
        "created_at": "2024-10-05T14:05:00Z",
        "is_read": true
      }
    ]
  }
}
```

#### POST /messages/conversations
```json
// Request
{
  "participants": [5, 10]
}

// Response
{
  "success": true,
  "data": {
    "conversation_id": 1,
    "participants": [5, 10],
    "created_at": "2024-10-05T14:00:00Z"
  }
}
```

---

### Mensajería - Canales

#### GET /messages/channels
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "matematicas-3a",
      "subject_id": 3,
      "subject_name": "Matemáticas 3° A",
      "members_count": 28,
      "unread_count": 5,
      "last_message": "Recuerden la tarea para mañana",
      "last_message_time": "2024-10-05T16:00:00Z"
    }
  ]
}
```

#### GET /messages/channels/:id
```json
{
  "success": true,
  "data": {
    "channel_id": 1,
    "channel_name": "Matemáticas 3° A",
    "messages": [
      {
        "id": 1,
        "sender_id": 5,
        "sender_name": "Prof. García",
        "content": "Buen día a todos",
        "created_at": "2024-10-05T08:00:00Z"
      }
    ]
  }
}
```

---

## 🔒 Autenticación

Todos los endpoints requieren autenticación mediante **Bearer Token**.

### Headers requeridos:
```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

El token se obtiene automáticamente del **AsyncStorage** y se agrega en cada petición.

---

## ⚠️ Manejo de Errores

### Cuando el endpoint NO existe (404):
La app mostrará listas vacías y EmptyStates:
- Calendario: "No hay eventos"
- Mensajería: "No hay conversaciones"

### Errores que debes retornar:

#### Error genérico:
```json
{
  "success": false,
  "message": "Error al obtener eventos",
  "errors": {}
}
```

#### Error de validación:
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": {
    "title": ["El título es requerido"],
    "start_date": ["La fecha de inicio es requerida"]
  }
}
```

#### Error de autenticación:
```json
{
  "success": false,
  "message": "No autenticado",
  "errors": {}
}
```
Status code: **401**

---

## 📊 Estados HTTP

- **200** - Éxito
- **201** - Creado
- **400** - Bad Request (validación fallida)
- **401** - No autenticado
- **403** - No autorizado
- **404** - No encontrado
- **500** - Error del servidor

---

## 🛠️ Implementación en Laravel (Ejemplo)

### Calendario Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $query = CalendarEvent::query();
        
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('start_date', [
                $request->start_date,
                $request->end_date
            ]);
        }
        
        $events = $query->orderBy('start_date', 'asc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $events
        ]);
    }
    
    public function upcomingExams()
    {
        $exams = CalendarEvent::where('type', 'exam')
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->limit(10)
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $exams
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'type' => 'required|in:exam,class,meeting,holiday,assignment,other',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);
        
        $event = CalendarEvent::create($validated);
        
        return response()->json([
            'success' => true,
            'data' => $event
        ], 201);
    }
}
```

### Mensajería Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessagingController extends Controller
{
    public function getConversations()
    {
        $userId = Auth::id();
        
        $conversations = Conversation::where('user1_id', $userId)
            ->orWhere('user2_id', $userId)
            ->with('lastMessage', 'otherUser')
            ->get()
            ->map(function($conv) use ($userId) {
                $otherUser = $conv->user1_id == $userId ? $conv->user2 : $conv->user1;
                return [
                    'id' => $conv->id,
                    'other_user_id' => $otherUser->id,
                    'other_user_name' => $otherUser->name,
                    'last_message' => $conv->lastMessage?->content,
                    'last_message_time' => $conv->lastMessage?->created_at,
                    'unread_count' => $conv->unreadCount($userId)
                ];
            });
        
        return response()->json([
            'success' => true,
            'data' => $conversations
        ]);
    }
    
    public function getChannels()
    {
        $channels = Channel::with('subject')
            ->get()
            ->map(function($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->slug,
                    'subject_id' => $channel->subject_id,
                    'subject_name' => $channel->subject->name,
                    'members_count' => $channel->members()->count(),
                    'unread_count' => 0, // Implementar lógica
                    'last_message' => $channel->lastMessage?->content,
                    'last_message_time' => $channel->lastMessage?->created_at
                ];
            });
        
        return response()->json([
            'success' => true,
            'data' => $channels
        ]);
    }
}
```

### Rutas API (routes/api.php)

```php
Route::middleware('auth:sanctum')->group(function () {
    
    // Calendario
    Route::prefix('calendar')->group(function () {
        Route::get('events', [CalendarController::class, 'index']);
        Route::get('events/upcoming-exams', [CalendarController::class, 'upcomingExams']);
        Route::post('events', [CalendarController::class, 'store']);
        Route::put('events/{id}', [CalendarController::class, 'update']);
        Route::delete('events/{id}', [CalendarController::class, 'destroy']);
        Route::get('sync/settings', [CalendarController::class, 'getSyncSettings']);
        Route::post('sync/google', [CalendarController::class, 'syncGoogle']);
        Route::post('sync/outlook', [CalendarController::class, 'syncOutlook']);
    });
    
    // Mensajería
    Route::prefix('messages')->group(function () {
        Route::get('conversations', [MessagingController::class, 'getConversations']);
        Route::post('conversations', [MessagingController::class, 'createConversation']);
        Route::get('conversations/{id}', [MessagingController::class, 'getMessages']);
        Route::post('conversations/{id}/messages', [MessagingController::class, 'sendMessage']);
        Route::post('conversations/{id}/read', [MessagingController::class, 'markAsRead']);
        Route::get('channels', [MessagingController::class, 'getChannels']);
        Route::get('channels/{id}', [MessagingController::class, 'getChannelMessages']);
        Route::post('channels/{id}/messages', [MessagingController::class, 'sendChannelMessage']);
        Route::get('users/search', [MessagingController::class, 'searchUsers']);
        Route::get('unread-count', [MessagingController::class, 'getUnreadCount']);
    });
});
```

---

## ✅ Checklist de Implementación

### Calendario:
- [ ] Crear tabla `calendar_events`
- [ ] Crear modelo `CalendarEvent`
- [ ] Implementar `CalendarController`
- [ ] Agregar rutas en `api.php`
- [ ] Probar endpoints con Postman
- [ ] Verificar autenticación
- [ ] Probar desde la app

### Mensajería:
- [ ] Crear tablas `conversations`, `messages`, `channels`
- [ ] Crear modelos correspondientes
- [ ] Implementar `MessagingController`
- [ ] Agregar rutas en `api.php`
- [ ] Implementar sistema de mensajes no leídos
- [ ] Probar endpoints con Postman
- [ ] Verificar desde la app

---

## 🎯 Prioridades

1. **Alta prioridad:**
   - GET `/calendar/events`
   - GET `/calendar/events/upcoming-exams`
   - GET `/messages/conversations`
   - GET `/messages/channels`

2. **Media prioridad:**
   - POST `/calendar/events`
   - POST `/messages/conversations/:id/messages`
   - GET `/calendar/sync/settings`

3. **Baja prioridad:**
   - Sincronización con Google/Outlook
   - Exportar calendario
   - Búsqueda de usuarios

---

**✨ Los servicios están correctamente configurados y listos para usar en cuanto implementes estos endpoints ✨**




