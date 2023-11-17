export const state = () => ({
    list_symbol_db: [],
    list_price_stream: [],
    list_price_stream_keyValue: [],
    list_symbol_config: []
})

export const mutations = {
    set_list_symbol_db(state, db) {

        state.list_symbol_db = db.items
    },
    set_list_price_stream(state, newValue) {
        const keyValueObject = newValue.reduce((obj, item) => {
            obj[item.symbol] = item;
            return obj;
        }, {});
        state.list_price_stream_keyValue = keyValueObject

        let oldValue = state.list_price_stream
        if (oldValue.length > 0) {
            let newList = []
            oldValue.map(itemOld => {
                newValue.map(itemNew => {
                    if (itemNew.symbol === itemOld.symbol) {
                        if (itemNew.markPrice > itemOld.markPrice) {
                            newList.push({ ...itemNew, status: 'up' })
                        } else if (itemNew.markPrice < itemOld.markPrice) {
                            newList.push({ ...itemNew, status: 'down' })
                        } else if (itemNew.markPrice === itemOld.markPrice) {
                            newList.push({ ...itemNew, status: 'none' })
                        }
                    }
                })
            })
            state.list_price_stream = newList
        } else {

            state.list_price_stream = newValue
        }


    },
    set_list_symbol_config(state, db) {

        state.list_symbol_config = db
    }

}