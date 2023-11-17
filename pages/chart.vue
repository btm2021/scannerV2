<template>
  <div>
    <div id="containerId123" class="TVChartContainer" />
  </div>
</template>
    
  <script>
import api from "multi-exchange-datafeeds";

export default {
  layout: "none",
  data() {
    return {};
  },
  async mounted() {
    const widgetOptions = {
      symbol: "BTCUSDT",
      interval: "15",
      timezone: "America/New_York",
      container: "containerId123",
      locale: "vi",
      datafeed: api["binance_futures"],
      library_path: "charting_library/",
      client_id: "tradingview.com",
      user_id: "public_id",
      height: "1200",
      load_last_chart:true,
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "bao",
      user_id: "bao",
      width: "1200",
    };
    const {
      $TVChart: { Widget },
    } = this;

    const tvWidget = new Widget(widgetOptions);
    this.tvWidget = tvWidget;
  },

  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget = null;
    }
  },
  methods: {},
};
</script>
    
  <style scoped>
.TVChartContainer {
  width: 900px !important;
  height: 800px !important;
}
</style>