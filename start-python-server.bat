@echo off
cd /d "%~dp0"
echo ========================================
echo   BAHCE BAR & MEYHANE - LOCAL SERVER
echo ========================================
echo.
echo Starting server at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.
start http://localhost:8080
python -m http.server 8080

