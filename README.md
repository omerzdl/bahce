# Bahçe - Bar & Meyhane

Modern ve şık bir dual-zone web sitesi projesi. Endüstriyel lüks bar ve geleneksel Türk meyhanesi için tek sayfa üzerinde iki farklı deneyim sunar.

## 🚀 Özellikler

- **Dual Mode System** - Tek sayfada iki farklı bölge (Bar & Meyhane)
- **Gateway Landing** - 50/50 split ekran ile interaktif giriş
- **URL Parameter Support** - QR kodlar için doğrudan yönlendirme
- Modern ve responsive tasarım
- Tailwind CSS ile stilize edilmiş
- Lucide Icons kullanımı
- Smooth scroll navigasyon
- Menü filtreleme sistemi (her bölge için ayrı)
- Mobil uyumlu yapı

## 📁 Proje Yapısı

```
bahce/
├── index.html              # Ana HTML dosyası (Dual-mode yapısı)
├── css/
│   └── styles.css          # Özel CSS stilleri (Bar & Meyhane renkleri)
├── js/
│   └── main.js             # JavaScript fonksiyonları (Zone yönetimi)
├── assets/                  # Görseller ve diğer dosyalar
├── package.json             # Proje bağımlılıkları
├── README.md                # Proje dokümantasyonu
├── DUAL-MODE-GUIDE.md       # Dual-mode sistem kılavuzu
└── .gitignore              # Git ignore dosyası
```

## 🎯 Dual Mode System

Proje iki farklı bölge içerir:

1. **Bahçe Bar** - Endüstriyel lüks, kokteyller ve biralar (Turuncu tema)
2. **Bahçe Meyhane** - Geleneksel Türk meyhanesi, rakı ve meze (Teal tema)

### Gateway (Giriş Ekranı)

- İlk yüklemede 50/50 split ekran gösterilir
- Hover ile 60/40 genişleme efekti
- Tıklama ile ilgili bölgeye geçiş

### URL Parametreleri

- `?zone=bar` → Doğrudan Bar bölgesine gider
- `?zone=meyhane` → Doğrudan Meyhane bölgesine gider
- QR kodlar için kullanılabilir

Detaylı bilgi için: [DUAL-MODE-GUIDE.md](DUAL-MODE-GUIDE.md)

## 🛠️ Kurulum

1. Projeyi klonlayın veya indirin
2. Terminal'de proje klasörüne gidin
3. Gerekli bağımlılıkları yükleyin (opsiyonel):
   ```bash
   npm install
   ```

## 🎯 Kullanım

### Geliştirme Sunucusu

Projeyi yerel bir sunucuda çalıştırmak için:

```bash
npm run dev
```

veya

```bash
npm start
```

Bu komut `live-server` kullanarak projeyi `http://localhost:3000` adresinde başlatır.

### Doğrudan Açma

`index.html` dosyasını doğrudan tarayıcıda açabilirsiniz, ancak bazı özellikler için bir web sunucusu gerekebilir.

## 🎨 Teknolojiler

- **HTML5** - Yapısal markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (Vanilla)** - İnteraktif özellikler
- **Lucide Icons** - Modern ikon seti
- **Google Fonts** - Inter ve Playfair Display fontları

## 📝 Özelleştirme

### Renkler

Ana renk paleti `css/styles.css` dosyasında ve Tailwind config'de tanımlanmıştır:
- Brand Orange: `#D95D0F`
- Background: `#0B0A08`
- Text: `#F5F5F4` (stone-300)

### Menü Öğeleri

Menü öğelerini eklemek veya düzenlemek için `index.html` dosyasındaki grid bölümünü düzenleyin. Her öğeye `data-menu-item` attribute'u ekleyerek filtreleme sistemine dahil edin.

## 🔧 Geliştirme Notları

- Tüm görseller şu anda Unsplash CDN'den yükleniyor. Üretim için yerel görseller kullanılmalıdır.
- Fiyatlar Türk Lirası (₺) formatında gösterilmektedir.
- Responsive tasarım mobile-first yaklaşımı ile geliştirilmiştir.

## 📄 Lisans

MIT License

## 👤 İletişim

Proje hakkında sorularınız için iletişime geçebilirsiniz.

