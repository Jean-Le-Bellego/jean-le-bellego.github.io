const soundSvg = document.querySelector("svg.sound");
const btTheme = document.getElementById("theme-switch");
const bodyEL = document.querySelector("body");
const colorScheme = document.querySelector('meta[name="color-scheme"]');
const mode = localStorage.getItem("mode");

if(mode != "light") {
  colorScheme.setAttribute("content", "dark");
  localStorage.setItem("mode", "dark");
  bodyEL.classList.add("dark");
} else {
  colorScheme.setAttribute("content", "light");
  localStorage.setItem("mode", "light");
  bodyEL.classList.add("light");
}

if (soundSvg) {
  setTimeout(() => {
    soundSvg.classList.add("active");
  }, 1500);
}

btTheme.addEventListener("click", (e) => {
  if (colorScheme.getAttribute("content") == "dark") {
    colorScheme.setAttribute("content", "light");
    localStorage.setItem("mode", "light");
    bodyEL.classList.add("light");
  } else {
    colorScheme.setAttribute("content", "dark");
    localStorage.setItem("mode", "dark");
    bodyEL.classList.remove("light");
  }
});
