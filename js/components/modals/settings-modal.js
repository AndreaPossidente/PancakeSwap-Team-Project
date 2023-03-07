const modal = document.querySelector("#settings-modal")
const options = document.querySelectorAll(".nav-options")

function close(element){
    const body = document.querySelector("main")
    const svg = document.querySelector(".settings-modal-header .settings-modal-close")
    const util = []
    util.push(body, svg)
    util.forEach((el) => {
        el.addEventListener("click", () => {
            element.classList.remove("active")
            element.classList.add("deactive")
        })
    });
}

options.forEach((option) => {
    option.addEventListener("click", () => {
        modal.classList.remove("deactive")
        modal.classList.toggle("active")
    })
})

close(modal)