import carouselTemplate from './../partials/section.mst?raw';
import blanketIntroTemplate from './../partials/blanket-intro.mst?raw';
import Mustache from "mustache";
import Swiper from "swiper";
import {Pagination} from 'swiper/modules';
import blankets from "../data/blankets.js";

export default function renderCarousels() {
    const sectionBlankets = document.getElementById("section-blankets");
    if (!sectionBlankets) return;

    renderBlanketIntro(sectionBlankets);
    renderBlanketCarousel(sectionBlankets);
}

function renderBlanketIntro(sectionBlankets) {
    if (!sectionBlankets || !blanketIntroTemplate) return;

    const html = Mustache.render(blanketIntroTemplate)
    sectionBlankets.insertAdjacentHTML("afterbegin", html);
}

function renderBlanketCarousel(sectionBlankets) {
    if (!sectionBlankets || !blankets?.length) return;

    blankets.forEach((b) => {
        const swiperId = `blanket-${b.id}`;
        const html = Mustache.render(carouselTemplate, b);
        sectionBlankets.insertAdjacentHTML("beforeend", html);

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