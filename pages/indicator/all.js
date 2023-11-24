// var smcIndicator1 = {
//   name: "SMC1",
//   shortName: "SMC1",
//   calcParams: [15, 2],
//   figures: [{ key: "HH", title: "HL: ", type: "text" }],
//   calc: (data, { calcParams }) => {
//     let lookback = calcParams[0];
//     let lastPivotHigh = null;
//     let lastPivotLow = null;
//     const pivots = { HH: [], HL: [], LL: [], LH: [] };

//     for (let i = lookback; i < data.length - lookback; i++) {
//       let isHH = true;
//       let isLL = true;
//       for (let j = 1; j <= lookback; j++) {
//         if (
//           data[i - j].high >= data[i].high ||
//           data[i + j].high >= data[i].high
//         ) {
//           isHH = false;
//         }
//         if (data[i - j].low <= data[i].low || data[i + j].low <= data[i].low) {
//           isLL = false;
//         }
//       }

//       if (isHH) {
//         pivots.HH.push({ index: i, value: data[i].high });
//       }
//       if (isLL) {
//         pivots.LL.push({ index: i, value: data[i].low });
//       }

//       // HL and LH are determined by comparing to previous HH and LL
//       if (i > 0) {
//         if (
//           data[i].low > data[i - 1].low &&
//           data[i - 1].low < pivots.LL[pivots.LL.length - 1]?.value
//         ) {
//           pivots.HL.push({ index: i, value: data[i].low });
//         }
//         if (
//           data[i].high < data[i - 1].high &&
//           data[i - 1].high > pivots.HH[pivots.HH.length - 1]?.value
//         ) {
//           pivots.LH.push({ index: i, value: data[i].high });
//         }
//       }
//     }

//     const figures = [];
//     console.log(pivots);

//     pivots.HH.forEach((pivot) => {
//       console.log(pivot);
//       figures.push({
//         HH: {
//           value: [
//             calculateXCoordinate(pivot.index, chartDimensions),
//             calculateYCoordinate(pivot.value, chartDimensions),
//           ],
//         },
//       });
//     });
//     return figures;
//   },
// };

// var smcIndicator = {
//   name: "SMC",
//   shortName: "SMC",
//   calcParams: [5], // default deviation for zigzag
//   figures: [
//     { key: "zigzag", title: "ZigZag", type: "line" },
//     { key: "bos", title: "BOS", type: "line" },
//     { key: "choch", title: "CHoCH", type: "line" },
//   ],
//   regenerateFigures: (params) => {
//     return [
//       { key: "zigzag", title: "ZigZag", type: "line" },
//       { key: "bos", title: "BOS", type: "line" },
//       { key: "choch", title: "CHoCH", type: "line" },
//     ];
//   },
//   calc: (kLineDataList, { calcParams }) => {
//     const deviation = calcParams[0];
//     const zigzagValues = zigzag(kLineDataList, deviation);
//     const bosLine = [];
//     const chochLine = [];
//     let previousType = null;

//     for (let i = 1; i < zigzagValues.length; i++) {
//       const currentZigzag = zigzagValues[i];
//       const previousZigzag = zigzagValues[i - 1];

//       // Check for BOS and CHoCH
//       if (currentZigzag.deviation > 0 && previousZigzag.deviation < 0) {
//         bosLine[i] = currentZigzag.value;
//         previousType = "BOS";
//       } else if (currentZigzag.deviation < 0 && previousZigzag.deviation > 0) {
//         chochLine[i] = currentZigzag.value;
//         previousType = "CHoCH";
//       } else {
//         if (previousType === "BOS") {
//           bosLine[i] = (bosLine[i - 1] + currentZigzag.value) / 2;
//         } else if (previousType === "CHoCH") {
//           chochLine[i] = (chochLine[i - 1] + currentZigzag.value) / 2;
//         }
//       }
//     }

//     return kLineDataList.map((_, i) => {
//       return {
//         zigzag: zigzagValues[i]?.value || null,
//         bos: bosLine[i],
//         choch: chochLine[i],
//       };
//     });
//   },
// };

import { IndicatorsNormalized } from "@ixjb94/indicators/dist/indicators-browser"
const ta = new IndicatorsNormalized()

const myBot89 = {
  name: "myBot89",
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
      //  console.log(highestHigh, lowestLow);
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

export { linear, myBot34, myBot89, donchianIndicator, zigzag, supres, findHL, findHL1 };