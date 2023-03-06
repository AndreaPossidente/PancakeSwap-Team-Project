import MarketChart from "../models/MarketChart.js";
import { localColorScheme } from "../utils/handleColorScheme.js";
import { formatAMPM, customDateFormat } from "../utils/customDateFormat.js";

const { createChart } = window.LightweightCharts;
const chartElement = document.querySelector("#trade-chart");

let isDark = localColorScheme === "dark" ? true : false;

const colors = {
  green: { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" },
  pink: { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E " },
  text: { light: "#280d5f", dark: "#f4eeff" },
  background: { light: "#e9eaeb", dark: "#3c3742" },
  crosshair: { light: "#B8ADD2", dark: "#7A6EAA" },
};

const chartOptions = {
  layout: {
    background: { color: "transparent" },
    textColor: isDark ? colors.text.dark : colors.text.light,
  },
};
const chart = createChart(chartElement, chartOptions);

const areaSeries = chart.addAreaSeries({
  lineWidth: 2,
  lineColor: colors.pink.gradient1,
  topColor: colors.pink.gradient1,
  bottomColor: isDark ? colors.background.dark : colors.background.light,
});

window.onresize = function () {
  chart.applyOptions({
    width: chartElement.parentElement.clientWidth - 32,
    height: chartElement.parentElement.clientHeight - 32,
  });
};

async function updateChart(c) {
  // binancecoin pancakeswap-token BNB CAKE
  let data = await MarketChart.find(
    "pancakeswap-token",
    "BNB",
    1,
    "hourly"
  ).then((data) => {
    const newData = data.map((el) => {
      return { time: el[0], value: c == 1 ? 1 / el[1] : el[1] };
    });

    if (c == 1) {
      document.querySelector(".swap-chart-header-tokens").innerText =
        "BNB/CAKE";
      document.querySelector(".swap-chart-subheader-tokens").innerText =
        "BNB/CAKE";
    } else {
      document.querySelector(".swap-chart-header-tokens").innerText =
        "CAKE/BNB";
      document.querySelector(".swap-chart-subheader-tokens").innerText =
        "CAKE/BNB";
    }

    return newData;
  });

  const first = data[0].value;
  const last = data[data.length - 1].value;
  const difference = last - first;
  const diffString =
    difference == 0
      ? difference.toFixed(3)
      : difference > 0
      ? "+" + difference.toFixed(3)
      : difference.toFixed(3);
  const diffPercent = ((difference / last) * 100).toFixed(2);

  document.querySelector(".swap-chart-subheader-change").style.color =
    diffString.includes("+") ? "#31d0aa" : colors.pink.gradient1;
  document.querySelector(
    ".swap-chart-subheader-change"
  ).innerText = `${diffString} (${diffPercent}%)`;
  document.querySelector(".swap-chart-subheader-date").innerText =
    customDateFormat(data[data.length - 1].time);
  document.querySelector(".swap-chart-subheader-price").innerText =
    String(data[data.length - 1].value).split(".")[0].length > 1
      ? data[data.length - 1].value.toFixed(2)
      : data[data.length - 1].value.toFixed(5);

  areaSeries.setData(data);
  areaSeries.applyOptions({
    lineWidth: 2,
    lineColor: diffString.includes("+")
      ? colors.green.gradient1
      : colors.pink.gradient1,
    topColor: diffString.includes("+")
      ? colors.green.gradient1
      : colors.pink.gradient1,
    bottomColor: isDark
      ? colors.backgroundDisabledDark
      : colors.backgroundDisabled,
  });

  chart.timeScale().fitContent();
}

let c = 1;

document.querySelector(".swap-btn-swap").addEventListener("click", () => {
  updateChart(c);
  c = c == 0 ? 1 : 0;
  chart.timeScale().fitContent();
});
document.querySelector(".swap-btn-zoom").addEventListener("click", () => {
  document.querySelector(".swap-container").classList.toggle("fullscreen");
  chart.applyOptions({
    width: chartElement.parentElement.clientWidth - 32,
    height: chartElement.parentElement.clientHeight - 32,
  });
  chart.timeScale().fitContent();
});

chart.subscribeCrosshairMove((param) => {
  const lastItem = areaSeries.dataByIndex(24, -1);
  const { time: lastTime, value: lastValue } = lastItem;
  const currentValue = param.seriesData.get(areaSeries)?.value;
  const currentTime = param.seriesData.get(areaSeries)?.time;
  const decimalPlaces =
    String(currentValue || lastValue).split(".")[0].length > 1 ? 2 : 5;
  const date =
    (currentTime && customDateFormat(currentTime, true)) ||
    customDateFormat(lastTime);
  const price = (currentValue || lastValue).toFixed(decimalPlaces);
  document.querySelector(".swap-chart-subheader-date").innerText = date;
  document.querySelector(".swap-chart-subheader-price").innerText = price;
});

updateChart();
