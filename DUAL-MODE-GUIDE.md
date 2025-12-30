# Dual Mode System - Kullanım Kılavuzu

## Genel Bakış

Bahçe web sitesi artık **iki farklı bölge** için tek bir sayfa üzerinde çalışıyor:

1. **Bahçe Bar** - Endüstriyel lüks, kokteyller ve biralar (Turuncu vurgu)
2. **Bahçe Meyhane** - Geleneksel Türk meyhanesi, rakı ve meze (Teal vurgu)

## Özellikler

### 1. Gateway (Giriş Ekranı)

- İlk yüklemede URL parametresi yoksa **50/50 split ekran** gösterilir
- Sol taraf: Bahçe Bar
- Sağ taraf: Bahçe Meyhane
- **Hover efekti**: Bir tarafa hover yapıldığında %60'a genişler, diğeri %40'a küçülür
- Tıklama ile ilgili bölgeye geçiş yapılır

### 2. URL Parametreleri (QR Kodlar İçin)

- `?zone=bar` → Doğrudan Bar bölgesine gider
- `?zone=meyhane` → Doğrudan Meyhane bölgesine gider
- Parametre yoksa → Gateway ekranı gösterilir

**Örnek Kullanım:**
```
https://bahce.com/?zone=bar
https://bahce.com/?zone=meyhane
```

### 3. Zone Geçişi

- Navbar'da **"Meyhaneye Geç"** veya **"Bara Geç"** butonu var
- Tıklama ile sayfa yenilenmeden bölgeler arası geçiş yapılır
- URL otomatik güncellenir

### 4. Renk Sistemi

**Bar Bölgesi:**
- Ana renk: `#D95D0F` (Turuncu)
- CSS class: `brand-orange`

**Meyhane Bölgesi:**
- Ana renk: `#14B8A6` (Teal)
- CSS class: `brand-teal`
- Alternatif: `#D4AF37` (Altın) - gelecekte kullanılabilir

### 5. Menü Yapıları

**Bar Menüsü:**
- Tüm İçkiler
- İmza İçkiler
- El Yapımı Biralar
- Alkollü İçkiler
- Şarap Listesi

**Meyhane Menüsü:**
- Tümü
- Soğuk Mezeler
- Ara Sıcaklar
- Ana Yemekler
- Rakı Çeşitleri

## Teknik Detaylar

### HTML Yapısı

```html
<!-- Gateway Overlay -->
<div id="gateway-overlay">...</div>

<!-- Bar Zone -->
<div id="zone-bar" class="zone-bar hidden">...</div>

<!-- Meyhane Zone -->
<div id="zone-meyhane" class="zone-meyhane hidden">...</div>
```

### JavaScript Fonksiyonları

- `showGateway()` - Gateway ekranını gösterir
- `showZone(zone)` - Belirtilen bölgeyi gösterir
- `setupGateway()` - Gateway hover ve click eventlerini ayarlar
- `setupZoneSwitching()` - Bölgeler arası geçiş butonlarını ayarlar

### CSS Sınıfları

- `.zone-bar` - Bar bölgesi için body class
- `.zone-meyhane` - Meyhane bölgesi için body class
- `.brand-orange` - Bar vurgu rengi
- `.brand-teal` - Meyhane vurgu rengi

## QR Kod Kullanımı

Her bölge için ayrı QR kod oluşturun:

**Bar QR Kodu:**
```
https://bahce.com/?zone=bar
```

**Meyhane QR Kodu:**
```
https://bahce.com/?zone=meyhane
```

QR kod okutulduğunda doğrudan ilgili bölgeye yönlendirilir.

## Geliştirme Notları

1. **Yeni içerik eklerken** her iki bölge için de eklemeyi unutmayın
2. **Renk değişiklikleri** için CSS'teki brand renklerini güncelleyin
3. **Gateway görselleri** Unsplash'ten geliyor, production'da yerel görseller kullanın
4. **Menü filtreleme** her iki bölge için ayrı çalışır

## Gelecek İyileştirmeler

- [ ] Animasyonlar için GSAP entegrasyonu
- [ ] Daha fazla meyhane içeriği
- [ ] Mobil optimizasyon iyileştirmeleri
- [ ] Dark mode toggle (opsiyonel)
- [ ] Çoklu dil desteği

