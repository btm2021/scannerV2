<template>
  <b-row>
    <b-col cols="10">
      <div id="chart" style="width: 100%; height: 600px" />
    </b-col>
  </b-row>
</template>
      
<script>
import * as klinecharts from "klinecharts";
// Helper function to find the highest value in a range of data points
function highest(data, key) {
  let highestValue = -Infinity;
  data.forEach((item) => {
    if (item[key] > highestValue) highestValue = item[key];
  });
  return highestValue;
}

// Helper function to find the lowest value in a range of data points
function lowest(data, key) {
  let lowestValue = Infinity;
  data.forEach((item) => {
    if (item[key] < lowestValue) lowestValue = item[key];
  });
  return lowestValue;
}

var myBot = {
  name: "myBot",
  shortName: "myBot",
  calcParams: [14, 2],
  figures: [
    { key: "ema1", title: "EMA5: ", type: "line" },
    { key: "trail2", title: "Trail2: ", type: "line" },
  ],
  regenerateFigures: (params) => {
    return [
      {
        key: "ema1",
        title: `EMA${params[0]}: `,
        type: "line",
        styles: () => {
          return {
            color: "green",
          };
        },
      },
      {
        key: "trail2",
        title: "EMA2: ",
        type: "line",
        styles: () => {
          return {
            color: "red",
          };
        },
      },
    ];
  },
  calc: (kLineDataList, { calcParams, figures }) => {
    const prevEMAs = Array(calcParams.length).fill(0);
    const emaResults = [];
    const closePrices = kLineDataList.map((k) => k.close);

    // Calculate the first EMA
    closePrices.forEach((close, i) => {
      const multiplier = 2 / (calcParams[0] + 1);
      const currentEma =
        (close - (prevEMAs[0] || close)) * multiplier + (prevEMAs[0] || close);
      emaResults.push(currentEma);
      prevEMAs[0] = currentEma;
    });

    // Calculate Trail2 based on the first EMA
    const t2Results = Array(emaResults.length).fill(0);
    const multi = calcParams[1]; // This is the multiplier for SL in percentage
    for (let i = 1; i < emaResults.length; i++) {
      const t1 = emaResults[i];
      const sl = t1 * (multi / 100);
      const prevT2 = t2Results[i - 1] || 0;
      let iff1 = t1 > prevT2 ? t1 - sl : t1 + sl;
      let iff2 =
        t1 < prevT2 && emaResults[i - 1] < prevT2
          ? Math.min(prevT2, t1 + sl)
          : iff1;
      let iff3 =
        t1 > prevT2 && emaResults[i - 1] > prevT2
          ? Math.max(prevT2, t1 - sl)
          : iff2;
      t2Results[i] = iff3;
    }
    t2Results[0] = closePrices[0];
    // Return the combined results
    return kLineDataList.map((_, i) => {
      return {
        [figures[0].key]: emaResults[i],
        [figures[1].key]: t2Results[i],
      };
    });
  },
};
var myBot1 = {
  name: "myBot1",
  shortName: "myBot1",
  calcParams: [14, 2],
  figures: [
    { key: "ema1", title: "EMA5: ", type: "line" },
    { key: "trail2", title: "Trail2: ", type: "line" },
  ],
  regenerateFigures: (params) => {
    return [
      {
        key: "ema1",
        title: `EMA${params[0]}: `,
        type: "line",
        styles: () => {
          return {
            color: "green",
          };
        },
      },
      {
        key: "trail2",
        title: "EMA2: ",
        type: "line",
        styles: () => {
          return {
            color: "red",
          };
        },
      },
    ];
  },
  calc: (kLineDataList, { calcParams, figures }) => {
    const prevEMAs = Array(calcParams.length).fill(0);
    const emaResults = [];
    const closePrices = kLineDataList.map((k) => k.close);

    // Calculate the first EMA
    closePrices.forEach((close, i) => {
      const multiplier = 2 / (calcParams[0] + 1);
      const currentEma =
        (close - (prevEMAs[0] || close)) * multiplier + (prevEMAs[0] || close);
      emaResults.push(currentEma);
      prevEMAs[0] = currentEma;
    });

    // Calculate Trail2 based on the first EMA
    const t2Results = Array(emaResults.length).fill(0);
    const multi = calcParams[1]; // This is the multiplier for SL in percentage
    for (let i = 1; i < emaResults.length; i++) {
      const t1 = emaResults[i];
      const sl = t1 * (multi / 100);
      const prevT2 = t2Results[i - 1] || 0;
      let iff1 = t1 > prevT2 ? t1 - sl : t1 + sl;
      let iff2 =
        t1 < prevT2 && emaResults[i - 1] < prevT2
          ? Math.min(prevT2, t1 + sl)
          : iff1;
      let iff3 =
        t1 > prevT2 && emaResults[i - 1] > prevT2
          ? Math.max(prevT2, t1 - sl)
          : iff2;
      t2Results[i] = iff3;
    }

    // Return the combined results
    return kLineDataList.map((_, i) => {
      return {
        [figures[0].key]: emaResults[i],
        [figures[1].key]: t2Results[i],
      };
    });
  },
};
function zigzag(ticks, deviation = 5, arraySize = -1) {
  const turningPoints = [];
  let basePrice = -1;
  let lastDeviation = 0;
  deviation /= 100;

  const startingTick = arraySize == -1 ? 0 : ticks.length - arraySize;
  // Calculate all turning points that have a deviation equal or superior to the argument received
  for (let i = startingTick; i < ticks.length; ++i) {
    const close = parseFloat(ticks[i].close);
    const high = parseFloat(ticks[i].high);
    const low = parseFloat(ticks[i].low);
    let positiveDeviation = high / basePrice - 1;
    let negativeDeviation = low / basePrice - 1;

    if (basePrice == -1) {
      basePrice = close;
      lastDeviation = 0;
      turningPoints.push({
        timePeriod: i,
        value: close,
        deviation: lastDeviation,
      });
      continue;
    }

    // Is it a positive turning point or is it higher than the last positive one?
    if (
      positiveDeviation >= deviation ||
      (positiveDeviation > 0 && lastDeviation > 0)
    ) {
      if (lastDeviation > 0) {
        positiveDeviation += lastDeviation;
        turningPoints.pop();
      }

      turningPoints.push({
        timePeriod: i,
        value: high,
        deviation: positiveDeviation,
      });
      lastDeviation = positiveDeviation;
      basePrice = high;
    }
    // Is it a positive turning point or is it lower than the last negative one?
    else if (
      negativeDeviation <= -deviation ||
      (negativeDeviation < 0 && lastDeviation < 0)
    ) {
      if (lastDeviation < 0) {
        negativeDeviation += lastDeviation;
        turningPoints.pop();
      }

      turningPoints.push({
        timePeriod: i,
        value: low,
        deviation: negativeDeviation,
      });
      lastDeviation = negativeDeviation;
      basePrice = low;
    }
    // Add always the last one as a turning point, just to make our life easier for the next calculation
    else if (i === ticks.length - 1) {
      if (positiveDeviation > 0)
        turningPoints.push({
          timePeriod: i,
          value: high,
          deviation: positiveDeviation,
        });
      else
        turningPoints.push({
          timePeriod: i,
          value: low,
          deviation: negativeDeviation,
        });
    }
  }

  const zigzag = [];
  // Add the turning points to the returning array, calculate the values between those turning points and add them as well
  for (let i = 0; i < turningPoints.length; ++i) {
    const turningPoint = turningPoints[i];
    zigzag.push({
      timePeriod: turningPoint.timePeriod,
      value: turningPoint.value,
      deviation: parseFloat((turningPoint.deviation * 100).toFixed(2)),
      turningPoint:
        turningPoint.deviation > deviation ||
        turningPoint.deviation < -deviation,
    });

    if (turningPoint.timePeriod >= ticks.length - 1) continue;

    const nextTurningPoint = turningPoints[i + 1];
    for (
      let j = turningPoint.timePeriod + 1;
      j < nextTurningPoint.timePeriod;
      ++j
    ) {
      const distanceToTP = j - turningPoint.timePeriod;
      const distanceTPs = nextTurningPoint.timePeriod - turningPoint.timePeriod;
      const value =
        turningPoint.value +
        ((nextTurningPoint.value - turningPoint.value) / distanceTPs) *
          distanceToTP;
      const currentDeviation = value / turningPoint.value;

      zigzag.push({
        timePeriod: j,
        value: value,
        deviation: parseFloat((currentDeviation * 100).toFixed(2)),
        turningPoint: false,
      });
    }
  }

  return zigzag;
}

