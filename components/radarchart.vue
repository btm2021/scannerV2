<template>
  <div>
    <canvas id="radar-chart"></canvas>
  </div>
</template>
  
  <script>
import { Radar } from "chart.js";

export default {
  props: ["dataChart"],
  mounted() {
    // console.log(this.dataChart);
    new Radar(document.getElementById("radar-chart"), {
      data: {
        labels: this.dataChart.map((item) => item.symbol),
        datasets: [
          {
            label: "My First dataset",
            data: [],
          },
        ],
      },
    });
  },
};
</script>
  