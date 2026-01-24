// ============================================
// BAHÇE BAR & MEYHANE - MENU MANAGER
// Google Sheets Integration (No-Code CMS)
// ============================================

/**
 * Google Sheets CSV URLs
 * Müşteri bu sheet'leri düzenleyerek menüyü güncelleyebilir
 */
const SHEET_URLS = {
    bar: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhUhuUUb_LW8ee9nG_A7sZ2AUxWhmZgrqhyA85DKjnkqYLK1Sbt6d-E6bBkV05hFvsnKm_ZwP6_kSu/pub?gid=0&single=true&output=csv",
    meyhane: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhUhuUUb_LW8ee9nG_A7sZ2AUxWhmZgrqhyA85DKjnkqYLK1Sbt6d-E6bBkV05hFvsnKm_ZwP6_kSu/pub?gid=1254032013&single=true&output=csv"
};

/**
 * MenuManager Class
 * Google Sheets'ten veri çeker ve dinamik olarak render eder
 */
export class MenuManager {
    constructor() {
        this.data = {
            bar: [],
            meyhane: []
        };
        this.categories = {
            bar: new Set(),
            meyhane: new Set()
        };
        this.isLoading = false;
    }

    /**
     * Tüm menü verilerini yükle
     */
    async loadAllMenus() {
        this.isLoading = true;
        
        try {
            const [barData, meyhaneData] = await Promise.all([
                this.fetchMenuData('bar'),
                this.fetchMenuData('meyhane')
            ]);
            
            this.data.bar = barData;
            this.data.meyhane = meyhaneData;
            
            // Kategorileri çıkar
            this.extractCategories('bar');
            this.extractCategories('meyhane');
            
            this.isLoading = false;
            return true;
        } catch (error) {
            console.error('Menü verileri yüklenirken hata:', error);
            this.isLoading = false;
            return false;
        }
    }

