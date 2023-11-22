<template>
    <div>

        <b-form>
            <b-form-group>
                <b-form-radio-group v-model="calc.side" :options="['LONG', 'SHORT']" button-variant="outline-primary"
                    buttons>
                </b-form-radio-group>
            </b-form-group>

            <b-form-group>
                <label>Đòn bẩy</label>
                <b-form-input type="range" step="1" min="1" max="125" v-model="calc.levage" required>
                </b-form-input>
                <span>X{{ calc.levage }}</span>
            </b-form-group>

            <b-form-group>
                <label>Số tiền</label>
                <b-form-input type="range" min="1000" max="100000" step="1000" v-model="calc.margin" required>
                </b-form-input>
                <span>Sau Đòn Bẩy <code>{{ calc.margin }}</code> <b> USDT</b>: Vốn thực :
                    <code>{{ (parseFloat(calc.margin) / parseFloat(calc.levage)).toFixed(1) }}</code><b>
                        USDT</b></span>
            </b-form-group>
            <b-form-group>
                <label>Entry</label>
                <b-form-input v-model="calc.entry" required>
                </b-form-input>
            </b-form-group>
            <b-form-group>
                <label>Exit</label>
                <b-form-input v-model="calc.close" required>
                </b-form-input>
            </b-form-group>
            <b-form-row>
                <b-col>
                    <b-button type="button" @click="calcPNL" block variant="primary">Tính</b-button>
                </b-col>

                <b-col>
                    <b-button type="reset" block variant="danger">Reset</b-button>
                </b-col>
            </b-form-row>


        </b-form>
        <b-table-simple fixed bordered class="text-center mt-2" v-if="calcStatus" responsive>

            <b-tbody>
                <b-tr>

                    <b-td><b>Giá Entry</b></b-td>
                    <b-td>{{ calc.entry }}</b-td>
                    <b-td><b>Giá Đóng</b></b-td>
                    <b-td>{{ calc.close }}</b-td>
                </b-tr>
                <b-tr>

                    <b-td><b>Vị thế</b></b-td>
                    <b-td><span v-if="(calc.side === 'LONG')" style="color:#0CCB80">{{ calc.side }}</span><span
                            style="color:#F23545" v-else>{{ calc.side }}</span></b-td>
                    <b-td><b>Vốn</b></b-td>
                    <b-td>{{ calc.margin }}</b-td>
                </b-tr>

                <b-tr>
                    <b-td><b>PNL</b></b-td>
                    <b-td><span v-if="(calc.pnl > 0)" style="color:#0CCB80">{{ calc.pnl }}</span><span style="color:#F23545"
                            v-else>{{ calc.pnl }}</span></b-td>
                    <b-td><b>ROE %</b></b-td>
                    <b-td><span v-if="(calc.pnl > 0)" style="color:#0CCB80">{{ calc.roe }}</span><span style="color:#F23545"
                            v-else>{{ calc.roe }}</span></b-td>

                </b-tr>
            </b-tbody>

        </b-table-simple>

    </div>
</template>

<script>
export default {
    methods: {
        calcPNL() {
            /*Unrealized PNL = position size * direction of order * (mark price - entry price)
      ROE% =Unrealized PNL in USDT / entry margin = ( ( mark Price - entry Price ) * direction of order * size ) / （position_amount * contract_multiplier * mark_price* IMR）
      */
            let entryPrice = parseFloat(this.calc.entry)
            let exitPrice = parseFloat(this.calc.close)
            let margin = parseFloat(this.calc.margin)
            let side = (this.calc.side === 'LONG') ? 1 : -1
            let levage = parseFloat(this.calc.levage)
            let unPNL = (margin / entryPrice) * side * (exitPrice - entryPrice)
            let ROE = (unPNL / margin * 100 * levage)
            this.calc.roe = parseFloat(ROE.toFixed(2));
            this.calc.pnl = parseFloat(unPNL.toFixed(2));
            this.calcStatus = true;
        },
        onResetCalc() {
            this.calc = {
                entry: null,
                close: null,
                levage: 20,
                side: null,
                margin: 4000,
                roe: 0,
                pnl: 0,
            }
            this.calcStatus = false
        },
    },
    data() {
        return {
            calcStatus: false,
            calc: {
                entry: null,
                close: null,
                levage: 20,
                side: 'SHORT',
                margin: 4000,
                roe: 0,
                pnl: 0,
            },
            calcModalshow: false,
        }
    }
}
</script>

<style></style>