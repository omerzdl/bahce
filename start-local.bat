@echo off
cd /d "%~dp0"
echo Starting Bahce Bar & Meyhane Local Server...
echo.
echo Server will start at: http://localhost:8080
echo.
start http://localhost:8080/index.html
npx http-server -p 8080

