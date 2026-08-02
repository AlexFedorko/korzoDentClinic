import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export function initHeroAnimations() {
    const hero = document.querySelector('#main');
    if (!hero) return;

    const heading = hero.querySelector('h1');
    const cards = hero.querySelectorAll('.main-sub-info-ua, .main-sub-info');
    const photo = hero.querySelector('.main-hero-photo');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (photo) {
        tl.from(photo, { opacity: 0, scale: 0.95, duration: 0.9 }, 0);
    }

    if (heading) {
        const split = new SplitText(heading, { type: 'words', wordsClass: 'word' });
        tl.from(split.words, { opacity: 0, y: 40, duration: 0.8, stagger: 0.06 }, 0.2);
    }

    if (cards.length) {
        tl.from(cards, { opacity: 0, y: 30, duration: 0.7, stagger: 0.12 }, '-=0.35');
    }
}
