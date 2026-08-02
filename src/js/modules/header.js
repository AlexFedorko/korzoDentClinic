export function initHeader() {
    const header = document.getElementById('header');
    const burgerBtn = document.getElementById('burger-btn');
    const mobMenu = document.querySelector('.menu');

    if (mobMenu) {
        mobMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-link')) {
                document.body.classList.remove('menu-active');
            }
        });
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            document.body.classList.toggle('menu-active');
        });
    }

    if (header) {
        const onScroll = () => {
            header.classList.toggle('header--scrolled', window.scrollY > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.menu-link[href^="#"]');

    if (sections.length && links.length) {
        const linkFor = (id) =>
            Array.from(links).find((link) => link.getAttribute('href') === `#${id}`);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const link = linkFor(entry.target.id);
                    if (!link) return;
                    links.forEach((l) => l.classList.remove('active'));
                    link.classList.add('active');
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
    }
}
