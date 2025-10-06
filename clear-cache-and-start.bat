@echo off
echo ========================================
echo  Limpiando Cache de React Native
echo  APP-EDUIA
echo ========================================
echo.

REM Detener Metro Bundler si está corriendo
taskkill /F /IM node.exe 2>nul

echo Limpiando cache de Metro Bundler...
call npm start -- --reset-cache

pause

