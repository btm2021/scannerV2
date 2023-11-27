function checkTrendLine(support, pivot, slope, data) {
    let intercept = -slope * pivot + data[pivot].close;
    let diffs = data.map((point, index) => (slope * index + intercept) - point.close);

    if (support && Math.max(...diffs) > 1e-5) return -1;
    if (!support && Math.min(...diffs) < -1e-5) return -1;

    return diffs.reduce((sum, diff) => sum + diff * diff, 0);
}

function optimizeSlope(support, pivot, initSlope, data) {
    let slopeUnit = (Math.max(...data.map(p => p.close)) - Math.min(...data.map(p => p.close))) / data.length;
    let optStep = 1.0;
    let minStep = 0.0001;
    let currStep = optStep;
    let bestSlope = initSlope;
    let bestErr = checkTrendLine(support, pivot, initSlope, data);

    while (currStep > minStep) {
        let slopeChange = bestSlope + slopeUnit * minStep;
        let testErr = checkTrendLine(support, pivot, slopeChange, data);

        if (testErr >= 0 && testErr < bestErr) {
            bestErr = testErr;
            bestSlope = slopeChange;
        } else {
            currStep *= 0.5;
        }
    }
    return bestSlope;
}
function fitTrendlinesHighLow(data) {
    let x = data.map((_, index) => index);
    let y = data.map(point => point.close);
    let coefs = linearRegression(x, y);

    let upperPivot = data.map(p => p.high).indexOf(Math.max(...data.map(p => p.high)));
    let lowerPivot = data.map(p => p.low).indexOf(Math.min(...data.map(p => p.low)));

    let supportCoefs = optimizeSlope(true, lowerPivot, coefs.slope, data);
    let resistCoefs = optimizeSlope(false, upperPivot, coefs.slope, data);

    return { supportCoefs, resistCoefs };
}

function linearRegression(x, y) {
    let n = x.length;
    let sumX = x.reduce((a, b) => a + b, 0);
    let sumY = y.reduce((a, b) => a + b, 0);
    let sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    let sumX2 = x.map(xi => xi * xi).reduce((a, b) => a + b, 0);

    let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}

function trendLine(ohlcvData) {
    let support = true; // Check for a support trend line
    let pivot = 0; // Starting pivot point index
    let slope = 0.5; // Initial slope

    let trendLineCheck = checkTrendLine(support, pivot, slope, ohlcvData);
    console.log('Trend Line Check Error:', trendLineCheck);

    let optimizedSlope = optimizeSlope(support, pivot, slope, ohlcvData);
    console.log('Optimized Slope:', optimizedSlope);

    let trendlines = fitTrendlinesHighLow(ohlcvData);
    console.log('Support Coefficients:', trendlines.supportCoefs);
    console.log('Resistance Coefficients:', trendlines.resistCoefs);

}
export { trendLine }