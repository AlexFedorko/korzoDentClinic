export function initCtaFloat() {
    const cta = document.querySelector('.cta-float');
    const backToTop = document.querySelector('.back-to-top');
    const hero = document.querySelector('#main');

    if (!cta && !backToTop) return;

    const toggle = (visible) => {
        cta?.classList.toggle('is-visible', visible);
        backToTop?.classList.toggle('is-visible', visible);
    };

    if (hero) {
        const observer = new IntersectionObserver(
            ([entry]) => toggle(!entry.isIntersecting),
            { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
        );
        observer.observe(hero);
    } else {
        const onScroll = () => toggle(window.scrollY > window.innerHeight * 0.5);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
