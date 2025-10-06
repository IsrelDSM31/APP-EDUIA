@echo off
chcp 65001 >nul
color 0C
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║          🔧 FIX INMEDIATO - ERROR DE CONEXIÓN 🔧                 ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo Este script va a:
echo   1. Detener el servidor Laravel que está mal configurado
echo   2. Iniciarlo correctamente en 0.0.0.0:8000
echo   3. Reiniciar Metro Bundler con caché limpio
echo   4. Configurar el firewall automáticamente
echo.
echo ⚠️  Presiona cualquier tecla para continuar...
pause >nul
echo.

REM ====================================
REM PASO 1: Detener Laravel
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [1/6] Deteniendo servidor Laravel mal configurado...            │
echo └─────────────────────────────────────────────────────────────────┘

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000"') do (
    echo       Deteniendo proceso %%a...
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 2 >nul
echo       ✓ Servidor anterior detenido correctamente
echo.

REM ====================================
REM PASO 2: Limpiar caché Laravel
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [2/6] Limpiando caché de Laravel...                             │
echo └─────────────────────────────────────────────────────────────────┘

cd /d C:\xampp\htdocs\IAEDU1
php artisan config:clear >nul 2>&1
php artisan cache:clear >nul 2>&1
echo       ✓ Caché de Laravel limpiado
echo.

REM ====================================
REM PASO 3: Iniciar Laravel correctamente
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [3/6] Iniciando Laravel en 0.0.0.0:8000...                      │
echo └─────────────────────────────────────────────────────────────────┘

start "🚀 Laravel Server - NO CERRAR" cmd /k "color 0A && title Laravel Server - Puerto 8000 && echo. && echo ════════════════════════════════════════════════ && echo    SERVIDOR LARAVEL CORRIENDO && echo ════════════════════════════════════════════════ && echo. && echo Host: 0.0.0.0:8000 && echo IP Local: 192.168.1.69:8000 && echo. && echo ⚠️  NO CIERRES ESTA VENTANA && echo. && cd /d C:\xampp\htdocs\IAEDU1 && php artisan serve --host=0.0.0.0 --port=8000"

timeout /t 5 >nul

REM Verificar que está corriendo
netstat -ano | findstr ":8000" >nul
if %errorlevel% equ 0 (
    echo       ✓ Laravel corriendo correctamente
) else (
    echo       ✗ ERROR: Laravel no pudo iniciarse
    echo       Revisa la ventana de Laravel Server
    pause
    exit
)
echo.

REM ====================================
REM PASO 4: Detener Metro Bundler
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [4/6] Deteniendo Metro Bundler anterior...                      │
echo └─────────────────────────────────────────────────────────────────┘

taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul
echo       ✓ Metro Bundler detenido
echo.

REM ====================================
REM PASO 5: Limpiar caché React Native
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [5/6] Limpiando caché de React Native y reiniciando...          │
echo └─────────────────────────────────────────────────────────────────┘

cd /d C:\xampp\htdocs\APP-EDUIA

REM Limpiar caché de npm
echo       Limpiando caché de npm...
call npm cache clean --force >nul 2>&1

REM Eliminar carpetas de caché temporales
if exist "%TEMP%\metro-*" (
    echo       Eliminando caché de Metro...
    rd /s /q "%TEMP%\metro-*" 2>nul
)
if exist "%TEMP%\react-*" (
    echo       Eliminando caché de React...
    rd /s /q "%TEMP%\react-*" 2>nul
)

echo       ✓ Caché limpiado
echo.

REM Iniciar Metro Bundler
echo       Iniciando Metro Bundler con caché limpio...
start "📱 Metro Bundler - NO CERRAR" cmd /k "color 0B && title Metro Bundler - React Native && echo. && echo ════════════════════════════════════════════════ && echo    METRO BUNDLER - REACT NATIVE && echo ════════════════════════════════════════════════ && echo. && echo Puerto: 8081 && echo. && echo ⚠️  NO CIERRES ESTA VENTANA && echo. && echo Cuando se cargue completamente, presiona R para recargar && echo. && cd /d C:\xampp\htdocs\APP-EDUIA && npm start -- --reset-cache"

timeout /t 3 >nul
echo       ✓ Metro Bundler iniciado
echo.

REM ====================================
REM PASO 6: Configurar firewall
REM ====================================
echo ┌─────────────────────────────────────────────────────────────────┐
echo │ [6/6] Verificando firewall...                                   │
echo └─────────────────────────────────────────────────────────────────┘

netsh advfirewall firewall show rule name="Laravel Server 8000" >nul 2>&1
if %errorlevel% neq 0 (
    echo       Configurando firewall...
    echo       (Esto puede requerir permisos de administrador)
    netsh advfirewall firewall add rule name="Laravel Server 8000" dir=in action=allow protocol=TCP localport=8000 >nul 2>&1
    if %errorlevel% equ 0 (
        echo       ✓ Firewall configurado
    ) else (
        echo       ⚠️  No se pudo configurar automáticamente
        echo       Ejecuta esto como Administrador manualmente:
        echo       netsh advfirewall firewall add rule name="Laravel Server 8000" dir=in action=allow protocol=TCP localport=8000
    )
) else (
    echo       ✓ Firewall ya configurado
)
echo.

REM ====================================
REM RESUMEN FINAL
REM ====================================
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║                   ✅ ¡CONFIGURACIÓN COMPLETA! ✅                  ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo ✅ SE ABRIERON 2 VENTANAS NUEVAS:
echo.
echo    📗 Ventana Verde = Laravel Server (puerto 8000)
echo       → Debe decir "Server running on [http://0.0.0.0:8000]"
echo       → NO LA CIERRES
echo.
echo    📘 Ventana Azul = Metro Bundler (puerto 8081)
echo       → Espera a que termine de cargar
echo       → Presiona R para recargar la app
echo       → NO LA CIERRES
echo.
echo 📱 EN TU EMULADOR/DISPOSITIVO:
echo    1. Espera 10-15 segundos a que Metro termine de cargar
echo    2. Presiona R en la ventana azul de Metro Bundler
echo    3. O sacude el dispositivo y selecciona "Reload"
echo    4. Si aún no funciona, cierra y abre la app completamente
echo.
echo 🔑 CREDENCIALES PARA LOGIN:
echo    Email: admin@eduia.com
echo    Contraseña: password
echo.
echo 🔍 VERIFICAR CONEXIÓN:
echo    Abre en tu navegador: http://192.168.1.69:8000
echo    Deberías ver la página de Laravel
echo.
echo ⚠️  IMPORTANTE:
echo    - Mantén las 2 ventanas abiertas
echo    - Si cierras alguna, ejecuta este script de nuevo
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.

pause

