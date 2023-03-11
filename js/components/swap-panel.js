const chart = document.querySelector(".swap-chart-container");
const toggleChart = document.querySelector("#toggle-chart");
const toggleChartImages = document.querySelectorAll("#toggle-chart > svg");

toggleChart.addEventListener("click", () => {
  const image1 = toggleChartImages.item(0);
  const image2 = toggleChartImages.item(1);

  if (!image1.classList.contains("hidden")) {
    image1.classList.add("hidden");
    image2.classList.remove("hidden");
    chart.style.position = "fixed";
    chart.style.left = "-2000px";
  } else {
    image1.classList.remove("hidden");
    image2.classList.add("hidden");
    chart.style.visibility = "visible";
    chart.style.position = "static";
    chart.style.left = "";
  }
});
