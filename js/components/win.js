import { increaseNumWithCommas } from "../utils/increaseNum.js";

const span = document.querySelector("#win-section-span")
const html = document.querySelector("html")
let treshold = 1300
window.addEventListener("scroll", () => {
    if (html.scrollTop >= treshold){
        increaseNumWithCommas([span], 0)
        treshold = 20000
    }
})
