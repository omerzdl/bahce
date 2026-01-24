// ============================================
// BAHÇE BAR & MEYHANE - MAIN JAVASCRIPT
// Google Sheets Integration + Mobile First
// ============================================

import { MenuManager } from './managers/menuManager.js';

// ============================================
// 1. GLOBAL STATE
// ============================================

let currentZone = null;
let isDesktop = window.innerWidth >= 768;
let menuManager = null;

// ============================================
// 2. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
    // Initialize Lucide icons
    initializeIcons();
    
    // Initialize Menu Manager
    menuManager = new MenuManager();
    
    // Load menu data from Google Sheets
    showLoadingOverlay();
    const success = await menuManager.loadAllMenus();
    hideLoadingOverlay();
    
    if (!success) {
        showError('Menü verileri yüklenemedi. Lütfen sayfayı yenileyin.');
        return;
    }
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const zoneParam = urlParams.get('zone');
    
    if (zoneParam === 'bar' || zoneParam === 'meyhane') {
        showZone(zoneParam);
    } else {
        showGateway();
    }
    
    // Setup all interactions
    setupGateway();
    setupZoneSwitching();
    setupMenuDropdowns();
    setupSmoothScroll();
    
    // Handle window resize
    handleResponsive();
    window.addEventListener('resize', debounce(handleResponsive, 250));
});

// ============================================
// 3. LOADING & ERROR STATES
// ============================================

function showLoadingOverlay() {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'fixed inset-0 z-[200] flex items-center justify-center';
        overlay.innerHTML = `
            <div class="text-center">
                <div class="w-12 h-12 border-4 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-white text-sm font-light tracking-wider">Yükleniyor...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    overlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-[300]';
    errorDiv.innerHTML = `
        <p class="font-semibold">${message}</p>
        <button onclick="this.parentElement.remove()" class="mt-2 text-sm underline">Kapat</button>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

// ============================================
// 4. ICON INITIALIZATION
// ============================================

function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({
            attrs: {
                class: "",
                'stroke-width': 1.5,
                'stroke': 'currentColor'
            }
        });
    }
}

// ============================================
// 5. THEME SWITCHER - HOTFIX
// ============================================

function setTheme(zone) {
    const body = document.body;
    
    // Remove all theme classes
    body.removeAttribute('data-theme');
    body.classList.remove('zone-bar', 'zone-meyhane');
    
    if (zone === 'bar') {
        body.setAttribute('data-theme', 'light');
        body.classList.add('zone-bar');
        console.log('✅ Theme set to LIGHT (Bar)');
    } else if (zone === 'meyhane') {
        body.setAttribute('data-theme', 'dark');
        body.classList.add('zone-meyhane');
        console.log('✅ Theme set to DARK (Meyhane)');
    } else {
        // Gateway - default dark
        body.setAttribute('data-theme', 'dark');
        console.log('✅ Theme set to DARK (Gateway)');
    }
}

// ============================================
// 6. GATEWAY FUNCTIONS
// ============================================

function showGateway() {
    const gateway = document.getElementById('gateway-overlay');
    const zoneBar = document.getElementById('zone-bar');
    const zoneMeyhane = document.getElementById('zone-meyhane');
    
    if (gateway) gateway.classList.remove('hidden');
    if (zoneBar) zoneBar.classList.add('hidden');
    if (zoneMeyhane) zoneMeyhane.classList.add('hidden');
    
    currentZone = null;
    setTheme(null); // Set to default dark
}

function showZone(zone) {
    const gateway = document.getElementById('gateway-overlay');
    const zoneBar = document.getElementById('zone-bar');
    const zoneMeyhane = document.getElementById('zone-meyhane');
    
    if (gateway) gateway.classList.add('hidden');
    
    if (zone === 'bar') {
        if (zoneBar) zoneBar.classList.remove('hidden');
        if (zoneMeyhane) zoneMeyhane.classList.add('hidden');
        document.body.classList.add('zone-bar');
        document.body.classList.remove('zone-meyhane');
        currentZone = 'bar';
        setTheme('bar');
        
        // Render menu
        renderZoneMenu('bar');
    } else if (zone === 'meyhane') {
        if (zoneBar) zoneBar.classList.add('hidden');
        if (zoneMeyhane) zoneMeyhane.classList.remove('hidden');
        document.body.classList.add('zone-meyhane');
        document.body.classList.remove('zone-bar');
        currentZone = 'meyhane';
        setTheme('meyhane');
        
        // Render menu
        renderZoneMenu('meyhane');
    }
    
    // Update URL
    const newUrl = window.location.pathname + '?zone=' + zone;
    window.history.pushState({ zone: zone }, '', newUrl);
    
    // Reinitialize icons
    setTimeout(() => initializeIcons(), 100);
}

