/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const rect = {
    name: 'rect',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)'
        }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            return [
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            { x: coordinates[1].x, y: coordinates[0].y },
                            coordinates[1],
                            { x: coordinates[0].x, y: coordinates[1].y }
                        ]
                    },
                    styles: { style: 'stroke_fill' }
                }
            ]
        }
        return []
    }
}

const rule = {
    name: "rule",
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 3,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        if (coordinates.length === 2) {
            let percentPrice;
            const points = overlay.points;

            const valueDif =
                ((points[1].value - points[0].value) / points[1].value) * 100;
          
            function calcPNL(price1,price2,levage=20,money = 200) {
                /*Unrealized PNL = position size * direction of order * (mark price - entry price)
          ROE% =Unrealized PNL in USDT / entry margin = ( ( mark Price - entry Price ) * direction of order * size ) / （position_amount * contract_multiplier * mark_price* IMR）
          */
                let entryPrice = price1
                let exitPrice = price2
                let margin =money*levage
                let side = 1
                let unPNL = (margin / entryPrice) * side * (exitPrice - entryPrice)
                let ROE = (unPNL / margin * 100 * levage)
                return {
                    pnl: unPNL,
                    roe: ROE
                }
            }
            let result = calcPNL(points[1].value, points[0].value, 20,200);
          
            let roe = result.roe.toFixed(1)
            let pnl = result.pnl.toFixed(1)

            return [
                {
                    type: "line",
                    attrs: { coordinates },
                },
                {
                    type: "text",
                    isCheckEvent: false,
                    attrs: {
                        x: coordinates[0].x,
                        y: coordinates[1].y-20,
                        text: `${Math.abs(valueDif.toFixed(1))}% ${Math.abs(pnl)} USDT ${Math.abs(roe)}%`,
                        baseline: "top",
                    },
                },
                {
                    type: "text",
                    isCheckEvent: false,
                    attrs: {
                        x: coordinates[0].x - 40,
                        y: coordinates[0].y,
                        text: points[0].value.toFixed(3),
                        baseline: "top",
                    },
                },
                {
                    type: "text",
                    isCheckEvent: false,
                    attrs: {
                        x: coordinates[1].x,
                        y: coordinates[1].y,
                        text: points[1].value.toFixed(3),
                        baseline: "top",
                    },
                },
            ];
        }
        return []
    },
};

const plan = {
    name: 'plan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const n = coordinates.length;
        if (n >= 2) {
            const line = { type: 'line', attrs: { coordinates } };
            if (n == 2) {
                return [line];
            }

            if (n >= 3) {
                const bottomRect = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], //
                            coordinates[1],
                            { x: coordinates[1].x, y: coordinates[2].y },
                            { x: coordinates[0].x, y: coordinates[2].y },
                        ],
                    },
                    styles: { style: 'fill', color: '#F4511E40' },
                };
                if (n == 3) {
                    return [bottomRect];
                }

                const topRect = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], //
                            coordinates[1],
                            { x: coordinates[1].x, y: coordinates[3].y },
                            { x: coordinates[0].x, y: coordinates[3].y },
                        ],
                    },
                    styles: { style: 'fill', color: '#7CB34240' },
                };
                return [bottomRect, topRect];
            }
        }
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 2:
                points[0].value = performPoint.value;
                break;
            case 3:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
            case 4:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 0:
                points[1].value = performPoint.value;
                break;
            case 1:
                points[0].value = performPoint.value;
                points[2].timestamp = points[3].timestamp = performPoint.timestamp;
                points[2].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = points[3].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 3:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    },
};


const anyWaves = {
    name: 'anyWaves',
    totalStep: Number.MAX_SAFE_INTEGER,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            text: `(${i})`,
            baseline: 'bottom'
        }))
        return [
            {
                type: 'line',
                attrs: { coordinates }
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts
            }
        ]
    }
}


const triangle = {
    name: 'triangle',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)'
        }
    },
    createPointFigures: ({ coordinates }) => {
        return [
            {
                type: 'polygon',
                attrs: { coordinates },
                styles: { style: 'stroke_fill' }
            }
        ]
    }
}

export default triangle
export { rect, rule, plan, anyWaves, triangle };