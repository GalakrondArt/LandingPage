document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Interfaz del Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // --- 2. Navegación tipo SPA (Single Page Application) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    const switchPage = (targetId) => {
        // Actualizar vista
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(`page-${targetId}`).classList.add('active');

        // Actualizar estado activo en navegación
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.nav-link[data-target="${targetId}"]`).classList.add('active');

        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Cerrar menú móvil si está abierto
        if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            // Actualizar Hash de URL sin recargar
            window.history.pushState(null, null, `#${target}`);
            switchPage(target);
        });
    });

    // Manejar el Hash al cargar o navegar hacia atrás
    const handleRoute = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'new-designs') {
            switchPage('new-designs');
        } else {
            switchPage('home');
        }
    };
    
    window.addEventListener('popstate', handleRoute);
    handleRoute(); // Ejecutar en la carga inicial

    // --- 3. Filtrado Dinámico del Catálogo ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const designItems = document.querySelectorAll('.design-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Estilos del botón
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            designItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    item.style.display = 'flex';
                    // Pequeño timeout para permitir que el display:flex se aplique antes de la opacidad
                    setTimeout(() => item.classList.remove('hidden'), 50);
                } else {
                    item.classList.add('hidden');
                    // Esperar que termine la transición CSS antes de quitarlo del flujo
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 400); 
                }
            });
        });
    });

    // --- 4. Animaciones al Hacer Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez animado para mejor rendimiento
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

});