function renderZoneMenu(zone) {
    if (!menuManager) return;
    
    // Render tabs
    const tabContainerId = zone === 'bar' ? 'bar-tabs' : 'meyhane-tabs';
    menuManager.renderTabs(zone, tabContainerId);
    
    // Get first category (not "Tümü")
    const categories = menuManager.getCategories(zone);
    const firstCategory = categories.find(cat => cat !== 'Tümü') || categories[0];
    
    // Render menu with first category
    const gridId = zone === 'bar' ? 'bar-menu-grid' : 'meyhane-menu-grid';
    menuManager.renderMenu(zone, gridId, firstCategory);
    
    // Update section title
    updateSectionTitle(zone, firstCategory);
    
    // Setup tab click handlers
    setupTabHandlers(zone);
}

function updateSectionTitle(zone, category) {
    const titleId = zone === 'bar' ? 'bar-section-title' : 'meyhane-section-title';
    const titleElement = document.getElementById(titleId);
    
    if (titleElement && category && category !== 'Tümü') {
        titleElement.textContent = category;
    }
}

function setupTabHandlers(zone) {
    const tabContainerId = zone === 'bar' ? 'bar-tabs' : 'meyhane-tabs';
    const gridId = zone === 'bar' ? 'bar-menu-grid' : 'meyhane-menu-grid';
    const tabContainer = document.getElementById(tabContainerId);
    
    if (!tabContainer) return;
    
    const tabs = tabContainer.querySelectorAll('button[data-category]');
    const glider = tabContainer.querySelector('.glider');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            
            this.classList.add('active');
            
            // Move glider
            if (glider) {
                const tabWidth = 100 / tabs.length;
                glider.style.width = `${tabWidth}%`;
                glider.style.transform = `translateX(${index * 100}%)`;
            }
            
            // Update section title
            updateSectionTitle(zone, category);
            
            // Render filtered menu
            menuManager.renderMenu(zone, gridId, category);
        });
    });
}

function setupGateway() {
    const gatewayBar = document.getElementById('gateway-bar');
    const gatewayMeyhane = document.getElementById('gateway-meyhane');
    const gatewayOverlay = document.getElementById('gateway-overlay');
    
    if (!gatewayBar || !gatewayMeyhane) return;
    
    // Desktop: Hover effects
    if (isDesktop) {
        gatewayBar.addEventListener('mouseenter', function() {
            gatewayBar.style.width = '60%';
            gatewayMeyhane.style.width = '40%';
        });
        
        gatewayMeyhane.addEventListener('mouseenter', function() {
            gatewayMeyhane.style.width = '60%';
            gatewayBar.style.width = '40%';
        });
        
        if (gatewayOverlay) {
            gatewayOverlay.addEventListener('mouseleave', function() {
                gatewayBar.style.width = '50%';
                gatewayMeyhane.style.width = '50%';
            });
        }
    }
    
    // Click handlers
    gatewayBar.addEventListener('click', function() {
        showZone('bar');
    });
    
    gatewayMeyhane.addEventListener('click', function() {
        showZone('meyhane');
    });
}

// ============================================
// 7. ZONE SWITCHING
// ============================================

