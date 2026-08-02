export function initHeader() {
    const header = document.getElementById('header');
    const burgerBtn = document.getElementById('burger-btn');
    const mobMenu = document.querySelector('.menu');

    if (mobMenu) {
        mobMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-link')) {
                document.body.classList.remove('menu-active');
                if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            const isActive = document.body.classList.toggle('menu-active');
            burgerBtn.setAttribute('aria-expanded', String(isActive));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('menu-active')) {
                document.body.classList.remove('menu-active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (header) {
        const onScroll = () => {
            header.classList.toggle('header--scrolled', window.scrollY > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const sections = document.querySelectorAll('section[id], footer[id]');
    const links = document.querySelectorAll('.menu-link[href*="#"]');

    if (sections.length && links.length) {
        const linkFor = (id) =>
            Array.from(links).find((link) => link.getAttribute('href').endsWith(`#${id}`));

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

        // Safety net: the footer can be shorter than the rootMargin's
        // trigger band, so its midpoint may never cross it before
        // scrolling bottoms out — force the last link active there.
        const footerLink = linkFor('footer');
        if (footerLink) {
            const onScrollEnd = () => {
                const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
                if (atBottom) {
                    links.forEach((l) => l.classList.remove('active'));
                    footerLink.classList.add('active');
                }
            };
            window.addEventListener('scroll', onScrollEnd, { passive: true });
        }
    }
}
