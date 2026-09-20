// Manejo del menú móvil (Hamburguesa)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil automáticamente al hacer clic en un enlace
document.querySelectorAll('.nav-link, .btn-cta-nav').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Función para cambiar de vista (Páginas virtuales)
function switchPage(pageId) {
    // Ocultar todas las secciones de página
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remover clase activa de los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Activar la página y enlace correspondiente
    if (pageId === 'home') {
        document.getElementById('page-home').classList.add('active');
        document.querySelector('a[onclick*="home"]').classList.add('active');
    } else if (pageId === 'new-designs') {
        document.getElementById('page-new-designs').classList.add('active');
        document.querySelector('a[onclick*="new-designs"]').classList.add('active');
    }

    // Scroll automático suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lógica de Filtros Optimizada para no usar setTimeouts inestables
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-filter');
        
        // Actualizar visualización del botón activo
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filtrar elementos
        const items = document.querySelectorAll('.design-item');
        items.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => item.style.display = 'flex', 50); // Mantiene el layout en grid
            } else {
                if (item.classList.contains(category)) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.style.display = 'flex', 50);
                } else {
                    item.classList.add('hidden');
                    // Retraso de 400ms emparejado con CSS antes de quitar el display
                    setTimeout(() => {
                        if(item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 400);
                }
            }
        });
    });
});

// Escuchar cambios en la URL (Hash) al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#new-designs') {
        switchPage('new-designs');
    } else {
        switchPage('home');
    }
});
