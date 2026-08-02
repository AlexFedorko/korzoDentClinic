import gsap from 'gsap';
import { prefersReducedMotion } from './motionPreference';

export function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count-to]');
    if (!counters.length) return;

    const animate = (el) => {
        const target = parseFloat(el.getAttribute('data-count-to'));
        const suffix = el.getAttribute('data-suffix') || '';

        if (prefersReducedMotion) {
            el.textContent = target + suffix;
            return;
        }

        const counter = { val: 0 };
        gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
                el.textContent = Math.round(counter.val) + suffix;
            },
        });
    };

    if (prefersReducedMotion) {
        counters.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.3 }
    );

    counters.forEach((el) => observer.observe(el));
}
