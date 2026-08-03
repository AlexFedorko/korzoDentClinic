import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initHeader } from './modules/header';
import { initHeroAnimations } from './modules/heroAnimations';
import { initScrollReveals } from './modules/scrollReveals';
import { initCounters } from './modules/counters';
import { initLightbox } from './modules/lightbox';
import { initCtaFloat } from './modules/ctaFloat';
import { prefersReducedMotion } from './modules/motionPreference';

gsap.registerPlugin(ScrollTrigger);

initHeader();
initLightbox();
initCtaFloat();
initCounters();

if (!prefersReducedMotion) {
    initHeroAnimations();
    initScrollReveals();
}

window.addEventListener('load', () => {
    if (document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
            loop: true,
            loopAdditionalSlides: 4,
            centeredSlides: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            speed: 600,
            grabCursor: true,
            watchOverflow: true,
            keyboard: { enabled: true },
            breakpoints: {
                640: { slidesPerView: 1.6, spaceBetween: 20 },
                921: { slidesPerView: 2.3, spaceBetween: 28 },
                1281: { slidesPerView: 3.2, spaceBetween: 32 },
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: prefersReducedMotion ? false : {
                delay: 4200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
        });
    }

    ScrollTrigger.refresh();
});
