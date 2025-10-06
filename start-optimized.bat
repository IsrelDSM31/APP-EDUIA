@echo off
echo Configurando variables de entorno para optimizacion de memoria...
set NODE_OPTIONS=--max-old-space-size=6144 --max-semi-space-size=256 --optimize-for-size
set NODE_ENV=production
set EXPO_OPTIMIZE=1

echo Iniciando Expo con optimizaciones de memoria...
npx expo start --clear --no-dev --minify