var smcIndicator = {
  name: "SMC",
  shortName: "SMC",
  calcParams: [5], // default deviation for zigzag
  figures: [
    { key: "zigzag", title: "ZigZag", type: "line" },
    { key: "bos", title: "BOS", type: "line" },
    { key: "choch", title: "CHoCH", type: "line" },
  ],
  regenerateFigures: (params) => {
    return [
      { key: "zigzag", title: "ZigZag", type: "line" },
      { key: "bos", title: "BOS", type: "line" },
      { key: "choch", title: "CHoCH", type: "line" },
    ];
  },
  calc: (kLineDataList, { calcParams }) => {
    const deviation = calcParams[0];
    const zigzagValues = zigzag(kLineDataList, deviation);
    const bosLine = [];
    const chochLine = [];
    let previousType = null;

    for (let i = 1; i < zigzagValues.length; i++) {
      const currentZigzag = zigzagValues[i];
      const previousZigzag = zigzagValues[i - 1];

      // Check for BOS and CHoCH
      if (currentZigzag.deviation > 0 && previousZigzag.deviation < 0) {
        bosLine[i] = currentZigzag.value;
        previousType = "BOS";
      } else if (currentZigzag.deviation < 0 && previousZigzag.deviation > 0) {
        chochLine[i] = currentZigzag.value;
        previousType = "CHoCH";
      } else {
        if (previousType === "BOS") {
          bosLine[i] = (bosLine[i - 1] + currentZigzag.value) / 2;
        } else if (previousType === "CHoCH") {
          chochLine[i] = (chochLine[i - 1] + currentZigzag.value) / 2;
        }
      }
    }

    return kLineDataList.map((_, i) => {
      return {
        zigzag: zigzagValues[i]?.value || null,
        bos: bosLine[i],
        choch: chochLine[i],
      };
    });
  },
};

