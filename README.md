# E-Commerce Agenda (Odoo 19)

Plataforma de comercio electrónico moderna, rápida e interactiva con catálogo desacoplado (Single Page Application en OWL v2) y checkout directo vía WhatsApp, integrada sobre **Odoo 19 Community** y **PostgreSQL 15**.

---

## 🚀 Inicio Rápido

### 1. Iniciar Contenedores Docker

```bash
./odoo start
```
- **Odoo Backend**: [http://localhost:8074](http://localhost:8074)
- **Tienda Pública SPA**: [http://localhost:8074/shop](http://localhost:8074/shop)

### 2. Comandos CLI (`./odoo`)

```bash
./odoo start      # Iniciar contenedores en segundo plano
./odoo stop       # Detener contenedores
./odoo restart    # Reiniciar contenedores
./odoo logs       # Ver logs en tiempo real
./odoo bash       # Terminal interactiva dentro de Odoo
./odoo update -d <bd> -m ecommerce_agenda # Actualizar módulo en la BD
./odoo psql -d <bd> # Consola PostgreSQL
```

---

## 📁 Estructura del Proyecto

- `addons/`
  - `ecommerce_agenda/`: Módulo principal (Catálogo, Carrito, API REST, Checkout WhatsApp, SPA en OWL).
  - `ecommerce_theme/`: Tema visual para menú de aplicaciones a pantalla completa.
- `config/`: Configuración del servidor Odoo (`odoo.conf`).
- `scripts/`: Herramientas auxiliares de backup, restauración y reset de claves.
- `docker-compose.yml`: Orquestación de Odoo 19 + PostgreSQL 15.
- `.env`: Parámetros de entorno y puertos (HTTP: 8074, Longpolling: 8075).
