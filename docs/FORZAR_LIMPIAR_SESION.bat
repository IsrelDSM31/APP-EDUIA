@echo off
chcp 65001 >nul
color 0E
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║          🧹 FORZAR LIMPIEZA DE SESIÓN - APP EDUIA 🧹             ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo Este script eliminará TODA la sesión guardada para forzar el login.
echo.
echo ⚠️  IMPORTANTE:
echo    - Cierra la app completamente antes de ejecutar
echo    - Después de ejecutar, recarga la app con R
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
pause
echo.

REM Para Android Emulator (AVD)
echo [1/3] Buscando emulador Android...
adb devices >nul 2>&1
if %errorlevel% equ 0 (
    echo       ✓ ADB encontrado
    echo.
    echo [2/3] Limpiando datos de la app...
    adb shell pm clear com.anonymous.APPEDULIA >nul 2>&1
    if %errorlevel% equ 0 (
        echo       ✓ Datos de app limpiados
    ) else (
        echo       ℹ️  No se pudo limpiar automáticamente
        echo       → Desinstala y reinstala la app manualmente
    )
) else (
    echo       ℹ️  ADB no encontrado o emulador no conectado
    echo       → Cierra y abre la app manualmente
)
echo.

echo [3/3] ¿Qué hacer ahora?
echo.
echo   1. Asegúrate de que el servidor Laravel esté corriendo
echo      (Debe estar la ventana verde con php artisan serve)
echo.
echo   2. Abre la app en tu emulador/dispositivo
echo.
echo   3. Presiona R en Metro Bundler para recargar
echo.
echo   4. ¡Deberías ver la pantalla de LOGIN! 🎉
echo.

echo ═══════════════════════════════════════════════════════════════════
echo.
echo ✅ Script completado
echo.

pause

