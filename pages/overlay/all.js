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
                        y: coordinates[1].y,
                        text: `${valueDif.toFixed(1)} % `,
                        baseline: "top",
                    },
                },
            ];
        }
        return []
    },
};

const plan={
    name: 'plan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({coordinates}) => {
      const n = coordinates.length;
      if (n >= 2) {
        const line = {type: 'line', attrs: {coordinates}};
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
                {x: coordinates[1].x, y: coordinates[2].y},
                {x: coordinates[0].x, y: coordinates[2].y},
              ],
            },
            styles: {style: 'fill', color: '#F4511E40'},
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
                {x: coordinates[1].x, y: coordinates[3].y},
                {x: coordinates[0].x, y: coordinates[3].y},
              ],
            },
            styles: {style: 'fill', color: '#7CB34240'},
          };
          return [bottomRect, topRect];
        }
      }
    },
    performEventMoveForDrawing: ({currentStep, points, performPoint}) => {
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
    performEventPressedMove: ({points, performPointIndex, performPoint}) => {
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
export { rect, rule, plan };