var zigzagIndicator = {
  name: "ZigZag",
  shortName: "ZigZag",
  calcParams: [5], // default deviation is 5
  figures: [
    {
      key: "zigzag",
      title: "ZigZag",
      type: "line",
      styles: () => {
        return {
          color: "black",
        };
      },
    },
  ],
  regenerateFigures: (params) => {
    return [
      {
        key: "zigzag",
        title: `ZigZag ${params[0]}%: `,
        type: "line",
        styles: () => {
          return {
            color: "black",
          };
        },
      },
    ];
  },
  calc: (kLineDataList, { calcParams }) => {
    const deviation = calcParams[0];

    function zigzag(ticks, deviation = 5, arraySize = -1) {
      const turningPoints = [];
      let basePrice = -1;
      let lastDeviation = 0;
      deviation /= 100;

      const startingTick = arraySize == -1 ? 0 : ticks.length - arraySize;
      // Calculate all turning points that have a deviation equal or superior to the argument received
      for (let i = startingTick; i < ticks.length; ++i) {
        const close = parseFloat(ticks[i].close);
        const high = parseFloat(ticks[i].high);
        const low = parseFloat(ticks[i].low);
        let positiveDeviation = high / basePrice - 1;
        let negativeDeviation = low / basePrice - 1;

        if (basePrice == -1) {
          basePrice = close;
          lastDeviation = 0;
          turningPoints.push({
            timePeriod: i,
            value: close,
            deviation: lastDeviation,
          });
          continue;
        }

        // Is it a positive turning point or is it higher than the last positive one?
        if (
          positiveDeviation >= deviation ||
          (positiveDeviation > 0 && lastDeviation > 0)
        ) {
          if (lastDeviation > 0) {
            positiveDeviation += lastDeviation;
            turningPoints.pop();
          }

          turningPoints.push({
            timePeriod: i,
            value: high,
            deviation: positiveDeviation,
          });
          lastDeviation = positiveDeviation;
          basePrice = high;
        }
        // Is it a positive turning point or is it lower than the last negative one?
        else if (
          negativeDeviation <= -deviation ||
          (negativeDeviation < 0 && lastDeviation < 0)
        ) {
          if (lastDeviation < 0) {
            negativeDeviation += lastDeviation;
            turningPoints.pop();
          }

          turningPoints.push({
            timePeriod: i,
            value: low,
            deviation: negativeDeviation,
          });
          lastDeviation = negativeDeviation;
          basePrice = low;
        }
        // Add always the last one as a turning point, just to make our life easier for the next calculation
        else if (i === ticks.length - 1) {
          if (positiveDeviation > 0)
            turningPoints.push({
              timePeriod: i,
              value: high,
              deviation: positiveDeviation,
            });
          else
            turningPoints.push({
              timePeriod: i,
              value: low,
              deviation: negativeDeviation,
            });
        }
      }

      const zigzag = [];
      // Add the turning points to the returning array, calculate the values between those turning points and add them as well
      for (let i = 0; i < turningPoints.length; ++i) {
        const turningPoint = turningPoints[i];
        zigzag.push({
          timePeriod: turningPoint.timePeriod,
          value: turningPoint.value,
          deviation: parseFloat((turningPoint.deviation * 100).toFixed(2)),
          turningPoint:
            turningPoint.deviation > deviation ||
            turningPoint.deviation < -deviation,
        });

        if (turningPoint.timePeriod >= ticks.length - 1) continue;

        const nextTurningPoint = turningPoints[i + 1];
        for (
          let j = turningPoint.timePeriod + 1;
          j < nextTurningPoint.timePeriod;
          ++j
        ) {
          const distanceToTP = j - turningPoint.timePeriod;
          const distanceTPs =
            nextTurningPoint.timePeriod - turningPoint.timePeriod;
          const value =
            turningPoint.value +
            ((nextTurningPoint.value - turningPoint.value) / distanceTPs) *
              distanceToTP;
          const currentDeviation = value / turningPoint.value;

          zigzag.push({
            timePeriod: j,
            value: value,
            deviation: parseFloat((currentDeviation * 100).toFixed(2)),
            turningPoint: false,
          });
        }
      }

      return zigzag;
    }
    const zigzagValues = zigzag(kLineDataList, deviation);

    return zigzagValues.map((z) => {
      return {
        zigzag: z.value,
      };
    });
  },
};
var donchianIndicator = {
  name: "DONCHIAN",
  series: "price",
  calcParams: [20],
  figures: [
    {
      key: "mid",
      title: "High",
      type: "line",
      styles: () => {
        return {
          color: "black",
        };
      },
    },
  ],

  calc: (dataList, { calcParams }) => {
    const result = [];
    let highestHigh = -Infinity;
    let lowestLow = Infinity;
    dataList.forEach((kLineData, i) => {
      if (i >= calcParams[0] - 1) {
        let p = i + 1 - calcParams[0];
        highestHigh = -Infinity;
        lowestLow = Infinity;
        for (; p <= i; p++) {
          highestHigh = Math.max(highestHigh, dataList[p].high);
          lowestLow = Math.min(lowestLow, dataList[p].low);
        }
      }
      console.log(highestHigh, lowestLow);
      result.push({
        high: highestHigh,
        low: lowestLow,
        mid: (highestHigh + lowestLow) / 2,
      });
    });
    return result;
  },
};
// var supres = {
//   name: "supres",
//   series: "price",
//   calcParams: [15, 15, 20],
//   figures: [
//     {
//       key: "resistance",
//       title: "Resistant",
//       type: "circle",
//       styles: () => {
//         return {
//           color: "red",
//         };
//       },
//     },
//     {
//       key: "support",
//       title: "Support",
//       type: "circle",
//       styles: () => {
//         return {
//           color: "blue",
//         };
//       },
//     },
//   ],
//   calc: (kLineDataList, { calcParams }) => {
//     const result = new Array(kLineDataList.length).fill(null).map(() => ({
//       resistance: null,
//       support: null,
//     }));

