/**
 * config.js — Constantes globales de la Tienda Web
 */
(function () {
    'use strict';

    window.ECOM = window.ECOM || {};
    window.SS = window.ECOM; // Compatibilidad regresiva con componentes existentes

    window.ECOM.STORE_NAME = 'Mi Tienda';
    window.ECOM.VENDOR_WA = '';
    window.ECOM.CATEGORIES = [];
    window.ECOM.FAMILIES = [];

    window.ECOM.loadConfig = async function () {
        try {
            const [cfgRes, catRes] = await Promise.all([
                fetch('/api/config').catch(() => fetch('/scentsync/api/config')),
                fetch('/api/categories').catch(() => fetch('/scentsync/api/families')),
            ]);
            const cfg = await cfgRes.json();
            const categories = await catRes.json();
            window.ECOM.STORE_NAME = cfg.store_name || 'Mi Tienda';
            window.ECOM.VENDOR_WA = cfg.whatsapp_number || '';
            window.ECOM.CONFIG = cfg || {};
            window.ECOM.CATEGORIES = Array.isArray(categories) ? categories : [];
            window.ECOM.FAMILIES = window.ECOM.CATEGORIES;
        } catch (e) {
            console.warn('E-Commerce: No se pudo cargar la configuración remota.', e);
        }
    };
})();
