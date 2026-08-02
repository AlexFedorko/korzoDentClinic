import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => window.matchMedia('(max-width: 920px)').matches;

export function initScrollReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    const mobile = isMobile();

    items.forEach((el) => {
        const dir = mobile ? 'up' : el.getAttribute('data-reveal') || 'up';
        const stagger = el.hasAttribute('data-reveal-stagger');
        const targets = stagger ? el.children : el;

        const from = { opacity: 0, scale: 0.94, duration: 0.9, ease: 'back.out(1.6)' };
        if (dir === 'left') from.x = -60;
        else if (dir === 'right') from.x = 60;
        else from.y = mobile ? 24 : 50;

        gsap.from(targets, {
            ...from,
            stagger: stagger ? 0.12 : 0,
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh());
}
