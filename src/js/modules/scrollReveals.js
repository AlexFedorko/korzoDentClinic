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

        // Mobile skips the scale + overshoot easing: cheaper to composite
        // on lower-powered GPUs and less likely to visibly stall mid-animation.
        const from = mobile
            ? { opacity: 0, y: 24, duration: 0.5, ease: 'power2.out' }
            : { opacity: 0, scale: 0.94, duration: 0.9, ease: 'back.out(1.6)' };

        if (!mobile) {
            if (dir === 'left') from.x = -60;
            else if (dir === 'right') from.x = 60;
            else from.y = 50;
        }

        gsap.from(targets, {
            ...from,
            stagger: stagger ? (mobile ? 0.08 : 0.12) : 0,
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
