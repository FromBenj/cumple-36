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
const TEMPLATES_INTRO = {
    blanket: blanketIntroTemplate,
    coolbox: coolboxIntroTemplate
}
const CATEGORIES = ["blanket", "coolbox"];

export default function renderSections() {
    const app = document.getElementById("app");
    if (!app) return;

    renderBlankets(app);
    switchCategory(app)
}

function renderBlankets(app) {
    sectionIntro(app, "blanket");
}

function renderCoolboxes(app) {
    sectionIntro(app, "coolbox");
}

function sectionIntro(app, category) {
    const templateIntro = TEMPLATES_INTRO[category];
    if (!app || !CATEGORIES.includes(category) || !templateIntro) return;

    app.innerHTML = Mustache.render(templateIntro, {id: 0, category: category});
    nextButtonAnimation();
    goNextSection(app, {id: 0, category: category});
}

function goNextSection(app, current) {
    const button = document.querySelector(".to-next-section");
    const next = getNextProduct(current);
    if (!app || !next) return;

    button.addEventListener("pointerup", async () => {
        const tl = gsap.timeline();
        tl.to(app, {
            opacity: 0,
            duration: 0.3
        })
            .call(() => {
                renderNewSection(app, next);
                goNextSection(app, next);
                goLastSection(app, next);
                switchCategory(app);
            })
            .to(app, {
                opacity: 1,
                duration: 0.4
            })
    }, {once: true});
}

function goLastSection(app, current) {
    const button = document.querySelector(".to-last-section");
    if (!app || !current) return;

    button.addEventListener("pointerup", async () => {
        const tl = gsap.timeline();

        const last = current.id - 1 === 0 ? "intro" : getLastProduct(current);
        if (!last) return;

        tl.to(app, {
            opacity: 0,
            duration: 0.3
        })
            .call(() => {
                if (last === "intro") {
                    current.category === "blanket" ? renderBlankets(app) : renderCoolboxes(app);
                    return;
                }
                renderNewSection(app, last);
                goNextSection(app, last);
                goLastSection(app, last);
                switchCategory(app);
            })
            .to(app, {
                opacity: 1,
                duration: 0.4
            })
    }, {once: true})
}

function renderNewSection(app, product) {
    const category = product?.category;
    if (!app || !CATEGORIES.includes(category)) return;

    const categoryState = {
        blanket: category === "blanket" ? "active" : "",
        coolbox: category === "coolbox" ? "active" : "",
    }

    const ids = DATA[category].map((p => p.id));
    const last = product.id === Math.max(...ids);

    const swiperId = `${category}-${product.id}`;
    const html = Mustache.render(sectionTemplate, {...product, swiperId, last, categoryState});
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

}

export function getNextProduct(current) {
    return DATA[current.category]?.find(p => p.id === current.id + 1) ?? null;
}

export function getLastProduct(current) {
    if (!current || !CATEGORIES.includes(current.category)) return null;
    return DATA[current.category]?.find(p => p.id === current.id - 1) ?? null;
}

function nextButtonAnimation() {
    const button = document.querySelector(".section-intro.to-next-section");
    if (!button) return;

    gsap.to(button, {
        y: -20,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
    });
}

function switchCategory(app) {
    const blanketBtn = document.querySelector(".section-blanket-button");
    const coolboxBtn = document.querySelector(".section-coolbox-button");
    if (!blanketBtn || !coolboxBtn) return;

    blanketBtn.addEventListener('click', () => renderBlankets(app));
    coolboxBtn.addEventListener("click", () => renderCoolboxes(app));
}