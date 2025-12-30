@echo off
chcp 65001 >nul
echo ========================================
echo   Bahce Bar Bergama - Local Server
echo ========================================
echo.
echo Sunucu baslatiliyor...
echo Port: 8000
echo.
echo Tarayici otomatik acilacak...
echo Sunucuyu durdurmak icin Ctrl+C tuslarina basin
echo.

cd /d "%~dp0"
npx --yes http-server -p 8000 -o -c-1 --cors

pause

