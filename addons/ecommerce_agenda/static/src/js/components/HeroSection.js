/**
 * HeroSection.js — Banner Principal en formato Carousel Dinámico Autoplay
 */
(function (owl, ECOM) {
    'use strict';
    const { Component, xml, useState, onMounted, onWillUnmount } = owl;

    class HeroSection extends Component {
        static props = ['onExplore'];
        static template = xml/* html */`
            <section class="ss-hero-carousel">
                <div class="ss-hero-carousel__slides">
                    <t t-foreach="slides" t-as="slide" t-key="slide.id">
                        <div t-attf-class="ss-hero-slide #{state.activeId === slide.id ? 'ss-hero-slide--active' : ''}">
                            <div class="ss-hero-slide__bg"
                                 t-attf-style="#{slide.image ? 'background-image: url(' + slide.image + ');' : 'background: linear-gradient(135deg, #1b263b, #0d1b2a);'}"/>
                            <div class="ss-hero-slide__overlay"/>

                            <div class="ss-hero-slide__content">
                                <span class="ss-hero-slide__badge" t-esc="slide.badge"/>
                                <h1 class="ss-hero-slide__title">
                                    <t t-esc="slide.titleLine1"/><br/>
                                    <em><t t-esc="slide.titleEm"/></em>
                                </h1>
                                <p class="ss-hero-slide__sub" t-esc="slide.sub"/>

                                <div class="ss-hero-slide__cta">
                                    <button class="ss-hero__btn ss-hero__btn--gold"
                                            t-on-click="props.onExplore">
                                        <t t-esc="slide.btnText"/>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" stroke-width="2.5">
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                            <polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </t>
                </div>

                <button class="ss-hero-carousel__nav ss-hero-carousel__nav--prev"
                        t-on-click="prevSlide"
                        aria-label="Anterior">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <button class="ss-hero-carousel__nav ss-hero-carousel__nav--next"
                        t-on-click="nextSlide"
                        aria-label="Siguiente">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>

                <div class="ss-hero-carousel__dots">
                    <t t-foreach="slides" t-as="slide" t-key="'dot-' + slide.id">
                        <button t-attf-class="ss-hero-carousel__dot #{state.activeId === slide.id ? 'ss-hero-carousel__dot--active' : ''}"
                                t-on-click="() => this.goToSlide(slide.id)"
                                t-att-aria-label="'Diapositiva ' + slide_index"/>
                    </t>
                </div>
            </section>`;

        setup() {
            this.slides = [
                {
                    id: 1,
                    image: '',
                    badge: 'TIENDA OFICIAL',
                    titleLine1: 'CATÁLOGO ONLINE',
                    titleEm: 'CALIDAD Y EXCELENCIA',
                    sub: 'Explora nuestra amplia gama de productos y servicios con los mejores precios.',
                    btnText: 'Ver Catálogo',
                },
                {
                    id: 2,
                    image: '',
                    badge: 'ATENCIÓN DIRECTA',
                    titleLine1: 'COMPRA FÁCIL',
                    titleEm: 'CHECKOUT POR WHATSAPP',
                    sub: 'Selecciona tus productos favoritos y coordina tu entrega de forma rápida y personalizada.',
                    btnText: 'Comprar Ahora',
                },
                {
                    id: 3,
                    image: '',
                    badge: 'ENVÍOS Y ENTREGAS',
                    titleLine1: 'DISPONIBILIDAD',
                    titleEm: 'DESPACHO GARANTIZADO',
                    sub: 'Envíos a todo el país y entregas locales inmediatas.',
                    btnText: 'Explorar Ofertas',
                }
            ];

            this.state = useState({ activeId: 1 });
            this.timer = null;

            onMounted(() => {
                this.startAutoPlay();
            });

            onWillUnmount(() => {
                this.stopAutoPlay();
            });
        }

        startAutoPlay() {
            this.stopAutoPlay();
            this.timer = setInterval(() => {
                this.nextSlide();
            }, 8000);
        }

        stopAutoPlay() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }

        goToSlide(id) {
            this.state.activeId = id;
            this.startAutoPlay();
        }

        nextSlide() {
            const currentIdx = this.slides.findIndex(s => s.id === this.state.activeId);
            const nextIdx = (currentIdx + 1) % this.slides.length;
            this.state.activeId = this.slides[nextIdx].id;
        }

        prevSlide() {
            const currentIdx = this.slides.findIndex(s => s.id === this.state.activeId);
            const prevIdx = (currentIdx - 1 + this.slides.length) % this.slides.length;
            this.state.activeId = this.slides[prevIdx].id;
        }
    }

    ECOM.HeroSection = HeroSection;

})(window.owl, window.ECOM || window.SS);
