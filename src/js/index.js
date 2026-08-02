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
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    ScrollTrigger.refresh();
});
