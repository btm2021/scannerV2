export const state = () => ({
    list_symbol_db: [],
    list_price_stream: [],
    list_price_stream_keyValue: [],
    list_symbol_config: [],
    list_indicator:[ 
        {name:'supres',nameRegistor:'supres',value:'supres',type:'main',calcParams: [15, 15, 20],isAdd:false,isDefault:false},
        {name:'zigzag',nameRegistor:'zigzag',value:'ZigZag',type:'main',calcParams:[2],isAdd:false,isDefault:true},
        {name:'bot89',nameRegistor:'myBot89',value:'bot89',type:'main', calcParams: [89, 1.326],isAdd:false,isDefault:true},
        {name:'bot34',nameRegistor:'myBot34',value:'bot34',type:'main', calcParams: [34, 1.326],isAdd:false,isDefault:false},
        {name:'donchian',nameRegistor:'DONCHIAN',value:'donchian',type:'main',calcParams: [100],isAdd:false,isDefault:false},
        {name:'ema21',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [21],isAdd:false,isDefault:false},
        {name:'ema34',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [34],isAdd:false,isDefault:false},
        {name:'ema89',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [89],isAdd:false,isDefault:false},
        {name:'ema100',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [100],isAdd:false,isDefault:false},
        {name:'ema200',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [200],isAdd:false,isDefault:false},
        {name:'ema610',nameRegistor:'EMA',value:'ema',type:'main',calcParams: [610],isAdd:false,isDefault:false},
        {name:'BOLL',nameRegistor:'BOLL',value:'BOLL',type:'main',calcParams:[20,2],isAdd:false,isDefault:false},
        {name:'BBI',nameRegistor:'BBI',value:'ema',type:'main',calcParams: [3, 6, 12, 24],isAdd:false,isDefault:false},
        {name:'VOL',nameRegistor:'VOL',value:'VOL',type:'sub',calcParams: [1],isAdd:false,isDefault:false},
        {name:'RSI',nameRegistor:'RSI',value:'RSI',type:'sub',calcParams: [14],isAdd:false,isDefault:false},
        {name:'MACD',nameRegistor:'MACD',value:'MACD',type:'sub',calcParams: [12, 26, 9],isAdd:false,isDefault:false},
        {name:'KDJ',nameRegistor:'KDJ',value:'KDJ',type:'sub',calcParams: [9, 3, 3],isAdd:false,isDefault:false},
        {name:'AO',nameRegistor:'AO',value:'AO',type:'sub',calcParams:[5, 34],isAdd:false,isDefault:false},
        {name:'CCI',nameRegistor:'CCI',value:'CCI',type:'sub',calcParams:[13],isAdd:false,isDefault:false}]
  
})

export const mutations = {
    set_list_symbol_db(state, db) {

        state.list_symbol_db = db.items
    },
    set_list_indicator_db(state,db){
     
        state.list_indicator=db.items
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