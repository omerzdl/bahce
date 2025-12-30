@echo off
echo Starting local server...
cd /d "%~dp0"
npx --yes http-server -p 8000 -o
pause

