import { hasScrolledDown } from "../utils/hasScrolledDown.js"

const nav = document.querySelectorAll(".nav-top")
let lastKnownPos = 0
const bottom_items = document.querySelectorAll(".nav-mobile .nav-bottom-items")

function removeDropdown(botton_items) {
    bottom_items.forEach((item) => {
        try {
            const dropdown = item.querySelector(".nav-util-js")
            console.log(dropdown)
            dropdown.classList.remove("nav-util-js")
            dropdown.classList.add("nav-dropdown")
        } catch {

        }

    })
}

document.addEventListener("scroll", (evt) => {
    let top
    if (hasScrolledDown(lastKnownPos, window.scrollY)) {
        top = "-56px"
    } else {
        top = "0"
    }
    nav.forEach((nav) => {
        nav.style.top = top
    })
    lastKnownPos = window.scrollY
})




bottom_items.forEach((item, i) => {
    item.addEventListener("click", (evt) => {
        const dropdown = evt.currentTarget.querySelector(".nav-dropdown")
        removeDropdown(bottom_items)
        dropdown.classList.add("nav-util-js")
        dropdown.classList.remove("nav-dropdown")
        dropdown.style.left = `${i * 16 - 16}px`
    })
})
const main = document.getElementsByTagName("main")[0]
main.addEventListener("click", () => {
    removeDropdown(bottom_items)

})