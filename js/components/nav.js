import { hasScrolledDown } from "../utils/hasScrolledDown.js"

const nav = document.querySelectorAll(".nav-top")
let lastKnownPos = 0

document.addEventListener("scroll", (evt) => {
    let top
    if (hasScrolledDown(lastKnownPos, window.scrollY)){
        top = "-56px"
    } else{
        top = "0"
    }
    nav.forEach((nav) => {
        nav.style.top = top
    })
    lastKnownPos = window.scrollY
})