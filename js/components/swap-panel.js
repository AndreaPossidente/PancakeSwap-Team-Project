import CoinGecko from "../services/CoinGecko.js";

export default class SwapPanel {
  static _chart = document.querySelector(".swap-chart-container");
  static _toggleChart = document.querySelector("#toggle-chart");
  static _toggleChartImages = document.querySelectorAll("#toggle-chart > svg");
  static _tokenImages = document.querySelectorAll(
    ".swap-panel-currency-selector > div > .swap-panel-token-image > img"
  );
  static _tokenNames = document.querySelectorAll(
    ".swap-panel-currency-selector > div > .swap-panel-token-name"
  );

  static inputs = document.querySelectorAll(".swap-panel-currency-form-input");
  static labels = document.querySelectorAll(
    ".swap-panel-currency-form-input-sub"
  );

  static lastPrice = 0;
  static isInverted = false;
  static tokenId = "cake";
  static currencyId = "bnb";

  static prices = null;

  static async init() {
    SwapPanel._toggleChart.addEventListener("click", () => {
      const image1 = SwapPanel._toggleChartImages.item(0);
      const image2 = SwapPanel._toggleChartImages.item(1);

      if (!image1.classList.contains("hidden")) {
        image1.classList.add("hidden");
        image2.classList.remove("hidden");
        SwapPanel._chart.style.position = "fixed";
        SwapPanel._chart.style.left = "-2000px";
      } else {
        image1.classList.remove("hidden");
        image2.classList.add("hidden");
        SwapPanel._chart.style.visibility = "visible";
        SwapPanel._chart.style.position = "static";
        SwapPanel._chart.style.left = "";
      }
    });

    SwapPanel.inputs.item(0).addEventListener("input", async (e) => {
      if (document.activeElement !== e.target) {
        return;
      }
      const data = await CoinGecko.query("simple/price", {
        ids: SwapPanel.currencyId + "," + SwapPanel.tokenId,
        vs_currencies: "usd",
      });
      SwapPanel.prices = await data;
      const val = e.target.value.match(
        /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/g
      );
      e.target.value = val?.length > 0 ? val : e.target.value.slice(0, -1);
      this.labels.item(0).innerHTML = `~${(
        Number(e.target.value) *
        Number(
          SwapPanel.prices[
            !this.isInverted ? SwapPanel.tokenId : SwapPanel.currencyId
          ].usd
        )
      ).toFixed(2)} USD`;
      this.labels.item(1).innerHTML = `~${(
        Number(e.target.value) *
        Number(
          SwapPanel.prices[
            !this.isInverted ? SwapPanel.tokenId : SwapPanel.currencyId
          ].usd
        )
      ).toFixed(2)} USD`;
      const newVal = Number(e.target.value) * Number(this.lastPrice);
      this.inputs.item(1).value =
        newVal.toString()[1] === "."
          ? newVal.toFixed(7).slice(0, 7)
          : newVal.toFixed(2);
    });

    SwapPanel.inputs.item(1).addEventListener("input", async (e) => {
      if (document.activeElement !== e.target) {
        return;
      }
      const data = await CoinGecko.query("simple/price", {
        ids: SwapPanel.currencyId + "," + SwapPanel.tokenId,
        vs_currencies: "usd",
      });
      SwapPanel.prices = await data;
      const val = e.target.value.match(
        /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/g
      );
      e.target.value = val?.length > 0 ? val : e.target.value.slice(0, -1);
      this.labels.item(0).innerHTML = `~${(
        Number(e.target.value) *
        Number(
          SwapPanel.prices[
            this.isInverted ? SwapPanel.tokenId : SwapPanel.currencyId
          ].usd
        )
      ).toFixed(2)} USD`;
      this.labels.item(1).innerHTML = `~${(
        Number(e.target.value) *
        Number(
          SwapPanel.prices[
            this.isInverted ? SwapPanel.tokenId : SwapPanel.currencyId
          ].usd
        )
      ).toFixed(2)} USD`;
      const newVal = Number(e.target.value) * (1 / Number(this.lastPrice));
      this.inputs.item(0).value =
        newVal.toString()[1] === "."
          ? newVal.toFixed(7).slice(0, 7)
          : newVal.toFixed(2);
    });
  }

  static updatePanel(token1, token2, isInverted, lastPrice, tokId, curId) {
    SwapPanel.tokenId = tokId;
    SwapPanel.currencyId = curId;
    SwapPanel.lastPrice = lastPrice;
    SwapPanel.isInverted = isInverted;
    SwapPanel._tokenImages.item(0).src = token1.image;
    SwapPanel._tokenImages.item(1).src = token2.image;
    SwapPanel._tokenNames.item(0).innerHTML = token1.name;
    SwapPanel._tokenNames.item(1).innerHTML = token2.name;

    const [input1, input2] = SwapPanel.inputs;
    const i1val = input1.value;
    const i2val = input2.value;
    input1.value = i2val;
    input2.value = i1val;

    const [label1, label2] = SwapPanel.inputs;
    const lab1 = label1.innerHTML;
    const lab2 = label2.innerHTML;
    label1.innerHTML = lab2;
    label2.innerHTML = lab1;
  }
}
