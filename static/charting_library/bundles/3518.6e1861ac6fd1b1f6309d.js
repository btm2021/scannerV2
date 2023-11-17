(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[3518],{99062:t=>{t.exports={"toast-positioning-wrapper":"toast-positioning-wrapper-uEa3054V",compact:"compact-uEa3054V","location-bottom-left":"location-bottom-left-uEa3054V","location-bottom-right":"location-bottom-right-uEa3054V",hidden:"hidden-uEa3054V",added:"added-uEa3054V"}},85938:(t,e,o)=>{"use strict";o.d(e,{useForceUpdate:()=>i});var n=o(59496);const i=()=>{const[,t]=(0,n.useReducer)((t,e)=>t+1,0);return t}},63212:(t,e,o)=>{"use strict";o.d(e,{OverlapManager:()=>s,getRootOverlapManager:()=>a});var n=o(88537);class i{constructor(){this._storage=[]}add(t){this._storage.push(t)}remove(t){this._storage=this._storage.filter(e=>t!==e)}has(t){return this._storage.includes(t)}getItems(){return this._storage}}class s{constructor(t=document){this._storage=new i,this._windows=new Map,this._index=0,this._document=t,this._container=t.createDocumentFragment()}setContainer(t){const e=this._container,o=null===t?this._document.createDocumentFragment():t;!function(t,e){Array.from(t.childNodes).forEach(t=>{t.nodeType===Node.ELEMENT_NODE&&e.appendChild(t)})}(e,o),this._container=o}registerWindow(t){this._storage.has(t)||this._storage.add(t)}ensureWindow(t,e={position:"fixed",direction:"normal"}){const o=this._windows.get(t);if(void 0!==o)return o;this.registerWindow(t);const n=this._document.createElement("div");if(n.style.position=e.position,n.style.zIndex=this._index.toString(),n.dataset.id=t,void 0!==e.index){const t=this._container.childNodes.length;if(e.index>=t)this._container.appendChild(n);else if(e.index<=0)this._container.insertBefore(n,this._container.firstChild);else{const t=this._container.childNodes[e.index];this._container.insertBefore(n,t)}}else"reverse"===e.direction?this._container.insertBefore(n,this._container.firstChild):this._container.appendChild(n);return this._windows.set(t,n),++this._index,n}unregisterWindow(t){this._storage.remove(t);const e=this._windows.get(t);void 0!==e&&(null!==e.parentElement&&e.parentElement.removeChild(e),this._windows.delete(t))}getZindex(t){const e=this.ensureWindow(t);return parseInt(e.style.zIndex||"0")}moveToTop(t){if(this.getZindex(t)!==this._index){this.ensureWindow(t).style.zIndex=(++this._index).toString()}}removeWindow(t){this.unregisterWindow(t)}}const r=new WeakMap;function a(t=document){const e=t.getElementById("overlap-manager-root");if(null!==e)return(0,n.ensureDefined)(r.get(e));{const e=new s(t),o=function(t){const e=t.createElement("div");return e.style.position="absolute",e.style.zIndex=150..toString(),e.style.top="0px",e.style.left="0px",e.id="overlap-manager-root",e}(t);return r.set(o,e),e.setContainer(o),t.body.appendChild(o),e}}},8361:(t,e,o)=>{"use strict";o.d(e,{Portal:()=>d,PortalContext:()=>h});var n=o(59496),i=o(87995),s=o(16345),r=o(63212),a=o(53327);class d extends n.PureComponent{constructor(){super(...arguments),this._uuid=(0,s.guid)()}componentWillUnmount(){this._manager().removeWindow(this._uuid)}render(){
const t=this._manager().ensureWindow(this._uuid,this.props.layerOptions);return t.style.top=this.props.top||"",t.style.bottom=this.props.bottom||"",t.style.left=this.props.left||"",t.style.right=this.props.right||"",t.style.pointerEvents=this.props.pointerEvents||"",i.createPortal(n.createElement(h.Provider,{value:this},this.props.children),t)}moveToTop(){this._manager().moveToTop(this._uuid)}_manager(){return null===this.context?(0,r.getRootOverlapManager)():this.context}}d.contextType=a.SlotContext;const h=n.createContext(null)},53327:(t,e,o)=>{"use strict";o.d(e,{Slot:()=>i,SlotContext:()=>s});var n=o(59496);class i extends n.Component{shouldComponentUpdate(){return!1}render(){return n.createElement("div",{style:{position:"fixed",zIndex:150,left:0,top:0},ref:this.props.reference})}}const s=n.createContext(null)},6056:(t,e,o)=>{"use strict";var n,i;o.d(e,{ToastAnimationStage:()=>n,ToastPriority:()=>i}),function(t){t[t.Add=0]="Add",t[t.Remove=1]="Remove",t[t.None=2]="None"}(n||(n={})),function(t){t[t.Low=0]="Low",t[t.Medium=1]="Medium",t[t.High=2]="High"}(i||(i={}))},13518:(t,e,o)=>{"use strict";o.d(e,{ToastsLayer:()=>_});var n=o(59496),i=o(87995),s=o(97754),r=o(16345),a=o(8361),d=o(53327),h=o(63212),c=o(85938),u=o(6056);class l{constructor(t){this._animationStage=u.ToastAnimationStage.Add,this._keys=new Map,this._element=null,this.render=t=>this._render(t),this.remove=()=>this._currentToastsLayer.removeToast(this);const{priority:e,origin:o,currentLayer:n,onLayerChange:i,render:s,onMouseOver:r,onMouseOut:a}=t;this._staticData=Object.freeze({priority:e,origin:o,onLayerChange:i,onMouseOver:r,onMouseOut:a}),this._currentToastsLayer=n||o,this._render=s}getStaticData(){return this._staticData}migrate(t){this._currentToastsLayer=t,this._animationStage=u.ToastAnimationStage.Add}getCurrentLayer(){return this._currentToastsLayer}isForeign(){return this._staticData.origin!==this._currentToastsLayer}getAnimationStage(){return this._animationStage}setAnimationStage(t){this._animationStage=t}setKey(t,e){this._keys.set(t,e)}getKey(t=this._currentToastsLayer){return this._keys.get(t)}getElement(){return this._element}setElement(t){this._element=t}}var g=o(99062);const m={position:"fixed",left:"0",bottom:"0",right:"0",zIndex:145};class _{constructor(t,e,o=m,n){this._toasts={[u.ToastPriority.Low]:[],[u.ToastPriority.Medium]:[],[u.ToastPriority.High]:[]},this._container=void 0!==e?e:document.body,this._suggestedLayout=void 0!==t?t:"loose",this._location=null!=n?n:"bottom-left",this._manager=new h.OverlapManager(document),this._overlapManagerContainer=function(t,e={}){const o=t.createElement("div");return o.dataset.role="toast-container",y(o,{...m,...e}),o}(document,o),this._manager.setContainer(this._overlapManagerContainer),this._container.appendChild(this._overlapManagerContainer),this._detachedContainer=document.createElement("div")}showToast(t){const{render:e,priority:o=u.ToastPriority.Medium,index:n,origin:i=this,onLayerChange:s,onMouseOver:r,onMouseOut:a}=t,d=new l({priority:o,origin:i,currentLayer:this,render:e,
onLayerChange:s,onMouseOver:r,onMouseOut:a}),h=this._getNextKey();return d.setKey(this,h),"compact"===this._suggestedLayout&&o===u.ToastPriority.Low?Promise.all(this._toasts[u.ToastPriority.Low].map(t=>this.removeToast(t))).then(()=>{this._add(d,n),this._render()}):(this._add(d,n),this._render()),d}showExistingToast(t){const e=this._getNextKey();return t.setKey(this,e),this._add(t),this._render(),t}removeToast(t){return new Promise(e=>{t.setAnimationStage(u.ToastAnimationStage.Remove),this._render(),setTimeout(()=>{this._remove(t),this._render(),e()},250)})}update(t){const{suggestedLayout:e,location:o,container:n,rootContainerOptions:i}=t;let s=!1,r=!1;void 0!==e&&e!==this._suggestedLayout&&(this._setSuggestedLayout(e),s=!0),void 0!==o&&(this._setLocation(o),r=!0),void 0!==n&&(this._setContainer(n),r=!0),void 0!==i&&(this._updateRootContainer(i),r=!0),s?"compact"===this._suggestedLayout&&this._toasts[u.ToastPriority.Low].slice(0,-1).forEach(t=>this.removeToast(t)):r&&this._render()}getToasts(){return this._toasts}forceRender(){this._render()}merge(t){p(t.getToasts()).forEach(async e=>{const o=e.getStaticData();await e.remove(),e.migrate(this),this.showExistingToast(e),void 0!==o.onLayerChange&&o.onLayerChange(t,this)})}split(t){p(this._toasts).filter(t=>t.isForeign()).forEach(async e=>{const o=e.getStaticData();await e.remove(),e.migrate(t),t.showExistingToast(e),void 0!==o.onLayerChange&&o.onLayerChange(this,t)})}reset(){this._toasts={[u.ToastPriority.Low]:[],[u.ToastPriority.Medium]:[],[u.ToastPriority.High]:[]},this._render()}destroy(){this._removeRootContainer()}_removeRootContainer(){i.unmountComponentAtNode(this._detachedContainer),this._detachedContainer.remove(),this._overlapManagerContainer.remove()}_getToastsList(t){const e=t.getStaticData().priority;return this._toasts[e]}_normalizeIndex(t,e){return t<0?0:t>e.length?e.length:t}_add(t,e){const o=this._getToastsList(t);if(void 0!==e){const n=this._normalizeIndex(e,o);o.splice(n,0,t)}else o.push(t)}_remove(t){const e=this._getToastsList(t),o=e.indexOf(t);o>=0&&e.splice(o,1)}_render(){const t=p(this._toasts);i.render(n.createElement(T,{toasts:t,suggestedLayout:this._suggestedLayout,location:this._location,manager:this._manager,layer:this}),this._detachedContainer)}_setSuggestedLayout(t){t!==this._suggestedLayout&&(this._suggestedLayout=t)}_setLocation(t){t!==this._location&&(this._location=t)}_setContainer(t){t!==this._container&&(this._container=t,this._container.appendChild(this._overlapManagerContainer))}_updateRootContainer(t){y(this._overlapManagerContainer,t)}_getNextKey(){return(0,r.randomHashN)(5)}}function p(t){return[...t[u.ToastPriority.Low],...t[u.ToastPriority.Medium],...t[u.ToastPriority.High]]}function y(t,e){const{top:o,right:n,bottom:i,left:s,position:r,zIndex:a}=e;void 0!==r&&(t.style.position=r),void 0!==a&&(t.style.zIndex=String(a)),void 0!==o&&(t.style.top=o),void 0!==n&&(t.style.right=n),void 0!==i&&(t.style.bottom=i),void 0!==s&&(t.style.left=s)}function v(t,e,o){return t.getKey(o)||e.toString(10)}function f(t){
const{toast:e,toasts:o,layer:i,suggestedLayout:r,location:d,forceRender:h}=t,c=(0,n.useRef)(null),l=e.getAnimationStage(),m=l!==u.ToastAnimationStage.None,_=l===u.ToastAnimationStage.Add,p=function(t,e,o){var n;const i=e.indexOf(t),s=v(t,i,o);let r=0;for(const t of e){const a=e.indexOf(t),d=v(t,a,o),h=(null===(n=t.getElement())||void 0===n?void 0:n.offsetHeight)||0,c=t.getAnimationStage()!==u.ToastAnimationStage.None;let l=0;c&&d===s?l=1:!c&&i<a&&(l=-1),r+=l*h}return r}(e,o,i),y=s(g["toast-positioning-wrapper"],m&&g.hidden,_&&g.added,"compact"===r&&g.compact,d&&g["location-"+d]);return(0,n.useEffect)(()=>{if(e.getCurrentLayer()!==i||e.getAnimationStage()!==u.ToastAnimationStage.Add||null===c.current)return;const t=e.getElement();null===t||t!==c.current?(e.setElement(c.current),h()):(e.setAnimationStage(u.ToastAnimationStage.None),h())}),n.createElement(a.Portal,{layerOptions:{position:"absolute"},left:"0",right:"0"},n.createElement("div",{onMouseOver:e.getStaticData().onMouseOver,onMouseOut:e.getStaticData().onMouseOut,className:y,style:{transform:`translateY(${p}px)`},ref:c},e.render({onRemove:e.remove,suggestedLayout:r})))}function T(t){const{toasts:e,suggestedLayout:o,location:i,manager:s,layer:r}=t,a=(0,c.useForceUpdate)();return n.createElement(d.SlotContext.Provider,{value:s},e.map((t,s)=>n.createElement(f,{key:v(t,s,r),toast:t,toasts:e,layer:r,suggestedLayout:o,location:i,forceRender:a})))}}}]);