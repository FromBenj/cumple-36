import lottie from 'lottie-web';
import gsap from "gsap";
import renderSections from "./section.js";


export default function login() {
    const intro = document.getElementById("login-intro");
    const pinataContainer = document.getElementById("pinata-container");
    const title = document.getElementById("login-intro-title-container");
    const btn = document.getElementById("login-start-button-container");
    if (!intro || !pinataContainer || !title || !btn) return;

    pinataAnim(pinataContainer);
    startBtnAppears(intro, title, btn);
    leavingIntro(btn, pinataContainer);
    leavingLogin();
}

const pinataAnim = (pinataContainer) => {
    if (!pinataContainer) return;

    lottie.loadAnimation({
        container: pinataContainer,
        loop: true,
        renderer: 'html',
        autoplay: true,
        path: '/animations/pinata.json'
    });
}


const startBtnAppears = (intro, title, btn) => {
    if (!intro || !title || !btn) return;

    const tl = gsap.timeline({delay: 1});
    tl.to(btn, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
    })
        .to(title, {
            backgroundColor: "white",
            duration: 0.3,
            ease: "power2.in"
        }, "<")
        .to(btn, {
            y: -20,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        })
}

const leavingIntro = (btn, pinataContainer) => {
    const loginIntro = document.getElementById("login-intro");
    if (!btn || !pinataContainer || !loginIntro) return;

    btn.addEventListener("pointerup", () => {
        btn.style.display = "none";

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.killTweensOf([btn, pinataContainer]);
                loginIntro.style.display = "none";
                mainLoginAppears();
            }
        });
        tl.to(pinataContainer, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        })
            .to(loginIntro, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
    })
}

const mainLoginAppears = () => {
    const header = document.getElementById("login-header");
    const content = document.getElementById("login-content");
    const message = document.getElementById("login-message");
    const koala = document.getElementById("koala-no-mames");
    const btn = document.getElementById("login-leave-button-container");
    if (!header || !content || !message || !koala || !btn) return;

    const tl = gsap.timeline();
    tl.to([header, content], {
        opacity: 1,
        duration: 0.6,
        ease: "power2.in"
    })
        .to(message, {
            opacity: 0,
            duration: 0.4,
            delay: 1.2
        })
        .to(koala, {
            onstart: () => {
                console.log("yo")
                koala.style.display = "block"
            },
            opacity: 1,
            duration: 0.2,
        })
        .to(koala, {
            rotation: 10,
            duration: 0.05,
            repeat: -1,
            yoyo: true
        })
        .to(koala, {
            delay: 2.5,
            opacity: 0,
            duration: 0.2,
            onComplete: () => koala.remove()
        })
        .call(() => {
            message.innerText = "Lista para descubrir tus regalos?";
            message.style.backgroundColor = "#ff7e95";
            message.style.color = "white";
        })
        .to(message, {
            opacity: 1,
            duration: 0.4
        })
        .to(btn, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.in",
        })
        .to(btn, {
            y: -20,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        })
}

function leavingLogin() {
    const btn = document.getElementById("login-leave-button-container");
    const login = document.getElementById("login");
    if (!btn || !login) return;

    btn.addEventListener("pointerup", () => {
        gsap.to(login, {
            onstart: () => renderSections(),
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => login.remove()
        })
    }, {once: true})
}