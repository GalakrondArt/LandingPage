document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegación tipo SPA (Single Page Application)
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    const switchPage = (targetId) => {
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        
        if (targetSection) targetSection.classList.add('active');
        if (targetLink) targetLink.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) toggleMenu();
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.dataset.target);
        });
    });

    // 2. Menú Hamburguesa Responsivo
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
    };
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 3. Filtrado Dinámico de Diseños
    const filterBtns = document.querySelectorAll('.filter-btn');
    const designItems = document.querySelectorAll('.design-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Estilos del botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const filterValue = e.currentTarget.dataset.filter;

            designItems.forEach(item => {
                // Transición de salida
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'flex';
                        // Transición de entrada
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300); // Sincronizado con la transición CSS
            });
        });
    });

    // 4. Animaciones de Entrada al hacer Scroll (Intersection Observer)
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)));
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 85)) {
                displayScrollElement(el);
            }
        })
    }

    // Escuchar el scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 5. Inicialización
    handleScrollAnimation(); // Chequear elementos visibles en la carga inicial
    
    // Leer URL Hash para carga directa
    if (window.location.hash === '#new-designs') {
        switchPage('page-new-designs');
    } else {
        switchPage('page-home');
    }
});
