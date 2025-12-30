# PowerShell script to start local server
Write-Host "Starting local server on port 8000..." -ForegroundColor Green
Set-Location $PSScriptRoot
npx --yes http-server -p 8000 -o

