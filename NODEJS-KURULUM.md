# Node.js Kurulum Talimatları

## Adım 1: Node.js İndirme

1. Tarayıcınızda şu adresi açın: **https://nodejs.org/**
2. **LTS (Long Term Support)** versiyonunu indirin (önerilen)
3. İndirilen `.msi` dosyasını çalıştırın

## Adım 2: Kurulum

1. Kurulum sihirbazını takip edin
2. Varsayılan ayarları kabul edin (Next, Next, Install)
3. Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın

## Adım 3: Kontrol

Yeni bir CMD veya PowerShell penceresi açın ve şu komutu çalıştırın:

```
node --version
```

Eğer bir versiyon numarası görürseniz (örneğin: v20.10.0), kurulum başarılıdır!

## Adım 4: Sunucuyu Başlatma

Node.js kurulduktan sonra:

1. `BASLA.bat` dosyasına çift tıklayın
2. VEYA CMD'de şu komutu çalıştırın:
   ```
   cd Desktop\Yeni klasör
   npx --yes http-server -p 8000 -o
   ```

---

## Alternatif: Python Kullanma

Eğer Python yüklüyse, şu komutu kullanabilirsiniz:

```
cd Desktop\Yeni klasör
python -m http.server 8000
```

Sonra tarayıcıda: **http://localhost:8000**

