const modal = document.querySelector("#settings-modal")
const options = document.querySelectorAll(".nav-options")

options.forEach((el) => {
    el.addEventListener("click", () => {
        modal.classList.toggle("active")
    })
})