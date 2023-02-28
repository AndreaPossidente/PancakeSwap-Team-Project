import { increaseNum } from "../utils/increaseNum.js";
import isElementVisible from "../utils/isElementVisible.js";

const earnTops = document.querySelectorAll(".earn-tops-list-item-content");
const earnTopsTitle = document.querySelector(".earn-tops-header > h2 > span");
const earnTopsButton = document.querySelector(".earn-tops-header .btn");

function switchEarnTopsList() {
  earnTops.forEach((earnTop) => {
    earnTop.classList.toggle("hidden");
  });
  if (earnTops[0].classList.contains("hidden")) {
    earnTopsTitle.innerHTML = "Syrup Pools";
  } else {
    earnTopsTitle.innerHTML = "Farms";
  }
}

setInterval(() => switchEarnTopsList(), 6000);
earnTopsButton.addEventListener("click", (e) => switchEarnTopsList());

const rates = document.querySelectorAll(".earn-tops-list-item-rate > span");

function earnScrollHandler() {
  if (isElementVisible(rates.item(0))) {
    increaseNum(rates);
    window.removeEventListener("scroll", earnScrollHandler);
  }
}
window.addEventListener("scroll", earnScrollHandler);
