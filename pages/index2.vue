<template>
  <div>
    <b-card no-body>
      <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller>
        <b-navbar-brand tag="h1" class="mb-0">Nacy</b-navbar-brand>
        <b-nav-item href="#m5" @click="scrollIntoView">M5</b-nav-item>
        <b-nav-item href="#m15" @click="scrollIntoView">M15</b-nav-item>
        <b-nav-item href="#h1" @click="scrollIntoView">1H</b-nav-item>
        <b-nav-item href="#h4" @click="scrollIntoView">4H</b-nav-item>
        <b-nav-item href="#d1" @click="scrollIntoView">1D</b-nav-item>
        <b-nav-item href="#tdv" @click="scrollIntoView">Main</b-nav-item>
        <b-nav-item v-b-toggle.priceStream>Giá</b-nav-item>
        <b-nav-item v-b-toggle.screener>Screener</b-nav-item>
      </b-nav>

      <b-card-body
        id="nav-scroller"
        ref="content"
        style="position: relative; overflow-y: scroll;height: 650px;"
        :key="choiceSymbol"
      >
        <h4 id="m5">M5 {{ choiceSymbol }}</h4>
        <iframe
          :src="`\klinechart?symbol=${choiceSymbol}&timeframe=5m&exchange=binance`"
          style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
          "
        ></iframe>

        <h4 id="m15">M15 {{ choiceSymbol }}</h4>
        <iframe
          :src="`\klinechart?symbol=${choiceSymbol}&timeframe=15m&exchange=binance`"
          style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "
        ></iframe>

        <h4 id="h1">H1 {{ choiceSymbol }}</h4>
        <iframe
          :src="`\klinechart?symbol=${choiceSymbol}&timeframe=1h&exchange=binance`"
          style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "
        ></iframe>
      </b-card-body>
      <b-sidebar backdrop shadow id="priceStream" title="Luồng Giá">
        <div class="px-3 py-2">
          <b-table
            :items="list_price_stream"
            show-empty
            small
            responsive
            striped
            hover
            style="font-size: 12px"
            :fields="table_felds_list_price_stream"
          >
            <template #cell(symbol)="data">
              <span>
                <b
                  class="nameSymbol"
                  :class="[
                    data.item.status === 'up'
                      ? 'green'
                      : data.item.status === 'down'
                      ? 'red'
                      : 'none',
                  ]"
                  @click="onChoiceSymbol(data.item.symbol)"
                >
                  {{ data.item.symbol }}</b
                >
              </span>
            </template>
            <template #cell(markPrice)="data">
              <span>
                <b
                  class="nameSymbol"
                  :class="[
                    data.item.status === 'up'
                      ? 'green'
                      : data.item.status === 'down'
                      ? 'red'
                      : 'none',
                  ]"
                  @click="onChoiceSymbol(data.item.symbol)"
                >
                  {{ data.item.markPrice }}</b
                >
              </span>
            </template>
            <template #cell(fundingRate)="data">
              <span>
                <b
                  class="nameSymbol"
                  :class="[
                    data.item.status === 'up'
                      ? 'green'
                      : data.item.status === 'down'
                      ? 'red'
                      : 'none',
                  ]"
                  @click="onChoiceSymbol(data.item.fundingRate)"
                >
                  {{ data.item.fundingRate }}</b
                >
              </span>
            </template>
          </b-table>
        </div>
      </b-sidebar>
      <b-sidebar backdrop shadow id="screener" title="Bộ quét">
        <div class="px-3 py-2">
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <b-img
            src="https://picsum.photos/500/500/?image=54"
            fluid
            thumbnail
          ></b-img>
        </div>
      </b-sidebar>
    </b-card>
  </div>
</template>
  
  <script>
export default {
  methods: {
    // Convenience method to scroll a heading into view.
    // Not required for scrollspy to work
    scrollIntoView(event) {
      event.preventDefault();
      const href = event.target.getAttribute("href");
      const el = href ? document.querySelector(href) : null;
      if (el) {
        this.$refs.content.scrollTop = el.offsetTop;
      }
    },
    onChoiceSymbol(symbol) {
      this.choiceSymbol = symbol;
    },
  },
  data() {
    return {
      table_felds_list_price_stream: [
        { key: "symbol", label: "symbol", sortable: true },
        { key: "markPrice", label: "Giá" },
        { key: "fundingRate", label: "Funding", sortable: true },
      ],
      choiceSymbol: "BTCUSDT",
    };
  },
  computed: {
    list_price_stream() {
      return this.$store.state.db.list_price_stream;
    },
  },
};
</script>
<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
.nameSymbol:hover {
  color: blue;
  cursor: pointer;
}
</style>