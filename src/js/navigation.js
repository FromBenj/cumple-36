import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default async function navigation() {
    const nextSectionBtns = document.getElementsByClassName("to-next-section-icon");
    const lastSectionBtns = document.getElementsByClassName("to-last-section-icon");

    goFirstCategorySection();
    goNextSection(nextSectionBtns);
    nexSectionBtnAnim(nextSectionBtns);
    goLastSection(lastSectionBtns);

}

function goNextSection(nextSectionBtns) {
    if (!nextSectionBtns?.length) return;

    nextSectionBtns[nextSectionBtns.length - 1].remove();
    const buttonsArray = Array.from(nextSectionBtns);
    buttonsArray.forEach(b => {
        const nextSection = getNextSection(b);
        if (!nextSection) return;

        b.addEventListener("pointerup", async () => {
            await gsap.to(window, {
                duration: 0.9,
                ease: "power2.inOut",
                scrollTo: {
                    y: nextSection,
                    autoKill: true,
                },
            });
        })
    })
}

function goLastSection(lastSectionBtns) {
    if (!lastSectionBtns?.length) return;

    const buttonsArray = Array.from(lastSectionBtns);
    buttonsArray.forEach(b => {
        const lastSection = getLastSection(b);
        if (!lastSection) return;

        b.addEventListener("pointerup", async () => {
            await gsap.to(window, {
                duration: 0.9,
                ease: "power2.inOut",
                scrollTo: {
                    y: lastSection,
                    autoKill: true,
                },
            });
        })
    })
}

function goFirstCategorySection() {
    const btnBlanket = document.getElementById("to-first-blanket-section");
    const btnCoolbox = document.getElementById("to-first-coolbox-section");
    const firstBlanket = document.getElementById("section-1");
    const firstCoolBox = document.getElementById("section-6");
    if (!btnBlanket || !btnCoolbox || !firstBlanket || !firstCoolBox) return;

    gsap.to([btnBlanket, btnCoolbox], {
        y: -20,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
    });

    [btnBlanket, btnCoolbox].forEach(btn => {
        const nextSection = btn.id === btnBlanket.id ? firstBlanket : firstCoolBox;
        btn.addEventListener("pointerup", async () => {
            await gsap.to(window, {
                duration: 0.9,
                ease: "power2.inOut",
                scrollTo: {
                    y: nextSection,
                    autoKill: true,
                },
            });
        })
    })
}

function nexSectionBtnAnim(nextSectionBtns) {
    if (!nextSectionBtns?.length) return;

    for (let i = 0; i < nextSectionBtns.length; i++) {
        gsap.to(nextSectionBtns[i], {
            y: -20,
            duration: 1.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }
}

const getNextSection = (b) => {
    const baseId = "section-";
    const id = b?.dataset?.id?.replace(baseId, "");
    if (!id) return;

    const nextId = baseId + (parseInt(id) + 1);
    return document.getElementById(nextId);
}

const getLastSection = (b) => {
    const baseId = "section-";
    const id = b?.dataset?.id?.replace(baseId, "");
    if (!id) return;

    const lastId = baseId + (parseInt(id) - 1);
    return document.getElementById(lastId);
}