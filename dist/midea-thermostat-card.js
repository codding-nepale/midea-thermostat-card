/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,g=m?m.emptyScript:"",_=p.reactiveElementPolyfillSupport,f=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,_?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,z=document,M=()=>z.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,T="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,W=z.createTreeWalker(z,129);function Z(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=I;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===I?"!--"===c[1]?r=U:void 0!==c[1]?r=D:void 0!==c[2]?(j.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=R):void 0!==c[3]&&(r=R):r===R?">"===c[0]?(r=o??I,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?R:'"'===c[3]?V:H):r===V||r===H?r=R:r===U||r===D?r=I:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===I?i+P:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+k+h):i+k+(-2===l?e:h)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Q.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:G}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),W.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);W.currentNode=s;let o=W.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=W.nextNode(),n++)}return W.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=J(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=J(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends G{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??B)===q)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Q,Y),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const ct="midea-thermostat-card",lt="midea-thermostat-card-editor",dt="mt-dial",ht="mt-mode-chips",ut="mt-toggle-dropdown",pt="mt-collapsible-row",mt="mt-sensor-chips",gt={hvac_modes:!0,quick_toggles:["eco_mode","boost_mode","sleep_mode"],fan:"auto",swing:"auto",preset:"auto",sensors:[],extra_switches:[]},_t={draggable:!0,step:1},ft={aux_heating:"mdi:heat-wave",boost_mode:"mdi:turbine",breezeless:"mdi:tailwind",comfort_mode:"mdi:alpha-c-circle",dry:"mdi:air-filter",eco_mode:"mdi:leaf-circle",frost_protect:"mdi:snowflake-alert",indirect_wind:"mdi:tailwind",natural_wind:"mdi:tailwind",prompt_tone:"mdi:bell",power:"mdi:power",screen_display:"mdi:television-ambient-light",screen_display_alternate:"mdi:television-ambient-light",sleep_mode:"mdi:power-sleep",out_silent:"mdi:hvac-off",smart_eye:"mdi:eye",swing_horizontal:"mdi:arrow-split-vertical",swing_vertical:"mdi:arrow-split-horizontal",anion:"mdi:vanish",sound:"mdi:volume-high",self_clean:"mdi:air-filter"},bt={indoor_humidity:"mdi:water-percent",indoor_temperature:"mdi:thermometer",outdoor_temperature:"mdi:thermometer",total_energy_consumption:"mdi:lightning-bolt",current_energy_consumption:"mdi:lightning-bolt",realtime_power:"mdi:flash",pmv:"mdi:thermometer-lines",error_code:"mdi:alert-box"},vt=["swing_vertical","swing_horizontal"],yt=["wind_ud_angle","wind_lr_angle"],$t=["comfort_mode","breezeless"],wt={off:"mdi:power",cool:"mdi:snowflake",heat:"mdi:white-balance-sunny",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:autorenew",heat_cool:"mdi:sun-snowflake-variant"},xt=n`
  :host {
    --mt-gap: 12px;
    --mt-radius: 14px;
    --mt-chip-height: 38px;
    --mt-chip-radius: 12px;
    --mt-chip-bg: var(
      --ha-card-background,
      var(--card-background-color, #1c1c1c)
    );
    --mt-chip-bg-active: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
    --mt-fg: var(--primary-text-color, #e1e1e1);
    --mt-fg-secondary: var(--secondary-text-color, #9b9b9b);
    --mt-accent: var(--primary-color, #03a9f4);
    --mt-divider: var(--divider-color, rgba(255, 255, 255, 0.12));
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  button.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: var(--mt-chip-height);
    padding: 0 12px;
    border: none;
    border-radius: var(--mt-chip-radius);
    background: var(--mt-chip-bg-active);
    color: var(--mt-fg);
    font: inherit;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease, transform 80ms ease;
  }

  button.chip:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.14);
  }

  button.chip:active {
    transform: scale(0.96);
  }

  button.chip.active {
    color: white;
  }

  ha-icon {
    --mdc-icon-size: 20px;
  }

  .divider {
    height: 1px;
    background: var(--mt-divider);
    margin: 0;
  }
`;const At={off:"var(--state-climate-off-color, #8a8a8a)",cool:"var(--state-climate-cool-color, #2196F3)",heat:"var(--state-climate-heat-color, #FF8100)",dry:"var(--state-climate-dry-color, #FFCE49)",fan_only:"var(--state-climate-fan_only-color, #00BCD4)",auto:"var(--state-climate-auto-color, #43A047)",heat_cool:"var(--state-climate-heat_cool-color, #43A047)"};function Et(t){return At[t]||At.off}const St={en:{fan:"Fan",swing:"Swing",preset:"Preset",sensors:"Sensors",current:"Currently",off:"Off",quick_modes:"Modes","editor.entity":"Entity (climate)","editor.name":"Name","editor.icon":"Icon","editor.show_current":"Show current temperature","editor.quick_toggles":"Quick toggles","editor.fan":"Fan control","editor.swing":"Swing control","editor.preset":"Preset control","editor.sensors":"Sensors (footer)","editor.extra_switches":"Extra switches","editor.dial":"Dial","editor.step":"Temperature step","editor.draggable":"Draggable dial","error.no_entity":"Define a climate entity","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Sleep","attr.comfort_mode":"Comfort","attr.breezeless":"Breezeless","attr.aux_heating":"Aux heat","attr.dry":"Dry","attr.natural_wind":"Natural wind","attr.indirect_wind":"Indirect wind","attr.screen_display":"Display","attr.prompt_tone":"Beep","attr.anion":"Ionizer","attr.sound":"Sound","attr.self_clean":"Self-clean","attr.smart_eye":"Smart eye","attr.frost_protect":"Frost protect","attr.out_silent":"Silent","attr.swing_vertical":"Swing vertical","attr.swing_horizontal":"Swing horizontal"},fr:{fan:"Ventilateur",swing:"Oscillation",preset:"Préréglage",sensors:"Capteurs",current:"Actuellement",off:"Désactivé",quick_modes:"Modes","editor.entity":"Entité (climate)","editor.name":"Nom","editor.icon":"Icône","editor.show_current":"Afficher la température actuelle","editor.quick_toggles":"Bascules rapides","editor.fan":"Contrôle ventilateur","editor.swing":"Contrôle oscillation","editor.preset":"Contrôle préréglage","editor.sensors":"Capteurs (pied de carte)","editor.extra_switches":"Interrupteurs supplémentaires","editor.dial":"Cadran","editor.step":"Pas de température","editor.draggable":"Cadran glissable","error.no_entity":"Définissez une entité climate","attr.eco_mode":"Éco","attr.boost_mode":"Turbo","attr.sleep_mode":"Sommeil","attr.comfort_mode":"Confort","attr.breezeless":"Sans vent","attr.aux_heating":"Chauffage d'appoint","attr.dry":"Déshumidification","attr.natural_wind":"Vent naturel","attr.indirect_wind":"Vent indirect","attr.screen_display":"Écran","attr.prompt_tone":"Bip","attr.anion":"Ioniseur","attr.sound":"Son","attr.self_clean":"Auto-nettoyage","attr.smart_eye":"Smart eye","attr.frost_protect":"Protection antigel","attr.out_silent":"Silencieux","attr.swing_vertical":"Oscillation verticale","attr.swing_horizontal":"Oscillation horizontale"},de:{fan:"Lüfter",swing:"Schwenken",preset:"Voreinstellung",sensors:"Sensoren",current:"Aktuell",off:"Aus","editor.entity":"Entität (climate)","editor.name":"Name","editor.icon":"Symbol","editor.show_current":"Aktuelle Temperatur anzeigen","editor.quick_toggles":"Schnellschalter","editor.fan":"Lüftersteuerung","editor.swing":"Schwenksteuerung","editor.preset":"Voreinstellungssteuerung","editor.sensors":"Sensoren (Fußzeile)","editor.extra_switches":"Zusätzliche Schalter","error.no_entity":"Eine climate-Entität festlegen","editor.dial":"Wählrad","editor.step":"Temperaturschritt","editor.draggable":"Wählrad ziehbar","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Schlaf","attr.comfort_mode":"Komfort","attr.breezeless":"Windlos"},es:{fan:"Ventilador",swing:"Oscilación",preset:"Preajuste",sensors:"Sensores",current:"Actualmente",off:"Apagado","editor.entity":"Entidad (climate)","editor.name":"Nombre","editor.icon":"Icono","editor.show_current":"Mostrar temperatura actual","editor.quick_toggles":"Conmutadores rápidos","editor.fan":"Control del ventilador","editor.swing":"Control de oscilación","editor.preset":"Control de preajuste","editor.sensors":"Sensores (pie de tarjeta)","editor.extra_switches":"Interruptores adicionales","error.no_entity":"Defina una entidad climate","editor.dial":"Dial","editor.step":"Paso de temperatura","editor.draggable":"Dial deslizable","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Reposo","attr.comfort_mode":"Confort","attr.breezeless":"Sin viento"},it:{fan:"Ventola",swing:"Oscillazione",preset:"Preimpostazione",sensors:"Sensori",current:"Attualmente",off:"Spento","editor.entity":"Entità (climate)","editor.name":"Nome","editor.icon":"Icona","editor.show_current":"Mostra temperatura attuale","editor.quick_toggles":"Interruttori rapidi","editor.fan":"Controllo ventola","editor.swing":"Controllo oscillazione","editor.preset":"Controllo preimpostazione","editor.sensors":"Sensori (piè di pagina)","editor.extra_switches":"Interruttori aggiuntivi","error.no_entity":"Definire un'entità climate","editor.dial":"Quadrante","editor.step":"Passo temperatura","editor.draggable":"Quadrante trascinabile","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Notte","attr.comfort_mode":"Comfort","attr.breezeless":"Senza vento"},nl:{fan:"Ventilator",swing:"Zwenken",preset:"Voorinstelling",sensors:"Sensoren",current:"Huidig",off:"Uit","editor.entity":"Entiteit (climate)","editor.name":"Naam","editor.icon":"Pictogram","editor.show_current":"Huidige temperatuur tonen","editor.quick_toggles":"Snelschakelaars","editor.fan":"Ventilatorbediening","editor.swing":"Zwenkbediening","editor.preset":"Voorinstellingbediening","editor.sensors":"Sensoren (voettekst)","editor.extra_switches":"Extra schakelaars","error.no_entity":"Definieer een climate-entiteit","editor.dial":"Draaiknop","editor.step":"Temperatuurstap","editor.draggable":"Sleepbare draaiknop","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Slaap","attr.comfort_mode":"Comfort","attr.breezeless":"Windloos"},"pt-BR":{fan:"Ventilador",swing:"Oscilação",preset:"Predefinição",sensors:"Sensores",current:"Atualmente",off:"Desligado","editor.entity":"Entidade (climate)","editor.name":"Nome","editor.icon":"Ícone","editor.show_current":"Mostrar temperatura atual","editor.quick_toggles":"Alternadores rápidos","editor.fan":"Controle do ventilador","editor.swing":"Controle de oscilação","editor.preset":"Controle de predefinição","editor.sensors":"Sensores (rodapé)","editor.extra_switches":"Interruptores extras","error.no_entity":"Defina uma entidade climate","editor.dial":"Mostrador","editor.step":"Passo de temperatura","editor.draggable":"Mostrador arrastável","attr.eco_mode":"Eco","attr.boost_mode":"Turbo","attr.sleep_mode":"Sono","attr.comfort_mode":"Conforto","attr.breezeless":"Sem vento"},pl:{fan:"Wentylator",swing:"Wahanie",preset:"Ustawienie",sensors:"Czujniki",current:"Obecnie",off:"Wyłączone","editor.entity":"Encja (climate)","editor.name":"Nazwa","editor.icon":"Ikona","editor.show_current":"Pokaż bieżącą temperaturę","editor.quick_toggles":"Szybkie przełączniki","editor.fan":"Sterowanie wentylatorem","editor.swing":"Sterowanie wahaniem","editor.preset":"Sterowanie ustawieniem","editor.sensors":"Czujniki (stopka)","editor.extra_switches":"Dodatkowe przełączniki","error.no_entity":"Zdefiniuj encję climate","editor.dial":"Pokrętło","editor.step":"Krok temperatury","editor.draggable":"Przeciągane pokrętło","attr.eco_mode":"Eko","attr.boost_mode":"Turbo","attr.sleep_mode":"Sen","attr.comfort_mode":"Komfort","attr.breezeless":"Bez nawiewu"}};function kt(t,e){const i=function(t){return t&&(t.locale?.language||t.language)||"en"}(t),s=St.en||{};return(St[i]||{})[e]??s[e]??e}function Ct(t,e){if(t&&"function"==typeof t.formatEntityState&&e)try{return t.formatEntityState(e)}catch(t){}return e?e.state:""}function Pt(t,e,i){if(t&&"function"==typeof t.formatEntityAttributeValue&&e)try{return t.formatEntityAttributeValue(e,i)}catch(t){}return zt(e&&e.attributes&&e.attributes[i])}function zt(t){if(null==t)return"";const e=String(t).replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}function Mt(t,e,i,s){if(t&&"function"==typeof t.localize){const o=`component.${e}.entity_component._.state_attributes.${i}.state.${s}`,n=t.localize(o);if(n)return n}return zt(s)}function Ot(t,e){const i=`attr.${e}`,s=kt(t,i);return s===i?zt(e):s}function Nt(t,e,i){return t.callService("switch",i?"turn_on":"turn_off",{entity_id:e})}function Tt(t,e,i){return Math.min(i,Math.max(e,t))}function It(t,e,i=0){return i+Math.round((t-i)/e)*e}function Ut(t){return 135+270*Tt(t,0,1)}function Dt(t,e,i,s){const o=s*Math.PI/180;return{x:t+i*Math.cos(o),y:e+i*Math.sin(o)}}function Rt(t,e,i,s,o){const n=Ut(s),r=Ut(o),a=Dt(t,e,i,n),c=Dt(t,e,i,r),l=r-n>180?1:0;return`M ${a.x} ${a.y} A ${i} ${i} 0 ${l} 1 ${c.x} ${c.y}`}const Ht=100;class Vt extends rt{static properties={mode:{},value:{type:Number},current:{type:Number},min:{type:Number},max:{type:Number},step:{type:Number},draggable:{type:Boolean},label:{},unit:{},_dragValue:{state:!0}};constructor(){super(),this.min=16,this.max=30,this.step=.5,this.draggable=!0,this.unit="°C",this._dragValue=null,this._dragging=!1}static styles=[xt,n`
      .dial {
        position: relative;
        width: 200px;
        max-width: 100%;
        margin: 0 auto;
        aspect-ratio: 1 / 1;
        touch-action: none;
        user-select: none;
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .track {
        fill: none;
        stroke: var(--mt-divider);
        stroke-width: 10;
        stroke-linecap: round;
      }
      .value {
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        transition: d 120ms ease;
      }
      .handle {
        stroke: var(--ha-card-background, var(--card-background-color, #1c1c1c));
        stroke-width: 3;
        cursor: grab;
      }
      .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        text-align: center;
      }
      .label {
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .target {
        display: flex;
        align-items: flex-start;
        line-height: 1;
        color: var(--mt-fg);
      }
      .target-value {
        font-size: 2.4rem;
        font-weight: 600;
      }
      .unit {
        font-size: 1rem;
        margin-top: 4px;
        margin-left: 2px;
        color: var(--mt-fg-secondary);
      }
      .current {
        font-size: 0.85rem;
        color: var(--mt-fg-secondary);
        margin-top: 6px;
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-top: 8px;
      }
      button.round {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.4rem;
        padding: 0;
      }
    `];get _displayValue(){return null!=this._dragValue?this._dragValue:this.value}_emit(t){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_stepBy(t){const e=Tt(It((null!=this.value?this.value:this.min)+t*this.step,this.step,this.min),this.min,this.max);this._emit(e)}_valueFromEvent(t){const e=this.renderRoot.querySelector("svg");if(!e)return null;const i=e.getBoundingClientRect(),s=i.left+i.width/2,o=i.top+i.height/2;let n=180*Math.atan2(t.clientY-o,t.clientX-s)/Math.PI;n<0&&(n+=360),n<90&&(n+=360);const r=Tt((n-135)/270,0,1);return Tt(It(this.min+r*(this.max-this.min),this.step,this.min),this.min,this.max)}_onPointerDown(t){if(!this.draggable)return;this._dragging=!0;const e=this._valueFromEvent(t);null!=e&&(this._dragValue=e)}_onPointerMove(t){if(!this._dragging)return;const e=this._valueFromEvent(t);null!=e&&(this._dragValue=e)}_onPointerUp(){this._dragging&&(this._dragging=!1,null!=this._dragValue&&(this._emit(this._dragValue),this._dragValue=null))}render(){const t=null!=this._displayValue?this._displayValue:this.min,e=function(t,e,i){return i===e?0:Tt((t-e)/(i-e),0,1)}(t,this.min,this.max),i=Et(this.mode),s=Rt(Ht,Ht,80,0,1),o=Rt(Ht,Ht,80,0,Math.max(e,1e-4)),n=Dt(Ht,Ht,80,Ut(e));return L`
      <div
        class="dial"
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerUp}
      >
        <svg viewBox="0 0 200 200" @pointerdown=${this._onPointerDown}>
          <path class="track" d=${s}></path>
          <path class="value" d=${o} stroke=${i}></path>
          <circle
            class="handle"
            cx=${n.x}
            cy=${n.y}
            r="9"
            fill=${i}
            style="opacity:${this.draggable?1:0}"
          ></circle>
        </svg>
        <div class="center">
          ${this.label?L`<div class="label" style="color:${i}">${this.label}</div>`:""}
          <div class="target">
            <span class="target-value">${Number(t).toFixed(1)}</span>
            <span class="unit">${this.unit}</span>
          </div>
          ${null!=this.current?L`<div class="current">
                ↓ ${Number(this.current).toFixed(1)}${this.unit}
              </div>`:""}
        </div>
        <div class="buttons">
          <button
            class="chip round"
            aria-label="decrease"
            @click=${()=>this._stepBy(-1)}
          >
            −
          </button>
          <button
            class="chip round"
            aria-label="increase"
            @click=${()=>this._stepBy(1)}
          >
            +
          </button>
        </div>
      </div>
    `}}customElements.get(dt)||customElements.define(dt,Vt);class jt extends rt{static properties={hass:{attribute:!1},hvacModes:{attribute:!1},active:{}};static styles=[xt,n`
      /* segmented control: equal cells on a single row, never wraps */
      .chip-row {
        flex-wrap: nowrap;
        gap: 6px;
      }
      button.chip {
        flex: 1 1 0;
        min-width: 0;
        padding: 0;
      }
      ha-icon {
        --mdc-icon-size: 22px;
      }
    `];_select(t){this.dispatchEvent(new CustomEvent("hvac-mode-changed",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){const t=this.hvacModes||[];return L`
      <div class="chip-row">
        ${t.map(t=>{const e=Et(t),i=t===this.active;return L`
            <button
              class="chip ${i?"active":""}"
              style=${i?`background:${e};color:white;`:""}
              title=${function(t,e,i){if(t&&"function"==typeof t.localize){const s=t.localize(`component.${e}.entity_component._.state.${i}`);if(s)return s}return zt(i)}(this.hass,"climate",t)}
              @click=${()=>this._select(t)}
            >
              <ha-icon icon=${wt[t]||"mdi:thermostat"}></ha-icon>
            </button>
          `})}
      </div>
    `}}customElements.get(ht)||customElements.define(ht,jt);class Lt extends rt{static properties={hass:{attribute:!1},toggles:{attribute:!1},_open:{state:!0}};constructor(){super(),this._open=!1,this._onDocClick=t=>{this._open&&!t.composedPath().includes(this)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){document.removeEventListener("click",this._onDocClick),super.disconnectedCallback()}static styles=[xt,n`
      .dropdown {
        position: relative;
      }
      button.trigger {
        width: 100%;
        justify-content: flex-start;
        gap: 10px;
      }
      .trigger .label {
        flex: 1;
        text-align: left;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chevron {
        transition: transform 150ms ease;
        color: var(--mt-fg-secondary);
      }
      .chevron.open {
        transform: rotate(180deg);
      }
      .menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        z-index: 9;
        background: var(--ha-card-background, var(--card-background-color, #1c1f26));
        border: 1px solid var(--mt-divider);
        border-radius: var(--mt-chip-radius);
        padding: 6px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 260px;
        overflow: auto;
      }
      button.item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        border: none;
        background: transparent;
        color: var(--mt-fg);
        border-radius: 8px;
        cursor: pointer;
        font: inherit;
        text-align: left;
      }
      button.item:hover {
        background: var(--mt-chip-bg-active);
      }
      button.item.on {
        color: var(--mt-accent);
      }
      button.item .check {
        margin-left: auto;
      }
      ha-icon {
        --mdc-icon-size: 20px;
      }
    `];_toggleOpen(){this._open=!this._open}_toggle(t){this.dispatchEvent(new CustomEvent("toggle-changed",{detail:{entityId:t.entityId,on:!t.isOn},bubbles:!0,composed:!0}))}_triggerLabel(t){const e=t.filter(t=>t.isOn);return e.length?e.map(t=>Ot(this.hass,t.key)).join(", "):kt(this.hass,"quick_modes")}render(){const t=this.toggles||[];return t.length?L`
      <div class="dropdown">
        <button
          class="chip trigger"
          aria-haspopup="listbox"
          aria-expanded=${this._open?"true":"false"}
          @click=${this._toggleOpen}
        >
          <ha-icon icon="mdi:tune-variant"></ha-icon>
          <span class="label">${this._triggerLabel(t)}</span>
          <ha-icon
            class="chevron ${this._open?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </button>

        ${this._open?L`
              <div class="menu" role="listbox" aria-multiselectable="true">
                ${t.map(t=>L`
                    <button
                      class="item ${t.isOn?"on":""}"
                      role="option"
                      aria-selected=${t.isOn?"true":"false"}
                      @click=${()=>this._toggle(t)}
                    >
                      <ha-icon
                        icon=${ft[t.key]||"mdi:toggle-switch"}
                      ></ha-icon>
                      <span>${Ot(this.hass,t.key)}</span>
                      ${t.isOn?L`<ha-icon class="check" icon="mdi:check"></ha-icon>`:""}
                    </button>
                  `)}
              </div>
            `:""}
      </div>
    `:L``}}customElements.get(ut)||customElements.define(ut,Lt);class qt extends rt{static properties={icon:{},title:{},currentLabel:{},options:{attribute:!1},open:{type:Boolean}};constructor(){super(),this.open=!1,this.options=[]}static styles=[xt,n`
      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 4px;
        border: none;
        background: transparent;
        color: var(--mt-fg);
        font: inherit;
        cursor: pointer;
        border-radius: var(--mt-chip-radius);
      }
      .header:hover {
        background: var(--mt-chip-bg-active);
      }
      .title {
        flex: 1;
        text-align: left;
        font-weight: 500;
      }
      .current {
        color: var(--mt-fg-secondary);
        font-size: 0.9rem;
      }
      .chevron {
        transition: transform 150ms ease;
      }
      .chevron.open {
        transform: rotate(180deg);
      }
      .options {
        padding: 6px 4px 10px;
      }
      button.opt.selected {
        background: var(--mt-accent);
        color: white;
      }
      ha-icon {
        --mdc-icon-size: 20px;
      }
    `];_toggleOpen(){this.dispatchEvent(new CustomEvent("toggle-open",{bubbles:!0,composed:!0}))}_select(t){this.dispatchEvent(new CustomEvent("option-selected",{detail:{value:t},bubbles:!0,composed:!0}))}render(){const t=this.options||[];return L`
      <div class="row-wrap">
        <button class="header" @click=${this._toggleOpen}>
          ${this.icon?L`<ha-icon icon=${this.icon}></ha-icon>`:""}
          <span class="title">${this.title}</span>
          <span class="current">${this.currentLabel||""}</span>
          <ha-icon
            class="chevron ${this.open?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </button>
        ${this.open?L`
              <div class="options chip-row">
                ${t.map(t=>L`
                    <button
                      class="chip opt ${t.selected?"selected":""}"
                      @click=${()=>this._select(t.value)}
                    >
                      ${t.label}
                    </button>
                  `)}
              </div>
            `:""}
      </div>
    `}}customElements.get(pt)||customElements.define(pt,qt);class Bt extends rt{static properties={hass:{attribute:!1},sensors:{attribute:!1}};static styles=[xt,n`
      .chip {
        cursor: pointer;
        font-size: 0.85rem;
      }
      ha-icon {
        --mdc-icon-size: 18px;
        color: var(--mt-fg-secondary);
      }
    `];_moreInfo(t){this.dispatchEvent(new CustomEvent("more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}render(){const t=this.sensors||[];return t.length?L`
      <div class="chip-row">
        ${t.map(t=>L`
            <button class="chip" @click=${()=>this._moreInfo(t.entityId)}>
              <ha-icon icon=${bt[t.key]||"mdi:gauge"}></ha-icon>
              <span>${Ct(this.hass,t.stateObj)}</span>
            </button>
          `)}
      </div>
    `:L``}}customElements.get(mt)||customElements.define(mt,Bt);const Ft=t=>[{value:"auto",label:"Auto"},{value:"climate",label:"Climate"},...t,{value:"hidden",label:"Hidden"}];class Wt extends rt{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=n`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 4px;
    }
    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    input[type='text'] {
      flex: 1;
    }
  `;setConfig(t){this._config={...t}}_emit(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_setValue(t,e){this._config={...this._config,[t]:e},this._emit()}_setDial(t,e){this._config={...this._config,dial:{...this._config.dial||{},[t]:e}},this._emit()}_valueChanged(t){t.stopPropagation(),this._config={...t.detail.value},this._emit()}_schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"show_current_as_secondary",selector:{boolean:{}}},{type:"expandable",name:"dial",schema:[{name:"step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}},{name:"draggable",selector:{boolean:{}}}]},{type:"expandable",name:"features",schema:[{name:"fan",selector:{select:{options:Ft([{value:"number",label:"Number"}])}}},{name:"swing",selector:{select:{options:Ft([{value:"switches",label:"Switches"}])}}},{name:"preset",selector:{select:{options:Ft([{value:"switches",label:"Switches"}])}}}]}]}_computeLabel=t=>{const e=`editor.${t.name}`,i=kt(this.hass,e);return i===e?zt(t.name):i};render(){return this._config?customElements.get("ha-form")?L`
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `:L`
      <div class="form">
        <label>
          ${kt(this.hass,"editor.name")}
          <input
            id="name"
            type="text"
            .value=${this._config.name||""}
            @input=${t=>this._setValue("name",t.target.value)}
          />
        </label>
        <label>
          ${kt(this.hass,"editor.show_current")}
          <input
            id="show_current"
            type="checkbox"
            .checked=${!1!==this._config.show_current_as_secondary}
            @change=${t=>this._setValue("show_current_as_secondary",t.target.checked)}
          />
        </label>
        <label>
          ${kt(this.hass,"editor.step")}
          <input
            id="step"
            type="number"
            min="0.1"
            step="0.1"
            .value=${String(this._config.dial?.step??1)}
            @input=${t=>this._setDial("step",Number(t.target.value))}
          />
        </label>
      </div>
    `:L``}}customElements.get(lt)||customElements.define(lt,Wt);class Zt extends rt{static properties={hass:{attribute:!1},_config:{state:!0},_open:{state:!0}};constructor(){super(),this._open={fan:!1,swing:!1,preset:!1},this._features=null}static styles=[xt,n`
      ha-card {
        padding: 12px 12px 16px;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 32px;
      }
      .header .name {
        flex: 1;
        font-weight: 500;
        font-size: 1.05rem;
        color: var(--mt-fg);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon-button {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--mt-fg-secondary);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
      }
      .icon-button:hover {
        background: var(--mt-chip-bg-active);
      }
      /* dial + its chips form one tight visual block */
      .climate {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .chips {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .controls {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .warning {
        padding: 16px;
        color: var(--error-color, #db4437);
      }
    `];setConfig(t){this._config=function(t){if(!t||"object"!=typeof t||!t.entity)throw new Error("entity (climate.*) is required");if(!String(t.entity).startsWith("climate."))throw new Error("entity must be a climate.* entity");const e={...gt,...t.features||{}};return e.quick_toggles=[...e.quick_toggles||[]],e.sensors=[...e.sensors||[]],e.extra_switches=[...e.extra_switches||[]],{entity:t.entity,name:t.name,icon:t.icon,show_current_as_secondary:void 0===t.show_current_as_secondary||!!t.show_current_as_secondary,dial:{..._t,...t.dial||{}},features:e}}(t)}getCardSize(){return 6}static getStubConfig(){return{type:`custom:${ct}`,entity:""}}static getConfigElement(){return document.createElement(lt)}willUpdate(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&(this._features=function(t,e){if(!t||!e||!e.entity)return{climate:void 0,deviceId:void 0,hvacModes:[],quickToggles:[],fan:{source:null},swing:{source:null},preset:{source:null},sensors:[],extraSwitches:[]};const i=t.states||{},s=t.entities||{},o=i[e.entity],n=s[e.entity],r=n?.device_id,a=r?Object.values(s).filter(t=>t&&t.device_id===r):[],c=(t,e)=>{const i=a.find(i=>{const s=i.entity_id;return!(!s||(o=s,o.split(".")[0]!==t))&&(i.translation_key===e||s.endsWith(`_${e}`));var o});return i&&i.entity_id},l=e.features||{},d=o&&o.attributes||{},h=!1===l.hvac_modes?[]:d.hvac_modes||[],u=t=>(t||[]).map(t=>{const e=c("switch",t);return e&&i[e]?{key:t,entityId:e,isOn:(s=i[e],"on"===s?.state)}:null;var s}).filter(Boolean),p=u(l.quick_toggles),m=u(l.extra_switches);let g={source:null};const _=l.fan??"auto";if("hidden"!==_){const t="number"===_||"auto"===_;if(("climate"===_||"auto"===_)&&Array.isArray(d.fan_modes)&&d.fan_modes.length)g={source:"climate",entityId:e.entity,modes:d.fan_modes,current:d.fan_mode};else if(t){const t=c("number","fan_speed"),e=t&&i[t];e&&(g={source:"number",entityId:t,min:Number(e.attributes?.min??1),max:Number(e.attributes?.max??100),step:Number(e.attributes?.step??1),current:Number(e.state)})}}let f={source:null};const b=l.swing??"auto";if("hidden"!==b){const t="switches"===b||"auto"===b;if(("climate"===b||"auto"===b)&&Array.isArray(d.swing_modes)&&d.swing_modes.length)f={source:"climate",entityId:e.entity,modes:d.swing_modes,current:d.swing_mode};else if(t){const t=u(vt),e=yt.map(t=>{const e=c("select",t),s=e&&i[e];return s?{key:t,entityId:e,options:s.attributes?.options||[],current:s.state}:null}).filter(Boolean);(t.length||e.length)&&(f={source:"switches",switches:t,selects:e})}}let v={source:null};const y=l.preset??"auto";if("hidden"!==y){const t="switches"===y||"auto"===y;if(("climate"===y||"auto"===y)&&Array.isArray(d.preset_modes)&&d.preset_modes.length)v={source:"climate",entityId:e.entity,modes:d.preset_modes,current:d.preset_mode};else if(t){const t=u($t);t.length&&(v={source:"switches",switches:t})}}const $=(l.sensors||[]).map(t=>{const e=c("sensor",t);return e&&i[e]?{key:t,entityId:e,stateObj:i[e]}:null}).filter(Boolean);return{climate:o,deviceId:r,hvacModes:h,quickToggles:p,fan:g,swing:f,preset:v,sensors:$,extraSwitches:m}}(this.hass,this._config))}get _climate(){return this._features?.climate}get _unit(){return this.hass?.config?.unit_system?.temperature||"°C"}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_toggleRow(t){this._open={...this._open,[t]:!this._open[t]}}_findSwitch(t,e){const i=this._features?.[t];return(i?.switches||[]).find(t=>t.entityId===e)}_onTargetChanged(t){var e,i,s;e=this.hass,i=this._config.entity,s=t.detail.value,e.callService("climate","set_temperature",{entity_id:i,temperature:s})}_onModeChanged(t){var e,i,s;e=this.hass,i=this._config.entity,s=t.detail.mode,e.callService("climate","set_hvac_mode",{entity_id:i,hvac_mode:s})}_onToggleChanged(t){Nt(this.hass,t.detail.entityId,t.detail.on)}_applyOption(t,e){const i=this._config.entity,s=e.indexOf(":"),o=e.slice(0,s),n=e.slice(s+1);if("mode"===o)"fan"===t?function(t,e,i){t.callService("climate","set_fan_mode",{entity_id:e,fan_mode:i})}(this.hass,i,n):"swing"===t?function(t,e,i){t.callService("climate","set_swing_mode",{entity_id:e,swing_mode:i})}(this.hass,i,n):"preset"===t&&function(t,e,i){t.callService("climate","set_preset_mode",{entity_id:e,preset_mode:i})}(this.hass,i,n);else if("switch"===o){const e=this._findSwitch(t,n);Nt(this.hass,n,!(e&&e.isOn))}else if("select"===o){const t=n.indexOf(":"),e=n.slice(0,t),i=n.slice(t+1);!function(t,e,i){t.callService("select","select_option",{entity_id:e,option:i})}(this.hass,e,i)}else"number"===o&&function(t,e,i){t.callService("number","set_value",{entity_id:e,value:i})}(this.hass,this._features.fan.entityId,Number(n))}_numberSteps(t){const e=[t.min,25,50,75,t.max].map(t=>Math.round(t)).filter(e=>e>=t.min&&e<=t.max);return[...new Set(e)].sort((t,e)=>t-e)}_buildFan(){const t=this._features?.fan;return t&&null!==t.source?"climate"===t.source?{icon:"mdi:fan",title:kt(this.hass,"fan"),currentLabel:Pt(this.hass,this._climate,"fan_mode"),options:(t.modes||[]).map(e=>({value:`mode:${e}`,label:Mt(this.hass,"climate","fan_mode",e),selected:e===t.current}))}:{icon:"mdi:fan",title:kt(this.hass,"fan"),currentLabel:`${t.current}`,options:this._numberSteps(t).map(e=>({value:`number:${e}`,label:`${e}`,selected:Number(e)===Number(t.current)}))}:null}_buildSwing(){const t=this._features?.swing;if(!t||null===t.source)return null;if("climate"===t.source)return{icon:"mdi:arrow-oscillating",title:kt(this.hass,"swing"),currentLabel:Pt(this.hass,this._climate,"swing_mode"),options:(t.modes||[]).map(e=>({value:`mode:${e}`,label:Mt(this.hass,"climate","swing_mode",e),selected:e===t.current}))};const e=[];for(const i of t.switches||[])e.push({value:`switch:${i.entityId}`,label:Ot(this.hass,i.key),selected:i.isOn});for(const i of t.selects||[])for(const t of i.options||[])e.push({value:`select:${i.entityId}:${t}`,label:`${Ot(this.hass,i.key)}: ${zt(t)}`,selected:t===i.current});return{icon:"mdi:arrow-oscillating",title:kt(this.hass,"swing"),currentLabel:"",options:e}}_buildPreset(){const t=this._features?.preset;return t&&null!==t.source?"climate"===t.source?{icon:"mdi:star",title:kt(this.hass,"preset"),currentLabel:Pt(this.hass,this._climate,"preset_mode"),options:(t.modes||[]).map(e=>({value:`mode:${e}`,label:Mt(this.hass,"climate","preset_mode",e),selected:e===t.current}))}:{icon:"mdi:star",title:kt(this.hass,"preset"),currentLabel:"",options:(t.switches||[]).map(t=>({value:`switch:${t.entityId}`,label:Ot(this.hass,t.key),selected:t.isOn}))}:null}_renderRow(t,e){return e?L`
      <mt-collapsible-row
        .icon=${e.icon}
        .title=${e.title}
        .currentLabel=${e.currentLabel}
        .options=${e.options}
        .open=${this._open[t]}
        @toggle-open=${()=>this._toggleRow(t)}
        @option-selected=${e=>this._applyOption(t,e.detail.value)}
      ></mt-collapsible-row>
    `:""}render(){if(!this._config)return L``;const t=this._climate;if(!this.hass||!t)return L`<ha-card
        ><div class="warning">${kt(this.hass,"error.no_entity")}</div></ha-card
      >`;const e=t.attributes||{},i=t.state,s=Et(i),o=this._config.name||e.friendly_name||this._config.entity,n=null!=e.min_temp?Number(e.min_temp):16,r=null!=e.max_temp?Number(e.max_temp):30,a=this._config.dial.step,c=this._features,l=!1!==this._config.features.hvac_modes&&c.hvacModes.length,d=c.fan.source||c.swing.source||c.preset.source;return L`
      <ha-card style="--mt-state-color:${s}">
        <div class="content">
          <div class="header">
            <span class="name">${o}</span>
            <button
              class="icon-button"
              aria-label="more info"
              @click=${()=>this._fireMoreInfo(this._config.entity)}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
          </div>

          <div class="climate">
            <mt-dial
              .mode=${i}
              .value=${e.temperature}
              .current=${this._config.show_current_as_secondary?e.current_temperature:void 0}
              .min=${n}
              .max=${r}
              .step=${a}
              .draggable=${this._config.dial.draggable}
              .unit=${this._unit}
              .label=${Ct(this.hass,t)}
              @value-changed=${this._onTargetChanged}
            ></mt-dial>

            ${l||c.quickToggles.length?L`<div class="chips">
                  ${l?L`<mt-mode-chips
                        .hass=${this.hass}
                        .hvacModes=${c.hvacModes}
                        .active=${i}
                        @hvac-mode-changed=${this._onModeChanged}
                      ></mt-mode-chips>`:""}
                  ${c.quickToggles.length?L`<mt-toggle-dropdown
                        .hass=${this.hass}
                        .toggles=${c.quickToggles}
                        @toggle-changed=${this._onToggleChanged}
                      ></mt-toggle-dropdown>`:""}
                </div>`:""}
          </div>

          ${d?L`<div class="divider"></div>
                <div class="controls">
                  ${this._renderRow("fan",this._buildFan())}
                  ${this._renderRow("swing",this._buildSwing())}
                  ${this._renderRow("preset",this._buildPreset())}
                </div>`:""}

          ${c.sensors.length?L`<div class="divider"></div>
                <mt-sensor-chips
                  .hass=${this.hass}
                  .sensors=${c.sensors}
                  @more-info=${t=>this._fireMoreInfo(t.detail.entityId)}
                ></mt-sensor-chips>`:""}
        </div>
      </ha-card>
    `}}customElements.get(ct)||customElements.define(ct,Zt),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===ct)||window.customCards.push({type:ct,name:"Midea Thermostat Card",description:"Modern Mushroom-style thermostat card for Midea A/C (midea_ac_lan).",preview:!0}),console.info("%c MIDEA-THERMOSTAT-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{Zt as MideaThermostatCard};
