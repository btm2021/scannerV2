<template>
    <div>
        <b-modal id="modal-config">

        </b-modal>
        <b-modal id="modal-calc">
            <div>
                <calc />
            </div>
        </b-modal>
        <b-sidebar backdrop shadow id="priceStream" title="Luồng Giá">
            <div class="px-3 py-2">
                <b-table :items="list_price_stream" show-empty small responsive striped hover style="font-size: 12px"
                    :fields="table_felds_list_price_stream">
                    <template #cell(symbol)="data">
                        <a :href="`/klinechart?symbol=${data.item.symbol}&timeframe=15m&exchange=binance`">
                            <span>

                                <b class="nameSymbol" :class="[
                                    data.item.status === 'up'
                                        ? 'green'
                                        : data.item.status === 'down'
                                            ? 'red'
                                            : 'none',
                                ]" @click="onChoiceSymbol(data.item.symbol)">
                                    {{ data.item.symbol }}</b>
                            </span>
                        </a>

                    </template>
                    <template #cell(markPrice)="data">
                        <span>
                            <b class="nameSymbol" :class="[
                                data.item.status === 'up'
                                    ? 'green'
                                    : data.item.status === 'down'
                                        ? 'red'
                                        : 'none',
                            ]" @click="onChoiceSymbol(data.item.symbol)">
                                {{ data.item.markPrice }}</b>
                        </span>
                    </template>
                    <template #cell(fundingRate)="data">
                        <span>
                            <b class="nameSymbol" :class="[
                                data.item.status === 'up'
                                    ? 'green'
                                    : data.item.status === 'down'
                                        ? 'red'
                                        : 'none',
                            ]" @click="onChoiceSymbol(data.item.fundingRate)">
                                {{ data.item.fundingRate }}</b>
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
                <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            </div>
        </b-sidebar>
        <b-row>
            <b-col cols="6">
                <div id="main">
                    <div class="boardWrapper" id="myTable">

                    </div>
                </div>
            </b-col>
            <b-col cols="6">
                <b-card no-body>
                    <b-nav pills card-header slot="header" size="sm" v-b-scrollspy:nav-scroller>
            
                        <b-nav-item href="#m5" @click="scrollIntoView">M5</b-nav-item>
                        <b-nav-item href="#m15" @click="scrollIntoView">M15</b-nav-item>
                        <b-nav-item href="#h1" @click="scrollIntoView">1H</b-nav-item>
                        <b-nav-item href="#h4" @click="scrollIntoView">4H</b-nav-item>
                        <b-nav-item href="#d1" @click="scrollIntoView">1D</b-nav-item>
                        <b-nav-item href="#tdv" @click="scrollIntoView">Main</b-nav-item>
                        <b-nav-item v-b-toggle.modal-calc>Calc</b-nav-item>
                        <b-nav-item v-b-toggle.priceStream>Giá</b-nav-item>
                        <b-nav-item v-b-toggle.modal-config>Config</b-nav-item>
                    </b-nav>
                    <b-card-body id="nav-scroller" ref="content"
                        style="position: relative; overflow-y: scroll;height: 650px;" :key="choiceSymbol">
                        <h4 id="m5">M5 {{ choiceSymbol }}</h4>
                        <iframe :src="`\klinechart?symbol=${choiceSymbol}&timeframe=5m&exchange=binance`" style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
          "></iframe>

                        <h4 id="m15">M15 {{ choiceSymbol }}</h4>
                        <iframe :src="`\klinechart?symbol=${choiceSymbol}&timeframe=15m&exchange=binance`" style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "></iframe>

                        <h4 id="h1">H1 {{ choiceSymbol }}</h4>
                        <iframe :src="`\klinechart?symbol=${choiceSymbol}&timeframe=1h&exchange=binance`" style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "></iframe>
                        <h4 id="h4">H4 {{ choiceSymbol }}</h4>
                        <iframe :src="`\klinechart?symbol=${choiceSymbol}&timeframe=4h&exchange=binance`" style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "></iframe>

                        <h4 id="d1">1D {{ choiceSymbol }}</h4>
                        <iframe :src="`\klinechart?symbol=${choiceSymbol}&timeframe=1d&exchange=binance`" style="
            width: 99%;
            border: 0px;
            height: 650px;
            border: 0px;
            overflow: hidden;
          "></iframe>

                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>


export default {
    computed: {
        list_price_stream() {
            return this.$store.state.db.list_price_stream;
        },
    },
    data() {
        return {
            listSymbol: [],
            table_felds_list_price_stream: [
                { key: "symbol", label: "symbol", sortable: true },
                { key: "markPrice", label: "Giá" },
                { key: "fundingRate", label: "Funding", sortable: true },
            ],
            choiceSymbol: "BTCUSDT",
        }
    },
    methods: {
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

        initTable() {
            let listSym = this.$store.state.db.list_price_stream;
            if (listSym.length > 0) {
                let listSymbol = listSym.filter(item => {
                    return !item.symbol.includes('_') && !item.symbol.includes('BUSD')
                })
                let strTable = `<table role="grid" class="board" id="chessBoard"> <tbody> `
                const n = listSymbol.length - 1;
                const tableSize = Math.ceil(Math.sqrt(n));
                for (let row = 0; row < tableSize; row++) {
                    strTable += '<tr>'
                    for (let col = 0; col < tableSize; col++) {
                        const index = row * tableSize + col;
                        if (listSymbol[index]) {
                            strTable += `<td>
                                <span class="symbol_name">${listSymbol[index].symbol.replace('USDT', '').replace('1000', '')}</span>
                                
                                
                                <br/>
                                ${listSymbol[index].markPrice}
                                </td>`
                        }
                    }
                    strTable += '</tr>'
                }
                strTable += ` </tbody>  </table> `;
                document.getElementById('myTable').innerHTML = strTable
            } else {
                setTimeout(() => {
                    this.initTable()
                }, 500)
            }


        },

    },

    mounted() {

        this.initTable()
    }
}
</script>
<style>
body {
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
}

#main {
    width: 100%;
    height: auto;
}

.symbol_name {
    color: black
}

.boardWrapper {
    margin-top: 2vh;
    margin-left: 10px;
    width: 100%;
    height: 95vh;
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
    font-size: 0.6rem
}

table.board tr td:hover {
    background-color: aqua;
    cursor: pointer;
    transform: scale(2);

}
</style>