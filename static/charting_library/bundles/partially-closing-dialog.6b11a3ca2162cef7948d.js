(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[5001],{59142:function(e,t){var n,o,i;o=[t],void 0===(i="function"==typeof(n=function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var n=!1;if("undefined"!=typeof window){var o={get passive(){n=!0}};window.addEventListener("testPassive",null,o),window.removeEventListener("testPassive",null,o)}var i="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),s=[],r=!1,l=-1,a=void 0,c=void 0,u=function(e){return s.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},d=function(e){var t=e||window.event;return!!u(t.target)||1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1)},p=function(){setTimeout((function(){void 0!==c&&(document.body.style.paddingRight=c,c=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)}))};e.disableBodyScroll=function(e,o){if(i){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(e&&!s.some((function(t){return t.targetElement===e}))){var p={targetElement:e,options:o||{}};s=[].concat(t(s),[p]),e.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var n,o,i,s;1===t.targetTouches.length&&(o=e,s=(n=t).targetTouches[0].clientY-l,!u(n.target)&&(o&&0===o.scrollTop&&0<s||(i=o)&&i.scrollHeight-i.scrollTop<=i.clientHeight&&s<0?d(n):n.stopPropagation()))},r||(document.addEventListener("touchmove",d,n?{passive:!1}:void 0),r=!0)}}else{h=o,setTimeout((function(){if(void 0===c){var e=!!h&&!0===h.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(c=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}));var m={targetElement:e,options:o||{}};s=[].concat(t(s),[m])}var h},e.clearAllBodyScrollLocks=function(){i?(s.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),r&&(document.removeEventListener("touchmove",d,n?{passive:!1}:void 0),r=!1),s=[],l=-1):(p(),s=[])},e.enableBodyScroll=function(e){if(i){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");e.ontouchstart=null,e.ontouchmove=null,s=s.filter((function(t){return t.targetElement!==e})),r&&0===s.length&&(document.removeEventListener("touchmove",d,n?{passive:!1}:void 0),r=!1)}else 1===s.length&&s[0].targetElement===e?(p(),s=[]):s=s.filter((function(t){return t.targetElement!==e}))}})?n.apply(t,o):n)||(e.exports=i)},37593:e=>{e.exports={wrapper:"wrapper-5Xd5conM",input:"input-5Xd5conM",box:"box-5Xd5conM",icon:"icon-5Xd5conM",noOutline:"noOutline-5Xd5conM","intent-danger":"intent-danger-5Xd5conM",check:"check-5Xd5conM",
dot:"dot-5Xd5conM"}},96670:e=>{e.exports={checkbox:"checkbox-GxG6nBa7",reverse:"reverse-GxG6nBa7",label:"label-GxG6nBa7",baseline:"baseline-GxG6nBa7"}},66753:e=>{e.exports={scrollable:"scrollable-1hbKW2IH",content:"content-1hbKW2IH",input:"input-1hbKW2IH",endSlot:"endSlot-1hbKW2IH",message:"message-1hbKW2IH",estimation:"estimation-1hbKW2IH",label:"label-1hbKW2IH"}},8323:(e,t,n)=>{"use strict";n.d(t,{CheckboxInput:()=>c});var o=n(59496),i=n(97754),s=n(72571),r=n(57369),l=n(37593),a=n.n(l);function c(e){const t=i(a().box,a()["intent-"+e.intent],{[a().check]:!Boolean(e.indeterminate),[a().dot]:Boolean(e.indeterminate),[a().noOutline]:-1===e.tabIndex}),n=i(a().wrapper,e.className);return o.createElement("span",{className:n,title:e.title},o.createElement("input",{id:e.id,tabIndex:e.tabIndex,className:a().input,type:"checkbox",name:e.name,checked:e.checked,disabled:e.disabled,value:e.value,autoFocus:e.autoFocus,role:e.role,onChange:function(){e.onChange&&e.onChange(e.value)},ref:e.reference}),o.createElement("span",{className:t},o.createElement(s.Icon,{icon:r,className:a().icon})))}},2946:(e,t,n)=>{"use strict";n.d(t,{Checkbox:()=>c});var o=n(59496),i=n(97754),s=n(32834),r=n(8323),l=n(96670),a=n.n(l);class c extends o.PureComponent{render(){const{inputClassName:e,labelClassName:t,...n}=this.props,s=i(this.props.className,a().checkbox,{[a().reverse]:Boolean(this.props.labelPositionReverse),[a().baseline]:Boolean(this.props.labelAlignBaseline)}),l=i(a().label,t,{[a().disabled]:this.props.disabled});let c=null;return this.props.label&&(c=o.createElement("span",{className:l,title:this.props.title},this.props.label)),o.createElement("label",{className:s},o.createElement(r.CheckboxInput,{...n,className:e}),c)}}c.defaultProps={value:"on"};(0,s.makeSwitchGroupItem)(c)},32834:(e,t,n)=>{"use strict";n.d(t,{SwitchGroup:()=>s,makeSwitchGroupItem:()=>r});var o=n(59496),i=n(19036);class s extends o.PureComponent{constructor(){super(...arguments),this._subscriptions=new Set,this._getName=()=>this.props.name,this._getValues=()=>this.props.values,this._getOnChange=()=>this.props.onChange,this._subscribe=e=>{this._subscriptions.add(e)},this._unsubscribe=e=>{this._subscriptions.delete(e)}}getChildContext(){return{switchGroupContext:{getName:this._getName,getValues:this._getValues,getOnChange:this._getOnChange,subscribe:this._subscribe,unsubscribe:this._unsubscribe}}}render(){return this.props.children}componentDidUpdate(e){this._notify(this._getUpdates(this.props.values,e.values))}_notify(e){this._subscriptions.forEach(t=>t(e))}_getUpdates(e,t){return[...t,...e].filter(n=>t.includes(n)?!e.includes(n):e.includes(n))}}function r(e){var t;return(t=class extends o.PureComponent{constructor(){super(...arguments),this._onChange=e=>{this.context.switchGroupContext.getOnChange()(e)},this._onUpdate=e=>{e.includes(this.props.value)&&this.forceUpdate()}}componentDidMount(){this.context.switchGroupContext.subscribe(this._onUpdate)}render(){return o.createElement(e,{...this.props,name:this._getName(),onChange:this._onChange,checked:this._isChecked()})}
componentWillUnmount(){this.context.switchGroupContext.unsubscribe(this._onUpdate)}_getName(){return this.context.switchGroupContext.getName()}_isChecked(){return this.context.switchGroupContext.getValues().includes(this.props.value)}}).contextTypes={switchGroupContext:i.any.isRequired},t}s.childContextTypes={switchGroupContext:i.any.isRequired}},48017:(e,t,n)=>{"use strict";n.r(t),n.d(t,{PartiallyClosingDialog:()=>h});var o=n(25177),i=n(59496),s=n(2946),r=n(60521),l=n(42554),a=n(70981),c=n(80185);var u=n(87125),d=n(40798),p=n(72249),m=n(66753);function h(e){const{positionOrTrade:t,qtyFormatter:n,supportLots:h,qtyStep:v,uiQtyStep:f,minQty:g,message:b,onClose:y,dialogActionHandler:w,onOpen:C}=e,x=(0,i.useMemo)(()=>Math.abs(t.qty),[t.qty]),[E,S]=(0,i.useState)(!0),[_,N]=(0,i.useState)(!1),[k,B]=(0,i.useState)(x),[T,M]=(0,i.useState)(!1),[G,L]=(0,i.useState)(!1),[I,O]=(0,i.useState)(),P=(()=>{const[e,t]=(0,i.useState)(!window.navigator.onLine),n=e=>t("offline"===e.type);return(0,i.useEffect)(()=>(window.addEventListener("online",n),window.addEventListener("offline",n),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)})),e})(),q=!G&&null!==k&&k<x;(0,i.useEffect)(()=>{let e;const t=new r.Big(x),n=null!==k?new r.Big(k):null,i=null==n?void 0:n.minus(g).mod(v);null===n?e=(0,o.t)("Number format is invalid"):n.gt(t)?e=(0,o.t)("Specified value is more than the instrument maximum"):!n.eq(t)&&n.lt(g)?e=(0,o.t)("Specified value is less than the instrument minimum of {minQty}").replace("{minQty}",String(g)):!n.eq(t)&&t.minus(n).lt(g)?e=(0,o.t)("Remaining quantity of position is less than the instrument minimum of {minQty}").replace("{minQty}",String(g)):n.eq(t)||(null==i?void 0:i.eq(0))||(e=(0,o.t)("The specified value is not a multiple of {step}").replace("{step}",String(v))),L(T||void 0!==e),O(e)},[T,k,x,v,g]),(0,i.useEffect)(()=>{P&&W()},[P,W]);const Q=(0,i.useMemo)(()=>null!==k?(0,p.splitThousands)(n.format(k)," "):"",[k,n]),D=(0,i.useMemo)(()=>null!==k?(0,p.splitThousands)(n.format(new r.Big(x).minus(k).toNumber())," "):"",[k,x,n]),R=_&&null!==k&&k<x?(0,o.t)("Partially close"):(0,o.t)("Close position");return i.createElement(d.CreateConfirmDialog,{isOpen:E,isOpened:E,submitButtonDisabled:_&&G,render:function(){const e=(0,p.splitThousands)(n.format(x)," "),r=(0,o.t)("of {positionQty} lot",{context:"close_position_total",plural:"of {positionQty} lots",count:x}).replace("{positionQty}",e),a=(0,o.t)("of {positionQty} unit",{context:"close_position_total",plural:"of {positionQty} units",count:x}).replace("{positionQty}",e),c=h?r:a;return i.createElement(l.TouchScrollContainer,{className:m.scrollable,onScroll:F},i.createElement("div",{className:m.content},i.createElement("div",{className:m.message},b),i.createElement(s.Checkbox,{name:"partially-close-checkbox",label:i.createElement("span",{className:m.label},(0,o.t)("Partial close")),checked:_,onChange:H,disabled:!1,indeterminate:!1,labelPositionReverse:!1}),_&&i.createElement("form",{onSubmit:A},i.createElement(u.NumberInput,{error:G,
errorMessage:I,errorHandler:X,className:m.input,value:k,useFormatter:!0,formatter:n,forceShowControls:!0,min:g,step:v,uiStep:f,mode:"float",onValueChange:K,onEmptyString:U,endSlot:i.createElement("p",{className:m.endSlot},c)}),q&&i.createElement("div",{className:m.estimation},i.createElement("div",null,(0,o.t)("Partially close {symbol} {quantity}").replace("{symbol}",t.symbol).replace("{quantity}",Q)),i.createElement("div",null,(0,o.t)("Leaving a position of {leavingQty}").replace("{leavingQty}",D))))))},onClose:W,title:(0,o.t)("Close position"),onSubmit:A,onCancel:()=>{},onKeyDown:function(e){27===(0,c.hashFromEvent)(e)&&W()},dataName:"trading-partial-closing-dialog",backdrop:!0,submitOnEnterKey:!0,defaultActionOnClose:"none",submitButtonText:R,cancelButtonText:(0,o.t)("Cancel"),onOpen:C});function H(){N(e=>!e)}function W(){S(!1),w({status:!1}),y()}function A(){w(_?null===k||G?{status:!1}:{status:!0,qty:k}:{status:!0,qty:x}),S(!1),y()}function K(e){B(e)}function U(){B(null)}function X(e){M(e)}function F(){a.globalCloseDelegate.fire()}}},40798:(e,t,n)=>{"use strict";n.d(t,{CreateConfirmDialog:()=>r});var o=n(59496),i=n(27886);const s=o.lazy(async()=>({default:(await Promise.all([n.e(5514),n.e(9289),n.e(7427),n.e(8463),n.e(7552),n.e(5998),n.e(7345),n.e(9309),n.e(7819),n.e(994),n.e(3566)]).then(n.bind(n,76669))).AdaptiveConfirmDialog})),r=(0,i.withDialogLazyLoad)(s)},32207:(e,t,n)=>{"use strict";n.d(t,{SplitThousandsFormatter:()=>s});var o=n(72249),i=n(34581);class s{constructor(e=" "){this._divider=e}format(e){const t=(0,o.splitThousands)(e,this._divider);return(0,i.isRtl)()?(0,i.startWithLTR)(t):t}parse(e){const t=(0,i.stripLTRMarks)(e).split(this._divider).join(""),n=Number(t);return isNaN(n)||/e/i.test(t)?{res:!1}:{res:!0,value:n,suggest:this.format(n)}}}},42554:(e,t,n)=>{"use strict";n.d(t,{TouchScrollContainer:()=>l});var o=n(59496),i=n(59142),s=n(88537),r=n(1227);function l(e){const{reference:t,children:n,...s}=e,l=(0,o.useRef)(null),c=(0,o.useCallback)(e=>{t&&(t.current=e),r.CheckMobile.iOS()&&(null!==l.current&&(0,i.enableBodyScroll)(l.current),l.current=e,null!==l.current&&(0,i.disableBodyScroll)(l.current,{allowTouchMove:a(l)}))},[t]);return o.createElement("div",{ref:c,...s},n)}function a(e){return t=>{const n=(0,s.ensureNotNull)(e.current),o=document.activeElement;return!n.contains(t)||null!==o&&n.contains(o)&&o.contains(t)}}},57369:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9" width="11" height="9" fill="none"><path stroke-width="2" d="M0.999878 4L3.99988 7L9.99988 1"/></svg>'}}]);