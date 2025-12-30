// Zone Management
let currentZone = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({
            attrs: {
                class: "",
                'stroke-width': 1.5,
                'stroke': 'currentColor'
            }
        });
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const zoneParam = urlParams.get('zone');

    if (zoneParam === 'bar' || zoneParam === 'meyhane') {
        showZone(zoneParam);
    } else {
        showGateway();
    }

    // Setup gateway interactions
    setupGateway();
    
    // Setup zone switching
    setupZoneSwitching();
    
    // Setup menu filtering for both zones
    setupMenuFiltering();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
});

// Gateway Functions
function showGateway() {
    const gateway = document.getElementById('gateway-overlay');
    const zoneBar = document.getElementById('zone-bar');
    const zoneMeyhane = document.getElementById('zone-meyhane');
    
    if (gateway) gateway.classList.remove('hidden');
    if (zoneBar) zoneBar.classList.add('hidden');
    if (zoneMeyhane) zoneMeyhane.classList.add('hidden');
    
    currentZone = null;
    document.body.classList.remove('zone-bar', 'zone-meyhane');
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
    } else if (zone === 'meyhane') {
        if (zoneBar) zoneBar.classList.add('hidden');
        if (zoneMeyhane) zoneMeyhane.classList.remove('hidden');
        document.body.classList.add('zone-meyhane');
        document.body.classList.remove('zone-bar');
        currentZone = 'meyhane';
    }
    
    // Update URL without reload
    const newUrl = window.location.pathname + '?zone=' + zone;
    window.history.pushState({ zone: zone }, '', newUrl);
    
    // Reinitialize icons for new content
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
}

function setupGateway() {
    const gatewayBar = document.getElementById('gateway-bar');
    const gatewayMeyhane = document.getElementById('gateway-meyhane');
    
    if (!gatewayBar || !gatewayMeyhane) return;
    
    // Hover effects - expand on hover
    gatewayBar.addEventListener('mouseenter', function() {
        gatewayBar.style.width = '60%';
        gatewayMeyhane.style.width = '40%';
    });
    
    gatewayMeyhane.addEventListener('mouseenter', function() {
        gatewayMeyhane.style.width = '60%';
        gatewayBar.style.width = '40%';
    });
    
    const gatewayOverlay = document.getElementById('gateway-overlay');
    gatewayOverlay.addEventListener('mouseleave', function() {
        gatewayBar.style.width = '50%';
        gatewayMeyhane.style.width = '50%';
    });
    
    // Click handlers
    gatewayBar.addEventListener('click', function() {
        showZone('bar');
    });
    
    gatewayMeyhane.addEventListener('click', function() {
        showZone('meyhane');
    });
}

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

// Menu Filtering Functions
function setupMenuFiltering() {
    // Bar menu filtering
    const barMenuTabs = document.querySelectorAll('[data-menu-tab]');
    const barMenuItems = document.querySelectorAll('[data-menu-item]');
    
    barMenuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-menu-tab');
            
            // Update active tab
            barMenuTabs.forEach(t => {
                t.classList.remove('text-white');
                t.classList.add('text-stone-500');
                const indicator = t.querySelector('span');
                if (indicator && indicator.classList.contains('absolute')) {
                    indicator.remove();
                }
            });
            
            this.classList.remove('text-stone-500');
            this.classList.add('text-white');
            
            // Add active indicator
            const indicator = document.createElement('span');
            indicator.className = 'absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange';
            this.appendChild(indicator);
            
            // Filter menu items
            barMenuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-menu-item');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Meyhane menu filtering
    const meyhaneMenuTabs = document.querySelectorAll('[data-menu-tab-meyhane]');
    const meyhaneMenuItems = document.querySelectorAll('[data-menu-item-meyhane]');
    
    meyhaneMenuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-menu-tab-meyhane');
            
            // Update active tab
            meyhaneMenuTabs.forEach(t => {
                t.classList.remove('text-white');
                t.classList.add('text-stone-500');
                const indicator = t.querySelector('span');
                if (indicator && indicator.classList.contains('absolute')) {
                    indicator.remove();
                }
            });
            
            this.classList.remove('text-stone-500');
            this.classList.add('text-white');
            
            // Add active indicator
            const indicator = document.createElement('span');
            indicator.className = 'absolute bottom-0 left-0 w-full h-[2px] bg-brand-teal';
            this.appendChild(indicator);
            
            // Filter menu items
            meyhaneMenuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-menu-item-meyhane');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    let lastScroll = 0;
    const navbars = document.querySelectorAll('nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        navbars.forEach(navbar => {
            if (currentScroll > 100) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
        
        lastScroll = currentScroll;
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const zoneParam = urlParams.get('zone');
    
    if (zoneParam === 'bar' || zoneParam === 'meyhane') {
        showZone(zoneParam);
    } else {
        showGateway();
    }
});
