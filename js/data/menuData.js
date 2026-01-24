// ============================================
// BAHÇE BAR & MEYHANE - MENU DATA
// Dinamik Menü Yönetimi - JSON-Based Architecture
// ============================================

/**
 * Menü Veri Yapısı
 * - Müşteri bu dosyayı düzenleyerek fiyat, isim, açıklama güncelleyebilir
 * - HTML'e dokunmadan tüm menü yönetimi buradan yapılır
 */

export const menuData = {
    // ============================================
    // BAR ZONE - KOKTEYLLER & İÇKİLER
    // ============================================
    bar: [
        {
            id: 1,
            category: "signatures",
            name: "Eski Tütüncü",
            nameEn: "The Old Smoker",
            price: "450₺",
            description: "Yıllandırılmış Bourbon, tütsülenmiş biberiye infüzyonu, angostura acıları, akçaağaç şurubu. Duman balonu ile servis edilir.",
            image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1887&auto=format&fit=crop",
            icon: "flame",
            badge: "Popüler Seçim",
            isNew: false,
            isSignature: true,
            isPopular: true
        },
        {
            id: 2,
            category: "beers",
            name: "Bergama Altını",
            nameEn: "Bergama Gold",
            price: "225₺",
            description: "5km içinde üretilen yerel el yapımı pilsner. İnce bal notaları ve çiçeksi şerbetçiotu aroması ile ferah bir bitiş.",
            image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=2070&auto=format&fit=crop",
            icon: "badge-check",
            badge: "Yerel Favori",
            isNew: false,
            isSignature: false,
            isPopular: true
        },
        {
            id: 3,
            category: "signatures",
            name: "Gece Yarısı Kadifesi",
            nameEn: "Midnight Velvet",
            price: "400₺",
            description: "Soğuk demleme kahve likörü, premium votka, bitter çikolata rendesi ve bir tutam vanilya çekirdeği.",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop",
            icon: "moon",
            badge: "Tatlı & Güçlü",
            isNew: false,
            isSignature: true,
            isPopular: false
        },
        {
            id: 4,
            category: "spirits",
            name: "Yıllandırılmış Negroni",
            nameEn: "Aged Negroni",
            price: "375₺",
            description: "Fıçıda yıllandırılmış Cin, tatlı vermut, Campari, kurutulmuş portakal dilimi. Meşe fıçıda 30 gün yıllandırılmış.",
            image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965&auto=format&fit=crop",
            icon: "glass-water",
            badge: "Klasik",
            isNew: false,
            isSignature: false,
            isPopular: false
        },
        {
            id: 5,
            category: "beers",
            name: "Demir Stout",
            nameEn: "Iron Stout",
            price: "250₺",
            description: "Ağır kavrulmuş kahve notaları, bitter çikolata ve kremalı nitro dökümü ile imperial stout.",
            image: "https://images.unsplash.com/photo-1626252998634-142f146a49df?q=80&w=1974&auto=format&fit=crop",
            icon: "anchor",
            badge: "Zengin & Kremalı",
            isNew: false,
            isSignature: false,
            isPopular: false
        },
        {
            id: 6,
            category: "signatures",
            name: "Kehribar Ekşi",
            nameEn: "Amber Sour",
            price: "350₺",
            description: "Premium Amaretto, taze limon suyu, basit şurup, yumurta akı köpüğü ve bir tutam aromatik acı.",
            image: "https://images.unsplash.com/photo-1616261545802-181155985012?q=80&w=1974&auto=format&fit=crop",
            icon: "zap",
            badge: "Ekşi & Ferahlatıcı",
            isNew: false,
            isSignature: true,
            isPopular: false
        },
        {
            id: 7,
            category: "wine",
            name: "Şarap Seçkisi",
            nameEn: "Wine Selection",
            price: "300₺",
            description: "Özenle seçilmiş yerli ve yabancı şaraplardan oluşan koleksiyonumuz. Kırmızı, beyaz ve rosé çeşitleri mevcuttur.",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
            icon: "wine",
            badge: "Özel Seçim",
            isNew: false,
            isSignature: false,
            isPopular: false
        },
        {
            id: 8,
            category: "spirits",
            name: "Viski Koleksiyonu",
            nameEn: "Whiskey Collection",
            price: "500₺",
            description: "Single malt, bourbon ve blended viski çeşitlerimiz. Yaşlandırma ve damıtım notları ile özel sunum.",
            image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=2070&auto=format&fit=crop",
            icon: "sparkles",
            badge: "Premium",
            isNew: false,
            isSignature: false,
            isPopular: true
        }
    ],

    // ============================================
    // MEYHANE ZONE - MEZELER & YEMEKLER
    // ============================================
    meyhane: [
        {
            id: 101,
            category: "cold",
            name: "Humus",
            nameEn: "Hummus",
            price: "180₺",
            description: "Nohut püresi, tahin, zeytinyağı, limon suyu ve sarımsak. Geleneksel tarif ile hazırlanmış.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "leaf",
            badge: "Vejetaryen",
            isNew: false,
            isSignature: false,
            isPopular: true
        },
        {
            id: 102,
            category: "cold",
            name: "Haydari",
            nameEn: "Haydari",
            price: "160₺",
            description: "Yoğurt, sarımsak, dereotu ve zeytinyağı. Ferahlatıcı ve lezzetli bir başlangıç.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "leaf",
            badge: "Vejetaryen",
            isNew: false,
            isSignature: false,
            isPopular: false
        },
        {
            id: 103,
            category: "hot",
            name: "İçli Köfte",
            nameEn: "Stuffed Meatballs",
            price: "280₺",
            description: "Bulgur kabuğu içinde kıyma, soğan ve baharat karışımı. Geleneksel el yapımı.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "flame",
            badge: "Sıcak",
            isNew: false,
            isSignature: true,
            isPopular: true
        },
        {
            id: 104,
            category: "hot",
            name: "Yaprak Sarma",
            nameEn: "Stuffed Grape Leaves",
            price: "240₺",
            description: "Asma yaprağında pirinç ve baharat. Zeytinyağlı ve geleneksel tarif.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "leaf",
            badge: "Vejetaryen",
            isNew: false,
            isSignature: false,
            isPopular: false
        },
        {
            id: 105,
            category: "raki",
            name: "Tekirdağ Rakısı",
            nameEn: "Tekirdağ Raki",
            price: "450₺",
            description: "Klasik Türk rakısı, %45 alkol. Buz ve su ile servis edilir. Geleneksel meyhane deneyimi.",
            image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=2070&auto=format&fit=crop",
            icon: "wine",
            badge: "Klasik",
            isNew: false,
            isSignature: true,
            isPopular: true
        },
        {
            id: 106,
            category: "main",
            name: "Adana Kebabı",
            nameEn: "Adana Kebab",
            price: "380₺",
            description: "Acılı kıyma kebabı, közlenmiş domates ve biber ile. Geleneksel Adana usulü.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "flame",
            badge: "Acılı",
            isNew: false,
            isSignature: false,
            isPopular: true
        },
        {
            id: 107,
            category: "cold",
            name: "Acılı Ezme",
            nameEn: "Spicy Tomato Dip",
            price: "150₺",
            description: "Domates, biber, soğan ve nar ekşisi ile hazırlanmış geleneksel meze. Taze ve acılı.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "flame",
            badge: "Acılı",
            isNew: true,
            isSignature: false,
            isPopular: false
        },
        {
            id: 108,
            category: "main",
            name: "Levrek Izgara",
            nameEn: "Grilled Sea Bass",
            price: "420₺",
            description: "Taze levrek balığı, ızgara sebzeler ve özel soslar eşliğinde. Denizin taze lezzetleri.",
            image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1974&auto=format&fit=crop",
            icon: "fish",
            badge: "Balık",
            isNew: true,
            isSignature: true,
            isPopular: true
        }
    ]
};

