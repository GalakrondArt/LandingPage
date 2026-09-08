// Función para cambiar de vista (Páginas virtuales dentro del mismo documento HTML)
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

    // Activar la página correspondiente
    if (pageId === 'home') {
        document.getElementById('page-home').classList.add('active');
        document.querySelector('a[onclick*="home"]').classList.add('active');
    } else if (pageId === 'new-designs') {
        document.getElementById('page-new-designs').classList.add('active');
        document.querySelector('a[onclick*="new-designs"]').classList.add('active');
    }

    // Scroll automático hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para filtrar los nuevos diseños mediante los botones
function filterDesigns(category) {
    // Actualizar botones visualmente para mostrar cuál está activo
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filtrar las imágenes (elementos)
    const items = document.querySelectorAll('.design-item');
    items.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
            item.style.display = 'flex';
        } else {
            // Verifica si el diseño tiene la clase de la categoría elegida
            if (item.classList.contains(category)) {
                item.classList.remove('hidden');
                item.style.display = 'flex';
            } else {
                item.classList.add('hidden');
                // Un pequeño retraso para la animación antes de ocultarlo completamente
                setTimeout(() => {
                    if(item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 400); 
            }
        }
    });
}

// Escuchar cambios en la URL (Hash) para navegación directa opcional
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#new-designs') {
        switchPage('new-designs');
    } else {
        switchPage('home');
    }
});