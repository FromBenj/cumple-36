import sectionTemplate from './../partials/section.mst?raw';
import blanketIntroTemplate from './../partials/blanket-intro.mst?raw';
import coolboxIntroTemplate from './../partials/coolbox-intro.mst?raw';
import Mustache from "mustache";
import Swiper from "swiper";
import {Pagination} from 'swiper/modules';
import blankets from "../data/blankets.js";
import coolboxes from "../data/coolboxes.js";

export default function renderSections() {
    const sectionProducts = document.getElementById("section-products");
    if (!sectionProducts) return;

    renderBlanketIntro(sectionProducts);
    renderBlanketCarousel(sectionProducts);

    renderCoolboxIntro(sectionProducts);
    renderCoolboxCarousel(sectionProducts);
}

function renderBlanketIntro(sectionProducts) {
    if (!sectionProducts || !blanketIntroTemplate) return;

    const html = Mustache.render(blanketIntroTemplate)
    sectionProducts.insertAdjacentHTML("afterbegin", html);
}

function renderCoolboxIntro(sectionProducts) {
    if (!sectionProducts || !coolboxIntroTemplate) return;

    const html = Mustache.render(coolboxIntroTemplate)
    sectionProducts.insertAdjacentHTML("beforeend", html);
}

function renderBlanketCarousel(sectionProducts) {
    if (!sectionProducts || !blankets?.length) return;

    blankets.forEach((b) => {
        const swiperId = `blanket-${b.id}`;
        const html = Mustache.render(sectionTemplate, {...b, swiperId});
        sectionProducts.insertAdjacentHTML("beforeend", html);

        new Swiper(`#${swiperId}.swiper`, {
            modules: [Pagination],
            loop: true,
            speed: 400,
            spaceBetween: 100,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
    })
}

function renderCoolboxCarousel(sectionProducts) {
    if (!sectionProducts || !coolboxes?.length) return;

    coolboxes.forEach((c) => {
        const swiperId = `coolbox-${c.id}`;
        const html = Mustache.render(sectionTemplate, {...c, swiperId});
        sectionProducts.insertAdjacentHTML("beforeend", html);

        new Swiper(`#${swiperId}.swiper`, {
            modules: [Pagination],
            loop: true,
            speed: 400,
            spaceBetween: 100,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
    })
}