function setupZoneSwitching() {
    const switchToMeyhane = document.getElementById('switch-to-meyhane');
    const switchToBar = document.getElementById('switch-to-bar');
    
    if (switchToMeyhane) {
        switchToMeyhane.addEventListener('click', function(e) {
            e.preventDefault();
            showZone('meyhane');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (switchToBar) {
        switchToBar.addEventListener('click', function(e) {
            e.preventDefault();
            showZone('bar');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// 8. MENU DROPDOWNS
// ============================================

function setupMenuDropdowns() {
    setupBarMenuDropdown();
    setupMeyhaneMenuDropdown();
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const barToggle = document.getElementById('bar-menu-toggle');
        const barDropdown = document.getElementById('bar-menu-dropdown');
        const meyhaneToggle = document.getElementById('meyhane-menu-toggle');
        const meyhaneDropdown = document.getElementById('meyhane-menu-dropdown');
        
        if (barToggle && barDropdown && !barToggle.contains(e.target) && !barDropdown.contains(e.target)) {
            barDropdown.classList.add('hidden');
            barToggle.classList.remove('menu-open');
        }
        
        if (meyhaneToggle && meyhaneDropdown && !meyhaneToggle.contains(e.target) && !meyhaneDropdown.contains(e.target)) {
            meyhaneDropdown.classList.add('hidden');
            meyhaneToggle.classList.remove('menu-open');
        }
    });
}

function setupBarMenuDropdown() {
    const toggle = document.getElementById('bar-menu-toggle');
    const dropdown = document.getElementById('bar-menu-dropdown');
    
    if (!toggle || !dropdown) return;
    
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
        
        // Toggle turuncu efekt
        if (dropdown.classList.contains('hidden')) {
            toggle.classList.remove('menu-open');
        } else {
            toggle.classList.add('menu-open');
        }
        
        // Populate dropdown if empty
        if (dropdown.querySelector('.py-2').children.length === 0) {
            populateDropdown('bar', dropdown);
        }
    });
}

function setupMeyhaneMenuDropdown() {
    const toggle = document.getElementById('meyhane-menu-toggle');
    const dropdown = document.getElementById('meyhane-menu-dropdown');
    
    if (!toggle || !dropdown) return;
    
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
        
        // Toggle turuncu efekt
        if (dropdown.classList.contains('hidden')) {
            toggle.classList.remove('menu-open');
        } else {
            toggle.classList.add('menu-open');
        }
        
        // Populate dropdown if empty
        if (dropdown.querySelector('.py-2').children.length === 0) {
            populateDropdown('meyhane', dropdown);
        }
    });
}

function populateDropdown(zone, dropdown) {
    if (!menuManager) return;
    
    const categories = menuManager.getCategories(zone);
    const container = dropdown.querySelector('.py-2');
    
    container.innerHTML = '';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'dropdown-menu-item';
        button.textContent = category;
        button.addEventListener('click', function() {
            // Scroll to menu section
            const menuSection = zone === 'bar' ? document.getElementById('menu') : document.getElementById('menu-meyhane');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Select the tab
            setTimeout(() => {
                const tabContainer = document.getElementById(zone === 'bar' ? 'bar-tabs' : 'meyhane-tabs');
                if (tabContainer) {
                    const tabs = tabContainer.querySelectorAll('button[data-category]');
                    tabs.forEach((tab, index) => {
                        if (tab.getAttribute('data-category') === category) {
                            tab.click();
                        }
                    });
                }
            }, 500);
            
            // Close dropdown and remove turuncu efekt
            dropdown.classList.add('hidden');
            const toggle = document.getElementById(zone === 'bar' ? 'bar-menu-toggle' : 'meyhane-menu-toggle');
            if (toggle) {
                toggle.classList.remove('menu-open');
            }
        });
        
        container.appendChild(button);
    });
}

// ============================================
// 9. SMOOTH SCROLL
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = isDesktop ? 80 : 64;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 10. RESPONSIVE HANDLER
// ============================================

function handleResponsive() {
    const newIsDesktop = window.innerWidth >= 768;
    
    if (newIsDesktop !== isDesktop) {
        isDesktop = newIsDesktop;
        
        if (!currentZone) {
            const gatewayBar = document.getElementById('gateway-bar');
            const gatewayMeyhane = document.getElementById('gateway-meyhane');
            
            if (gatewayBar && gatewayMeyhane) {
                if (isDesktop) {
                    gatewayBar.style.width = '50%';
                    gatewayMeyhane.style.width = '50%';
                    gatewayBar.style.height = '100%';
                    gatewayMeyhane.style.height = '100%';
                } else {
                    gatewayBar.style.width = '100%';
                    gatewayMeyhane.style.width = '100%';
                    gatewayBar.style.height = '50vh';
                    gatewayMeyhane.style.height = '50vh';
                }
            }
        }
    }
}

// ============================================
// 11. BROWSER NAVIGATION
// ============================================

window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const zoneParam = urlParams.get('zone');
    
    if (zoneParam === 'bar' || zoneParam === 'meyhane') {
        showZone(zoneParam);
    } else {
        showGateway();
    }
});

// ============================================
// 12. UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
