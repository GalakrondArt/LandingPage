// Elementos del Menú
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.getElementById('menu-overlay');

// Abrir y cerrar el cajón lateral y el overlay oscuro al presionar la hamburguesa
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    if(menuOverlay.classList.contains('active')) {
        menuOverlay.classList.remove('active');
        setTimeout(() => { menuOverlay.style.display = 'none'; }, 400);
    } else {
        menuOverlay.style.display = 'block';
        setTimeout(() => { menuOverlay.classList.add('active'); }, 10);
    }
});

// Función para cerrar el menú lateral al hacer clic en un enlace o en el fondo oscuro
function closeMobileMenu() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        setTimeout(() => { menuOverlay.style.display = 'none'; }, 400);
    }
}

// Función principal de navegación entre las pestañas actualizadas
function switchPage(pageId) {
    // 1. Cerrar el menú móvil automáticamente
    closeMobileMenu();

    // 2. Ocultar todas las secciones de página
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 3. Remover clase activa de los enlaces de navegación superior
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 4. Activar la página seleccionada y resaltar el enlace en el menú
    if (pageId === 'home') {
        document.getElementById('page-home').classList.add('active');
        document.querySelector('a[onclick*="home"]').classList.add('active');
    } else if (pageId === 'new-designs') {
        document.getElementById('page-new-designs').classList.add('active');
        document.querySelector('a[onclick*="new-designs"]').classList.add('active');
    } else if (pageId === 'que-hacemos') {
        document.getElementById('page-que-hacemos').classList.add('active');
        document.querySelector('a[onclick*="que-hacemos"]').classList.add('active');
    } else if (pageId === 'quienes-somos') {
        document.getElementById('page-quienes-somos').classList.add('active');
        document.querySelector('a[onclick*="quienes-somos"]').classList.add('active');
    }

    // 5. Scroll suave automático hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para filtrar las ilustraciones
function filterDesigns(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const items = document.querySelectorAll('.design-item');
    items.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
            item.style.display = 'flex';
        } else {
            if (item.classList.contains(category)) {
                item.classList.remove('hidden');
                item.style.display = 'flex';
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if(item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 400); 
            }
        }
    });
}

// Escuchar cambios en la URL (Hash) para navegación directa
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#new-designs') {
        switchPage('new-designs');
    } else if (window.location.hash === '#que-hacemos') {
        switchPage('que-hacemos');
    } else if (window.location.hash === '#quienes-somos') {
        switchPage('quienes-somos');
    } else {
        switchPage('home');
    }
});
