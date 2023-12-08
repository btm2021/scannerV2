<template>
  <div>
    <b-row v-if="dataReady">
      <b-col cols="6" v-for="(item, index) in listPrice" :key="index">
        <div>
          {{ item.instrument }}{{ item.closeoutAsk }} {{ item.closeoutBid }}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataReady: true,
      listSymbol: [
        "XAU_USD",
        "USD_JPY",
        "EUR_USD",
        "GBP_USD",
        "USD_CHF",
        "NZD_USD",
        "EUR_GBP",
        "US30_USD",
        "NAS100_USD",
        "CN50_USD",
      ],
      listPrice: [],
      api_key: "c1817ffe9f6377e09dac7213f6597c20-0cc3baf5c5acf292958875aafcc7f1d8",
      account_id: "101-004-27015242-001",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async fetchLatestPrices() {
      try {

        let url =
          `https://api-fxpractice.oanda.com/v3/accounts/${this.account_id}/pricing?instruments=`+
          this.listSymbol.toString(); // Thay thế YOUR_ACCOUNT_ID bằng account ID của được mua với OANDA APIfxtrade.oanda.com/v3/accounts/101-004-27015242-001/pricing?instruments=EUR_USD%2CUSD_CAD'
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.api_key}`, // Sử dụng API Key của bạn
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error("Lỗi khi kết nối với OANDA API");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi: ", error);
      }
    },
    getData() {
      this.fetchLatestPrices().then((data) => {
        this.listPrice = data.prices;
        console.log(data.prices);
        this.dataReady = true;
        setTimeout(() => {
            this.getData()
        },1000*60)
      });
    },
    getLastPrice() {},
    async fetchOHLCV(symbol, timeframe) {
      const instrument = symbol; // Thay đổi tùy theo instrument bạn muốn
      const granularity = timeframe; // M5 cho biểu đồ 5 phút
      let api_key =
        "c1817ffe9f6377e09dac7213f6597c20-0cc3baf5c5acf292958875aafcc7f1d8";
      try {
        let api = `https://api-fxpractice.oanda.com/v3/instruments/${instrument}/candles?granularity=${granularity}&count=1000&price=M`;
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`, // Thay thế YOUR_API_KEY bằng API key của bạn
          },
        });

        if (response.ok) {
          const data = await response.json();
          let result = data.candles.map((item) => {
            return {
              time: convertToUTC7(item.time),
              open: parseFloat(item.mid.o),
              high: parseFloat(item.mid.h),
              low: parseFloat(item.mid.l),
              close: parseFloat(item.mid.c),
              volume: parseFloat(item.volume),
              date: item.time,
            };
          });
          return result;
          //    console.log(result)
        } else {
          console.error("Lỗi khi kết nối với OANDA API");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi: ", error);
      }
    },
  },
};
</script>

<style scoped>
</style>