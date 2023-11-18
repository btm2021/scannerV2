<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
<script>
let dbKey = "c0rbxvksqs9_oMTog1mCfFx79sSEyW1aDNA9Gf1GNeHT";
const binanceStreamURL = "wss://fstream.binance.com/ws/!markPrice@arr";
const binanceSocket = new WebSocket(binanceStreamURL);

export default {
  data() {
    return {
      exchangeConfig: {},
    };
  },
  mounted() {
    this.getExchangeInfo().then((data) => {
      this.getAll();
      this.getStreamPrice();
      this.getIndicator();
    });
  },
  methods: {
    formatPrice(symbol, markPrice) {
      let pricePrecision = this.exchangeConfig[symbol]
        ? this.exchangeConfig[symbol].pricePrecision
        : 4;
      return parseFloat(markPrice.toFixed(pricePrecision));
    },
    getExchangeInfo() {
      return new Promise((resolve, reject) => {
        let url = "https://fapi.binance.com/fapi/v1/exchangeInfo";
        this.$axios.get(url).then((data) => {
          let config = data.data.symbols;
          const keyValueObject = config.reduce((obj, item) => {
            obj[item.symbol] = item;
            return obj;
          }, {});
          this.exchangeConfig = keyValueObject;
          this.$store.commit("db/set_list_symbol_config", keyValueObject);
          resolve(true);
        });
      });
    },
    getAll() {
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/Symbols/query";
      let body = {
        query: [
          {
            enable: true,
          },
        ],
      };
      this.$axios
        .post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
          this.$store.commit("db/set_list_symbol_db", data.data);
        });
    },
    getIndicator() {
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/list_indicator/query";
      let body = {
        query: [
          {
            
          },
        ],
      };
      this.$axios
        .post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
       
          this.$store.commit("db/set_list_indicator_db", data.data);
        });
    },
    getStreamPrice() {
      // URL for the Binance WebSocket API

      // Event listener for successful connection
      binanceSocket.onopen = function (event) {
        console.log("===Connected to Binance WebSocket");
      };

      // Event listener for receiving a message
      binanceSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        let newDB = [];
        for (let i = 0; i < message.length; i++) {
          let eventTime = message[i].E;
          let symbol = message[i].s;
          let markPrice = message[i].p;
          let indexPrice = message[i].i;
          let fundingRate = message[i].r;
          let nextFundingTime = message[i].T;
          newDB.push({
            time: eventTime, //this.$moment(time).format("YYYY-MM-DD hh:mm"),
            symbol: symbol,
            markPrice: this.formatPrice(symbol, parseFloat(markPrice)),
            indexPrice: parseFloat(indexPrice),
            fundingRate: parseFloat(parseFloat(fundingRate*100).toFixed(4)),
            nextFundingTime: nextFundingTime,
          });
        }
        this.$store.commit("db/set_list_price_stream", newDB);
      };

      // Event listener for handling errors
      binanceSocket.onerror = function (error) {
        console.error("WebSocket Error:", error);
      };

      // Event listener for when the connection is closed
      binanceSocket.onclose = function (event) {
        console.log("WebSocket connection closed:", event);
      };
    },
  },
};
</script>