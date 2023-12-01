<template>
    <div id="main">
        <div class="boardWrapper" id="myTable">

        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            listSymbol: [],
        }
    },
    methods: {
        initTable() {
            let listSym = this.$store.state.db.list_price_stream;
            if (listSym.length > 0) {
                let listSymbol = listSym.map(item => {
                    return item.symbol
                })
                let strTable = `  <table role="grid" class="board" id="chessBoard"> <tbody> `


                const n = listSymbol.length-1;
                const tableSize = Math.ceil(Math.sqrt(n));


                for (let row = 0; row < tableSize; row++) {
                    const rowArray = [];
                    strTable += '<tr>'
                    for (let col = 0; col < tableSize; col++) {
                        const index = row * tableSize + col;
                        strTable += `<td>${listSymbol[index]}</td>`

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


        }
    },

    mounted() {
        const zoomableDiv = document.getElementById('main');
let zoomLevel = 1;

zoomableDiv.addEventListener('click', () => {
    zoomLevel = zoomLevel === 1 ? 1.5 : 1; // Thay đổi tỷ lệ zoom (1.5x ở đây)
    zoomableDiv.style.transform = `scale(${zoomLevel})`;
});
        this.initTable()
    }
}
</script>
<style>
#main {
    width: 100%;
    height: auto;
}

.boardWrapper {
    margin-left: auto;
    margin-right: auto;
    width: 98vw;
    height: 98vh;
    font-size: 12px;
    transition: transform 0.3s ease;
    transform-origin: center;
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
    border: 2px solid black;
}

table.board tr td:hover {
    background-color: aqua;
    cursor: pointer;
}
</style>