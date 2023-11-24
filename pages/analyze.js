
import { IndicatorsNormalized } from "@ixjb94/indicators/dist/indicators-browser"
const ta = new IndicatorsNormalized()
function findEMACrossover(ema1, ema2) {
    let crossoverIndexes = [];

    for (let i = 1; i < ema1.length; i++) {
        // Kiểm tra xem có crossover từ dưới lên trên không
        if (ema1[i] > ema2[i] && ema1[i - 1] <= ema2[i - 1]) {
            crossoverIndexes.push(i);
        }
        // Kiểm tra xem có crossover từ trên xuống dưới không
        else if (ema1[i] < ema2[i] && ema1[i - 1] >= ema2[i - 1]) {
            crossoverIndexes.push(i);
        }
    }

    return crossoverIndexes;
}
function findSupportResistance(ohlcvData) {
    let supports = [];
    let resistances = [];
    let tolerance = 0.02; // Độ lệch giá cho phép để xác định các mức, có thể điều chỉnh

    for (let i = 1; i < ohlcvData.length - 1; i++) {
        let prev = ohlcvData[i - 1];
        let current = ohlcvData[i];
        let next = ohlcvData[i + 1];

        // Kiểm tra mức resistance
        if (current.high > prev.high && current.high > next.high) {
            let isResistance = true;
            for (let res of resistances) {
                if (current.high >= res * (1 - tolerance) && current.high <= res * (1 + tolerance)) {
                    isResistance = false;
                    break;
                }
            }
            if (isResistance) {
                resistances.push(current.high);
            }
        }

        // Kiểm tra mức support
        if (current.low < prev.low && current.low < next.low) {
            let isSupport = true;
            for (let sup of supports) {
                if (current.low >= sup * (1 - tolerance) && current.low <= sup * (1 + tolerance)) {
                    isSupport = false;
                    break;
                }
            }
            if (isSupport) {
                supports.push(current.low);
            }
        }
    }
    ohlcvData.forEach(data => {
        let nearestSupport = supports.find(sup => Math.abs(sup - data.low) / data.low < tolerance);
        let nearestResistance = resistances.find(res => Math.abs(res - data.high) / data.high < tolerance);

        data.support = nearestSupport || null;
        data.resistance = nearestResistance || null;
    });
   
    let result = findKeyLevels(ohlcvData, supports, resistances, 0.02);
    
    return { supports, resistances,ohlcvData:result };
}

function findKeyLevels(ohlcvData, supports, resistances, tolerance) {
    let combinedLevels = supports.concat(resistances);
    let levelCounts = {};

    // Đếm số lần mỗi mức giá được chạm đến
    combinedLevels.forEach(level => {
        ohlcvData.forEach(data => {
            if (Math.abs(level - data.low) / data.low < tolerance || Math.abs(level - data.high) / data.high < tolerance) {
                levelCounts[level] = (levelCounts[level] || 0) + 1;
            }
        });
    });

    // Tìm keyLevel dựa trên số lần chạm đến nhiều nhất
    let keyLevels = [];
    Object.keys(levelCounts).forEach(level => {
        if (levelCounts[level] > 1) { // Chỉ chọn mức giá được chạm đến nhiều hơn một lần
            keyLevels.push(parseFloat(level));
        }
    });

    // Thêm keyLevels vào mỗi đối tượng trong mảng ohlcvData
    ohlcvData.forEach(data => {
        let nearestKeyLevel = keyLevels.find(level => Math.abs(level - data.low) / data.low < tolerance || Math.abs(level - data.high) / data.high < tolerance);
        data.keyLevel = nearestKeyLevel || null;
    });

    return ohlcvData;
}



function annotateSupportResistance(ohlcvData) {
    let tolerance = 0.02; // Độ lệch giá cho phép để xác định các mức

    // Tìm và gán các mức support và resistance
    for (let i = 1; i < ohlcvData.length - 1; i++) {
        let prev = ohlcvData[i - 1];
        let current = ohlcvData[i];
        let next = ohlcvData[i + 1];

        // Xác định mức resistance
        if (current.high > prev.high && current.high > next.high) {
            let isNearExistingRes = ohlcvData.some(
                data => Math.abs(data.resistance - current.high) / current.high < tolerance
            );
            if (!isNearExistingRes) {
                current.resistance = current.high;
            }
        }

        // Xác định mức support
        if (current.low < prev.low && current.low < next.low) {
            let isNearExistingSup = ohlcvData.some(
                data => Math.abs(data.support - current.low) / current.low < tolerance
            );
            if (!isNearExistingSup) {
                current.support = current.low;
            }
        }
    }

    return ohlcvData;
}

