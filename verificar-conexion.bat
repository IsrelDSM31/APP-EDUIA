@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   VERIFICACIÓN DE CONEXIÓN
echo   APP-EDUIA
echo ========================================
echo.

REM Verificar IP Local
echo [1/4] Verificando IP local...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"Dirección IPv4"') do (
    set "IP=%%a"
    set "IP=!IP:~1!"
)
echo     ✓ Tu IP local es: %IP%
echo.

REM Verificar si Laravel está corriendo
echo [2/4] Verificando si Laravel está corriendo en puerto 8000...
netstat -ano | findstr ":8000" >nul
if %errorlevel% equ 0 (
    echo     ✓ Laravel está corriendo en puerto 8000
) else (
    echo     ✗ Laravel NO está corriendo
    echo     → Ejecuta: start-server.bat en C:\xampp\htdocs\IAEDU1
)
echo.

REM Verificar configuración de API
echo [3/4] Verificando configuración de API en React Native...
findstr "192.168.1.69:8000" "src\config\api.js" >nul
if %errorlevel% equ 0 (
    echo     ✓ URL configurada correctamente
) else (
    echo     ✗ URL NO configurada con tu IP
    echo     → Revisa src\config\api.js
)
echo.

REM Verificar regla de firewall
echo [4/4] Verificando regla de firewall...
netsh advfirewall firewall show rule name="Laravel Server 8000" >nul 2>&1
if %errorlevel% equ 0 (
    echo     ✓ Regla de firewall existe
) else (
    echo     ✗ Regla de firewall NO existe
    echo     → Ejecuta como Administrador:
    echo       netsh advfirewall firewall add rule name="Laravel Server 8000" dir=in action=allow protocol=TCP localport=8000
)
echo.

echo ========================================
echo   VERIFICACIÓN COMPLETADA
echo ========================================
echo.
echo Siguiente paso:
echo 1. Si Laravel NO está corriendo, ejecuta start-server.bat en IAEDU1
echo 2. Reinicia tu app React Native
echo 3. Intenta hacer login
echo.

pause

