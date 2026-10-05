import 'swiper/css';
import 'swiper/css/pagination';
import './main.scss';
import renderSections from "./js/section.js";
import login from "./js/login.js";

document.addEventListener("DOMContentLoaded", async () => {
    login();
})

console.log("Front was loaded! 🏜️");