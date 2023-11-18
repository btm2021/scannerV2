<template>
  <b-row class="no-gutters">
    <b-col cols="9">
      <div
        id="chart"
        style="width: 100%; height: 600px; background-color: #151924"
      />
    </b-col>
    <b-col cols="3">
      <b-row class="no-gutters">
        <b-col cols="2">
          <b-button-group vertical>
            <b-button class="myBtn" @click="createOverLay('rule')" size="sm">
              <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path fill="currentColor" d="M2 9.75a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h24a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 1h3v2.5h1v-2.5h3.25v3.9h1v-3.9h3.25v2.5h1v-2.5h3.25v3.9h1v-3.9H22v2.5h1v-2.5h3a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-5.5a.5.5 0 0 1 .5-.5z" transform="rotate(-45 14 14)"></path></svg></span>
            </b-button>
            <b-button
              @click="createOverLay('priceLine')"
              class="myBtn"
              size="sm"
            >
            <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M8.5 15h16.5v-1h-16.5z"></path><path d="M6.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
            </b-button>
          
            <b-button @click="createOverLay('fibonacciLine')" class="myBtn" size="sm">
              <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M3 5h22v-1h-22z"></path><path d="M3 17h22v-1h-22z"></path><path d="M3 11h19.5v-1h-19.5z"></path><path d="M5.5 23h19.5v-1h-19.5z"></path><path d="M3.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM24.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
            </b-button>
        <b-button @click="createOverLay('rect')" class="myBtn">
          <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M7.5 6h13v-1h-13z" id="Line"></path><path d="M7.5 23h13v-1h-13z"></path><path d="M5 7.5v13h1v-13z"></path><path d="M22 7.5v13h1v-13z"></path><path d="M5.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
        </b-button>
        <b-button  class="myBtn" v-b-modal.modal-indicator>
          <span class="icon-jFqVJoPk"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M23.868 7.825c2.791 3.916 2.918 9.33-.065 13.435-3.733 5.138-10.925 6.277-16.063 2.544l.721-.714c4.682 3.294 11.157 2.229 14.534-2.418 2.641-3.635 2.657-8.502.153-12.133l.721-.714z"></path><path d="M8.477 5.899c3.584-2.509 8.298-2.514 11.865-.127l.718-.721c-3.845-2.669-9.099-2.813-13.157.028-5.203 3.643-6.467 10.814-2.824 16.016l.718-.721c-3.201-4.737-2.022-11.185 2.68-14.476z"></path><path d="M14.5 22c4.142 0 7.5-3.358 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5zm0 1c-4.694 0-8.5-3.806-8.5-8.5s3.806-8.5 8.5-8.5 8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z"></path><path d="M14.5 19c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5zm0 1c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5z"></path><path d="M22.5 8c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM6.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
        </b-button>
          </b-button-group>
        </b-col>
        <b-col cols="8" >
          <div>das</div>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="2"></b-col>
    
  <b-modal scrollable id="modal-indicator" title="Indicator">
    <b-table :fields="fieldsIndicator" striped hover :items="listIndicator" small>
      <template #cell(name)="data">
          <b @click="addIndicator(data.item)" class="choiceIndicator" >
            <span 
            :class="data.item.isAdd?'text-primary':'text-secondary'"
            
            >
            {{ data.item.name }}</span>
          </b>
      </template>
    </b-table>
  </b-modal>
  </b-row>
</template>
      
<script>
import * as klinecharts from "klinecharts";
import {rect,rule} from './overlay/all.js'
import {myBot34,myBot89,donchianIndicator,zigzag} from './indicator/all.js'
//overlay

const listOverLay=[rect,rule]
const listIndicator=[myBot34,myBot89,donchianIndicator,zigzag]
//indicator
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
var chart;
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
//     const result = [];
//     let lastResistance = null;
//     let lastSupport = null;

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

//         if (
//           kLineData.high === highestPoint &&
//           kLineData.volume > volumeThreshold
//         ) {
//           lastResistance = kLineData.high;
//         }

//         if (
//           kLineData.low === lowestPoint &&
//           kLineData.volume > volumeThreshold
//         ) {
//           lastSupport = kLineData.low;
//         }

