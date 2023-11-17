import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })


//plugin tvchart
import { widget } from '~/static/charting_library'
const Widget = widget

export default function (ctx, inject) {
    inject('TVChart', { Widget })
}
//win

import * as VueWindow from '@hscmap/vue-window'

Vue.use(VueWindow)