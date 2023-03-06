const connectModalBtn = document.querySelectorAll(".connect-wallet");
const connectModal = document.querySelector("#connect-modal");

connectModalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    connectModal.classList.toggle("active");
  });
});

connectModal.addEventListener("click", (e) => {
  if (e.target === connectModal) connectModal.classList.toggle("active");
});

const headerBtn1 = document.querySelector(
  ".connect-modal-header button:nth-child(1)"
);
const headerBtn2 = document.querySelector(
  ".connect-modal-header button:nth-child(2)"
);
const tab1 = document.querySelector(".connect-modal-tab1");
const tab2 = document.querySelector(".connect-modal-tab2");

headerBtn1.addEventListener("click", () => {
  headerBtn1.classList.add("active");
  headerBtn2.classList.remove("active");
  tab1.style.display = "flex";
  tab2.style.display = "none";
});

headerBtn2.addEventListener("click", () => {
  headerBtn1.classList.remove("active");
  headerBtn2.classList.add("active");
  tab1.style.display = "none";
  tab2.style.display = "flex";
});