    /**
     * Google Sheets'ten CSV verisini çek ve parse et
     */
    async fetchMenuData(zone) {
        const url = SHEET_URLS[zone];
        
        return new Promise((resolve, reject) => {
            Papa.parse(url, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const processedData = this.processSheetData(results.data, zone);
                    resolve(processedData);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    /**
     * Sheet verisini işle ve normalize et
     */
    processSheetData(data, zone) {
        return data.map((row, index) => {
            // Görsel path'ini işle
            const imagePath = this.processImagePath(row.Gorsel, zone);
            
            return {
                id: row.ID || `${zone}-${index + 1}`,
                name: row.Isim || row.Ad || 'İsimsiz Ürün',
                category: row.Kategori || 'Diğer',
                price: row.Fiyat || '0₺',
                description: row.Aciklama || row.Tanim || '',
                image: imagePath,
                badge: row.Etiket || row.Badge || '',
                icon: row.Icon || 'sparkles',
                isNew: this.parseBoolean(row.Yeni),
                isPopular: this.parseBoolean(row.Populer),
                isSignature: this.parseBoolean(row.Imza)
            };
        });
    }

    /**
     * Görsel path'ini işle
     * - HTTP ile başlıyorsa olduğu gibi kullan
     * - Dosya adıysa local path'e dönüştür
     */
    processImagePath(imageValue, zone) {
        if (!imageValue) {
            return '/public/images/products/placeholder.svg';
        }
        
        // HTTP/HTTPS ile başlıyorsa external URL
        if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
            return imageValue;
        }
        
        // Dosya adıysa local path oluştur
        return `/public/images/products/${zone}/${imageValue}`;
    }

    /**
     * Boolean değerleri parse et
     */
    parseBoolean(value) {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            const lower = value.toLowerCase().trim();
            return lower === 'true' || lower === '1' || lower === 'evet' || lower === 'yes';
        }
        return false;
    }

    /**
     * Kategorileri çıkar
     */
    extractCategories(zone) {
        this.categories[zone] = new Set();
        this.data[zone].forEach(item => {
            this.categories[zone].add(item.category);
        });
    }

    /**
     * Kategoriye göre ürünleri filtrele
     */
    getItemsByCategory(zone, category) {
        if (!category || category === 'all' || category === 'Tümü') {
            return this.data[zone];
        }
        return this.data[zone].filter(item => item.category === category);
    }

    /**
     * Tüm kategorileri getir (Tümü olmadan)
     */
    getCategories(zone) {
        return Array.from(this.categories[zone]);
    }

    /**
     * Menüyü render et
     */
    renderMenu(zone, containerId, category = 'Tümü') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container bulunamadı: ${containerId}`);
            return;
        }

        const items = this.getItemsByCategory(zone, category);
        
        // Container'ı temizle
        container.innerHTML = '';

        // Loading state
        if (this.isLoading) {
            container.innerHTML = `
                <div class="col-span-full flex items-center justify-center py-20">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                        <p class="text-stone-400">Menü yükleniyor...</p>
                    </div>
                </div>
            `;
            return;
        }

        // Ürün yoksa
        if (items.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-stone-400 text-lg">Bu kategoride ürün bulunmamaktadır.</p>
                </div>
            `;
            return;
        }

        // Ürünleri render et
        items.forEach((item, index) => {
            const card = this.createCard(item, index);
            container.appendChild(card);
        });

        // İkonları yeniden başlat
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /**
     * Ürün kartı oluştur
     */
    createCard(item, index) {
        const card = document.createElement('div');
        card.className = 'group glass-panel hover:border-accent/30 transition-all duration-500';
        card.setAttribute('data-category', item.category);
        card.setAttribute('data-item-id', item.id);
        
        // Fade-in animasyonu için stil
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Sol üst badge'i - öncelik sırasına göre
        let leftBadge = '';
        if (item.isSignature) {
            leftBadge = `
                <span class="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-accent border border-accent/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider z-10">
                    ŞEFİN SEÇİMİ
                </span>
            `;
        } else if (item.isNew) {
            leftBadge = `
                <span class="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-accent border border-accent/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider z-10">
                    YENİ
                </span>
            `;
        } else if (item.badge) {
            leftBadge = `
                <span class="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-accent border border-accent/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider z-10">
                    ${item.badge.toUpperCase()}
                </span>
            `;
        }
        
        // Fiyat badge'i - sağ üstte
        const priceBadge = `
            <span class="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-accent border border-accent/20 px-2 py-1 rounded-md text-xs font-bold z-10">
                ${item.price}
            </span>
        `;
        
        card.innerHTML = `
            <div class="relative h-48 md:h-64 overflow-hidden">
                <img 
                    src="${item.image}" 
                    alt="${item.name}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onerror="this.src='/public/images/products/placeholder.svg'"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-[#141210] to-transparent"></div>
                ${leftBadge}
                ${priceBadge}
            </div>
            <div class="p-4 md:p-6">
                <h3 class="font-serif text-xl md:text-2xl font-bold text-white mb-2">
                    ${item.name}
                </h3>
                <p class="text-stone-400 text-sm md:text-base leading-relaxed">
                    ${item.description}
                </p>
            </div>
        `;
        
        // Staggered fade-in animasyonu
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease-in';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
        
        return card;
    }

    /**
     * Tab sistemini oluştur
     */
    renderTabs(zone, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Tab container bulunamadı: ${containerId}`);
            return;
        }

        const categories = this.getCategories(zone);
        container.innerHTML = '';

        categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = index === 0 ? 'active' : '';
            button.setAttribute('data-category', category);
            button.textContent = category;

            container.appendChild(button);
        });
        
        // Initialize glider position
        const glider = container.querySelector('.glider');
        if (glider && categories.length > 0) {
            const tabWidth = 100 / categories.length;
            glider.style.width = `${tabWidth}%`;
            glider.style.transform = 'translateX(0%)';
        }
    }
}

// Global instance oluştur
window.menuManager = new MenuManager();

