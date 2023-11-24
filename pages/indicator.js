import { IndicatorsNormalized } from "../node_modules/@ixjb94/indicators/dist/indicators-browser"

const ta = new IndicatorsNormalized()
var bot34 = async (kLineDataList, period, multiplier) => {
    let listCLose = kLineDataList.map(item => item.close)
   let emaFirst = await ta.ema(listCLose, period)
   let linreg=await ta.linregintercept(listCLose,period)
  //  console.log(linreg)
}

export {
    bot34
}