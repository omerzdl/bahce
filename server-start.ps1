# Basit HTTP Sunucu Başlatma Scripti
$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Bahçe Bar Bergama - Local Server" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Klasör yolunu bul
$desktop = [Environment]::GetFolderPath("Desktop")
$projectFolder = Get-ChildItem -Path $desktop -Directory | Where-Object { $_.Name -like "*Yeni*" } | Select-Object -First 1

if (-not $projectFolder) {
    Write-Host "Proje klasörü bulunamadı!" -ForegroundColor Red
    Write-Host "Lütfen 'Yeni klasör' adlı klasörün Desktop'ta olduğundan emin olun." -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Proje klasörü bulundu: $($projectFolder.FullName)" -ForegroundColor Green
Set-Location $projectFolder.FullName

Write-Host ""
Write-Host "Sunucu başlatılıyor..." -ForegroundColor Yellow
Write-Host "Port: 8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tarayıcı otomatik açılacak..." -ForegroundColor Green
Write-Host "Sunucuyu durdurmak için Ctrl+C tuşlarına basın" -ForegroundColor Yellow
Write-Host ""

# Sunucuyu başlat
npx --yes http-server -p 8000 -o -c-1 --cors

