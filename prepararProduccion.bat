@echo off
setlocal

REM Definir las rutas
set "SOURCE_BUILD=frontend\build"
set "DESTINATION_PUBLIC=backend\public"
set "FILE_TO_MOVE=backend\public\index.html"
set "MOVE_DESTINATION=backend\resources\views\index.html"

REM Copiar archivos del directorio de build al destino
echo Copiando archivos de %SOURCE_BUILD% a %DESTINATION_PUBLIC%...
xcopy "%SOURCE_BUILD%\*" "%DESTINATION_PUBLIC%\" /s /e /y

REM Mover el archivo index.html al nuevo destino
if exist "%FILE_TO_MOVE%" (
    move /Y "%FILE_TO_MOVE%" "%MOVE_DESTINATION%"
    echo index.html movido a %MOVE_DESTINATION%.
) else (
    echo index.html no encontrado en %FILE_TO_MOVE%.
)

echo Operación completada.
endlocal
pause