async function analyzeSymbol(ohlcv) {
    console.log('start')
    //b1.tìm trend lớn

    let close = ohlcv.map(i => i.close)
    let myBot1 = await getMyBot(close, 34, 1.326, ohlcv)
    //
    let resistantAndSupport = findSupportResistance(ohlcv)
    let a = annotateSupportResistance(ohlcv)
    
    return {bot:myBot1,supres:resistantAndSupport,};

}

function nz(x) {
    return isNaN(x) ? 0 : x
}
async function getMyBot(data, period, multi, rawOHLCV) {

    //let ema14 = EMA.calculate({ period, values: data })
    let ema14 = await ta.ema(data, period)
    // ema14 = await ta.linreg(data,period)
    let t2 = Array(ema14.length)

    // let t2=[]
    for (let i = 1; i < ema14.length; i++) {
        let t1 = ema14[i]
        let sl = t1 * (multi / 100)
        let iff1 = (t1 > nz(t2[i - 1])) ? t1 - sl : t1 + sl
        let iff2 = (t1 < nz(t2[i - 1]) && ema14[i - 1] < nz(t2[i - 1])) ? Math.min(nz(t2[i - 1]), t1 + sl) : iff1
        let iff3 = (t1 > nz(t2[i - 1]) && ema14[i - 1] > nz(t2[i - 1])) ? Math.max(nz(t2[i - 1]), t1 - sl) : iff2
        t2[i] = iff3
    }
    let t1 = ema14;

    let crossPeriod = findEMACrossover(t1, t2)
    let periodBot = []
    for (let i = 1; i < crossPeriod.length - 1; i++) {
        let objectPeriod = {
            start: rawOHLCV[crossPeriod[i] - 1],
            dateStart: new Date(rawOHLCV[crossPeriod[i] - 1].timestamp),
            end: rawOHLCV[crossPeriod[i + 1] - 1],
            t1: [],
            t2: [],
            endDay: new Date(rawOHLCV[crossPeriod[i + 1] - 1].timestamp),
            trend: t1[crossPeriod[i]] > t2[crossPeriod[i]] ? "LONG" : "SHORT",
            ohlcvArray: [],
            countBar: 0,
        }
        for (let j = crossPeriod[i]; j < crossPeriod[i + 1]; j++) {
            let ohlcv = rawOHLCV[j]
            ohlcv.t1 = t1[j]
            ohlcv.t2 = t2[j]
            objectPeriod.t1.push(t1[j])
            objectPeriod.t2.push(t2[j])
            objectPeriod.ohlcvArray.push(rawOHLCV[j])
            objectPeriod.countBar++
        }
        periodBot.push(objectPeriod)
    }

    let currentOhlcvArray = []
    let currentCountBar = 0
    let currentT1 = []
    let currentT2 = []
    for (let i = crossPeriod[crossPeriod.length - 1] + 1; i < rawOHLCV.length; i++) {
        let ohlcv = rawOHLCV[i]
        ohlcv.t1 = t1[i]
        ohlcv.t2 = t2[i]
        currentOhlcvArray.push(ohlcv)
        currentT1.push(t1[i])
        currentT2.push(t2[i])
        currentCountBar++;
    }
    let currentPeriod = {
        t1: currentT1,
        t2: currentT2,
        start: rawOHLCV[crossPeriod[crossPeriod.length - 1]],
        dateStart: new Date(rawOHLCV[crossPeriod[crossPeriod.length - 1]].timestamp),
        end: rawOHLCV[rawOHLCV.length - 1],
        endDay: new Date(rawOHLCV[rawOHLCV.length - 1].timestamp),
        trend: t1[crossPeriod[crossPeriod.length - 1]] > t2[crossPeriod[crossPeriod.length - 1]] ? "LONG" : "SHORT",
        currentOhlcvArray,
        currentCountBar,
    }
    let result = {
        name: "mybot",
        period: period,
        multi: multi,
        periodBot,
        currentPeriod,
        result: {
            t1,
            t2,
        },

    }

    return result
}

export {
    analyzeSymbol
}