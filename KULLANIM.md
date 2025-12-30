# 🚀 Sunucu Başlatma Talimatları

## Yöntem 1: Batch Dosyası (EN KOLAY) ✅

**`BASLA.bat`** dosyasına çift tıklayın. Sunucu otomatik başlayacak ve tarayıcı açılacak.

---

## Yöntem 2: PowerShell Komutu

PowerShell'i açın ve şu komutu çalıştırın:

```powershell
cd $env:USERPROFILE\Desktop; $folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*Yeni*" } | Select-Object -First 1; Set-Location $folder.FullName; npx --yes http-server -p 8000 -o
```

---

## Yöntem 3: Manuel Adımlar

1. PowerShell'i açın
2. Şu komutları sırayla çalıştırın:

```powershell
cd Desktop
$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*Yeni*" } | Select-Object -First 1
cd $folder.FullName
npx --yes http-server -p 8000 -o
```

---

## Önizleme Linki

Sunucu başladıktan sonra tarayıcınızda şu adresi açın:

**http://localhost:8000**

---

## Sorun Giderme

### Port 8000 kullanımda hatası alıyorsanız:

Farklı bir port kullanın (örneğin 8080):

```powershell
npx --yes http-server -p 8080 -o
```

### Node.js yüklü değilse:

1. [Node.js'i indirin](https://nodejs.org/)
2. Kurulumdan sonra PowerShell'i yeniden başlatın
3. Tekrar deneyin

---

## Sunucuyu Durdurma

Terminal penceresinde **Ctrl + C** tuşlarına basın.

