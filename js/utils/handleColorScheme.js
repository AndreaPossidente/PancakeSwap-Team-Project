let currentColorScheme = null;
export let localColorScheme = localStorage.getItem("colorScheme");
let root = document.querySelector(":root");
let body = document.querySelector("body");
const button = document.querySelector(".color-scheme-switcher");
const bubble = document.querySelector(
  ".color-scheme-switcher .color-scheme-switcher-bubble"
);

const darkIcon = document.querySelector(".color-scheme-switcher .dark-icon");
const lightIcon = document.querySelector(".color-scheme-switcher .light-icon");

button.style.position = "fixed";
button.style.left = "20px";
button.style.bottom = "20px";
// button.innerHTML = "Dark Mode";
body.append(button);

if (localColorScheme == "dark") {
  root.classList.add("dark");
  // button.innerHTML = "Light Mode";
  bubble.classList.add("dark");
  darkIcon.style.display = "flex";
  lightIcon.style.display = "none";
} else {
  localStorage.setItem("colorScheme", "light");
  localColorScheme = "light";
  darkIcon.style.display = "none";
  lightIcon.style.display = "flex";
}

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches &&
  !currentColorScheme &&
  !localColorScheme
) {
  root.classList.remove("dark");
  // button.innerHTML = "Light Mode";
  bubble.classList.remove("dark");
  darkIcon.style.display = "none";
  lightIcon.style.display = "flex";
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches &&
  !currentColorScheme &&
  !localColorScheme
) {
  // button.innerHTML = "Dark Mode";
  bubble.classList.add("dark");
  darkIcon.style.display = "flex";
  lightIcon.style.display = "none";
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches && !currentColorScheme) {
      root.classList.add("dark");
      // button.innerHTML = "Light Mode";
      bubble.classList.add("dark");
      darkIcon.style.display = "flex";
      lightIcon.style.display = "none";
    } else if (!event.matches && !currentColorScheme) {
      root.classList.remove("dark");
      // button.innerHTML = "Dark Mode";
      bubble.classList.remove("dark");
      darkIcon.style.display = "none";
      lightIcon.style.display = "flex";
    }
  });

button.addEventListener("click", (e) => {
  e.preventDefault();
  root.classList.toggle("dark");
  if (root.classList.contains("dark")) {
    // button.innerHTML = "Light Mode";
    bubble.classList.add("dark");
    darkIcon.style.display = "flex";
    lightIcon.style.display = "none";
    currentColorScheme = "dark";
    localColorScheme = "dark";
    localStorage.setItem("colorScheme", "dark");
  } else {
    // button.innerHTML = "Dark Mode";
    bubble.classList.remove("dark");
    darkIcon.style.display = "none";
    lightIcon.style.display = "flex";
    currentColorScheme = "light";
    localColorScheme = "light";
    localStorage.setItem("colorScheme", "light");
  }
});
