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

// Escuchar cambios en la URL (Hash) para navegación directa opcional
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#new-designs') {
        switchPage('new-designs');
    } else {
        switchPage('home');
    }
});
