@echo off
echo === Push cambios de seguridad ===
cd /d "%~dp0"

echo Borrando lock files si existen...
if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\HEAD.lock" del /f ".git\HEAD.lock"

echo.
echo Agregando archivos de seguridad...
git add SiempreAlDiez-Store/backend/routes/authRoutes.js
git add SiempreAlDiez-Store/backend/server.js

echo.
echo Creando commit de seguridad...
git commit -m "security: CORS restringido, rate limiting en login, fix user enumeration"

echo.
echo Trayendo cambios del servidor (con autostash)...
git pull --rebase --autostash

echo.
echo Pusheando a GitHub...
git push

echo.
if %ERRORLEVEL%==0 (
  echo === LISTO! Los cambios fueron pusheados a GitHub ===
) else (
  echo === Hubo un error, revisar arriba ===
)
pause
