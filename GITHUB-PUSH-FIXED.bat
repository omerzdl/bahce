@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub'a Yükleme Scripti (Düzeltilmiş)
echo ========================================
echo.

cd /d "%~dp0"

echo Git ayarlari kontrol ediliyor...
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    echo HATA: Git kullanici adi ayarlanmamis!
    echo Lutfen once GIT-SETUP.bat dosyasini calistirin.
    echo.
    pause
    exit /b 1
)

git config user.email >nul 2>&1
if errorlevel 1 (
    echo.
    echo HATA: Git email adresi ayarlanmamis!
    echo Lutfen once GIT-SETUP.bat dosyasini calistirin.
    echo.
    pause
    exit /b 1
)

echo Git repository kontrol ediliyor...
if not exist .git (
    echo Git repository baslatiliyor...
    git init
    echo.
)

echo Dosyalar ekleniyor...
git add .

echo.
echo Commit durumu kontrol ediliyor...
git status --porcelain | findstr /R "." >nul
if errorlevel 1 (
    echo Yeni degisiklik yok, commit atlaniyor...
) else (
    echo Commit yapiliyor...
    git commit -m "Initial commit: Dual-mode Bar & Meyhane website"
    if errorlevel 1 (
        echo.
        echo HATA: Commit basarisiz oldu!
        echo Lutfen git log komutunu kontrol edin.
        pause
        exit /b 1
    )
)

echo.
echo Mevcut branch kontrol ediliyor...
git branch --show-current >nul 2>&1
if errorlevel 1 (
    echo Branch olusturuluyor...
    git branch -M main
) else (
    echo Branch zaten mevcut.
    git branch -M main
)

echo.
echo Remote repository kontrol ediliyor...
git remote -v | findstr "origin" >nul
if errorlevel 1 (
    echo Remote repository ekleniyor...
    git remote add origin https://github.com/omerzdl/bahce.git
) else (
    echo Remote repository zaten mevcut.
    git remote set-url origin https://github.com/omerzdl/bahce.git
)

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
    echo   https://github.com/omerzdl/bahce
) else (
    echo   HATA! Push islemi basarisiz oldu.
    echo.
    echo   Olası nedenler:
    echo   1. GitHub kimlik dogrulamasi basarisiz
    echo   2. Repository zaten dolu olabilir
    echo   3. Internet baglantisi sorunu
    echo.
    echo   Cozumler:
    echo   - Personal Access Token kullanin
    echo   - GitHub Desktop kullanin
    echo   - GITHUB-UPLOAD.md dosyasini kontrol edin
)
echo ========================================
echo.

pause

