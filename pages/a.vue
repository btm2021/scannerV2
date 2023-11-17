<template>
  <div
    id="chart"
    ref="chartContainer"
    style="width: 700; height: 800"
    class="chart-container"
  ></div>
</template>
    
    <script>
import * as LightweightCharts from "lightweight-charts";
export default {
  data() {
    return {
      dataOHLCV: [],
      chart: null,
      symbol: "BTCUSDT",
      timeframe: "15m",
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
      if (this.$store.state.db.list_symbol_config[this.symbol] === undefined) {
        console.log("Chưa nhận được config. thử lại trong 1s");
        setTimeout(() => {
          this.initChart();
        }, 500);
      } else {
        console.log("Đã có config");
        let optionFromExchange =
          this.$store.state.db.list_symbol_config[this.symbol];
        let optionsChart = {
          layout: {
            background: {
              type: "solid",
              color: "rgb(20,23,34)",
            },
            textColor: "rgba(255, 255, 255, 0.9)",
          },
          grid: {
            vertLines: {
              color: "rgba(200,200,200,0.1)",
            },
            horzLines: {
              color: "rgba(200,200,200,0.1)",
            },
          },
          leftPriceScale: {
            visible: true,
            color: "#ffffff",
          },
          rightPriceScale: {
            visible: true,
            ticksVisible: true,
            textColor: "rgba(197, 203, 206, 1)",
            borderColor: "rgba(197, 203, 206, 0.4)",
          },
          crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
          },
          scaleMargins: {
            top: 0,
            bottom: 0.25,
          },
          timeScale: {
            tickMarkFormatter: (timestamp) => {
              if (
                this.timeframe === "5m" ||
                this.timeframe === "15m" ||
                this.timeframe === "1h" ||
                this.timeframe === "4h"
              ) {
                return this.$moment(timestamp).format("hh:mm");
              } else {
                return this.$moment(timestamp).format("MM/DD");
              }
            },
            timeVisible: true,
            rightOffset: 10,
            barSpacing: 8,
            lockVisibleTimeRangeOnResize: false,
            rightBarStaysOnScroll: true,
            timeVisible: true,
            shiftVisibleRangeOnNewBar: true,
            ticksVisible: true,
            secondsVisible: true,
          },
          watermark: {
            visible: true,
            fontSize: 30,
            horzAlign: "center",
            vertAlign: "center",
            color: "rgba(100,100, 100, 0.5)",
            text: `${this.symbol} - ${this.timeframe} - ${this.exchange}`,
          },
        };
        let optionSeries = {
          scaleMargins: {
            top: 1,
            bottom: 0.2,
          },
          priceFormat: {
            type: "price",
            precision: optionFromExchange.pricePrecision,
            minMove: parseFloat(
              Math.pow(10, -optionFromExchange.pricePrecision).toFixed(
                optionFromExchange.pricePrecision
              )
            ),
          },
        };

        this.fetchData().then((data) => {
          this.chart = LightweightCharts.createChart(
            document.getElementById("chart"),
            optionsChart
          );
          this.chart.resize(window.innerWidth - 50, window.innerHeight - 150);

          const candlestickSeries =
            this.chart.addCandlestickSeries(optionSeries);
          //volume

          const volumeSeries = this.chart.addHistogramSeries({
            color: "#26a69a",
            priceFormat: {
              type: "volume",
              precision: 1,
              minMove: 1,
            },

            priceScaleId: "volume", // set as an overlay by setting a blank priceScaleId
            // set the positioning of the volume series
            scaleMargins: {
              top: 0.1, // highest point of the series will be 70% away from the top
              bottom: 0.01,
            },
          });

          candlestickSeries.setData(data);
          volumeSeries.setData(
            data.map((d) => ({ time: d.time, value: d.volume }))
          );
          window.addEventListener("resize", () => {
            this.chart.resize(window.innerWidth - 50, window.innerHeight - 150);
          });
        });
      }
    },
  },
  mounted() {
    let symbol = this.$route.query.symbol;
    let timeframe = this.$route.query.timeframe;
    let exchange = this.$route.query.exchange;
    this.symbol = symbol;
    this.timeframe = timeframe;
    this.exchange = exchange;

    this.initChart();
    //check store init
  },
};
</script>
    
  <style>
</style>