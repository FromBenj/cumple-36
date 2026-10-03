import 'swiper/css';
import 'swiper/css/pagination';
import './main.scss';
import renderCarousels from "./js/carousel.js";
import navigation from "./js/navigation.js";
import login from "./js/login.js";

document.addEventListener("DOMContentLoaded", async () => {
    login();
    renderCarousels();
    await navigation();
})

console.log("Front was loaded! 🏜️");