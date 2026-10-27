/**
 * main.js — Punto de entrada de la aplicación E-Commerce.
 */
(function (owl, ECOM) {
    'use strict';

    if (!owl) { console.error('E-Commerce: OWL no está cargado.'); return; }
    if (!ECOM || !ECOM.ShopApp) { console.error('E-Commerce: ShopApp no está registrado.'); return; }

    const { mount } = owl;

    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ss-reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        const observe = () => {
            document.querySelectorAll('.ss-reveal').forEach(el => observer.observe(el));
        };

        observe();

        const mutObs = new MutationObserver(observe);
        mutObs.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        await ECOM.loadConfig();

        const root = document.getElementById('ecommerce-shop-root') || document.getElementById('scentsync-shop-root');
        if (root) {
            await mount(ECOM.ShopApp, root);
            initScrollReveal();
        }
    });

})(window.owl, window.ECOM || window.SS);
