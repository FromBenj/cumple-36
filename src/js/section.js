import sectionTemplate from './../partials/section.mst?raw';
import blanketIntroTemplate from './../partials/blanket-intro.mst?raw';
import coolboxIntroTemplate from './../partials/coolbox-intro.mst?raw';
import Mustache from "mustache";
import Swiper from "swiper";
import {Pagination} from 'swiper/modules';
import blankets from "../data/blankets.js";
import coolboxes from "../data/coolboxes.js";
import gsap from "gsap";

const DATA = {
    blanket: blankets,
    coolbox: coolboxes
};

let productType;

export default function renderSections() {
    const app = document.getElementById("app");
    if (!app) return;

    renderBlankets(app);
}

function renderBlankets(app) {
    productType = "blanket";
    blanketIntro(app);
    goNextSection(app);

}

function blanketIntro() {
    if (!app || !blanketIntroTemplate) return;

    const html = Mustache.render(blanketIntroTemplate, {id: 0, type: "blanket"})
    app.innerHTML = html;
    nextButtonAnimation();
}

function goNextSection(app) {
    const button = document.querySelector(".to-next-section-icon");
    const nextProduct = getNextProduct(button);
    console.log(nextProduct)
    if (!app || !nextProduct) return;

    button.addEventListener("pointerup", async () => {
        const tl = gsap.timeline();
        tl.to(app, {
            opacity: 0,
            duration: 0.3
        })
            .call(() => {
                renderNewSection(app, nextProduct)
            })
            .to(app, {
                opacity: 1,
                duration: 0.4
            })
    })
}

function renderNewSection(app, nextProduct) {
    if (!app || !nextProduct) return;

    const swiperId = `${productType}-${nextProduct.id}`;
    const html = Mustache.render(sectionTemplate, {...nextProduct, swiperId});
    app.innerHTML = html;

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

    nextButtonAnimation();
    goNextSection(app);
}

export function getNextProduct(button) {
    const id = button?.dataset?.id;
    if (!id || !button) return null;

    return DATA[productType]?.find(p => p.id === parseInt(id) + 1);
}

function nextButtonAnimation() {
    const section = document.querySelector(".section-intro");
    const button = document.querySelector(".to-next-section-icon");
    if (!section || !button) return;

    gsap.to(button, {
        y: -20,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
    });
}


// export default function renderSections() {
//     const sectionProducts = document.getElementById("section-products");
//     if (!sectionProducts) return;
//
//     renderBlanketIntro(sectionProducts);
//     renderBlanketCarousel(sectionProducts);
//
//     renderCoolboxIntro(sectionProducts);
//     renderCoolboxCarousel(sectionProducts);
// }
//
// function renderBlanketIntro(sectionProducts) {
//     if (!sectionProducts || !blanketIntroTemplate) return;
//
//     const html = Mustache.render(blanketIntroTemplate)
//     sectionProducts.insertAdjacentHTML("afterbegin", html);
// }
//
// function renderCoolboxIntro(sectionProducts) {
//     if (!sectionProducts || !coolboxIntroTemplate) return;
//
//     const html = Mustache.render(coolboxIntroTemplate)
//     sectionProducts.insertAdjacentHTML("beforeend", html);
// }
//
// function renderBlanketCarousel(sectionProducts) {
//     if (!sectionProducts || !blankets?.length) return;
//
//     blankets.forEach((b) => {
//         const swiperId = `blanket-${b.id}`;
//         const html = Mustache.render(sectionTemplate, {...b, swiperId});
//         sectionProducts.insertAdjacentHTML("beforeend", html);
//
//         new Swiper(`#${swiperId}.swiper`, {
//             modules: [Pagination],
//             loop: true,
//             speed: 400,
//             spaceBetween: 100,
//             pagination: {
//                 el: '.swiper-pagination',
//                 type: 'bullets',
//             },
//         });
//     })
// }
//
// function renderCoolboxCarousel(sectionProducts) {
//     if (!sectionProducts || !coolboxes?.length) return;
//
//     coolboxes.forEach((c) => {
//         const swiperId = `coolbox-${c.id}`;
//         const html = Mustache.render(sectionTemplate, {...c, swiperId});
//         sectionProducts.insertAdjacentHTML("beforeend", html);
//
//         new Swiper(`#${swiperId}.swiper`, {
//             modules: [Pagination],
//             loop: true,
//             speed: 400,
//             spaceBetween: 100,
//             pagination: {
//                 el: '.swiper-pagination',
//                 type: 'bullets',
//             },
//         });
//     })
// }