//     let leftBar = calcParams[0];
//     let rightBar = calcParams[1];
//     let volumeThreshold = calcParams[2];
//     kLineDataList.forEach((kLineData, index) => {
//       if (index >= leftBar && index < kLineDataList.length - rightBar) {
//         const leftIndex = index - leftBar;
//         const rightIndex = index + rightBar + 1;
//         const highSet = kLineDataList.slice(leftIndex, rightIndex);
//         const lowSet = kLineDataList.slice(leftIndex, rightIndex);

//         const highestPoint = highest(highSet, "high");
//         const lowestPoint = lowest(lowSet, "low");

//         // Check if the current bar is a pivot high and volume is above threshold
//         if (
//           kLineData.high === highestPoint &&
//           kLineData.volume > volumeThreshold
//         ) {
//           // Mark the resistance circle on the bar where the pivot is confirmed
//           if (index + leftBar < result.length) {
//             result[index + leftBar].resistance = { value: kLineData.high };
//           }
//         }

//         // Check if the current bar is a pivot low and volume is above threshold
//         if (
//           kLineData.low === lowestPoint &&
//           kLineData.volume > volumeThreshold
//         ) {
//           // Mark the support circle on the bar where the pivot is confirmed
//           if (index + leftBar < result.length) {
//             result[index + leftBar].support = { value: kLineData.low };
//           }
//         }
//       }
//     });

