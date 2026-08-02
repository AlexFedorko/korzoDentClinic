import gsap from 'gsap';
import { prefersReducedMotion } from './motionPreference';

export function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const imgEl = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const slides = Array.from(document.querySelectorAll('.mySwiper .swiper-slide img'));

    if (!slides.length) return;

    let currentIndex = 0;

    const setImage = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        const slide = slides[currentIndex];
        imgEl.setAttribute('src', slide.getAttribute('src'));
        imgEl.setAttribute('alt', slide.getAttribute('alt') || '');

        if (!prefersReducedMotion) {
            gsap.fromTo(imgEl, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
    };

    const open = (index) => {
        setImage(index);
        lightbox.classList.add('is-open');
        document.body.classList.add('lightbox-active');
    };

    const close = () => {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('lightbox-active');
    };

    slides.forEach((img, index) => {
        img.addEventListener('click', () => open(index));
    });

    closeBtn?.addEventListener('click', close);
    prevBtn?.addEventListener('click', () => setImage(currentIndex - 1));
    nextBtn?.addEventListener('click', () => setImage(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') setImage(currentIndex + 1);
        if (e.key === 'ArrowLeft') setImage(currentIndex - 1);
    });
}
