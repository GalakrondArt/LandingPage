/**
 * GALAKROND ART - Frontend Logic
 * Refactorizado a ES6+ Modules Pattern
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURACIÓN DEL MENÚ MÓVIL ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    const toggleMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = mobileMenuBtn.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // --- 2. SISTEMA DE RUTEO (Single Page Application - SPA) ---
    const switchPage = (pageId) => {
        // Ocultar todas las secciones
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Actualizar navegación visual
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });

        // Mostrar sección activa
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Cerrar menú móvil si está abierto y scrollear al inicio
        if (navMenu.classList.contains('active')) toggleMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reiniciar animaciones de ScrollReveal para la nueva vista
        setTimeout(initScrollReveal, 100);
    };

    // Escuchar clics en los enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const isInternalPage = link.dataset.page;
            if (isInternalPage) {
                switchPage(isInternalPage);
            }
        });
    });

    // Manejar navegación directa por URL (#hash)
    const handleHashNavigation = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'new-designs') {
            switchPage('new-designs');
        } else if (!hash || hash === 'home') {
            switchPage('home');
        }
    };
    
    // Escuchar cambios manuales de URL (botones atrás/adelante del navegador)
    window.addEventListener('hashchange', handleHashNavigation);
    handleHashNavigation(); // Inicialización


    // --- 3. SISTEMA DE FILTRADO DINÁMICO (Con transiciones suaves) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const designItems = document.querySelectorAll('.design-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Actualizar clase activa en botones
            filterButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const targetCategory = e.currentTarget.dataset.filter;

            designItems.forEach(item => {
                const itemCategories = item.dataset.category || '';
                
                // Lógica de coincidencia
                const isMatch = targetCategory === 'all' || itemCategories.includes(targetCategory);

                if (isMatch) {
                    item.classList.remove('hidden');
                    // Pequeño delay para permitir que el display:block se aplique antes de animar opacidad
                    setTimeout(() => {
                        item.classList.remove('hide-anim');
                    }, 50);
                } else {
                    item.classList.add('hide-anim');
                    // Esperar a que termine la transición CSS antes de ocultarlo del DOM
                    setTimeout(() => {
                        if (item.classList.contains('hide-anim')) {
                            item.classList.add('hidden');
                        }
                    }, 400); // 400ms coincide con la transición CSS
                }
            });
        });
    });


    // --- 4. ANIMACIONES DE ENTRADA AL SCROLLEAR (Intersection Observer) ---
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        // Configuración del observer (Se activa cuando el 10% del elemento es visible)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Dejar de observar una vez animado para mejor rendimiento
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            // Limpiar clases previas si venimos de otra "página virtual"
            el.classList.remove('is-visible'); 
            revealObserver.observe(el);
        });
    };

    initScrollReveal();

    // --- 5. CABECERA FLOTANTE CON SOMBRA DINÁMICA ---
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
