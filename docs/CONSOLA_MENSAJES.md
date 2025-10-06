# 📊 Guía de Mensajes en Consola

## ✅ Mensajes Normales (No son errores)

Cuando veas estos mensajes en la consola, **no te preocupes**. Son mensajes informativos que indican que la aplicación está funcionando correctamente en modo de demostración:

### Mensajes Informativos:

```
ℹ️ Backend no disponible. Usando datos de demostración para Tareas.
ℹ️ Backend no disponible. Usando datos de demostración para Mensajería.
ℹ️ Backend no disponible. Usando datos de demostración para Canales.
ℹ️ Backend no disponible. Usando datos de demostración para Eventos.
ℹ️ Backend no disponible. Usando datos de demostración para Exámenes.
ℹ️ Backend no disponible. Usando configuración por defecto.
```

**Significado:** La aplicación intentó conectarse al backend pero no está disponible, así que usa datos de demostración automáticamente.

**¿Es un problema?** ❌ **NO**. La aplicación funciona perfectamente con datos de demostración.

---

## 🎯 ¿Qué significa cada mensaje?

### 1. Tareas
- **Mensaje:** `Backend no disponible. Usando datos de demostración para Tareas.`
- **Dónde aparece:** Al abrir la pantalla de Tareas y Entregas
- **Datos mostrados:** 3 tareas de ejemplo (Matemáticas, Historia, Ciencias)

### 2. Mensajería
- **Mensaje:** `Backend no disponible. Usando datos de demostración para Mensajería.`
- **Dónde aparece:** Al abrir la pantalla de Mensajes
- **Datos mostrados:** 3 conversaciones con profesores/estudiantes

### 3. Canales
- **Mensaje:** `Backend no disponible. Usando datos de demostración para Canales.`
- **Dónde aparece:** Al cambiar a la pestaña "Canales" en Mensajería
- **Datos mostrados:** 3 canales grupales por materia

### 4. Calendario/Eventos
- **Mensaje:** `Backend no disponible. Usando datos de demostración para Eventos.`
- **Dónde aparece:** Al abrir el Calendario
- **Datos mostrados:** 3 eventos académicos

### 5. Exámenes
- **Mensaje:** `Backend no disponible. Usando datos de demostración para Exámenes.`
- **Dónde aparece:** Al cargar próximos exámenes en el Calendario
- **Datos mostrados:** 2 exámenes próximos

### 6. Configuración
- **Mensaje:** `Backend no disponible. Usando configuración por defecto.`
- **Dónde aparece:** Al cargar configuración de sincronización
- **Datos mostrados:** Sincronización desactivada por defecto

---

## 🔧 Banner Informativo en el Dashboard

La aplicación ahora muestra un **banner azul informativo** en el Dashboard que dice:

```
ℹ️ Las nuevas funcionalidades usan datos de demostración
```

Este banner te recuerda que:
- ✅ La aplicación está funcionando correctamente
- ✅ Los nuevos módulos usan datos de prueba
- ✅ Todo es normal y esperado

---

## 🚀 Cuándo desaparecerán estos mensajes

Los mensajes informativos desaparecerán automáticamente cuando:

1. **Se implemente el backend** con los endpoints necesarios
2. **El backend esté corriendo** y accesible
3. **Los endpoints respondan correctamente** (status 200)

**No necesitas hacer nada en el código del frontend.** Todo está listo para la transición automática.

---

## 🔍 Diferencia entre Mensajes Informativos y Errores Reales

### ✅ Mensajes Informativos (Buenos)
```
ℹ️ Backend no disponible. Usando datos de demostración...
```
- **Color del icono:** Azul (ℹ️)
- **Significado:** Todo funciona bien, usando datos de demostración
- **Acción requerida:** Ninguna

### ❌ Errores Reales (Requieren atención)
```
ERROR  Error loading dashboard: [Error: Network request failed]
```
- **Palabra clave:** ERROR (en rojo)
- **Significado:** Algo no está funcionando correctamente
- **Acción requerida:** Revisar el código o la conexión

---

## 📋 Checklist de Verificación

Usa este checklist para verificar que todo está funcionando:

### ✅ Dashboard
- [ ] Se muestra el banner azul informativo
- [ ] Las estadísticas cargan correctamente
- [ ] Los accesos rápidos funcionan

### ✅ Tareas y Entregas
- [ ] Aparece el mensaje informativo en consola
- [ ] Se muestran 3 tareas de ejemplo
- [ ] Los filtros funcionan
- [ ] Se puede navegar al detalle

### ✅ Mensajería
- [ ] Aparece el mensaje informativo en consola
- [ ] Se muestran 3 conversaciones
- [ ] Se muestran 3 canales
- [ ] Las pestañas cambian correctamente

### ✅ Calendario
- [ ] Aparecen los mensajes informativos en consola
- [ ] Se muestran los eventos
- [ ] Se muestran los próximos exámenes
- [ ] Los botones de sincronización están presentes

---

## 💡 Tips para Desarrolladores

### Ver solo mensajes informativos
Si quieres ver solo los mensajes informativos y no los errores de red subyacentes, puedes:

1. **Filtrar en la consola de Expo:**
   - Busca por: `ℹ️` o `Backend no disponible`

2. **Ver el banner en la app:**
   - Abre el Dashboard
   - Verás el banner azul informativo

### Desactivar mensajes temporalmente
Si quieres desactivar estos mensajes (no recomendado):

1. Abre los archivos de servicios
2. Cambia `console.log` por `// console.log`
3. Pero recuerda: estos mensajes son útiles para debugging

---

## 🎓 Resumen para Usuarios Finales

**Para usuarios que no son desarrolladores:**

Los mensajes que ves en la consola son **normales** y significan que:
- ✅ La aplicación está funcionando correctamente
- ✅ Estás viendo datos de demostración/prueba
- ✅ Todo es intencional y esperado

El banner azul en el Dashboard te lo recuerda de forma amigable.

---

## 📞 ¿Necesitas Ayuda?

Si después de leer este documento tienes dudas:

1. **Verifica el banner azul** en el Dashboard
2. **Busca `ℹ️`** en los mensajes de consola
3. **Revisa** que los datos se muestren correctamente en la app

Si algo no funciona como se describe aquí, entonces sí podría ser un error real que requiere atención.

---

**✨ Recuerda: Ver mensajes informativos en la consola es completamente normal y esperado mientras el backend no esté disponible.**

