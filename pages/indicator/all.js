

import { IndicatorsNormalized } from "@ixjb94/indicators/dist/indicators-browser"
const ta = new IndicatorsNormalized()

const myBot89 = {
  name: "myBot89",
  shortName: "myBot",
  calcParams: [14, 2],
  figures: [
    { key: "ema1", title: "EMA5: ", type: "line", },
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
            size: 3
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
            size: 3
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
const linear = {
  name: "linear",
  shortName: "linear",
  calcParams: [100, 2],
  figures: [
    { key: 'normalLig', title: 'Normal: ', type: 'line' },

    // { key: 'decayLig', title: 'Decay: ', type: 'line' }
  ],
  calc: async (kLineDataList, { calcParams, figures }) => {
    let close = kLineDataList.map(item => item.close)
    let normal = await ta.linreg(close, calcParams[0])
    let decay = await ta.decay(close, calcParams[0])
    return kLineDataList.map((kLineData, i) => {
      return {
        normalLig: normal[i],
        decayLig: decay[i]
      }
    })
  }
};
const myBot34 = {
  name: "myBot34",
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
  calc: async (kLineDataList, { calcParams, figures }) => {
    const prevEMAs = Array(calcParams.length).fill(0);
    let emaResults = [];
    const closePrices = kLineDataList.map((k) => k.close);

    // Calculate the first EMA
    closePrices.forEach((close, i) => {
      const multiplier = 2 / (calcParams[0] + 1);
      const currentEma =
        (close - (prevEMAs[0] || close)) * multiplier + (prevEMAs[0] || close);
      emaResults.push(currentEma);
      prevEMAs[0] = currentEma;
    });
    //lig
    emaResults = await ta.linreg(closePrices, calcParams[0])

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
// const myBot34 = {
//   name: "myBot34",
//   shortName: "myBot",
//   calcParams: [14, 2],
//   figures: [
//     { key: "ema1", title: "EMA5: ", type: "line" },
//     { key: "trail2", title: "Trail2: ", type: "line" },
//   ],
//   regenerateFigures: (params) => {
//     return [
//       {
//         key: "ema1",
//         title: `EMA${params[0]}: `,
//         type: "line",
//         styles: () => {
//           return {
//             color: "green",
//           };
//         },
//       },
//       {
//         key: "trail2",
//         title: "EMA2: ",
//         type: "line",
//         styles: () => {
//           return {
//             color: "red",
//           };
//         },
//       },
//     ];
//   },
//   calc: (kLineDataList, { calcParams, figures }) => {
//     const prevEMAs = Array(calcParams.length).fill(0);
//     const emaResults = [];
//     const closePrices = kLineDataList.map((k) => k.close);

//     // Calculate the first EMA
//     closePrices.forEach((close, i) => {
//       const multiplier = 2 / (calcParams[0] + 1);
//       const currentEma =
//         (close - (prevEMAs[0] || close)) * multiplier + (prevEMAs[0] || close);
//       emaResults.push(currentEma);
//       prevEMAs[0] = currentEma;
//     });

//     // Calculate Trail2 based on the first EMA
//     const t2Results = Array(emaResults.length).fill(0);
//     const multi = calcParams[1]; // This is the multiplier for SL in percentage
//     for (let i = 1; i < emaResults.length; i++) {
//       const t1 = emaResults[i];
//       const sl = t1 * (multi / 100);
//       const prevT2 = t2Results[i - 1] || 0;
//       let iff1 = t1 > prevT2 ? t1 - sl : t1 + sl;
//       let iff2 =
//         t1 < prevT2 && emaResults[i - 1] < prevT2
//           ? Math.min(prevT2, t1 + sl)
//           : iff1;
//       let iff3 =
//         t1 > prevT2 && emaResults[i - 1] > prevT2
//           ? Math.max(prevT2, t1 - sl)
//           : iff2;
//       t2Results[i] = iff3;
//     }
//     t2Results[0] = closePrices[0];
//     // Return the combined results
//     return kLineDataList.map((_, i) => {
//       return {
//         [figures[0].key]: emaResults[i],
//         [figures[1].key]: t2Results[i],
//       };
//     });
//   },
// };
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
          color: "gold",
          size: 2,
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


var zigzag = {
  name: "zigzag",
  shortName: "zigzag",
  calcParams: [5], // default deviation is 5
  figures: [
    {
      key: "zigzag",
      title: "zigzag",
      type: "line",
      styles: () => {
        return {
          color: "white",
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
            color: "white",
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
      console.log(zigzag)
      return zigzag;
    }
    const zigzagValues = zigzag(kLineDataList, deviation);
    let a = zigzagValues.map((z) => {
      return {
        zigzag: z.value,
      };
    });
    return zigzagValues.map((z) => {
      return {
        zigzag: z.value,
      };
    });
  },
};

var supres = {
  name: "supres",
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
//expriment


function pivotLow(data, leftBars, rightBars) {
  let pivotLows = [];

  for (let i = leftBars; i < data.length - rightBars; i++) {
    let isPivotLow = true;

    for (let j = i - leftBars; j <= i + rightBars; j++) {
      if (j !== i && data[j].low <= data[i].low) {
        isPivotLow = false;
        break;
      }
    }

    if (isPivotLow) {
      pivotLows.push({
        index: i,
        low: data[i].low,
        val: data[i].low,
        timestamp: data[i].timestamp,
      });
    }
  }

  return pivotLows;
}
function pivotHigh(data, leftBars, rightBars) {
  let pivotHighs = [];

  for (let i = leftBars; i < data.length - rightBars; i++) {
    let isPivotHigh = true;

    for (let j = i - leftBars; j <= i + rightBars; j++) {
      if (j !== i && data[j].high >= data[i].high) {
        isPivotHigh = false;
        break;
      }
    }

    if (isPivotHigh) {
      pivotHighs.push({
        index: i,
        high: data[i].high,
        val: data[i].high,
        timestamp: data[i].timestamp,
      });
    }
  }

  return pivotHighs;
}

var findHL = {
  name: "pp",
  shortName: "pp",

  calcParams: [20], // Length parameter from Pine Script
  figures: [
    { key: "HH", title: "HH: ", type: "circle" },
    { key: "HL", title: "HL: ", type: "circle" },
    { key: "LL", title: "LL: ", type: "circle" },
    { key: "LH", title: "LH: ", type: "circle" },
  ],
  calc: (data, { calcParams }) => {
    if (data.length > 0) {
      const length = calcParams[0];
      //let ph= getPivotHigh(data, length,length);
      let pl = pivotLow(data, length, length);
      let ph = pivotHigh(data, length, length);
      let patterns = findPivotPatterns(ph, pl);

      //console.log(ph, pl, patterns);
      function determineBoS(ohlcvData, pivotPoints) {
        const bosSignals = {
          bullish: [],
          bearish: [],
        };

        // Duyệt qua dữ liệu OHLCV và xác định BoS
        ohlcvData.forEach((data, index) => {
          // Xác định BoS lên
          if (
            pivotPoints.HH.some((p) => p.index === index) &&
            pivotPoints.HL.some((p) => p.index > index)
          ) {
            bosSignals.bullish.push({ index: index, value: data.low });
          }

          // Xác định BoS xuống
          if (
            pivotPoints.LL.some((p) => p.index === index) &&
            pivotPoints.LH.some((p) => p.index > index)
          ) {
            bosSignals.bearish.push({ index: index, value: data.high });
          }
        });

        return bosSignals;
      }

      let bos = determineBoS(data, patterns);
      //  console.log(bos)
      return { ...patterns, bos };
    }

    return {};
  },
  draw: ({
    kLineDataList,
    ctx,
    barSpace,
    visibleRange,
    indicator,
    xAxis,
    yAxis,
  }) => {
    const { from, to } = visibleRange;

    ctx.font = "normal 12px ";
    ctx.textAlign = "center";
    let result = indicator.result.HH;

    indicator.result.HH.forEach((pattern) => {
      // Assuming ohlcv[pattern.index] is valid and pattern.type is one of 'HH', 'HL', 'LL', 'LH'
      if (kLineDataList[pattern.index]) {
        kLineDataList[pattern.index].patternType = "HH";
      }
    });

    indicator.result.HL.forEach((pattern) => {
      // Assuming ohlcv[pattern.index] is valid and pattern.type is one of 'HH', 'HL', 'LL', 'LH'
      if (kLineDataList[pattern.index]) {
        kLineDataList[pattern.index].patternType = "HL";
      }
    });

    indicator.result.LL.forEach((pattern) => {
      // Assuming ohlcv[pattern.index] is valid and pattern.type is one of 'HH', 'HL', 'LL', 'LH'
      if (kLineDataList[pattern.index]) {
        kLineDataList[pattern.index].patternType = "LL";
      }
    });

    indicator.result.LH.forEach((pattern) => {
      // Assuming ohlcv[pattern.index] is valid and pattern.type is one of 'HH', 'HL', 'LL', 'LH'
      if (kLineDataList[pattern.index]) {
        kLineDataList[pattern.index].patternType = "LH";
      }
    });

    for (let i = from; i < to; i++) {
      const data = kLineDataList[i];

      if (data.patternType) {
        let x = xAxis.convertToPixel(i);
        let y;
        if (data.patternType === "HH" || data.patternType === "LH") {
          y = yAxis.convertToPixel(data.high) - 20;

          ctx.fillText("⏷", x, y + 10);
          ctx.fillStyle = "red";
        }

        if (data.patternType === "LL" || data.patternType === "HL") {
          y = yAxis.convertToPixel(data.low) + 10;

          ctx.fillText("⏶", x, y - 10);
          ctx.fillStyle = "red";
        }

        ctx.fillText(data.patternType, x, y);
      }
    }

    ctx.font = "normal 12px ";
    ctx.textAlign = "center";
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2 // Set the line color

    ctx.setLineDash([]);


    let lastPoint = null;

    for (let i = from; i < to; i++) {
      const data = kLineDataList[i];

      if (data) {
        let x = xAxis.convertToPixel(i);
        let y;
        let currentPoint = null;

        // Check for HH, HL, LL, LH points and set their position
        if (data.patternType === "HH" || data.patternType === "HL" || data.patternType === "LL" || data.patternType === "LH") {
          if (data.patternType === "HH" || data.patternType === "LH") {
            y = yAxis.convertToPixel(data.high);
            ctx.fillStyle = "red"; // Color for HH and LH
          } else {
            y = yAxis.convertToPixel(data.low);
            ctx.fillStyle = "green"; // Color for HL and LL
          }

          currentPoint = { x, y };
          // Connect the current point with the last point
          if (lastPoint) {
            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.stroke();
          }

          lastPoint = currentPoint;
        }
      }
    }
    return true;
  },
};

var findHL1 = {
  name: "pp1",
  shortName: "pp1",

  calcParams: [20], // Length parameter from Pine Script
  figures: [{ key: "bull", title: "HH: ", type: "line" }],
  calc: (data, { calcParams }) => {
    if (data.length > 0) {
      const length = calcParams[0];
      //let ph= getPivotHigh(data, length,length);
      let pl = pivotLow(data, length, length);
      let ph = pivotHigh(data, length, length);
      let patterns = findPivotPatterns(ph, pl);

      //console.log(ph, pl, patterns);
      function determineBoS(ohlcvData, pivotPoints) {
        const bosSignals = {
          bullish: [],
          bearish: [],
        };
        let bull = [];

        // Duyệt qua dữ liệu OHLCV và xác định BoS
        ohlcvData.forEach((data, index) => {
          // Xác định BoS lên
          if (
            pivotPoints.HH.some((p) => p.index === index) &&
            pivotPoints.HL.some((p) => p.index > index)
          ) {
            bull.push({
              bull: data.low,
            });
            bosSignals.bullish.push({ index: index, value: data.low });
          } else {
            bull.push({
              bull: null,
            });
          }

          // Xác định BoS xuống
          if (
            pivotPoints.LL.some((p) => p.index === index) &&
            pivotPoints.LH.some((p) => p.index > index)
          ) {
            bosSignals.bearish.push({ index: index, value: data.high });
          }
        });

        return bull;
      }
      let bos = determineBoS(data, patterns);

      return bos;
    }
  },
};

function findPivotPatterns(pivotHighs, pivotLows) {
  let HH = [],
    LH = [],
    HL = [],
    LL = [];

  // Xác định Higher Highs và Lower Highs
  let lastHigh = null;
  pivotHighs.forEach((point) => {
    if (lastHigh === null || point.high > lastHigh.high) {
      HH.push(point);
    } else {
      LH.push(point);
    }
    lastHigh = point;
  });

  // Xác định Higher Lows và Lower Lows
  let lastLow = null;
  pivotLows.forEach((point) => {
    if (lastLow === null || point.low > lastLow.low) {
      HL.push(point);
    } else {
      LL.push(point);
    }
    lastLow = point;
  });

  return { HH, LH, HL, LL };
}


var swingHighLowIndicator = {
  name: "SwingHighLow",
  shortName: "SwingHL",

  calcParams: [12, 3], // Ví dụ: 5 bars bên trái, 3 bars bên phải
  figures: [
    { key: "SW", title: "SW: ", type: "circle" },
    { key: "SL", title: "SL: ", type: "circle" },
  ],

  calc: (data, { calcParams }) => {
    const [leftBar, rightBar] = calcParams;
    const swingLows = [];
    const swingHighs = [];

    for (let i = leftBar; i < data.length - rightBar; i++) {
      let isSwingLow = true;
      let isSwingHigh = true;

      for (let j = -leftBar; j <= rightBar; j++) {
        if (data[i + j].low < data[i].low) {
          isSwingLow = false;
        }
        if (data[i + j].high > data[i].high) {
          isSwingHigh = false;
        }
      }

      if (isSwingLow) {
        swingLows.push({ index: i, value: data[i].low });
      }
      if (isSwingHigh) {
        swingHighs.push({ index: i, value: data[i].high });
      }
    }

    return { swingLows, swingHighs };
  },

  draw: ({
    kLineDataList,
    ctx,
    barSpace,
    visibleRange,
    indicator,
    xAxis,
    yAxis,
  }) => {
    const { swingLows, swingHighs } = indicator.result;

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'green'; // Màu cho đường nối
    ctx.lineWidth = 3

    // Vẽ text cho Swing Lows
    swingLows.forEach((low) => {
      const x = xAxis.convertToPixel(low.index);
      const y = yAxis.convertToPixel(low.value);
      ctx.fillText("SL", x, y); // Vẽ text "SL"
    });

    // Vẽ text cho Swing Highs
    swingHighs.forEach((high) => {
      const x = xAxis.convertToPixel(high.index);
      const y = yAxis.convertToPixel(high.value);
      ctx.fillText("SH", x, y); // Vẽ text "SH"
    });


    let swingPoints = swingLows.concat(swingHighs);
    // // Sắp xếp các điểm theo thứ tự xuất hiện trên biểu đồ
    swingPoints.sort((a, b) => a.index - b.index);
    let filteredSwingPoints = [];
    let lastPointType = null;

    for (let i = 0; i < swingPoints.length; i++) {
      let currentPoint = swingPoints[i];
      let currentPointType = swingLows.includes(currentPoint) ? 'SL' : 'SH';

      if (lastPointType === null || lastPointType !== currentPointType) {
        // Nếu điểm hiện tại và điểm trước đó khác loại (SH/SL), thêm vào danh sách lọc
        filteredSwingPoints.push(currentPoint);
        lastPointType = currentPointType;
      } else {
        // Nếu hai điểm liên tiếp cùng loại, bỏ qua điểm đầu tiên và thêm điểm thứ hai
        if (i + 1 < swingPoints.length) {
          filteredSwingPoints.push(swingPoints[i + 1]);
          lastPointType = currentPointType;
          i++; // Tăng chỉ số để bỏ qua kiểm tra điểm tiếp theo
        }
      }
    }
   // swingPoints = filteredSwingPoints
  
    for (let i = 0; i < swingPoints.length - 1; i++) {
      const currentPoint = swingPoints[i];
      const nextPoint = swingPoints[i + 1];

      // Vẽ text tại mỗi điểm
      const x = xAxis.convertToPixel(currentPoint.index);
      const y = yAxis.convertToPixel(currentPoint.value);
      const text = currentPoint.value === swingLows.find(p => p.index === currentPoint.index)?.value ? "SL" : "SH";
      ctx.fillText(text, x, y);

      // Nối điểm hiện tại với điểm tiếp theo
      const nextX = xAxis.convertToPixel(nextPoint.index);
      const nextY = yAxis.convertToPixel(nextPoint.value);
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
    }

    ctx.stroke();

    return true;
  },

  // draw: ({
  //   kLineDataList,
  //   ctx,
  //   barSpace,
  //   visibleRange,
  //   indicator,
  //   xAxis,
  //   yAxis,
  // }) => {
  //   const { swingLows, swingHighs } = indicator.result;
  
  //   let swingPoints = swingLows.concat(swingHighs);
  //   // Sắp xếp các điểm theo thứ tự xuất hiện trên biểu đồ
  //   swingPoints.sort((a, b) => a.index - b.index);
  
  //   // Lọc các điểm SH và SL để chúng xen kẽ nhau
  //   let filteredSwingPoints = [];
  //   let lastPointType = null;
  
  //   for (let i = 0; i < swingPoints.length; i++) {
  //     let currentPoint = swingPoints[i];
  //     let currentPointType = swingLows.includes(currentPoint) ? 'SL' : 'SH';
  
  //     if (lastPointType === null || lastPointType !== currentPointType) {
  //       filteredSwingPoints.push(currentPoint);
  //       lastPointType = currentPointType;
  //     } else {
  //       // Nếu hai điểm liên tiếp cùng loại, loại bỏ điểm đầu tiên và chọn điểm thứ hai
  //       if (i  < swingPoints.length) {
  //         i++; // Tăng chỉ số để bỏ qua điểm hiện tại
  //       }
  //     }
  //   }
  
  //   ctx.beginPath();
  //   ctx.strokeStyle = 'white'; // Màu cho đường nối
  
  //   // Vẽ và nối các điểm đã lọc
  //   for (let i = 0; i < filteredSwingPoints.length - 1; i++) {
  //     const currentPoint = filteredSwingPoints[i];
  //     const nextPoint = filteredSwingPoints[i + 1];
  
  //     // Vẽ text tại mỗi điểm
  //     const x = xAxis.convertToPixel(currentPoint.index);
  //     const y = yAxis.convertToPixel(currentPoint.value);
  //     const text = swingLows.includes(currentPoint) ? "L" : "H";
  //     ctx.fillText(text, x, y);
  
  //     // Nối điểm hiện tại với điểm tiếp theo
  //     const nextX = xAxis.convertToPixel(nextPoint.index);
  //     const nextY = yAxis.convertToPixel(nextPoint.value);
  //     ctx.moveTo(x, y);
  //     ctx.lineTo(nextX, nextY);
  //   }
  
  //   ctx.stroke();
  //   return true;
  // },
  // draw: ({
  //   kLineDataList,
  //   ctx,
  //   barSpace,
  //   visibleRange,
  //   indicator,
  //   xAxis,
  //   yAxis,
  // }) => {
  //   const { swingLows, swingHighs } = indicator.result;
  
  //   let swingPoints = swingLows.concat(swingHighs);
  //   // Sắp xếp các điểm theo thứ tự xuất hiện trên biểu đồ
  //   swingPoints.sort((a, b) => a.index - b.index);
  
  //   // Lọc các điểm SH và SL để chúng xen kẽ nhau
  //   let filteredSwingPoints = [];
  //   let lastPointType = null;
  
  //   for (let i = 0; i < swingPoints.length; i++) {
  //     let currentPoint = swingPoints[i];
  //     let currentPointType = swingLows.includes(currentPoint) ? 'SL' : 'SH';
  
  //     if (lastPointType === null || lastPointType !== currentPointType) {
  //       filteredSwingPoints.push(currentPoint);
  //       lastPointType = currentPointType;
  //     } else {
  //       // Nếu hai điểm liên tiếp cùng loại, loại bỏ điểm đầu tiên và chọn điểm thứ hai
  //       if (i + 1 < swingPoints.length) {
  //         i++; // Tăng chỉ số để bỏ qua điểm hiện tại
  //       }
  //     }
  //   }
  
  //   ctx.beginPath();
  //   ctx.strokeStyle = 'blue'; // Màu cho đường nối
  
  //   // Vẽ và nối các điểm đã lọc
  //   for (let i = 0; i < filteredSwingPoints.length - 1; i++) {
  //     const currentPoint = filteredSwingPoints[i];
  //     const nextPoint = filteredSwingPoints[i + 1];
  
  //     // Vẽ text tại mỗi điểm
  //     const x = xAxis.convertToPixel(currentPoint.index);
  //     const y = yAxis.convertToPixel(currentPoint.value);
  //     const text = swingLows.includes(currentPoint) ? "SL" : "SH";
  //     ctx.fillText(text, x, y);
  
  //     // Nối điểm hiện tại với điểm tiếp theo bằng đường thẳng
  //     const nextX = xAxis.convertToPixel(nextPoint.index);
  //     const nextY = yAxis.convertToPixel(nextPoint.value);
  //     ctx.moveTo(x, y);
  //     ctx.lineTo(nextX, nextY);
  //   }
  
  //   ctx.stroke();
  //   return true;
  // },
 
  
  
};



export { linear, myBot34, myBot89, donchianIndicator, zigzag, supres, findHL, findHL1, swingHighLowIndicator };