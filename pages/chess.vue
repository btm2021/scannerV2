<template>
  <div> <b-nav>
    <b-nav-item v-b-toggle.priceStream >Coin</b-nav-item>
    <b-nav-item>Forex</b-nav-item>
    <b-nav-item>Stock</b-nav-item>
  </b-nav>
    <b-modal id="modal-config"> </b-modal>
    <b-modal id="modal-calc">
      <div>
        <calc />
      </div>
    </b-modal>
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
            <a
              :href="`/klinechart?symbol=${data.item.symbol}&timeframe=15m&exchange=binance`"
            >
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
            </a>
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
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div>
        <b-tabs small pills card>
          <b-tab no-body title="Binance Future">
            <div id="main">
              <div
                class="boardWrapper"
                id="myTable"
                v-if="list_price_stream.length > 0"
              >
                <table role="grid" class="board" id="chessBoard">
                  <tbody>
                    <tr
                      v-for="index in Math.ceil(
                        Math.sqrt(list_price_stream.length - 1)
                      ) - 1"
                      :key="index"
                    >
                      <td
                        v-for="index1 in Math.ceil(
                          Math.sqrt(list_price_stream.length)
                        )"
                        :key="index1"
                        @click="
                          onChoiceSymbol(
                            list_price_stream[
                              (index - 1) *
                                Math.ceil(
                                  Math.sqrt(list_price_stream.length - 1)
                                ) +
                                index1 -
                                1
                            ].symbol
                          )
                        "
                      >
                        <div>
                          <span
                            class="symbol_name"
                            v-if="
                              list_price_stream[
                                (index - 1) *
                                  Math.ceil(
                                    Math.sqrt(list_price_stream.length - 1)
                                  ) +
                                  index1 -
                                  1
                              ]
                            "
                          >
                            {{
                              list_price_stream[
                                (index - 1) *
                                  Math.ceil(
                                    Math.sqrt(list_price_stream.length - 1)
                                  ) +
                                  index1 -
                                  1
                              ].symbol
                                .replace("USDT", "")
                                .replace("1000", "")
                            }}</span
                          >

                          <br />
                          <span
                            :style="
                              getStyle(
                                list_price_stream[
                                  (index - 1) *
                                    Math.ceil(
                                      Math.sqrt(list_price_stream.length - 1)
                                    ) +
                                    index1 -
                                    1
                                ]
                              )
                            "
                            v-if="
                              list_price_stream[
                                (index - 1) *
                                  Math.ceil(
                                    Math.sqrt(list_price_stream.length - 1)
                                  ) +
                                  index1 -
                                  1
                              ]
                            "
                          >
                            {{
                              list_price_stream[
                                (index - 1) *
                                  Math.ceil(
                                    Math.sqrt(list_price_stream.length - 1)
                                  ) +
                                  index1 -
                                  1
                              ].markPrice
                            }}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- <section v-if="dataReady">
                    <div class="chart">
                      <BarChart
                        :key="barChartData"
                        :data="barChartData"
                        :options="barChartOptions"
                        :height="400"
                      />
                    </div>
                  </section> -->

                <!-- <section v-if="dataReady">
                    <div class="chart">
                      <radarchart
                        :key="barChartData"
                        :options="barChartOptions"
                        :height="400"
                        :dataChart="barChartData"
                      />
                    </div>
                  </section> -->
              </div>
            </div>
          </b-tab>

          <b-tab no-body title="Forex">
            <forex></forex>
          </b-tab>
          <b-tab no-body title="StockUS">
            <stock></stock>
          </b-tab>
        </b-tabs>
      </div>
    </b-sidebar>
    <b-row>
      <b-col cols="4"> </b-col>
      <b-col cols="12">
        <b-card no-body>
          <b-card-body
            id="nav-scroller"
            ref="content"
            style="position: relative; overflow-y: scroll; height: 650px"
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
                overflow: hidden;
              "
            ></iframe>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Forex from "~/components/forex.vue";
import Stock from "~/components/stock.vue";
export default {
  components: { Forex, Stock },
  computed: {
    list_price_stream() {
      if (this.$store.state.db.list_price_stream.length > 0) {
        let listSym = this.$store.state.db.list_price_stream;
        let listSymbol = listSym.filter((item) => {
          return (
            !item.symbol.includes("_") &&
            !item.symbol.includes("BUSD") &&
            !item.symbol.includes("BNBBTC") &&
            !item.symbol.includes("BTCDOM") &&
            !item.symbol.includes("ETHBTC") &&
            !item.symbol.includes("USTC")
          );
        });
        let barChartData = {
          labels: listSymbol.map((item) => {
            return item.symbol;
          }),
          datasets: [
            {
              label: "Visualizaciones",
              data: listSymbol.map((item) => {
                return Math.floor(Math.random() * 5);
              }),
              backgroundColor: "rgba(20, 255, 0, 0.3)",
              borderColor: "rgba(100, 255, 0, 1)",
              borderWidth: 2,
            },
          ],
        };

        let barChartOptions = {
          type: "horizontalBar",
        };
        this.barChartOptions = barChartOptions;
        this.barChartData = barChartData;

        this.dataReady = true;
        return listSymbol;
      } else {
        return [];
      }
    },
  },
  data() {
    return {
      barChartOptions: {},
      barChartData: {},
      dataReady: false,
      listSymbol: [],
      table_felds_list_price_stream: [
        { key: "symbol", label: "symbol", sortable: true },
        { key: "markPrice", label: "Giá" },
        { key: "fundingRate", label: "Funding", sortable: true },
      ],
      choiceSymbol: "BTCUSDT",
    };
  },
  methods: {
    getStyle(symbol) {
      if (symbol && symbol.status) {
        if (symbol.status === "up") {
          return {
            color: "green",
          };
        } else {
          return {
            color: "red",
          };
        }
      } else {
        return "";
      }
    },
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

  mounted() {},
};
</script>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

#main {
  width: 100%;
  height: auto;
}

.symbol_name {
  color: black;
}

.boardWrapper {
  margin-top: 2vh;
  margin-left: 10px;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.board {
  table-layout: fixed;
  border: none;
  border-collapse: collapse;
  border-spacing: 0px;
  height: 100%;
  width: 100%;
}

table.board tr td {
  border: 1px solid black;
  font-size: 0.5rem;
}

table.board tr td:hover {
  background-color: aqua;
  cursor: pointer;
  transform: scale(2);
}
</style>