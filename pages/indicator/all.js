
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
export { myBot34,myBot89,donchianIndicator ,zigzag}