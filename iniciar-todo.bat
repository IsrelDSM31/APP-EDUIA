@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║              🚀 INICIADOR AUTOMÁTICO - APP EDUIA 🚀              ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.

REM Detener cualquier servidor Laravel existente
echo [1/5] Deteniendo servidor Laravel anterior...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000"') do (
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 2 >nul
echo       ✓ Servidor anterior detenido
echo.

REM Iniciar Laravel en 0.0.0.0:8000
echo [2/5] Iniciando servidor Laravel en 0.0.0.0:8000...
cd /d C:\xampp\htdocs\IAEDU1
start "Laravel Server" cmd /k "php artisan config:clear && echo Servidor Laravel iniciado en 0.0.0.0:8000 && php artisan serve --host=0.0.0.0 --port=8000"
timeout /t 3 >nul
echo       ✓ Servidor Laravel iniciado
echo.

REM Verificar que el servidor está corriendo
echo [3/5] Verificando servidor...
timeout /t 2 >nul
netstat -ano | findstr ":8000" >nul
if %errorlevel% equ 0 (
    echo       ✓ Servidor respondiendo en puerto 8000
) else (
    echo       ✗ Error: Servidor no responde
    pause
    exit
)
echo.

REM Detener Metro Bundler anterior
echo [4/5] Reiniciando Metro Bundler...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul
echo       ✓ Metro Bundler reiniciado
echo.

REM Iniciar Metro Bundler con caché limpio
echo [5/5] Iniciando app React Native...
cd /d C:\xampp\htdocs\APP-EDUIA
start "Metro Bundler" cmd /k "npm start -- --reset-cache"
timeout /t 3 >nul
echo       ✓ Metro Bundler iniciado
echo.

echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                     ✅ ¡TODO LISTO! ✅                            ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo 📱 AHORA EN TU EMULADOR/DISPOSITIVO:
echo    1. Presiona R en la ventana de Metro Bundler
echo    2. O cierra y abre la app completamente
echo.
echo 🔑 CREDENCIALES:
echo    Email: admin@eduia.com
echo    Contraseña: password
echo.
echo 🪟 SE ABRIERON 2 VENTANAS:
echo    - Ventana 1: Servidor Laravel (puerto 8000)
echo    - Ventana 2: Metro Bundler (puerto 8081)
echo.
echo ⚠️  NO CIERRES ESAS VENTANAS
echo.

pause

