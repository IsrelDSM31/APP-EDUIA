# 🤖 Guía del Chatbot EduIA

## ✅ Implementación Completa

El chatbot está 100% funcional y disponible en dos formas:

### 1. **Botón Flotante (Burbuja Azul) 🔵**
   - Aparece en la esquina inferior derecha del Dashboard
   - Siempre visible y accesible
   - Color azul con icono de robot
   - Click para abrir el chat

### 2. **Desde el Perfil**
   - Ve a **Perfil** (última pestaña)
   - Primera opción: **"Asistente IA (Chatbot)"**

---

## 📱 Cómo Usar el Chatbot

### Comandos Disponibles:

1. **Saludos**
   - `hola`, `buenos días`, `hello`
   - Respuesta: Mensaje de bienvenida con opciones

2. **Estadísticas Generales**
   - `estadísticas`, `cuántos estudiantes`, `total`
   - Respuesta: Datos completos del sistema

3. **Análisis de Riesgo**
   - `riesgo`, `atención`, `urgente`
   - Respuesta: Lista de estudiantes en riesgo alto

4. **Asistencias**
   - `asistencia`, `ausencias`, `faltas`
   - Respuesta: Reporte completo de asistencias

5. **Calificaciones**
   - `calificaciones`, `notas`, `promedio`, `rendimiento`
   - Respuesta: Reporte académico general

6. **Alertas**
   - `alertas`, `notificaciones`
   - Respuesta: Estado de las alertas del sistema

7. **Buscar Estudiante**
   - `estudiante Juan`, `alumno García`, `matricula 1000036`
   - Respuesta: Información detallada del estudiante

8. **Ayuda**
   - `ayuda`, `comandos`, `qué puedes hacer`
   - Respuesta: Lista completa de comandos

---

## 💡 Características

✅ **Respuestas Inteligentes**: El chatbot entiende lenguaje natural
✅ **Datos en Tiempo Real**: Consulta directamente la base de datos
✅ **Interfaz Moderna**: Burbujas de chat, avatares, timestamps
✅ **Botones Rápidos**: Acceso directo a comandos populares
✅ **Historial**: Mantiene el contexto de la conversación
✅ **Accesible**: Botón flotante en pantalla principal

---

## 🎨 Diseño

- **Bot**: Burbujas grises con avatar de robot
- **Usuario**: Burbujas azules con avatar de usuario
- **Botones Rápidos**: Estadísticas, Riesgo, Ayuda
- **Timestamps**: En cada mensaje
- **Scroll Automático**: Al último mensaje

---

## 🔧 Tecnología

### Backend (Laravel):
- `ChatbotApiController.php`: Procesa mensajes
- Análisis de patrones con expresiones regulares
- Consultas en tiempo real a la base de datos
- Respuestas contextuales basadas en datos reales

### Frontend (React Native):
- `ChatbotScreen.js`: Interfaz de chat
- `ChatbotFAB.js`: Botón flotante
- `chatbotService.js`: Conexión con API
- Navegación integrada

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Ver Estadísticas
```
Usuario: estadísticas
Bot: 📊 **Estadísticas del Sistema:**
     👥 Total de Estudiantes: 36
     👨‍🏫 Total de Profesores: 5
     🔔 Alertas Activas: 40
     ...
```

### Ejemplo 2: Buscar Estudiante
```
Usuario: estudiante Juan
Bot: 👤 **Juan Pérez García**
     📋 Matrícula: 1000001
     🏫 Grupo: 3A
     🛡️ Nivel de Riesgo: bajo
```

### Ejemplo 3: Ver Riesgo
```
Usuario: riesgo
Bot: 🛡️ **Estudiantes en Riesgo Alto:**
     🔴 María López (1000005)
     🔴 Pedro Sánchez (1000012)
     ...
```

---

## 🚀 Cómo Acceder

1. **Inicia la app** (Expo Go)
2. **Ve al Dashboard** (pantalla principal)
3. **Busca el botón flotante azul** en la esquina inferior derecha
4. **Click en el botón** → Se abre el chat
5. **Escribe tu pregunta** y presiona enviar

---

## ✨ Futuras Mejoras

- [ ] Integración con GPT-4 para respuestas más naturales
- [ ] Historial guardado en base de datos
- [ ] Notificaciones push del chatbot
- [ ] Comandos de voz
- [ ] Gráficas interactivas en respuestas
- [ ] Recomendaciones proactivas

---

## 🐛 Solución de Problemas

### No veo el botón flotante:
1. Cierra completamente la app
2. Limpia caché: `npm start --clear`
3. Recarga la app en Expo Go

### El chatbot no responde:
1. Verifica que XAMPP esté corriendo
2. Revisa la conexión a internet
3. Verifica la URL del backend en `src/config/api.js`

### Error de conexión:
1. Asegúrate que Apache y MySQL estén activos
2. Verifica que el backend Laravel esté corriendo
3. Revisa los logs: `php artisan log:tail`

---

**¡Disfruta del Chatbot EduIA! 🤖✨**


