const modal = document.querySelector("#settings-modal")
const options = document.querySelectorAll(".nav-options")
const opacity = document.querySelector(".modal-fade")

function close(element) {
    const svg = document.querySelector(".settings-modal-header .settings-modal-close")
    const util = []
    util.push(opacity, svg)
    util.forEach((el) => {
        el.addEventListener("click", () => {
            element.classList.remove("active")
            element.classList.add("deactive")
            opacity.classList.remove("active")
            opacity.classList.add("deactive")
        })
    });
}

options.forEach((option) => {
    option.addEventListener("click", () => {
        modal.classList.remove("deactive")
        modal.classList.toggle("active")
        opacity.classList.remove("deactive")
        opacity.classList.toggle("active")
    })
})

close(modal)