//         result.push({
//           resistance: lastResistance,
//           support: lastSupport,
//         });
//       }
//     });
//     return result;
//   },
// };
var binanceSocket;
export default {
  data() {
    return {
      dataOHLCV: [],
      chart: null,
      symbol: "BTCUSDT",
      timeframe: "15m",
      listIndicator:[
        {name:'zigzag',nameRegistor:'zigzag',value:'ZigZag',type:'main',calcParams:[2],isAdd:false},
        {name:'bot89',nameRegistor:'myBot89',value:'bot89',type:'main', calcParams: [89, 1.326],isAdd:false},
        {name:'bot34',nameRegistor:'myBot34',value:'bot34',type:'main', calcParams: [34, 1.326],isAdd:false},
        {name:'donchian',nameRegistor:'DONCHIAN',value:'donchian',type:'main',calcParams: [100],isAdd:false},
        {name:'ema21',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [21],isAdd:false},
        {name:'ema34',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [34],isAdd:false},
        {name:'ema89',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [89],isAdd:false},
        {name:'ema100',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [100],isAdd:false},
        {name:'ema200',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [200],isAdd:false},
        {name:'ema610',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [610],isAdd:false},
        {name:'BOLL',nameRegistor:'BOLL',value:'BOLL',type:'main',calcParams:[20,2],isAdd:false},
        {name:'BBI',nameRegistor:'BBI',value:'ema',type:'main',calcParams: [3, 6, 12, 24],isAdd:false},
        {name:'VOL',nameRegistor:'VOL',value:'VOL',type:'sub',calcParams: [1],isAdd:false},
        {name:'RSI',nameRegistor:'RSI',value:'RSI',type:'sub',calcParams: [14],isAdd:false},
        {name:'MACD',nameRegistor:'MACD',value:'MACD',type:'sub',calcParams: [12, 26, 9],isAdd:false},
        {name:'KDJ',nameRegistor:'KDJ',value:'KDJ',type:'sub',calcParams: [9, 3, 3],isAdd:false},
        {name:'AO',nameRegistor:'AO',value:'AO',type:'sub',calcParams:[5, 34],isAdd:false},
        {name:'CCI',nameRegistor:'CCI',value:'CCI',type:'sub',calcParams:[13],isAdd:false},
      
      ],
      fieldsIndicator:[
        {key:'name'},
        {key:'type'},
        {key:'calcParams'},
      ],
      optionChart : {
         
          styles: {
            indicator: {
              tooltip: {
                showRule:'none',
                showType:'none'
              },
            },
            grid: {
              show: false,
              horizontal: {
                show: true,
                size: 1,
                color: "#EDEDED",
                style: "dashed",
                dashedValue: [2, 2],
              },
              vertical: {
                show: false,
                size: 1,
                color: "#EDEDED",
                style: "dashed",
                dashedValue: [2, 2],
              },
            },
          },
        }
    };
  },
  methods: {
    addIndicator(indicator) {
      let type=indicator.type
      if(indicator.isAdd){
        //remove
        this.chart.removeIndicator((type==="main"?"candle_pane":indicator.name), indicator.nameRegistor)
        let indi = this.listIndicator.find(i=>i.name===indicator.name)
        indi.isAdd=false
      }else{
        if(type==='main'){
        this.chart.createIndicator({name:indicator.nameRegistor, calcParams:indicator.calcParams}, true, { id: 'candle_pane' })
        //change isAdd
       
      }else{
        this.chart.createIndicator({name:indicator.nameRegistor}, true, { id: indicator.name })
      
      }
      let indi = this.listIndicator.find(i=>i.name===indicator.name)
        indi.isAdd=true
      }
     
   //  
    },
    createOverLay(type) {
      this.chart.createOverlay(type);
    },
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
      
        this.fetchData().then((data) => {
          let chart = klinecharts.init("chart",this.optionChart);
        
          this.chart = chart;
          listOverLay.forEach((i) => {
            klinecharts.registerOverlay(i);
          })
          listIndicator.forEach((i) => {
            klinecharts.registerIndicator(i);
          })
        
          chart.setPriceVolumePrecision(optionFromExchange.pricePrecision, 10);

          // chart.createIndicator(
          //   {
          //     name: "pp",
          //     calcParams: [12],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );

          // chart.createIndicator(
          //   {
          //     name: "pp1",
          //     calcParams: [12],
          //   },
          //   true,
          //   { id: "candle_pane" }
          // );
        
          chart = chart;
          window.addEventListener("resize", () => {
            this.chart.resize();
          });
          chart.applyNewData(data);
          //gọi stream
          let binanceStreamURL = `wss://fstream.binance.com/ws/${this.symbol.toLowerCase()}@kline_${
            this.timeframe
          }`;
          binanceSocket = `wss://stream.binance.com:443`;

          binanceSocket = new WebSocket(binanceStreamURL);
          binanceSocket.onopen = (event) => {
            console.log(`Subcired to ${this.symbol} - ${this.timeframe}`);
          };
          binanceSocket.onclose = (event) => {
            console.log(`Unscribed to ${this.symbol} - ${this.timeframe}`);
          };

          binanceSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            let newData = {
              // Timestamp, millisecond, required fields
              timestamp: message.k.t,
              // Open price, required fields
              open: parseFloat(message.k.o),
              // Close price, required field
              close: parseFloat(message.k.c),
              // Highest price, required field
              high: parseFloat(message.k.h),
              // Lowest price, required field
              low: parseFloat(message.k.l),
              // volume, optional field
              volume: parseFloat(message.k.v),
            };
            this.chart.updateData(newData);
          };
        });
      }
    },
  },
  unmounted() {
    console.log("Unmounted");
    binanceSocket.close();
    dispose("chart");
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
<style scoped>
.myBtn {
  width: 100%;
  color: red;
  background: none;
  border: 0px;
}
.choiceIndicator{

}
.choiceIndicator:hover{
  color:blue;
  cursor: pointer;
}
</style>
      