let currentColorScheme = null;
export default function handleColorScheme() {
  let localColorScheme = localStorage.getItem("colorScheme");
  let root = document.querySelector(":root");
  let body = document.querySelector("body");
  const button = document.createElement("button");
  button.style.position = "fixed";
  button.style.left = "20px";
  button.style.bottom = "20px";
  button.style.zIndex = "1000";
  button.classList.add("btn");
  button.innerHTML = "Dark Mode";
  body.append(button);

  if (localColorScheme == "dark") {
    root.classList.add("dark");
    button.innerHTML = "Light Mode";
  } else {
    localStorage.setItem("colorScheme", "light");
    localColorScheme = "light";
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !currentColorScheme &&
    !localColorScheme
  ) {
    root.classList.add("dark");
    button.innerHTML = "Light Mode";
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches &&
    !currentColorScheme &&
    !localColorScheme
  ) {
    button.innerHTML = "Dark Mode";
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (event.matches && !currentColorScheme) {
        root.classList.add("dark");
        button.innerHTML = "Light Mode";
      } else if (!event.matches && !currentColorScheme) {
        root.classList.remove("dark");
        button.innerHTML = "Dark Mode";
      }
    });

  button.addEventListener("click", (e) => {
    e.preventDefault();
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      button.innerHTML = "Light Mode";
      currentColorScheme = "dark";
      localColorScheme = "dark";
      localStorage.setItem("colorScheme", "dark");
    } else {
      button.innerHTML = "Dark Mode";
      currentColorScheme = "light";
      localColorScheme = "light";
      localStorage.setItem("colorScheme", "light");
    }
  });
}
