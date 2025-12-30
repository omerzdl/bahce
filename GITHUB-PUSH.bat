@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub'a Yükleme Scripti
echo ========================================
echo.

cd /d "%~dp0"

echo Git repository kontrol ediliyor...
if not exist .git (
    echo Git repository baslatiliyor...
    git init
    echo.
)

echo Dosyalar ekleniyor...
git add .

echo.
echo Commit yapiliyor...
git commit -m "Initial commit: Dual-mode Bar & Meyhane website"

echo.
echo Remote repository kontrol ediliyor...
git remote -v | findstr "origin" >nul
if errorlevel 1 (
    echo Remote repository ekleniyor...
    git remote add origin https://github.com/omerzdl/bahce.git
) else (
    echo Remote repository zaten mevcut.
)

echo.
echo Branch ayarlaniyor...
git branch -M main

echo.
echo ========================================
echo   GitHub'a push yapiliyor...
echo ========================================
echo.
echo NOT: GitHub kullanici adi ve sifre/token istenecek
echo.

git push -u origin main

echo.
echo ========================================
if %errorlevel% equ 0 (
    echo   BASARILI! Proje GitHub'a yuklendi.
) else (
    echo   HATA! Push islemi basarisiz oldu.
    echo   Lutfen GITHUB-UPLOAD.md dosyasini kontrol edin.
)
echo ========================================
echo.

pause

