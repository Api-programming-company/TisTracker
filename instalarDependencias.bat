@echo off
echo Actualizando dependencias del backend...
start /wait cmd /c "cd backend && composer install"

echo Actualizando dependencias del frontend...
start /wait cmd /c "cd frontend && npm install"

echo Dependencias actualizadas.