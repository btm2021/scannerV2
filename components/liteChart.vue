<template>
  <div id="chart" ref="chartContainer" class="chart-container"></div>
</template>
  
  <script>
import { createChart } from "lightweight-charts";

export default {
  layout: "none",
  props: ["width", "height", "symbol", "timeframe", "exchange"],
  data() {
    return {
      dataOHLCV: [],
      chart: null,
    };
  },
  methods: {
    async fetchData() {
      return new Promise((resolve, reject) => {
        let url = `https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=${this.timeframe}&limit=1000`;
        this.$axios.get(url).then((data) => {
          resolve(this.formatData(data.data));
        });
      });
    },
    formatData(data) {
      let newData = [];
      data.forEach((i) => {
        let [
          time,
          open,
          high,
          low,
          close,
          volume,
          closeTime,
          assetVolume,
          trades,
          buyBaseVolume,
          buyAssetVolume,
          ignored,
        ] = i;
        newData.push({
          time: time, //this.$moment(time).format("YYYY-MM-DD hh:mm"),
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
          volume: parseFloat(volume),
        });
      });
      return newData;
    },
    initChart() {
      this.fetchData().then((data) => {
        this.chart = createChart(document.getElementById("chart"), {
          width: 800,
          height: 600,
          watermark: {
            visible: true,
            fontSize: 30,
            horzAlign: "center",
            vertAlign: "center",
            color: "rgba(100,100, 100, 0.5)",
            text: `${this.symbol} - ${this.timeframe} - ${this.exchange}`,
          },
        });

        const candlestickSeries = this.chart.addCandlestickSeries();
        candlestickSeries.setData(data);
      });
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>
  
<style>
</style>