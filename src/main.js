import 'swiper/css';
import 'swiper/css/pagination';
import './main.scss';
import renderSections from "./js/section.js";
import navigation from "./js/navigation.js";
import login from "./js/login.js";

document.addEventListener("DOMContentLoaded", async () => {
    login();
    renderSections();
    await navigation();
})

console.log("Front was loaded! 🏜️");