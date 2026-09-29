import 'swiper/css';
import './main.scss'
import renderCarousels from "./js/carousel.js";
import navigation from "./js/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
    renderCarousels();
    await navigation();
})

console.log("Front was loaded! 🏜️");