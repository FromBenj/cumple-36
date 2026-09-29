import carouselTemplate from './../html/carousel-template.mst?raw';
import Mustache from "mustache";
import Swiper from "swiper";
import { EffectCoverflow } from 'swiper/modules';

import blankets from "../data/blankets.js";

export default function renderCarousels() {
    renderBlanketCarousel();
}

function renderBlanketCarousel() {
    const sectionBlankets = document.getElementById("section-blankets");
    if (!sectionBlankets || !blankets?.length) return;

    blankets.forEach((b, index) => {
        const id = `blanket-${index}`;
        const html = Mustache.render(carouselTemplate, {...b, id});
        sectionBlankets.insertAdjacentHTML("beforeend", html);

        new Swiper(`#${id}.swiper`, {
            modules: [EffectCoverflow],
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                slideShadows: false,
            },
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