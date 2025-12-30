@echo off
chcp 65001 >nul
echo ========================================
echo   Git Ayarlari
echo ========================================
echo.

cd /d "%~dp0"

echo Git kullanici adi ve email ayarlaniyor...
echo.
echo Lutfen GitHub kullanici adinizi girin:
set /p GIT_USERNAME="Kullanici Adi: "

echo.
echo Lutfen GitHub email adresinizi girin:
set /p GIT_EMAIL="Email: "

echo.
echo Ayarlar yapiliyor...
git config user.name "%GIT_USERNAME%"
git config user.email "%GIT_EMAIL%"

echo.
echo ========================================
echo   Git Ayarlari Tamamlandi!
echo ========================================
echo.
echo Kullanici Adi: %GIT_USERNAME%
echo Email: %GIT_EMAIL%
echo.
echo Simdi GITHUB-PUSH.bat dosyasini calistirabilirsiniz.
echo.

pause

