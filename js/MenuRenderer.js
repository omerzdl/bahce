// ============================================
// BAHÇE BAR & MEYHANE - MENU RENDERER
// Dinamik Menü Rendering Sistemi
// ============================================

import { menuData, getItemsByCategory } from './data/menuData.js';

/**
 * MenuRenderer Class
 * - Menü verilerini HTML'e dönüştürür
 * - Filtreleme ve dinamik güncelleme sağlar
 */
export class MenuRenderer {
    constructor(containerId, zone) {
        this.container = document.getElementById(containerId);
        this.zone = zone; // 'bar' veya 'meyhane'
        this.currentCategory = 'all';
        
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }
    }

    /**
     * Menüyü render et
     * @param {string} category - Filtrelenecek kategori ('all', 'signatures', vb.)
     */
    render(category = 'all') {
        this.currentCategory = category;
        const items = getItemsByCategory(this.zone, category);
        
        // Container'ı temizle
        this.container.innerHTML = '';
        
        // Eğer ürün yoksa bilgi mesajı göster
        if (items.length === 0) {
            this.container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-stone-400 text-lg">Bu kategoride ürün bulunmamaktadır.</p>
                </div>
            `;
            return;
        }
        
        // Her ürün için kart oluştur
        items.forEach(item => {
            const card = this.createCard(item);
            this.container.appendChild(card);
        });
        
        // İkonları yeniden başlat
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /**
     * Ürün kartı oluştur
     * @param {Object} item - Ürün verisi
     * @returns {HTMLElement} - Kart elementi
     */
    createCard(item) {
        const card = document.createElement('div');
        card.className = 'group glass-panel hover:border-accent/30 transition-all duration-500';
        card.setAttribute('data-menu-item', item.category);
        card.setAttribute('data-item-id', item.id);
        
        // Yeni ürün badge'i
        const newBadge = item.isNew ? `
            <span class="absolute top-3 left-3 md:top-4 md:left-4 bg-accent text-white px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                YENİ
            </span>
        ` : '';
        
        card.innerHTML = `
            <div class="relative h-48 md:h-64 overflow-hidden">
                <img 
                    src="${item.image}" 
                    alt="${item.name}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-[#141210] to-transparent"></div>
                ${newBadge}
                <span class="absolute top-3 right-3 md:top-4 md:right-4 bg-black/80 backdrop-blur text-accent border border-accent/20 px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold font-mono">
                    ${item.price}
                </span>
            </div>
            <div class="p-4 md:p-6 pt-2">
                <h3 class="font-serif text-fluid-xl md:text-fluid-2xl text-white mb-2 md:mb-3">
                    ${item.name}
                </h3>
                <p class="text-stone-400 text-fluid-sm leading-relaxed mb-4 md:mb-6 font-light">
                    ${item.description}
                </p>
                <div class="flex items-center gap-2 text-[10px] tracking-widest uppercase text-stone-500">
                    <i data-lucide="${item.icon}" class="w-3.5 h-3.5"></i>
                    ${item.badge}
                </div>
            </div>
        `;
        
        return card;
    }

    /**
     * Kategori değiştir ve yeniden render et
     * @param {string} category - Yeni kategori
     */
    filterByCategory(category) {
        this.render(category);
        
        // Fade-in animasyonu ekle
        const cards = this.container.querySelectorAll('[data-menu-item]');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease-in';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50); // Staggered animation
        });
    }

    /**
     * Tüm menüyü yenile
     */
    refresh() {
        this.render(this.currentCategory);
    }
}

/**
 * Global render fonksiyonu
 * main.js'den kolayca çağrılabilir
 */
export function renderMenu(zone, containerId, category = 'all') {
    const renderer = new MenuRenderer(containerId, zone);
    renderer.render(category);
    return renderer;
}

