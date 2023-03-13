import CoinGecko from "../services/CoinGecko.js";

export default class Coin {
  constructor(json) {
    this.id = json.id;
    this.symbol = json.symbol;
    this.name = json.name;
  }

  static async find() {
    try {
      const data = await CoinGecko.query("coins/list")
        .catch((err) => err)
        .catch((err) => undefined);
      const res = await fetch("/js/components/dummy/coins.json");

      return data.map((el) => new Coin(el)) || res.json();
    } catch (err) {
      return;
    }
  }

  image = async () => {
    const data = await CoinGecko.query(`coins/${this.id}`);
    return data.image.large;
  };
}