/**
 * Kategori Bilgileri
 * UI'da tab isimleri ve filtreleme için kullanılır
 */
export const categoryInfo = {
    bar: {
        all: { name: "Tüm İçkiler", nameEn: "All Drinks" },
        signatures: { name: "İmza İçkiler", nameEn: "Signature Cocktails" },
        beers: { name: "El Yapımı Biralar", nameEn: "Craft Beers" },
        spirits: { name: "Alkollü İçkiler", nameEn: "Spirits" },
        wine: { name: "Şarap Listesi", nameEn: "Wine List" }
    },
    meyhane: {
        all: { name: "Tümü", nameEn: "All" },
        cold: { name: "Soğuk Mezeler", nameEn: "Cold Appetizers" },
        hot: { name: "Ara Sıcaklar", nameEn: "Hot Appetizers" },
        main: { name: "Ana Yemekler", nameEn: "Main Courses" },
        raki: { name: "Rakı Çeşitleri", nameEn: "Raki Selection" }
    }
};

/**
 * Yardımcı Fonksiyonlar
 */

// Kategoriye göre ürünleri filtrele
export function getItemsByCategory(zone, category) {
    if (category === 'all') {
        return menuData[zone];
    }
    return menuData[zone].filter(item => item.category === category);
}

// ID'ye göre ürün bul
export function getItemById(zone, id) {
    return menuData[zone].find(item => item.id === id);
}

// Popüler ürünleri getir
export function getPopularItems(zone) {
    return menuData[zone].filter(item => item.isPopular);
}

// Yeni ürünleri getir
export function getNewItems(zone) {
    return menuData[zone].filter(item => item.isNew);
}

// İmza ürünleri getir
export function getSignatureItems(zone) {
    return menuData[zone].filter(item => item.isSignature);
}