//     return result;
//   },
// };
var supres = {
  name: "supres",
  series: "price",
  calcParams: [15, 15, 20],
  figures: [
    {
      key: "resistance",
      title: "Resistant",
      type: "circle",
      styles: () => {
        return {
          color: "red",
        };
      },
    },
    {
      key: "support",
      title: "Support",
      type: "circle",
      styles: () => {
        return {
          color: "blue",
        };
      },
    },
  ],
  calc: (kLineDataList, { calcParams }) => {
    const result = [];
    let lastResistance = null;
    let lastSupport = null;

    let leftBar = calcParams[0];
    let rightBar = calcParams[1];
    let volumeThreshold = calcParams[2];
    kLineDataList.forEach((kLineData, index) => {
      if (index >= leftBar && index < kLineDataList.length - rightBar) {
        const leftIndex = index - leftBar;
        const rightIndex = index + rightBar + 1;
        const highSet = kLineDataList.slice(leftIndex, rightIndex);
        const lowSet = kLineDataList.slice(leftIndex, rightIndex);

        const highestPoint = highest(highSet, "high");
        const lowestPoint = lowest(lowSet, "low");

        if (
          kLineData.high === highestPoint &&
          kLineData.volume > volumeThreshold
        ) {
          lastResistance = kLineData.high;
        }

        if (
          kLineData.low === lowestPoint &&
          kLineData.volume > volumeThreshold
        ) {
          lastSupport = kLineData.low;
        }

        result.push({
          resistance: lastResistance,
          support: lastSupport,
        });
      }
    });

    return result;
  },
};

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
          timestamp: time, //this.$moment(time).format("YYYY-MM-DD hh:mm"),
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
        let optionChart = {};
        this.fetchData().then((data) => {
          let chart = klinecharts.init("chart", optionChart);
          //regis
          klinecharts.registerIndicator(myBot);
          klinecharts.registerIndicator(myBot1);
          klinecharts.registerIndicator(smcIndicator);
          klinecharts.registerIndicator(donchianIndicator);

          klinecharts.registerIndicator(supres);

          klinecharts.registerIndicator(zigzagIndicator);

          chart.setPriceVolumePrecision(optionFromExchange.pricePrecision, 10);
          //thêm volume
          chart.createIndicator({
            name: "VOL",
            calcParams: [200],
            shortName: "VOL",
          }),
            false,
            { gap: { bottom: 1 } };
          //  chart.createIndicator("BOLL", true, { id: "candle_pane" });
          chart.createIndicator(
            {
              name: "supres",
              calcParams: [15, 15, 20],
            },
            true,
            { id: "candle_pane" }
          );
          // chart.createIndicator(
          //   {
          //     name: "myBot",
          //     calcParams: [89, 1.326],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
          // chart.createIndicator(
          //   {
          //     name: "myBot1",
          //     calcParams: [34, 1.326],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
          // chart.createIndicator(
          //   {
          //     name: "DONCHIAN",
          //     calcParams: [100],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
          chart.createIndicator(
            {
              name: "ZigZag",
              calcParams: [2.326],
            },
            true,
            { id: "candle_pane" }
          );
          // chart.createIndicator(
          //   {
          //     name: "supres",
          //     calcParams: [2.326],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
          // chart.setStyles({
          //   indicator: {
          //     tooltip: {
          //       showType: "none",
          //       showRule: "none",
          //     },
          //   },
          // });
          // chart.createIndicator(
          //   {
          //     name: "SMC",
          //     calcParams: [2.326],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
          window.addEventListener("resize", () => {
            this.chart.resize();
          });
          chart.applyNewData(data);
          this.chart = chart;
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
  },
  computed: {},
  watch: {},
};
</script>
      