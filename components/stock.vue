<template>
  <div>
    <div id="main" v-if="dataReady">
      <div class="boardWrapper" id="myTable">
        <table role="grid" class="board" id="chessBoard">
          <tbody>
            <tr
              v-for="(item, index) in Math.ceil(
                Math.sqrt(listPrice.length) 
              )"
              :key="index"
            >
              <td
                v-for="index1 in Math.ceil(Math.sqrt(listPrice.length-1))"
                :key="index1"
              >
                <span
                  class="symbol_name"
                  v-if="
                    listPrice[
                      (index - 1) * Math.ceil(Math.sqrt(listPrice.length - 1))
                    ]
                  "
                >
                  {{
                   listPrice[
                      (index - 1) * Math.ceil(Math.sqrt(listPrice.length - 1))
                    ].T
                  }}</span
                >
              </td>
              <div></div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataReady: false,
      listSymbol: [
        "AAPL",
        "MSFT",
        "GOOGL",
        "AMZN",
        "NVDA",
        "META",
        "BRK-A",
        "TSLA",
        "LLY",
        "V",
        "UNH",
        "TSM",
        "JPM",
        "WMT",
        "XOM",
        "MA",
        "JNJ",
        "AVGO",
        "PG",
        "NVO",
        "HD",
        "ORCL",
        "ADBE",
        "CVX",
        "ASML",
        "MRK",
        "COST",
        "ABBV",
        "KO",
        "TM",
        "CRM",
        "BAC",
        "SNY",
        "PEP",
        "ACN",
        "MCD",
        "NVS",
        "AZN",
        "NFLX",
        "LIN",
        "CSGO",
        "AMD",
        "TMO",
        "PDD",
        "SAP",
        "BABA",
        "ABT",
        "INTC",
        "TMUS",
        "NKE",
      ],
      listPrice: [],
      api_key: "HQE5E2HQZFVOG9ZG",
    };
  },
  mounted() {
    this.getData();
  },
  //qfqtaJkX97eROQGYgU2fPaKvzH7_o9Yw polygon
  methods: {
    async fetchAllMarket() {
      return new Promise((resolve, reject) => {
        let url =
          "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-05-12?adjusted=false&include_otc=false&apiKey=qfqtaJkX97eROQGYgU2fPaKvzH7_o9Yw";
        fetch(url)
          .then((data) => data.json())
          .then((data) => {
            resolve(data);
          });
      });
    },
    getOHLCV() {},
    getData() {
      this.fetchAllMarket().then((data) => {
        data = data.results;
        let filteredStocks = data.filter((stock) =>
          this.listSymbol.includes(stock.T)
        );
        this.listPrice = filteredStocks;
       
        this.dataReady = true;
      });
    },
  },
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