function t(t,e,i,s){var a,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(r=(n<3?a(r):n>3?a(e,i,r):a(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},k=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??k)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,v?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=t=>t,C=x.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+A,z=`<${P}>`,T=document,M=()=>T.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,L=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,R=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Q=W(1),q=W(2),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,Y=T.createTreeWalker(T,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===O?"!--"===c[1]?r=N:void 0!==c[1]?r=L:void 0!==c[2]?(B.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=I):void 0!==c[3]&&(r=I):r===I?">"===c[0]?(r=a??O,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,o=c[1],r=void 0===c[3]?I:'"'===c[3]?R:D):r===R||r===D?r=I:r===N||r===L?r=O:(r=I,a=void 0);const d=r===I&&t[e+1].startsWith("/>")?" ":"";n+=r===O?i+z:l>=0?(s.push(o),i.slice(0,l)+E+i.slice(l)+A+d):i+A+(-2===l?e:d)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[c,l]=G(t,e);if(this.el=J.createElement(c,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?at:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(A)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),Y.nextNode(),o.push({type:2,index:++a});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)o.push({type:7,index:a}),t+=A.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===F)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=j(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);Y.currentNode=s;let a=Y.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new et(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new rt(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=Y.nextNode(),n++)}return Y.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),j(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=X(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=X(this,s[i+r],e,r),o===F&&(o=this._$AH[r]),n||=!j(o)||o!==this._$AH[r],o===V?t=V:t!==V&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(J,et),(x.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:k},ut=(t=pt,e,i)=>{const{kind:s,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return mt({...t,state:!0,attribute:!1})}const ft=r`
  :host {
    --sketch-bg: var(--ha-card-background, #faf7f0);
    --sketch-ink: var(--primary-text-color, #2a2a2a);
    --sketch-ink-muted: var(--secondary-text-color, rgba(42, 42, 42, 0.5));
    --sketch-ink-light: var(--divider-color, #e8e0d0);
    --sketch-primary: var(--primary-color, #4a6fa5);
    --sketch-success: var(--label-badge-green, #4caf50);
    --sketch-warning: var(--label-badge-yellow, #ff9800);
    --sketch-danger: var(--label-badge-red, #f44336);
    --sketch-border: var(--divider-color, #2a2a2a);
    --sketch-font: 'Caveat', cursive;
    --sketch-font-body: 'Patrick Hand', 'Caveat', cursive, var(--paper-font-body1_-_font-family, sans-serif);
    --sketch-radius: 2px;
    --sketch-shadow: drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.12))
      drop-shadow(5px 7px 8px rgba(0, 0, 0, 0.08));
    --sketch-shadow-hover: drop-shadow(4px 5px 0px rgba(0, 0, 0, 0.15))
      drop-shadow(6px 8px 10px rgba(0, 0, 0, 0.1));
    --sketch-hover-bg: var(--secondary-background-color, rgba(42, 42, 42, 0.06));

    display: block;
    font-family: var(--sketch-font-body);
  }

  /* Fonts loaded via <link> tag in document.head (see bottom of this file) */

  ha-card {
    background: var(--sketch-bg);
    color: var(--sketch-ink);
    border-radius: var(--sketch-radius);
    rotate: -0.5deg;
    filter: var(--sketch-shadow);
    transition: transform 0.3s ease, filter 0.3s ease;
    overflow: visible;
    border: 2px dashed var(--sketch-border);
    border-style: dashed;
    position: relative;
  }

  ha-card:hover {
    transform: translate(-1px, -1px) rotate(-0.8deg);
    filter: var(--sketch-shadow-hover);
  }

  .sketch-card-content {
    padding: 16px;
    position: relative;
  }

  /* Sketch decorative corner marks */
  .sketch-card-content::before,
  .sketch-card-content::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--sketch-ink-muted);
    border-style: solid;
    opacity: 0.3;
  }
  .sketch-card-content::before {
    top: 4px;
    left: 4px;
    border-width: 2px 0 0 2px;
  }
  .sketch-card-content::after {
    bottom: 4px;
    right: 4px;
    border-width: 0 2px 2px 0;
  }

  .sketch-name {
    font-family: var(--sketch-font);
    font-size: 1.4em;
    font-weight: 600;
    color: var(--sketch-ink);
    margin: 0;
    line-height: 1.2;
  }

  .sketch-state {
    font-family: var(--sketch-font);
    font-size: 1.1em;
    color: var(--sketch-ink-muted);
    margin: 4px 0 0;
  }

  .sketch-icon {
    --mdc-icon-size: 28px;
    color: var(--sketch-primary);
  }

  .sketch-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sketch-col {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .sketch-btn {
    font-family: var(--sketch-font);
    font-size: 1em;
    background: transparent;
    border: 2px dashed var(--sketch-border);
    border-radius: var(--sketch-radius);
    color: var(--sketch-ink);
    padding: 6px 14px;
    cursor: pointer;
    rotate: -0.3deg;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .sketch-btn:hover {
    background: var(--sketch-hover-bg);
    transform: translate(-1px, -1px);
  }

  .sketch-btn:active {
    transform: translate(0, 0);
  }

  .sketch-btn.active {
    background: var(--sketch-primary);
    color: var(--text-primary-color, #fff);
    border-color: var(--sketch-primary);
    border-style: solid;
  }

  .sketch-slider-container {
    width: 100%;
    margin: 8px 0;
  }

  .sketch-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: var(--sketch-ink-light);
    border-radius: 2px;
    outline: none;
  }

  .sketch-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: var(--sketch-primary);
    border: 2px solid var(--sketch-border);
    border-radius: 50%;
    cursor: pointer;
  }

  .sketch-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: var(--sketch-primary);
    border: 2px solid var(--sketch-border);
    border-radius: 50%;
    cursor: pointer;
  }

  .sketch-label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-ink-muted);
    display: block;
    margin-bottom: 4px;
  }

  .sketch-value {
    font-family: var(--sketch-font);
    font-size: 2em;
    font-weight: 700;
    color: var(--sketch-ink);
    line-height: 1;
  }

  .sketch-unit {
    font-size: 0.5em;
    font-weight: 400;
    color: var(--sketch-ink-muted);
    margin-left: 2px;
  }

  .sketch-divider {
    border: none;
    border-top: 1.5px dashed var(--sketch-ink-light);
    margin: 10px 0;
    opacity: 0.6;
  }

  .sketch-grid {
    display: grid;
    gap: 8px;
  }

  .sketch-badge {
    display: inline-block;
    font-family: var(--sketch-font);
    font-size: 0.8em;
    padding: 2px 8px;
    border: 1.5px solid var(--sketch-border);
    border-radius: 2px;
    rotate: -0.5deg;
  }

  .sketch-badge.on {
    background: var(--sketch-success);
    color: var(--text-primary-color, #fff);
    border-color: var(--sketch-success);
  }

  .sketch-badge.off {
    background: transparent;
    color: var(--sketch-ink-muted);
  }

  /* Unavailable entity state */
  :host(.unavailable) ha-card {
    opacity: 0.55;
    border-style: dotted;
  }
  :host(.unavailable) .sketch-slider,
  :host(.unavailable) .sketch-btn,
  :host(.unavailable) button {
    pointer-events: none;
    opacity: 0.4;
  }
  .sketch-unavailable-label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-danger);
    font-style: italic;
  }

  @media (prefers-reduced-motion: reduce) {
    ha-card,
    .sketch-btn {
      transition: none;
    }
    ha-card {
      rotate: 0deg;
    }
  }
`,vt=document.createElement("link");function _t(t){window.dispatchEvent(new CustomEvent("haptic",{detail:t}))}vt.rel="stylesheet",vt.href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap",document.head.querySelector('link[href*="Caveat"]')||document.head.appendChild(vt);class bt extends lt{constructor(){super(...arguments),this._holdFired=!1,this._lastTap=0,this.handlePointerDown=t=>{this._holdFired=!1,this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._config?.hold_action&&(this.executeAction(this._config.hold_action),_t("medium"))},500)},this.handlePointerUp=t=>{if(this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),this._holdFired)return;const e=Date.now();this._config?.double_tap_action&&e-this._lastTap<250?(this._dblTapTimer&&(clearTimeout(this._dblTapTimer),this._dblTapTimer=void 0),this._lastTap=0,this.executeAction(this._config.double_tap_action)):(this._lastTap=e,this._config?.double_tap_action?this._dblTapTimer=setTimeout(()=>{this._lastTap=0,this.executeAction(this._config?.tap_action,this.defaultTapAction)},250):this.executeAction(this._config?.tap_action,this.defaultTapAction))},this.handlePointerCancel=()=>{this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),this._holdFired=!1}}static{this.styles=[ft]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}getCardSize(){return 3}getEntity(){if(this._config?.entity&&this.hass)return this.hass.states[this._config.entity]}isUnavailable(){const t=this.getEntity();return!!t&&["unavailable","unknown"].includes(t.state)}getName(){if(this._config?.name)return this._config.name;const t=this.getEntity();return t?.attributes?.friendly_name||this._config?.entity||""}getIcon(){if(this._config?.icon)return this._config.icon;const t=this.getEntity();return t?.attributes?.icon||"mdi:help-circle-outline"}callService(t,e,i){this.hass.callService(t,e,i)}toggleEntity(){if(!this._config?.entity)return;const[t]=this._config.entity.split(".");this.callService(t,"toggle",{entity_id:this._config.entity})}fireEvent(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}executeAction(t,e="more-info"){switch(t?.action||e){case"toggle":this.toggleEntity(),_t("success");break;case"call-service":if(t?.service){const[e,i]=t.service.split(".");this.callService(e,i,t.service_data),_t("light")}break;case"navigate":t?.navigation_path&&(window.history.pushState(null,"",t.navigation_path),this.fireEvent("location-changed"),_t("light"));break;case"url":t?.url_path&&(window.open(t.url_path,"_blank"),_t("light"));break;case"none":break;default:this.fireEvent("hass-more-info",{entityId:this._config?.entity}),_t("light")}}updated(t){super.updated(t),this.isUnavailable()?this.classList.add("unavailable"):this.classList.remove("unavailable")}get defaultTapAction(){return"more-info"}handleAction(){this.executeAction(this._config?.tap_action,this.defaultTapAction)}}function kt(t){if(t.attributes.icon)return t.attributes.icon;const e=t.entity_id.split(".")[0],i=t.state;return{light:"on"===i?"mdi:lightbulb":"mdi:lightbulb-outline",switch:"on"===i?"mdi:toggle-switch":"mdi:toggle-switch-off",fan:"mdi:fan",climate:"mdi:thermostat",weather:yt(i),sensor:wt(t),binary_sensor:"on"===i?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline",cover:"open"===i?"mdi:window-open":"mdi:window-closed",lock:"locked"===i?"mdi:lock":"mdi:lock-open",media_player:"playing"===i?"mdi:play-circle":"mdi:play-circle-outline",alarm_control_panel:xt(i),camera:"mdi:video",automation:"mdi:robot",script:"mdi:script-text",scene:"mdi:palette",input_boolean:"on"===i?"mdi:check-circle":"mdi:close-circle",person:"mdi:account",device_tracker:"mdi:crosshairs-gps",vacuum:"mdi:robot-vacuum",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",timer:"mdi:timer-outline",counter:"mdi:counter",sun:"above_horizon"===i?"mdi:white-balance-sunny":"mdi:weather-night"}[e]||"mdi:help-circle-outline"}function yt(t){return{"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle-outline"}[t]||"mdi:weather-cloudy"}function wt(t){return{temperature:"mdi:thermometer",humidity:"mdi:water-percent",pressure:"mdi:gauge",power:"mdi:flash",energy:"mdi:lightning-bolt",battery:"mdi:battery",illuminance:"mdi:brightness-6",carbon_dioxide:"mdi:molecule-co2",carbon_monoxide:"mdi:molecule-co",gas:"mdi:gas-cylinder",moisture:"mdi:water",signal_strength:"mdi:wifi",voltage:"mdi:sine-wave",current:"mdi:current-ac"}[t.attributes.device_class]||"mdi:eye"}function xt(t){return{armed_home:"mdi:shield-home",armed_away:"mdi:shield-lock",armed_night:"mdi:shield-moon",armed_vacation:"mdi:shield-airplane",armed_custom_bypass:"mdi:shield-star",disarmed:"mdi:shield-off",triggered:"mdi:bell-ring",pending:"mdi:shield-alert",arming:"mdi:shield-outline"}[t]||"mdi:shield"}function $t(t){return["on","open","playing","home","unlocked"].includes(t)}function Ct(t){const e=t.state,i=t.attributes.unit_of_measurement;return i?`${e} ${i}`:e}t([mt({attribute:!1})],bt.prototype,"hass",void 0),t([gt()],bt.prototype,"_config",void 0);class St extends lt{constructor(){super(...arguments),this._computeLabel=t=>({entity:"Entity",name:"Name (optional)",icon:"Icon (optional)",show_name:"Show Name",show_state:"Show State",show_icon:"Show Icon",show_brightness:"Show Brightness Slider",show_color_temp:"Show Color Temperature",show_current_as_primary:"Show Current Temp as Primary",show_forecast:"Show Forecast",num_forecasts:"Number of Forecast Days",graph:"Show Graph",show_artwork:"Show Artwork",show_source:"Show Source",show_position:"Show Position Slider",show_tilt:"Show Tilt Slider",show_location:"Show Location",show_battery:"Show Battery",battery_entity:"Battery Entity",show_controls:"Show Controls",aspect_ratio:"Aspect Ratio",hide_icon:"Hide Icon",states:"Alarm States",mode:"Display Mode",show_date:"Show Date",show_seconds:"Show Seconds",hash:"Hash (e.g. kitchen)",auto_close:"Auto-close (seconds)",width:"Width (e.g. 90%)",style:"Style",columns:"Columns",collapsible:"Collapsible"}[t.name]||t.name),this._valueChanged=t=>{const e=t.detail.value;!function(t,e,i){const s=new Event(e,{bubbles:!0,cancelable:!1,composed:!0});s.detail=i,t.dispatchEvent(s)}(this,"config-changed",{config:{...this._config,...e}})}}static{this.styles=[r`
    :host {
      display: block;
    }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `]}get _defaults(){return{}}setConfig(t){this._config={...this._defaults,...t}}render(){return this.hass&&this._config?Q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}}function Et(t){return[{name:"entity",selector:{entity:t?{domain:t}:{}}},{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}]},{name:"show_name",selector:{boolean:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_icon",selector:{boolean:{}}}]}t([mt({attribute:!1})],St.prototype,"hass",void 0),t([gt()],St.prototype,"_config",void 0);let At=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...Et()]}};At=t([dt("sketch-entity-card-editor")],At);let Pt=class extends bt{static{this.styles=[...super.styles,r`
      .entity-row {
        display: flex;
        align-items: center;
        gap: 14px;
        cursor: pointer;
      }
      .entity-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px dashed var(--sketch-ink-light);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .entity-info {
        flex: 1;
        min-width: 0;
      }
      .entity-state-badge {
        text-align: right;
      }
      .last-changed {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
        font-style: italic;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define an entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-entity-card-editor")}static getStubConfig(t){return{entity:Object.keys(t.states)[0]||"light.example"}}getCardSize(){return 2}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;const e=this._config.icon||kt(t),i=this.getName(),s=Ct(t),a=!1!==this._config.show_name,n=!1!==this._config.show_state,r=!1!==this._config.show_icon,o=$t(t.state);return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="entity-row" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${r?Q`
                  <div class="entity-icon-wrap">
                    <ha-icon class="sketch-icon" .icon=${e}></ha-icon>
                  </div>
                `:V}
            <div class="entity-info">
              ${a?Q`<p class="sketch-name">${i}</p>`:V}
              <div class="last-changed">${function(t){const e=new Date,i=new Date(t),s=Math.floor((e.getTime()-i.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:`${Math.floor(s/86400)}d ago`}(t.last_changed)}</div>
            </div>
            ${n?Q`
                  <div class="entity-state-badge">
                    <span class="sketch-badge ${o?"on":"off"}">${s}</span>
                  </div>
                `:V}
          </div>
        </div>
      </ha-card>
    `}};Pt=t([dt("sketch-entity-card")],Pt);let zt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...Et()]}};zt=t([dt("sketch-button-card-editor")],zt);let Tt=class extends bt{constructor(){super(...arguments),this._pressing=!1}static{this.styles=[...super.styles,r`
      .button-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 16px;
        cursor: pointer;
        user-select: none;
        min-height: 80px;
        transition: transform 0.15s ease;
      }
      .button-wrap.pressing {
        transform: scale(0.96);
      }
      .button-icon-wrap {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        border: 2px dashed var(--sketch-ink-light);
        border-radius: 50%;
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .button-icon-wrap.active {
        background: var(--sketch-primary);
        border-color: var(--sketch-primary);
        border-style: solid;
      }
      .button-icon-wrap.active ha-icon {
        color: #fff;
      }
      .button-label {
        font-family: var(--sketch-font);
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
      }
      .button-state {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
    `]}setConfig(t){super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-button-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("light.")||t.startsWith("switch."));return{entity:e[0]||"light.example",tap_action:{action:"toggle"}}}getCardSize(){return 3}_handlePress(t){this._pressing=!0,this.handlePointerDown(t)}_handleRelease(t){this._pressing=!1,this.handlePointerUp(t)}_handleCancel(){this._pressing=!1,this.handlePointerCancel()}render(){const t=this.getEntity(),e=this._config.icon||(t?kt(t):"mdi:gesture-tap"),i=this.getName()||"Button",s=t&&$t(t.state),a=!1!==this._config.show_name,n=!1!==this._config.show_state,r=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div
          class="sketch-card-content button-wrap ${this._pressing?"pressing":""}"
          @pointerdown=${this._handlePress}
          @pointerup=${this._handleRelease}
          @pointerleave=${this._handleCancel}
          @pointercancel=${this._handleCancel}
        >
          ${r?Q`
                <div class="button-icon-wrap ${s?"active":""}">
                  <ha-icon class="sketch-icon" .icon=${e}></ha-icon>
                </div>
              `:V}
          ${a?Q`<div class="button-label">${i}</div>`:V}
          ${n&&t?Q`<div class="button-state">${t.state}</div>`:V}
        </div>
      </ha-card>
    `}};t([gt()],Tt.prototype,"_pressing",void 0),Tt=t([dt("sketch-button-card")],Tt);let Mt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_brightness:!0,show_color_temp:!0}}get _schema(){return[...Et("light"),{name:"show_brightness",selector:{boolean:{}}},{name:"show_color_temp",selector:{boolean:{}}}]}};Mt=t([dt("sketch-light-card-editor")],Mt);let jt=class extends bt{static{this.styles=[...super.styles,r`
      .light-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .light-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--sketch-ink-light);
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      .light-icon-wrap.on {
        background: rgba(255, 193, 7, 0.2);
        border-color: #ffc107;
        border-style: solid;
      }
      .light-icon-wrap.on ha-icon {
        color: #ffc107;
      }
      .light-controls {
        margin-top: 12px;
      }
      .brightness-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .brightness-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 40px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
      .color-temp-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 8px;
      }
      .ct-label {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        min-width: 20px;
      }
      .ct-slider {
        background: linear-gradient(to right, #ff8a2b, #fff, #90caf9);
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a light entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-light-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("light."));return{entity:e[0]||"light.example"}}getCardSize(){return 3}get defaultTapAction(){return"toggle"}get _lightConfig(){return this._config}_setBrightness(t){const e=parseInt(t.target.value);this.callService("light","turn_on",{entity_id:this._config.entity,brightness:Math.round(e/100*255)})}_setColorTemp(t){const e=parseInt(t.target.value);this.callService("light","turn_on",{entity_id:this._config.entity,color_temp:e})}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Light not found</p></div></ha-card>`;const e=this.isUnavailable(),i="on"===t.state,s=t.attributes.brightness?Math.round(t.attributes.brightness/255*100):0,a=!1!==this._lightConfig.show_brightness&&i&&!e,n=!1!==this._lightConfig.show_color_temp&&!e&&i&&void 0!==t.attributes.min_mireds,r=this._config.icon||kt(t),o=!1!==this._config.show_name,c=!1!==this._config.show_state,l=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="light-header" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${l?Q`
                  <div class="light-icon-wrap ${i?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${r}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${o?Q`<p class="sketch-name">${this.getName()}</p>`:V}
              ${c?Q`<p class="sketch-state">${e?Q`<span class="sketch-unavailable-label">Unavailable</span>`:i?`${s}%`:"Off"}</p>`:V}
            </div>
          </div>
          ${a?Q`
                <div class="light-controls">
                  <span class="sketch-label">Brightness</span>
                  <div class="brightness-row">
                    <input
                      type="range"
                      class="sketch-slider"
                      min="1"
                      max="100"
                      .value=${String(s)}
                      @change=${this._setBrightness}
                    />
                    <span class="brightness-value">${s}%</span>
                  </div>
                </div>
              `:V}
          ${n?Q`
                <div class="color-temp-row">
                  <span class="ct-label">&#x2600;</span>
                  <input
                    type="range"
                    class="sketch-slider ct-slider"
                    min=${t.attributes.min_mireds||153}
                    max=${t.attributes.max_mireds||500}
                    .value=${String(t.attributes.color_temp||300)}
                    @change=${this._setColorTemp}
                  />
                  <span class="ct-label">&#x2744;</span>
                </div>
              `:V}
        </div>
      </ha-card>
    `}};jt=t([dt("sketch-light-card")],jt);let Ut=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_current_as_primary:!1}}get _schema(){return[...Et("climate"),{name:"show_current_as_primary",selector:{boolean:{}}}]}};Ut=t([dt("sketch-thermostat-card-editor")],Ut);let Ht=class extends bt{static{this.styles=[...super.styles,r`
      .thermo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .thermo-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--sketch-ink-light);
        border-radius: 50%;
      }
      .thermo-icon-wrap.heating {
        border-color: var(--sketch-danger);
        border-style: solid;
        background: rgba(244, 67, 54, 0.1);
      }
      .thermo-icon-wrap.heating ha-icon { color: var(--sketch-danger); }
      .thermo-icon-wrap.cooling {
        border-color: var(--sketch-primary);
        border-style: solid;
        background: rgba(74, 111, 165, 0.1);
      }
      .thermo-icon-wrap.cooling ha-icon { color: var(--sketch-primary); }
      .thermo-temp-display {
        text-align: center;
        margin: 16px 0 8px;
      }
      .current-temp {
        font-family: var(--sketch-font);
        font-size: 2.8em;
        font-weight: 700;
        line-height: 1;
      }
      .target-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin: 12px 0;
      }
      .temp-adjust-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 700;
        background: transparent;
        border: 2px solid var(--sketch-border);
        border-radius: 50%;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.2s;
      }
      .temp-adjust-btn:hover { background: var(--sketch-hover-bg); }
      .target-temp {
        font-family: var(--sketch-font);
        font-size: 1.5em;
        font-weight: 600;
        min-width: 60px;
        text-align: center;
      }
      .mode-row {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 8px;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a climate entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-thermostat-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("climate."));return{entity:e[0]||"climate.example"}}getCardSize(){return 4}_adjustTemp(t){const e=this.getEntity();if(!e)return;const i=e.attributes.target_temp_step||.5,s=e.attributes.temperature||20;this.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s+t*i})}_setMode(t){this.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Climate not found</p></div></ha-card>`;const e=t.attributes.current_temperature??"--",i=t.attributes.temperature??"--",s=t.attributes.unit_of_measurement||"°",a=t.attributes.hvac_action||t.state,n=t.attributes.hvac_modes||[],r=t.state;let o="";"heating"!==a&&"heat"!==r||(o="heating"),"cooling"!==a&&"cool"!==r||(o="cooling");const c=!1!==this._config.show_name,l=!1!==this._config.show_state,h=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="thermo-header" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${h?Q`
                  <div class="thermo-icon-wrap ${o}">
                    <ha-icon class="sketch-icon" .icon=${"mdi:thermostat"}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${c?Q`<p class="sketch-name">${this.getName()}</p>`:V}
              ${l?Q`<p class="sketch-state">${r}</p>`:V}
            </div>
          </div>

          <div class="thermo-temp-display">
            <span class="current-temp">${e}${s}</span>
            <span class="sketch-label" style="display:block;margin-top:4px">Current</span>
          </div>

          <hr class="sketch-divider" />

          <div class="target-row">
            <button class="temp-adjust-btn" @click=${()=>this._adjustTemp(-1)}>-</button>
            <span class="target-temp">${i}${s}</span>
            <button class="temp-adjust-btn" @click=${()=>this._adjustTemp(1)}>+</button>
          </div>
          <span class="sketch-label" style="text-align:center;display:block">Target</span>

          ${n.length>0?Q`
                <div class="mode-row">
                  ${n.map(t=>Q`
                      <button
                        class="sketch-btn ${t===r?"active":""}"
                        @click=${()=>this._setMode(t)}
                      >
                        ${t}
                      </button>
                    `)}
                </div>
              `:V}
        </div>
      </ha-card>
    `}};Ht=t([dt("sketch-thermostat-card")],Ht);let Ot=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_forecast:!0,num_forecasts:5}}get _schema(){return[...Et("weather"),{name:"show_forecast",selector:{boolean:{}}},{name:"num_forecasts",selector:{number:{min:1,max:7,mode:"box"}}}]}};Ot=t([dt("sketch-weather-card-editor")],Ot);let Nt=class extends bt{static{this.styles=[...super.styles,r`
      .weather-main {
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
      }
      .weather-icon-wrap {
        flex-shrink: 0;
      }
      .weather-icon-wrap ha-icon {
        --mdc-icon-size: 48px;
        color: var(--sketch-primary);
      }
      .weather-temp {
        font-family: var(--sketch-font);
        font-size: 2.6em;
        font-weight: 700;
        line-height: 1;
      }
      .weather-condition {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        text-transform: capitalize;
        margin-top: 2px;
      }
      .weather-details {
        display: flex;
        gap: 16px;
        margin-top: 10px;
        flex-wrap: wrap;
      }
      .weather-detail {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
      }
      .weather-detail ha-icon {
        --mdc-icon-size: 16px;
      }
      .forecast-row {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        gap: 4px;
        overflow-x: auto;
      }
      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        min-width: 48px;
        padding: 4px;
      }
      .forecast-day-name {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        font-weight: 600;
      }
      .forecast-day ha-icon {
        --mdc-icon-size: 20px;
        color: var(--sketch-primary);
      }
      .forecast-temps {
        font-family: var(--sketch-font);
        font-size: 0.75em;
      }
      .forecast-high { font-weight: 700; }
      .forecast-low { color: var(--sketch-ink-muted); }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a weather entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-weather-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("weather."));return{entity:e[0]||"weather.example"}}getCardSize(){return 4}get _weatherConfig(){return this._config}_weatherIconName(t){return function(t){return yt(t)}(t)}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Weather not found</p></div></ha-card>`;const e=t.attributes.temperature??"--",i=t.attributes.temperature_unit||"°",s=t.state,a=t.attributes.humidity,n=t.attributes.wind_speed,r=t.attributes.wind_speed_unit||"km/h",o=t.attributes.pressure,c=t.attributes.forecast||[],l=!1!==this._weatherConfig.show_forecast,h=this._weatherConfig.num_forecasts||5,d=!1!==this._config.show_name,p=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          ${d?Q`<p class="sketch-name" style="margin-bottom:8px">${this.getName()}</p>`:V}
          <div class="weather-main" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${p?Q`
                  <div class="weather-icon-wrap">
                    <ha-icon .icon=${this._weatherIconName(s)}></ha-icon>
                  </div>
                `:V}
            <div>
              <div class="weather-temp">${e}${i}</div>
              <div class="weather-condition">${s.replace(/-/g," ")}</div>
            </div>
          </div>

          <div class="weather-details">
            ${null!=a?Q`<div class="weather-detail"><ha-icon icon="mdi:water-percent"></ha-icon>${a}%</div>`:V}
            ${null!=n?Q`<div class="weather-detail"><ha-icon icon="mdi:weather-windy"></ha-icon>${n} ${r}</div>`:V}
            ${null!=o?Q`<div class="weather-detail"><ha-icon icon="mdi:gauge"></ha-icon>${o} hPa</div>`:V}
          </div>

          ${l&&c.length>0?Q`
                <hr class="sketch-divider" />
                <div class="forecast-row">
                  ${c.slice(0,h).map(t=>Q`
                      <div class="forecast-day">
                        <span class="forecast-day-name">
                          ${new Date(t.datetime).toLocaleDateString(void 0,{weekday:"short"})}
                        </span>
                        <ha-icon .icon=${this._weatherIconName(t.condition)}></ha-icon>
                        <div class="forecast-temps">
                          <span class="forecast-high">${t.temperature}\u00b0</span>
                          ${null!=t.templow?Q`<span class="forecast-low"> ${t.templow}\u00b0</span>`:V}
                        </div>
                      </div>
                    `)}
                </div>
              `:V}
        </div>
      </ha-card>
    `}};Nt=t([dt("sketch-weather-card")],Nt);let Lt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,graph:!0}}get _schema(){return[...Et("sensor"),{name:"graph",selector:{boolean:{}}}]}};Lt=t([dt("sketch-sensor-card-editor")],Lt);let It=class extends bt{constructor(){super(...arguments),this._history=[]}static{this.styles=[...super.styles,r`
      .sensor-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
      }
      .sensor-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px dashed var(--sketch-ink-light);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .sensor-value-row {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }
      .sensor-graph {
        margin-top: 12px;
        width: 100%;
        height: 50px;
      }
      .spark-line {
        fill: none;
        stroke: var(--sketch-primary);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .spark-area {
        fill: var(--sketch-primary);
        opacity: 0.08;
      }
      .spark-dot {
        fill: var(--sketch-primary);
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a sensor entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-sensor-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("sensor."));return{entity:e[0]||"sensor.example",graph:!0}}getCardSize(){return 3}get _sensorConfig(){return this._config}connectedCallback(){super.connectedCallback(),this._generateMockHistory()}_generateMockHistory(){const t=this.getEntity(),e=t?parseFloat(t.state):20;if(isNaN(e))return void(this._history=[]);const i=[];let s=.9*e;for(let t=0;t<24;t++)s+=(Math.random()-.45)*(.08*e),i.push(s);i.push(e),this._history=i}_renderSparkline(){if(this._history.length<2)return V;const t=Math.min(...this._history),e=Math.max(...this._history)-t||1,i=this._history.map((i,s)=>({x:4+s/(this._history.length-1)*272,y:4+42*(1-(i-t)/e)})),s=i.map((t,e)=>`${0===e?"M":"L"} ${t.x} ${t.y}`).join(" "),a=`${s} L ${i[i.length-1].x} 50 L ${i[0].x} 50 Z`,n=i[i.length-1];return Q`
      <svg class="sensor-graph" viewBox="0 0 ${280} ${50}" preserveAspectRatio="none">
        <path class="spark-area" d="${a}" />
        <path class="spark-line" d="${s}" />
        <circle class="spark-dot" cx="${n.x}" cy="${n.y}" r="3" />
      </svg>
    `}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Sensor not found</p></div></ha-card>`;const e=this._config.icon||kt(t),i=t.attributes.unit_of_measurement||"",s=!1!==this._sensorConfig.graph,a=!1!==this._config.show_name,n=!1!==this._config.show_state,r=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="sensor-header" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${r?Q`
                  <div class="sensor-icon-wrap">
                    <ha-icon class="sketch-icon" .icon=${e}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${a?Q`<p class="sketch-name">${this.getName()}</p>`:V}
              ${n?Q`
                    <div class="sensor-value-row">
                      <span class="sketch-value">${t.state}</span>
                      ${i?Q`<span class="sketch-unit">${i}</span>`:V}
                    </div>
                  `:V}
            </div>
          </div>
          ${s?this._renderSparkline():V}
        </div>
      </ha-card>
    `}};t([gt()],It.prototype,"_history",void 0),It=t([dt("sketch-sensor-card")],It);let Dt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_artwork:!0,show_source:!0}}get _schema(){return[...Et("media_player"),{name:"show_artwork",selector:{boolean:{}}},{name:"show_source",selector:{boolean:{}}}]}};Dt=t([dt("sketch-media-player-card-editor")],Dt);let Rt=class extends bt{static{this.styles=[...super.styles,r`
      .media-layout {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .media-artwork {
        width: 72px;
        height: 72px;
        border-radius: 2px;
        object-fit: cover;
        border: 2px solid var(--sketch-ink-light);
        flex-shrink: 0;
        rotate: 1deg;
      }
      .media-artwork-placeholder {
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--sketch-ink-light);
        border-radius: 2px;
        flex-shrink: 0;
      }
      .media-info {
        flex: 1;
        min-width: 0;
      }
      .media-title {
        font-family: var(--sketch-font);
        font-size: 1.2em;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .media-artist {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        color: var(--sketch-ink-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .media-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 12px;
      }
      .media-ctrl-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1.5px solid var(--sketch-border);
        border-radius: 50%;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.2s;
        padding: 0;
      }
      .media-ctrl-btn:hover { background: var(--sketch-hover-bg); }
      .media-ctrl-btn.play {
        width: 44px;
        height: 44px;
        border-width: 2px;
      }
      .media-ctrl-btn ha-icon { --mdc-icon-size: 20px; }
      .media-ctrl-btn.play ha-icon { --mdc-icon-size: 24px; }
      .volume-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
      }
      .volume-row ha-icon { --mdc-icon-size: 18px; color: var(--sketch-ink-muted); }
      .media-source {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        margin-top: 6px;
        font-style: italic;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a media_player entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-media-player-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("media_player."));return{entity:e[0]||"media_player.example"}}getCardSize(){return 4}get _mediaConfig(){return this._config}_callMediaService(t){this.callService("media_player",t,{entity_id:this._config.entity})}_setVolume(t){const e=parseFloat(t.target.value);this.callService("media_player","volume_set",{entity_id:this._config.entity,volume_level:e/100})}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Media Player not found</p></div></ha-card>`;const e=t.attributes.media_title||"Nothing playing",i=t.attributes.media_artist||"",s=t.attributes.entity_picture,a="playing"===t.state,n=Math.round(100*(t.attributes.volume_level||0)),r=!1!==this._mediaConfig.show_artwork,o=!1!==this._mediaConfig.show_source,c=t.attributes.source,l=!1!==this._config.show_name;return this._config.show_state,this._config.show_icon,Q`
      <ha-card>
        <div class="sketch-card-content">
          ${l?Q`<p class="sketch-name">${this.getName()}</p>`:V}
          <div class="media-layout">
            ${r?s?Q`<img class="media-artwork" src="${s}" alt="artwork" />`:Q`
                    <div class="media-artwork-placeholder">
                      <ha-icon class="sketch-icon" icon="mdi:music-note"></ha-icon>
                    </div>
                  `:V}
            <div class="media-info">
              <div class="media-title">${e}</div>
              ${i?Q`<div class="media-artist">${i}</div>`:V}
            </div>
          </div>

          <div class="media-controls">
            <button class="media-ctrl-btn" @click=${()=>this._callMediaService("media_previous_track")}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="media-ctrl-btn play" @click=${()=>this._callMediaService("media_play_pause")}>
              <ha-icon icon=${a?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
            <button class="media-ctrl-btn" @click=${()=>this._callMediaService("media_next_track")}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
          </div>

          <div class="volume-row">
            <ha-icon icon=${0===n?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            <input
              type="range"
              class="sketch-slider"
              min="0"
              max="100"
              .value=${String(n)}
              @change=${this._setVolume}
            />
          </div>

          ${o&&c?Q`<div class="media-source">Source: ${c}</div>`:V}
        </div>
      </ha-card>
    `}};Rt=t([dt("sketch-media-player-card")],Rt);let Bt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_position:!0,show_tilt:!0}}get _schema(){return[...Et("cover"),{name:"show_position",selector:{boolean:{}}},{name:"show_tilt",selector:{boolean:{}}}]}};Bt=t([dt("sketch-cover-card-editor")],Bt);let Wt=class extends bt{static{this.styles=[...super.styles,r`
      .cover-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .cover-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--sketch-ink-light);
        border-radius: 4px;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }
      .cover-icon-wrap.open {
        border-color: var(--sketch-success);
        border-style: solid;
      }
      .cover-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--sketch-primary);
        opacity: 0.15;
        transition: height 0.3s ease;
      }
      .cover-controls {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        justify-content: center;
      }
      .cover-ctrl-btn {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 2px solid var(--sketch-border);
        border-radius: 2px;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.2s;
        padding: 0;
      }
      .cover-ctrl-btn:hover { background: var(--sketch-hover-bg); }
      .cover-ctrl-btn ha-icon { --mdc-icon-size: 22px; }
      .position-row {
        margin-top: 12px;
      }
      .position-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .tilt-row {
        margin-top: 8px;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a cover entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-cover-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("cover."));return{entity:e[0]||"cover.example"}}getCardSize(){return 3}get _coverConfig(){return this._config}_callCoverService(t){this.callService("cover",t,{entity_id:this._config.entity})}_setPosition(t){const e=parseInt(t.target.value);this.callService("cover","set_cover_position",{entity_id:this._config.entity,position:e})}_setTilt(t){const e=parseInt(t.target.value);this.callService("cover","set_cover_tilt_position",{entity_id:this._config.entity,tilt_position:e})}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Cover not found</p></div></ha-card>`;const e="open"===t.state,i=t.attributes.current_position??(e?100:0),s=t.attributes.current_tilt_position,a=!1!==this._coverConfig.show_position&&void 0!==t.attributes.current_position,n=!1!==this._coverConfig.show_tilt&&void 0!==s,r=e?"mdi:window-open-variant":"mdi:window-closed-variant",o=!1!==this._config.show_name,c=!1!==this._config.show_state,l=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="cover-header" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${l?Q`
                  <div class="cover-icon-wrap ${e?"open":""}">
                    <div class="cover-fill" style="height: ${i}%"></div>
                    <ha-icon class="sketch-icon" .icon=${this._config.icon||r}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${o?Q`<p class="sketch-name">${this.getName()}</p>`:V}
              ${c?Q`<p class="sketch-state">${t.state} ${null!=i?`(${i}%)`:""}</p>`:V}
            </div>
          </div>

          <div class="cover-controls">
            <button class="cover-ctrl-btn" @click=${()=>this._callCoverService("open_cover")}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            <button class="cover-ctrl-btn" @click=${()=>this._callCoverService("stop_cover")}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
            <button class="cover-ctrl-btn" @click=${()=>this._callCoverService("close_cover")}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>

          ${a?Q`
                <div class="position-row">
                  <div class="position-label">
                    <span class="sketch-label">Position</span>
                    <span class="sketch-label">${i}%</span>
                  </div>
                  <input
                    type="range"
                    class="sketch-slider"
                    min="0"
                    max="100"
                    .value=${String(i)}
                    @change=${this._setPosition}
                  />
                </div>
              `:V}

          ${n?Q`
                <div class="tilt-row">
                  <div class="position-label">
                    <span class="sketch-label">Tilt</span>
                    <span class="sketch-label">${s}%</span>
                  </div>
                  <input
                    type="range"
                    class="sketch-slider"
                    min="0"
                    max="100"
                    .value=${String(s)}
                    @change=${this._setTilt}
                  />
                </div>
              `:V}
        </div>
      </ha-card>
    `}};Wt=t([dt("sketch-cover-card")],Wt);let Qt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,states:["arm_home","arm_away","arm_night"]}}get _schema(){return[...Et("alarm_control_panel"),{name:"states",selector:{select:{multiple:!0,options:[{value:"arm_home",label:"Arm Home"},{value:"arm_away",label:"Arm Away"},{value:"arm_night",label:"Arm Night"},{value:"arm_custom_bypass",label:"Arm Custom"}]}}}]}};Qt=t([dt("sketch-alarm-panel-card-editor")],Qt);let qt=class extends bt{constructor(){super(...arguments),this._code=""}static{this.styles=[...super.styles,r`
      .alarm-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .alarm-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--sketch-border);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .alarm-icon-wrap.armed {
        border-color: var(--sketch-danger);
        background: rgba(244, 67, 54, 0.1);
      }
      .alarm-icon-wrap.armed ha-icon { color: var(--sketch-danger); }
      .alarm-icon-wrap.disarmed {
        border-color: var(--sketch-success);
        background: rgba(76, 175, 80, 0.1);
      }
      .alarm-icon-wrap.disarmed ha-icon { color: var(--sketch-success); }
      .alarm-icon-wrap.triggered {
        border-color: var(--sketch-danger);
        background: var(--sketch-danger);
        animation: pulse-alarm 0.5s ease-in-out infinite alternate;
      }
      .alarm-icon-wrap.triggered ha-icon { color: #fff; }
      @keyframes pulse-alarm {
        from { opacity: 0.7; }
        to { opacity: 1; }
      }
      .code-display {
        font-family: var(--sketch-font);
        font-size: 1.8em;
        text-align: center;
        letter-spacing: 8px;
        padding: 8px;
        margin: 12px 0 8px;
        min-height: 1.8em;
        border-bottom: 2px dashed var(--sketch-ink-light);
      }
      .keypad {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin: 12px 0;
        max-width: 240px;
        margin-left: auto;
        margin-right: auto;
      }
      .key-btn {
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 600;
        padding: 10px;
        background: transparent;
        border: 2px solid var(--sketch-border);
        border-radius: 2px;
        cursor: pointer;
        color: var(--sketch-ink);
        transition: background 0.15s;
        aspect-ratio: 1.5;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .key-btn:hover { background: var(--sketch-hover-bg); }
      .key-btn:active { background: var(--sketch-hover-bg); }
      .key-btn.clear {
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
      }
      .action-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 8px;
      }
      .arm-btn {
        font-size: 0.85em;
        padding: 8px 12px;
      }
      .arm-btn.disarm {
        border-color: var(--sketch-success);
        color: var(--sketch-success);
      }
      .arm-btn.arm {
        border-color: var(--sketch-danger);
        color: var(--sketch-danger);
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define an alarm_control_panel entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-alarm-panel-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("alarm_control_panel."));return{entity:e[0]||"alarm_control_panel.example"}}getCardSize(){return 6}get _alarmConfig(){return this._config}_appendKey(t){this._code.length<10&&(this._code+=t)}_clearCode(){this._code=""}_armAlarm(t){this.callService("alarm_control_panel",`alarm_${t}`,{entity_id:this._config.entity,code:this._code||void 0}),this._code=""}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Alarm not found</p></div></ha-card>`;const e=t.state,i=e.startsWith("armed"),s="disarmed"===e,a="triggered"===e,n=kt(t),r=t.attributes.code_arm_required||t.attributes.code_format;let o="";i?o="armed":s?o="disarmed":a&&(o="triggered");const c=this._alarmConfig.states||["arm_home","arm_away","arm_night"],l=!1!==this._config.show_name,h=!1!==this._config.show_state,d=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="alarm-header">
            ${d?Q`
                  <div class="alarm-icon-wrap ${o}">
                    <ha-icon class="sketch-icon" .icon=${n}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${l?Q`<p class="sketch-name">${this.getName()}</p>`:V}
              ${h?Q`<p class="sketch-state">${e.replace(/_/g," ")}</p>`:V}
            </div>
          </div>

          ${r?Q`
                <div class="code-display">${"•".repeat(this._code.length)}</div>
                <div class="keypad">
                  ${[1,2,3,4,5,6,7,8,9].map(t=>Q`<button class="key-btn" @click=${()=>this._appendKey(String(t))}>${t}</button>`)}
                  <button class="key-btn clear" @click=${this._clearCode}>CLR</button>
                  <button class="key-btn" @click=${()=>this._appendKey("0")}>0</button>
                  <button class="key-btn clear" @click=${()=>{this._code=this._code.slice(0,-1)}}>
                    <ha-icon icon="mdi:backspace-outline" style="--mdc-icon-size:20px"></ha-icon>
                  </button>
                </div>
              `:V}

          <div class="action-row">
            ${i||a?Q`<button class="sketch-btn arm-btn disarm" @click=${()=>this._armAlarm("disarm")}>Disarm</button>`:V}
            ${s?c.map(t=>Q`
                    <button class="sketch-btn arm-btn arm" @click=${()=>this._armAlarm(t)}>
                      ${t.replace("arm_","").replace(/_/g," ")}
                    </button>
                  `):V}
          </div>
        </div>
      </ha-card>
    `}};t([gt()],qt.prototype,"_code",void 0),qt=t([dt("sketch-alarm-panel-card")],qt);let Ft=class extends St{get _defaults(){return{mode:"both",show_date:!0,show_seconds:!0}}get _schema(){return[{name:"name",selector:{text:{}}},{name:"mode",selector:{select:{options:[{value:"both",label:"Analog + Digital"},{value:"analog",label:"Analog Only"},{value:"digital",label:"Digital Only"}],mode:"dropdown"}}},{name:"show_date",selector:{boolean:{}}},{name:"show_seconds",selector:{boolean:{}}}]}};Ft=t([dt("sketch-clock-card-editor")],Ft);let Vt=class extends lt{constructor(){super(...arguments),this._time=new Date}static{this.styles=[ft,r`
      .clock-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 16px;
      }
      .clock-name {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        margin-bottom: 8px;
      }
      .analog-clock {
        width: 140px;
        height: 140px;
      }
      .clock-face {
        fill: var(--sketch-bg, #faf7f0);
        stroke: var(--sketch-ink, #2a2a2a);
        stroke-width: 2;
        stroke-dasharray: 6 2 1 2;
        stroke-linecap: round;
      }
      .clock-center {
        fill: var(--sketch-ink, #2a2a2a);
      }
      .hour-mark {
        stroke: var(--sketch-ink, #2a2a2a);
        stroke-width: 2;
        stroke-linecap: round;
      }
      .minute-mark {
        stroke: var(--sketch-ink-muted, rgba(42,42,42,0.3));
        stroke-width: 1;
        stroke-linecap: round;
      }
      .hour-hand {
        stroke: var(--sketch-ink, #2a2a2a);
        stroke-width: 3.5;
        stroke-linecap: round;
      }
      .minute-hand {
        stroke: var(--sketch-ink, #2a2a2a);
        stroke-width: 2.5;
        stroke-linecap: round;
      }
      .second-hand {
        stroke: var(--sketch-danger, #f44336);
        stroke-width: 1;
        stroke-linecap: round;
      }
      .digital-time {
        font-family: var(--sketch-font);
        font-size: 2.4em;
        font-weight: 700;
        line-height: 1;
        margin-top: 8px;
      }
      .digital-date {
        font-family: var(--sketch-font);
        font-size: 1em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
      }
      .clock-number {
        font-family: var(--sketch-font);
        font-size: 11px;
        fill: var(--sketch-ink, #2a2a2a);
        text-anchor: middle;
        dominant-baseline: central;
        font-weight: 600;
      }
    `]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}static getConfigElement(){return document.createElement("sketch-clock-card-editor")}static getStubConfig(){return{mode:"both",show_date:!0,show_seconds:!0}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._tick(),this._timer=window.setInterval(()=>this._tick(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}_tick(){this._time=new Date}_renderAnalog(){const t=this._time.getHours()%12,e=this._time.getMinutes(),i=this._time.getSeconds(),s=!1!==this._config.show_seconds,a=6*(e+i/60),n=6*i,r=70,o=70,c=60,l=(t,e)=>{const i=(t-90)*Math.PI/180;return{x:r+Math.cos(i)*e,y:o+Math.sin(i)*e}},h=l(30*(t+e/60),32),d=l(a,46),p=l(n,50),u=[],m=[];for(let t=0;t<12;t++){const e=58,i=52,s=44,a=(30*t-90)*Math.PI/180;u.push(q`
        <line
          class="hour-mark"
          x1=${r+Math.cos(a)*i}
          y1=${o+Math.sin(a)*i}
          x2=${r+Math.cos(a)*e}
          y2=${o+Math.sin(a)*e}
        />
      `),m.push(q`
        <text class="clock-number"
          x=${r+Math.cos(a)*s}
          y=${o+Math.sin(a)*s}
        >${0===t?12:t}</text>
      `)}for(let t=0;t<60;t++){if(t%5==0)continue;const e=(6*t-90)*Math.PI/180;u.push(q`
        <line
          class="minute-mark"
          x1=${r+58*Math.cos(e)}
          y1=${o+58*Math.sin(e)}
          x2=${r+55*Math.cos(e)}
          y2=${o+55*Math.sin(e)}
        />
      `)}return Q`
      <svg class="analog-clock" viewBox="0 0 140 140">
        <circle class="clock-face" cx=${r} cy=${o} r=${c} />
        ${u}
        ${m}
        <line class="hour-hand" x1=${r} y1=${o} x2=${h.x} y2=${h.y} />
        <line class="minute-hand" x1=${r} y1=${o} x2=${d.x} y2=${d.y} />
        ${s?q`<line class="second-hand" x1=${r} y1=${o} x2=${p.x} y2=${p.y} />`:V}
        <circle class="clock-center" cx=${r} cy=${o} r="3" />
      </svg>
    `}_renderDigital(){const t=this._time.getHours(),e=this._time.getMinutes(),i=this._time.getSeconds(),s=t=>String(t).padStart(2,"0"),a=!1!==this._config.show_seconds?`${s(t)}:${s(e)}:${s(i)}`:`${s(t)}:${s(e)}`;return Q`<div class="digital-time">${a}</div>`}render(){const t=this._config?.mode||"both",e=!1!==this._config?.show_date,i=this._config?.name,s=this._time.toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});return Q`
      <ha-card>
        <div class="sketch-card-content clock-content">
          ${i?Q`<div class="clock-name">${i}</div>`:V}
          ${"analog"===t||"both"===t?this._renderAnalog():V}
          ${"digital"===t||"both"===t?this._renderDigital():V}
          ${e?Q`<div class="digital-date">${s}</div>`:V}
        </div>
      </ha-card>
    `}};t([gt()],Vt.prototype,"_config",void 0),t([gt()],Vt.prototype,"_time",void 0),Vt=t([dt("sketch-clock-card")],Vt);let Kt=class extends lt{constructor(){super(...arguments),this._config={}}static{this.styles=r`
    :host { display: block; }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `}setConfig(t){this._config={...t}}render(){return Q`
      <p class="editor-note">
        The Chip card requires YAML configuration for its chips array.
        Switch to the code editor to configure chips.
      </p>
    `}};t([mt({attribute:!1})],Kt.prototype,"hass",void 0),t([gt()],Kt.prototype,"_config",void 0),Kt=t([dt("sketch-chip-card-editor")],Kt);let Yt=class extends lt{static{this.styles=[ft,r`
      :host {
        display: block;
      }
      ha-card {
        background: transparent;
        border: none;
        border-image: none;
        box-shadow: none;
        filter: none;
        rotate: 0deg;
        overflow: visible;
      }
      ha-card:hover {
        transform: none;
        filter: none;
      }
      .chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 4px 0;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--sketch-bg, #faf7f0);
        border: 1.5px dashed var(--sketch-border);
        border-radius: 20px;
        font-family: var(--sketch-font, 'Caveat', cursive);
        font-size: 0.95em;
        font-weight: 600;
        color: var(--sketch-ink);
        cursor: pointer;
        rotate: -0.4deg;
        transition: transform 0.2s ease, filter 0.2s ease;
        white-space: nowrap;
        filter: drop-shadow(2px 3px 0px rgba(0, 0, 0, 0.1));
      }
      .chip:hover {
        transform: translate(-1px, -1px) rotate(-0.8deg);
        filter: drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.12))
          drop-shadow(4px 6px 6px rgba(0, 0, 0, 0.06));
      }
      .chip:active {
        transform: translate(0, 0);
      }
      .chip ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-primary, #4a6fa5);
      }
      .chip.on ha-icon {
        color: var(--sketch-success, #4caf50);
      }
      .chip-label {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `]}setConfig(t){if(!t||!t.chips||!Array.isArray(t.chips))throw new Error("Please define chips array");this._config={...t}}static getConfigElement(){return document.createElement("sketch-chip-card-editor")}static getStubConfig(){return{chips:[{type:"entity",entity:"light.living_room"},{type:"action",icon:"mdi:home",name:"Home",tap_action:{action:"navigate",navigation_path:"/"}}]}}getCardSize(){return 1}_handleChipTap(t){switch(t.tap_action?.action||(t.entity?"more-info":"none")){case"toggle":if(t.entity){const[e]=t.entity.split(".");this.hass.callService(e,"toggle",{entity_id:t.entity})}break;case"more-info":t.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity}}));break;case"navigate":t.tap_action?.navigation_path&&(window.history.pushState(null,"",t.tap_action.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"call-service":if(t.tap_action?.service){const[e,i]=t.tap_action.service.split(".");this.hass.callService(e,i,t.tap_action.service_data)}}}_renderChip(t){const e=t.entity?this.hass.states[t.entity]:void 0,i=t.icon||(e?kt(e):"mdi:circle"),s=e&&["on","open","playing","home"].includes(e.state);let a=t.name;return!a&&e&&(a=e.attributes.friendly_name||t.entity),"template"===t.type&&t.content&&(a=t.content),Q`
      <div class="chip ${s?"on":""}" @click=${()=>this._handleChipTap(t)}>
        <ha-icon .icon=${i}></ha-icon>
        ${a?Q`<span class="chip-label">${a}</span>`:V}
      </div>
    `}render(){return this._config?.chips?Q`
      <ha-card>
        <div class="chips-row">
          ${this._config.chips.map(t=>this._renderChip(t))}
        </div>
      </ha-card>
    `:V}};t([mt({attribute:!1})],Yt.prototype,"hass",void 0),t([gt()],Yt.prototype,"_config",void 0),Yt=t([dt("sketch-chip-card")],Yt);let Zt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_location:!0,show_battery:!0}}get _schema(){return[...Et("person"),{name:"show_location",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"battery_entity",selector:{entity:{domain:"sensor"}}}]}};Zt=t([dt("sketch-person-card-editor")],Zt);let Gt=class extends bt{static{this.styles=[...super.styles,r`
      .person-row {
        display: flex;
        align-items: center;
        gap: 14px;
        cursor: pointer;
      }
      .person-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2.5px solid var(--sketch-border);
        object-fit: cover;
        flex-shrink: 0;
        rotate: 1deg;
        filter: drop-shadow(2px 3px 0px rgba(0, 0, 0, 0.1));
      }
      .person-avatar-placeholder {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2.5px dashed var(--sketch-ink-light);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: var(--sketch-bg);
      }
      .person-avatar-placeholder ha-icon {
        --mdc-icon-size: 28px;
        color: var(--sketch-ink-muted);
      }
      .person-info {
        flex: 1;
        min-width: 0;
      }
      .person-location {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        color: var(--sketch-ink-muted);
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 2px;
      }
      .person-location ha-icon {
        --mdc-icon-size: 14px;
      }
      .person-status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
      }
      .status-dot.home {
        background: var(--sketch-success);
        box-shadow: 0 0 4px var(--sketch-success);
      }
      .status-dot.away {
        background: var(--sketch-ink-muted);
      }
      .battery-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
      }
      .battery-bar {
        flex: 1;
        height: 6px;
        background: var(--sketch-ink-light);
        border-radius: 3px;
        overflow: hidden;
      }
      .battery-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }
      .battery-fill.high { background: var(--sketch-success); }
      .battery-fill.mid { background: var(--sketch-warning); }
      .battery-fill.low { background: var(--sketch-danger); }
      .battery-text {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        min-width: 32px;
        text-align: right;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a person entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-person-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("person."));return{entity:e[0]||"person.example"}}getCardSize(){return 2}get _personConfig(){return this._config}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Person not found</p></div></ha-card>`;const e=this.getName(),i=t.attributes.entity_picture,s="home"===t.state,a="home"===t.state?"Home":"not_home"===t.state?"Away":t.state,n=!1!==this._personConfig.show_location,r=!1!==this._personConfig.show_battery,o=this._personConfig.battery_entity?this.hass.states[this._personConfig.battery_entity]:void 0,c=o?parseInt(o.state):null;let l="high";null!==c&&(c<20?l="low":c<50&&(l="mid"));const h=t.attributes.gps_accuracy,d=s?"mdi:home":"mdi:map-marker",p=!1!==this._config.show_name,u=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="person-row" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${u?i?Q`<img class="person-avatar" src="${i}" alt="${e}" />`:Q`
                    <div class="person-avatar-placeholder">
                      <ha-icon icon="mdi:account"></ha-icon>
                    </div>
                  `:V}
            <div class="person-info">
              ${p?Q`<p class="sketch-name">${e}</p>`:V}
              ${n?Q`
                    <div class="person-location">
                      <span class="person-status">
                        <span class="status-dot ${s?"home":"away"}"></span>
                        <ha-icon .icon=${d}></ha-icon>
                        ${a}
                      </span>
                      ${h?Q`<span style="font-size:0.8em">(~${h}m)</span>`:V}
                    </div>
                  `:V}
              ${r&&null!==c?Q`
                    <div class="battery-row">
                      <ha-icon icon="mdi:battery" style="--mdc-icon-size:14px;color:var(--sketch-ink-muted)"></ha-icon>
                      <div class="battery-bar">
                        <div class="battery-fill ${l}" style="width:${c}%"></div>
                      </div>
                      <span class="battery-text">${c}%</span>
                    </div>
                  `:V}
            </div>
          </div>
        </div>
      </ha-card>
    `}};Gt=t([dt("sketch-person-card")],Gt);let Jt=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,hide_icon:!1}}get _schema(){return[...Et(),{name:"hide_icon",selector:{boolean:{}}}]}};Jt=t([dt("sketch-tile-card-editor")],Jt);let Xt=class extends bt{static{this.styles=[...super.styles,r`
      ha-card {
        rotate: -0.3deg;
      }
      .tile-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        cursor: pointer;
        min-height: 36px;
      }
      .tile-icon {
        --mdc-icon-size: 22px;
        color: var(--sketch-primary);
        flex-shrink: 0;
      }
      .tile-icon.on {
        color: var(--sketch-success);
      }
      .tile-icon.off {
        color: var(--sketch-ink-muted);
      }
      .tile-name {
        font-family: var(--sketch-font);
        font-size: 1.05em;
        font-weight: 600;
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-state {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        color: var(--sketch-ink-muted);
        white-space: nowrap;
        flex-shrink: 0;
      }
      .tile-toggle {
        width: 38px;
        height: 20px;
        border-radius: 10px;
        border: 1.5px solid var(--sketch-border);
        background: var(--sketch-ink-light);
        position: relative;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.2s ease;
      }
      .tile-toggle.on {
        background: var(--sketch-primary);
        border-color: var(--sketch-primary);
      }
      .tile-toggle-knob {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid var(--sketch-ink-light);
        transition: left 0.2s ease;
      }
      .tile-toggle.on .tile-toggle-knob {
        left: 17px;
        border-color: var(--sketch-primary);
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define an entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-tile-card-editor")}static getStubConfig(t){return{entity:Object.keys(t.states)[0]||"light.example"}}getCardSize(){return 1}get _tileConfig(){return this._config}_isToggleable(){if(!this._config?.entity)return!1;const t=this._config.entity.split(".")[0];return["light","switch","fan","input_boolean","automation","script","cover","lock"].includes(t)}_handleToggle(t){t.stopPropagation(),this.toggleEntity()}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="tile-row"><span class="tile-name">Not found</span></div></ha-card>`;const e=this._config.icon||kt(t),i=this.getName(),s=Ct(t),a=$t(t.state),n=!0!==this._tileConfig.hide_icon&&!1!==this._config.show_icon,r=!1!==this._config.show_name,o=!1!==this._config.show_state,c=this._isToggleable();return Q`
      <ha-card>
        <div class="tile-row" @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
          ${n?Q`<ha-icon class="tile-icon ${a?"on":"off"}" .icon=${e}></ha-icon>`:V}
          ${r?Q`<span class="tile-name">${i}</span>`:V}
          ${c?Q`
                <div class="tile-toggle ${a?"on":""}" @click=${this._handleToggle}>
                  <div class="tile-toggle-knob"></div>
                </div>
              `:o?Q`<span class="tile-state">${s}</span>`:V}
        </div>
      </ha-card>
    `}};Xt=t([dt("sketch-tile-card")],Xt);let te=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_controls:!0}}get _schema(){return[...Et("camera"),{name:"show_controls",selector:{boolean:{}}},{name:"aspect_ratio",selector:{text:{}}}]}};te=t([dt("sketch-camera-card-editor")],te);let ee=class extends bt{constructor(){super(...arguments),this._imageUrl="",this._loading=!0}static{this.styles=[...super.styles,r`
      .camera-wrap {
        position: relative;
        overflow: hidden;
        border-radius: var(--sketch-radius, 2px);
      }
      .camera-img {
        width: 100%;
        display: block;
        cursor: pointer;
        transition: opacity 0.3s ease;
      }
      .camera-img.loading {
        opacity: 0.5;
      }
      .camera-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 140px;
        background: var(--sketch-ink-light);
        color: var(--sketch-ink-muted);
        flex-direction: column;
        gap: 8px;
      }
      .camera-placeholder ha-icon {
        --mdc-icon-size: 40px;
      }
      .camera-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px 12px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .camera-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }
      .camera-state {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: rgba(255, 255, 255, 0.8);
      }
      .camera-controls {
        display: flex;
        gap: 8px;
        padding: 8px 12px;
        justify-content: center;
      }
      .cam-btn {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1.5px solid var(--sketch-border);
        border-radius: 50%;
        cursor: pointer;
        color: var(--sketch-ink);
        padding: 0;
        transition: background 0.2s;
      }
      .cam-btn:hover { background: var(--sketch-hover-bg); }
      .cam-btn ha-icon { --mdc-icon-size: 18px; }
      .tape-corner {
        position: absolute;
        width: 30px;
        height: 12px;
        background: rgba(255, 235, 180, 0.7);
        border: 1px solid rgba(200, 180, 120, 0.5);
        z-index: 1;
      }
      .tape-corner.tl {
        top: -4px;
        left: 8px;
        rotate: -5deg;
      }
      .tape-corner.tr {
        top: -4px;
        right: 8px;
        rotate: 3deg;
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define a camera entity");super.setConfig(t)}static getConfigElement(){return document.createElement("sketch-camera-card-editor")}static getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("camera."));return{entity:e[0]||"camera.example"}}getCardSize(){return 5}connectedCallback(){super.connectedCallback(),this._updateImage(),this._refreshTimer=window.setInterval(()=>this._updateImage(),1e4)}disconnectedCallback(){super.disconnectedCallback(),this._refreshTimer&&clearInterval(this._refreshTimer)}_updateImage(){const t=this.getEntity();if(!t)return;const e=t.attributes.entity_picture;e&&(this._imageUrl=e,this._loading=!1)}updated(t){super.updated(t),t.has("hass")&&this._updateImage()}_handleImageClick(){this.executeAction(this._config?.tap_action,"more-info")}_handleRefresh(){this._loading=!0,this._updateImage(),setTimeout(()=>this._loading=!1,500)}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Camera not found</p></div></ha-card>`;const e=this.getName(),i=!1!==this._config.show_controls,s=!1!==this._config.show_name,a=!1!==this._config.show_state,n="idle"===t.state;return Q`
      <ha-card>
        <div class="camera-wrap">
          <div class="tape-corner tl"></div>
          <div class="tape-corner tr"></div>
          ${this._imageUrl?Q`
                <img
                  class="camera-img ${this._loading?"loading":""}"
                  src="${this._imageUrl}"
                  alt="${e}"
                  @click=${this._handleImageClick}
                  @error=${()=>this._imageUrl=""}
                />
              `:Q`
                <div class="camera-placeholder" @click=${this._handleImageClick}>
                  <ha-icon icon="mdi:video-off-outline"></ha-icon>
                  <span style="font-family:var(--sketch-font);font-size:0.9em">${n?"Camera idle":"No image"}</span>
                </div>
              `}
          <div class="camera-overlay">
            ${s?Q`<span class="camera-name">${e}</span>`:V}
            ${a?Q`<span class="camera-state">${t.state}</span>`:V}
          </div>
        </div>
        ${i?Q`
              <div class="camera-controls">
                <button class="cam-btn" @click=${this._handleRefresh} title="Refresh">
                  <ha-icon icon="mdi:refresh"></ha-icon>
                </button>
                <button class="cam-btn" @click=${this._handleImageClick} title="Fullscreen">
                  <ha-icon icon="mdi:fullscreen"></ha-icon>
                </button>
              </div>
            `:V}
      </ha-card>
    `}};t([gt()],ee.prototype,"_imageUrl",void 0),t([gt()],ee.prototype,"_loading",void 0),ee=t([dt("sketch-camera-card")],ee);let ie=class extends St{get _schema(){return[{name:"hash",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"auto_close",selector:{number:{min:0,max:300,mode:"box"}}},{name:"width",selector:{text:{}}}]}render(){return this.hass&&this._config?Q`
      ${super.render()}
      <p class="editor-note">
        Configure child cards in YAML mode (code editor).
      </p>
    `:V}};ie=t([dt("sketch-popup-card-editor")],ie);let se=class extends lt{constructor(){super(...arguments),this._open=!1,this._childCards=[],this._hashListener=()=>this._checkHash(),this._keyListener=t=>{"Escape"===t.key&&this._open&&this._closePopup()}}static{this.styles=[ft,r`
      :host {
        display: block;
      }
      /* Card itself takes no space when closed */
      ha-card {
        display: none;
      }

      /* Backdrop overlay */
      .popup-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--popup-backdrop-color, rgba(0, 0, 0, 0.35));
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .popup-backdrop.open {
        opacity: 1;
        pointer-events: auto;
      }

      /* Panel */
      .popup-panel {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        z-index: 11;
        background: var(--sketch-bg);
        border: 2.5px dashed var(--sketch-border);
        border-bottom: none;
        border-radius: 12px 12px 0 0;
        max-height: 85vh;
        overflow-y: auto;
        scrollbar-width: thin;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        rotate: 0deg;
        filter: drop-shadow(0px -4px 12px rgba(0, 0, 0, 0.15));
      }
      .popup-panel.open {
        transform: translateX(-50%) translateY(0);
      }

      /* Handle bar */
      .popup-handle {
        width: 40px;
        height: 4px;
        background: var(--sketch-ink-light, #e8e0d0);
        border-radius: 2px;
        margin: 10px auto 4px;
      }

      /* Header */
      .popup-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 20px 10px;
        position: relative;
      }
      .popup-header ha-icon {
        --mdc-icon-size: 24px;
        color: var(--sketch-primary, #4a6fa5);
      }
      .popup-title {
        font-family: var(--sketch-font, 'Caveat', cursive);
        font-size: 1.5em;
        font-weight: 700;
        color: var(--sketch-ink, #2a2a2a);
        flex: 1;
      }
      .popup-close {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1.5px solid var(--sketch-ink-light, #e8e0d0);
        border-radius: 50%;
        cursor: pointer;
        color: var(--sketch-ink-muted);
        padding: 0;
        transition: background 0.2s;
        flex-shrink: 0;
      }
      .popup-close:hover {
        background: var(--sketch-hover-bg);
      }
      .popup-close ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-ink-muted);
      }

      /* Underline decoration */
      .popup-header-line {
        border: none;
        margin: 0 20px;
        height: 2px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='4'%3E%3Cpath d='M0 2 Q75 0 150 2 Q225 4 300 2' fill='none' stroke='%23e8e0d0' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      /* Content area for child cards */
      .popup-content {
        padding: 12px 16px 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      /* Corner decoration */
      .popup-panel::before,
      .popup-panel::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-color: var(--sketch-ink-muted);
        border-style: solid;
        opacity: 0.25;
      }
      .popup-panel::before {
        top: 8px;
        left: 8px;
        border-width: 2px 0 0 2px;
        border-radius: 4px 0 0 0;
      }
      .popup-panel::after {
        top: 8px;
        right: 8px;
        border-width: 2px 2px 0 0;
        border-radius: 0 4px 0 0;
      }
    `]}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.hash)throw new Error('Please define a hash (e.g. "kitchen")');this._config={...t}}static getConfigElement(){return document.createElement("sketch-popup-card-editor")}static getStubConfig(){return{hash:"example",name:"Example Pop-up",icon:"mdi:home",cards:[]}}getCardSize(){return 0}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this._hashListener),window.addEventListener("keydown",this._keyListener),this._checkHash()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._hashListener),window.removeEventListener("keydown",this._keyListener),this._clearAutoClose()}_checkHash(){const t=window.location.hash.replace("#","")===this._config?.hash;t&&!this._open?this._openPopup():!t&&this._open&&this._closePopup()}async _openPopup(){this._open=!0,await this._renderChildCards(),this._startAutoClose(),document.body.style.overflow="hidden"}_closePopup(){this._open=!1,this._clearAutoClose(),document.body.style.overflow="",window.location.hash.replace("#","")===this._config?.hash&&history.replaceState(null,"",window.location.pathname+window.location.search)}_startAutoClose(){this._clearAutoClose();const t=this._config?.auto_close;t&&t>0&&(this._autoCloseTimer=window.setTimeout(()=>this._closePopup(),1e3*t))}_clearAutoClose(){this._autoCloseTimer&&(clearTimeout(this._autoCloseTimer),this._autoCloseTimer=void 0)}async _renderChildCards(){if(this._config?.cards?.length&&this.hass)try{const t=await window.loadCardHelpers(),e=[];for(const i of this._config.cards)try{const s=await t.createCardElement(i);s.hass=this.hass,e.push(s)}catch{const t=document.createElement("div");t.textContent=`Error loading card: ${i.type}`,t.style.cssText="padding:8px;color:red;font-family:var(--sketch-font)",e.push(t)}this._childCards=e}catch{this._childCards=[]}else this._childCards=[]}updated(t){super.updated(t),t.has("hass")&&this._childCards.length>0&&this._childCards.forEach(t=>{void 0!==t.hass&&(t.hass=this.hass)})}_handleBackdropClick(){this._closePopup()}render(){const t=this._config?.width||"90%",e=this._config?.name,i=this._config?.icon;return Q`
      <div
        class="popup-backdrop ${this._open?"open":""}"
        @click=${this._handleBackdropClick}
      ></div>
      <div
        class="popup-panel ${this._open?"open":""}"
        role="dialog"
        aria-modal="true"
        style="width: ${t}; max-width: 500px"
        @click=${t=>t.stopPropagation()}
      >
        <div class="popup-handle"></div>
        ${e||i?Q`
              <div class="popup-header">
                ${i?Q`<ha-icon .icon=${i}></ha-icon>`:V}
                ${e?Q`<span class="popup-title">${e}</span>`:V}
                <button class="popup-close" @click=${this._closePopup}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
              <div class="popup-header-line"></div>
            `:Q`
              <div style="display:flex;justify-content:flex-end;padding:4px 12px 0">
                <button class="popup-close" @click=${this._closePopup}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
            `}
        <div class="popup-content">
          ${this._childCards.map(t=>t)}
        </div>
      </div>
    `}};t([mt({attribute:!1})],se.prototype,"hass",void 0),t([gt()],se.prototype,"_config",void 0),t([gt()],se.prototype,"_open",void 0),t([gt()],se.prototype,"_childCards",void 0),se=t([dt("sketch-popup-card")],se);let ae=class extends lt{constructor(){super(...arguments),this._config={}}static{this.styles=r`
    :host { display: block; }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `}setConfig(t){this._config={...t}}render(){return Q`
      <p class="editor-note">
        The Horizontal Buttons Stack requires YAML configuration for its buttons array.
        Switch to the code editor to configure buttons.
      </p>
    `}};t([mt({attribute:!1})],ae.prototype,"hass",void 0),t([gt()],ae.prototype,"_config",void 0),ae=t([dt("sketch-horizontal-buttons-stack-editor")],ae);let ne=class extends lt{constructor(){super(...arguments),this._activeHash="",this._hashListener=()=>this._updateActiveHash()}static{this.styles=[ft,r`
      :host {
        display: block;
      }
      .nav-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 5;
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      ha-card {
        rotate: 0deg;
        border-radius: 0;
        filter: none;
        border: none;
        border-image: none;
        border-top: 2px solid var(--sketch-border, #2a2a2a);
        background: var(--sketch-bg, #faf7f0);
      }
      ha-card:hover {
        transform: none;
        filter: none;
      }
      /* Torn paper edge SVG on top border */
      .torn-edge {
        position: absolute;
        top: -8px;
        left: 0;
        right: 0;
        height: 8px;
        overflow: hidden;
      }
      .torn-edge svg {
        width: 100%;
        height: 8px;
      }
      .torn-edge-path {
        fill: var(--sketch-bg, #faf7f0);
        stroke: var(--sketch-border, #2a2a2a);
        stroke-width: 1.5;
      }
      .nav-scroll {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        gap: 4px;
        padding: 8px 12px 10px;
        position: relative;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }
      .nav-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        padding: 6px 12px;
        min-width: 56px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--sketch-ink-muted, rgba(42, 42, 42, 0.5));
        transition: color 0.2s ease, transform 0.15s ease;
        flex-shrink: 0;
        position: relative;
      }
      .nav-btn:active {
        transform: scale(0.95);
      }
      .nav-btn.active {
        color: var(--sketch-ink, #2a2a2a);
      }
      .nav-icon-wrap {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px dashed var(--sketch-ink-light, #e8e0d0);
        border-radius: 50%;
        transition: all 0.2s ease;
      }
      .nav-btn.active .nav-icon-wrap {
        border-style: solid;
        border-color: var(--sketch-primary, #4a6fa5);
        background: var(--sketch-primary, #4a6fa5);
      }
      .nav-btn.active .nav-icon-wrap ha-icon {
        color: #fff;
      }
      .nav-icon-wrap ha-icon {
        --mdc-icon-size: 20px;
      }
      .nav-label {
        font-family: var(--sketch-font, 'Caveat', cursive);
        font-size: 0.75em;
        font-weight: 600;
        white-space: nowrap;
        max-width: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* Fade edges for scroll indication */
      .nav-container {
        position: relative;
      }
      .nav-container::before,
      .nav-container::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        z-index: 1;
        pointer-events: none;
      }
      .nav-container::before {
        left: 0;
        background: linear-gradient(to right, var(--sketch-bg, #faf7f0), transparent);
      }
      .nav-container::after {
        right: 0;
        background: linear-gradient(to left, var(--sketch-bg, #faf7f0), transparent);
      }
    `]}setConfig(t){if(!t||!t.buttons||!Array.isArray(t.buttons))throw new Error("Please define buttons array");this._config={...t}}static getConfigElement(){return document.createElement("sketch-horizontal-buttons-stack-editor")}static getStubConfig(){return{style:"fixed",buttons:[{name:"Home",icon:"mdi:home",hash:"home"},{name:"Lights",icon:"mdi:lightbulb-group",hash:"lights"},{name:"Climate",icon:"mdi:thermostat",hash:"climate"},{name:"Security",icon:"mdi:shield-home",hash:"security"},{name:"Media",icon:"mdi:speaker",hash:"media"}]}}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._updateActiveHash(),window.addEventListener("hashchange",this._hashListener)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._hashListener)}_updateActiveHash(){this._activeHash=window.location.hash.replace("#","")}_handleButtonTap(t){t.hash?window.location.hash=t.hash:t.navigation_path&&(window.history.pushState(null,"",t.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})))}_getOrderedButtons(){const t=[...this._config.buttons];return this.hass?t.sort((t,e)=>{if(!t.entity&&!e.entity)return 0;const i=t.entity&&"on"===this.hass.states[t.entity]?.state?1:0;return(e.entity&&"on"===this.hass.states[e.entity]?.state?1:0)-i}):t}render(){if(!this._config?.buttons)return V;const t="inline"!==this._config.style,e=this._getOrderedButtons();return Q`
      <div class="${t?"nav-fixed":""}">
        <ha-card>
          <div class="torn-edge">
            <svg viewBox="0 0 400 8" preserveAspectRatio="none">
              <path class="torn-edge-path" d="M0 8 L0 4 Q10 1 20 3 Q30 6 40 2 Q50 0 60 4 Q70 7 80 3 Q90 1 100 5 Q110 7 120 2 Q130 0 140 4 Q150 6 160 2 Q170 1 180 5 Q190 7 200 3 Q210 0 220 4 Q230 6 240 2 Q250 1 260 5 Q270 7 280 3 Q290 0 300 4 Q310 6 320 2 Q330 1 340 5 Q350 7 360 3 Q370 0 380 4 Q390 6 400 3 L400 8 Z" />
            </svg>
          </div>
          <div class="nav-container">
            <div class="nav-scroll">
              ${e.map(t=>Q`
                  <button
                    class="nav-btn ${t.hash===this._activeHash?"active":""}"
                    @click=${()=>this._handleButtonTap(t)}
                  >
                    <div class="nav-icon-wrap">
                      <ha-icon .icon=${t.icon}></ha-icon>
                    </div>
                    <span class="nav-label">${t.name}</span>
                  </button>
                `)}
            </div>
          </div>
        </ha-card>
      </div>
    `}};t([mt({attribute:!1})],ne.prototype,"hass",void 0),t([gt()],ne.prototype,"_config",void 0),t([gt()],ne.prototype,"_activeHash",void 0),ne=t([dt("sketch-horizontal-buttons-stack")],ne);let re=class extends St{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,columns:3,collapsible:!0}}get _schema(){return[...Et(),{name:"columns",selector:{number:{min:1,max:6,mode:"box"}}},{name:"collapsible",selector:{boolean:{}}}]}render(){return this.hass&&this._config?Q`
      ${super.render()}
      <p class="editor-note">
        Configure sub_buttons in YAML mode (code editor).
      </p>
    `:V}};re=t([dt("sketch-sub-button-card-editor")],re);let oe=class extends bt{constructor(){super(...arguments),this._expanded=!0}static{this.styles=[...super.styles,r`
      .primary-row {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .primary-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.5px dashed var(--sketch-ink-light);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .primary-icon-wrap.on {
        border-color: var(--sketch-primary);
        border-style: solid;
        background: rgba(74, 111, 165, 0.1);
      }
      .expand-chevron {
        --mdc-icon-size: 20px;
        color: var(--sketch-ink-muted);
        transition: transform 0.3s ease;
        flex-shrink: 0;
      }
      .expand-chevron.open {
        transform: rotate(180deg);
      }
      .sub-buttons-grid {
        display: grid;
        gap: 8px;
        margin-top: 12px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
      }
      .sub-buttons-grid.collapsed {
        max-height: 0;
        opacity: 0;
        margin-top: 0;
      }
      .sub-buttons-grid.expanded {
        max-height: 500px;
        opacity: 1;
      }
      .sub-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        background: transparent;
        border: 1.5px solid var(--sketch-ink-light);
        border-radius: 2px;
        cursor: pointer;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink);
        transition: background 0.2s ease, transform 0.15s ease;
        border-style: dashed;
        text-align: left;
      }
      .sub-btn:nth-child(odd) { rotate: -0.3deg; }
      .sub-btn:nth-child(even) { rotate: 0.4deg; }
      .sub-btn:hover {
        background: var(--sketch-hover-bg);
        transform: translate(-1px, -1px);
      }
      .sub-btn:active {
        transform: translate(0, 0);
      }
      .sub-btn.active {
        background: var(--sketch-primary);
        color: #fff;
        border-color: var(--sketch-primary);
      }
      .sub-btn.active ha-icon {
        color: #fff;
      }
      .sub-btn ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-primary);
        flex-shrink: 0;
      }
      .sub-btn-info {
        flex: 1;
        min-width: 0;
      }
      .sub-btn-name {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sub-btn-state {
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        white-space: nowrap;
      }
      .sub-btn.active .sub-btn-state {
        color: rgba(255, 255, 255, 0.8);
      }
    `]}setConfig(t){if(!t.entity)throw new Error("Please define an entity");if(!t.sub_buttons||!Array.isArray(t.sub_buttons))throw new Error("Please define sub_buttons array");super.setConfig(t),!1===t.collapsible&&(this._expanded=!0)}static getConfigElement(){return document.createElement("sketch-sub-button-card-editor")}static getStubConfig(t){const e=Object.keys(t.states),i=e.filter(t=>t.startsWith("light."));return{entity:i[0]||e[0]||"light.example",sub_buttons:[{entity:i[1]||"light.example",name:"Lamp"},{icon:"mdi:movie",name:"Movie Mode",tap_action:{action:"call-service",service:"scene.turn_on"}},{icon:"mdi:power",name:"All Off",tap_action:{action:"call-service",service:"light.turn_off"}}]}}getCardSize(){return 3}get _subConfig(){return this._config}_toggleExpand(){!1!==this._subConfig.collapsible&&(this._expanded=!this._expanded)}_handleSubButtonTap(t){const e=t.entity?"toggle":"none";switch(t.tap_action?.action||e){case"toggle":if(t.entity){const[e]=t.entity.split(".");this.callService(e,"toggle",{entity_id:t.entity}),window.dispatchEvent(new CustomEvent("haptic",{detail:"success"}))}break;case"call-service":if(t.tap_action?.service){const[e,i]=t.tap_action.service.split(".");this.callService(e,i,{...t.tap_action.service_data,...t.entity?{entity_id:t.entity}:{}}),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"}))}break;case"more-info":t.entity&&this.fireEvent("hass-more-info",{entityId:t.entity});break;case"navigate":t.tap_action?.navigation_path&&(window.history.pushState(null,"",t.tap_action.navigation_path),this.fireEvent("location-changed"),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"})));break;case"url":t.tap_action?.url_path&&(window.open(t.tap_action.url_path,"_blank"),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"})))}}_renderSubButton(t){const e=t.entity?this.hass.states[t.entity]:void 0,i=t.icon||(e?kt(e):"mdi:circle-small"),s=t.name||e?.attributes?.friendly_name||"",a=e&&$t(e.state),n=t.show_state&&e;return Q`
      <button class="sub-btn ${a?"active":""}" @click=${()=>this._handleSubButtonTap(t)}>
        <ha-icon .icon=${i}></ha-icon>
        <div class="sub-btn-info">
          <div class="sub-btn-name">${s}</div>
          ${n?Q`<div class="sub-btn-state">${Ct(e)}</div>`:V}
        </div>
      </button>
    `}render(){const t=this.getEntity();if(!t)return Q`<ha-card><div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;const e=this._config.icon||kt(t),i=this.getName(),s=$t(t.state),a=this._subConfig.columns||3,n=!1!==this._subConfig.collapsible,r=!1!==this._config.show_name,o=!1!==this._config.show_state,c=!1!==this._config.show_icon;return Q`
      <ha-card>
        <div class="sketch-card-content">
          <div class="primary-row" @click=${n?this._toggleExpand:void 0} @pointerdown=${n?void 0:this.handlePointerDown} @pointerup=${n?void 0:this.handlePointerUp} @pointercancel=${n?void 0:this.handlePointerCancel}>
            ${c?Q`
                  <div class="primary-icon-wrap ${s?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${e}></ha-icon>
                  </div>
                `:V}
            <div class="sketch-col">
              ${r?Q`<p class="sketch-name">${i}</p>`:V}
              ${o?Q`<p class="sketch-state">${Ct(t)}</p>`:V}
            </div>
            ${n?Q`<ha-icon class="expand-chevron ${this._expanded?"open":""}" icon="mdi:chevron-down"></ha-icon>`:V}
          </div>
          <div
            class="sub-buttons-grid ${this._expanded?"expanded":"collapsed"}"
            style="grid-template-columns: repeat(${a}, 1fr)"
          >
            ${this._subConfig.sub_buttons.map(t=>this._renderSubButton(t))}
          </div>
        </div>
      </ha-card>
    `}};t([gt()],oe.prototype,"_expanded",void 0),oe=t([dt("sketch-sub-button-card")],oe);let ce=class extends St{get _schema(){return[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}};ce=t([dt("sketch-separator-card-editor")],ce);let le=class extends lt{static{this.styles=[ft,r`
      :host {
        display: block;
      }
      ha-card {
        background: transparent;
        border: none;
        border-image: none;
        box-shadow: none;
        filter: none;
        rotate: 0deg;
        overflow: visible;
      }
      ha-card:hover {
        transform: none;
        filter: none;
      }
      .separator-wrap {
        display: flex;
        align-items: center;
        padding: 8px 0;
        gap: 10px;
      }
      .separator-line {
        flex: 1;
        height: 8px;
        overflow: visible;
      }
      .wavy-line {
        stroke: var(--sketch-ink-muted, rgba(42, 42, 42, 0.35));
        stroke-width: 1.8;
        stroke-linecap: round;
        fill: none;
      }
      .separator-label {
        font-family: var(--sketch-font, 'Caveat', cursive);
        font-size: 1em;
        font-weight: 600;
        color: var(--sketch-ink-muted, rgba(42, 42, 42, 0.5));
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        padding: 0 4px;
        background: var(--sketch-bg, #faf7f0);
      }
      .separator-label ha-icon {
        --mdc-icon-size: 16px;
        color: var(--sketch-ink-muted, rgba(42, 42, 42, 0.5));
      }
    `]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t}}static getConfigElement(){return document.createElement("sketch-separator-card-editor")}static getStubConfig(){return{name:"Section"}}getCardSize(){return 1}_renderWavyLine(t=200){const e=t/12;let i="M 0 4";for(let t=0;t<12;t++){i+=` Q ${t*e+.3*e} ${4+(t%2==0?-2.5:2.5)+.8*Math.sin(1.7*t)} ${(t+1)*e} ${4+.5*Math.sin(2.3*(t+1))}`}return q`
      <svg class="separator-line" viewBox="0 0 ${t} 8" preserveAspectRatio="none">
        <path class="wavy-line" d="${i}" />
      </svg>
    `}render(){const t=this._config?.name,e=this._config?.icon;return t||e?Q`
        <ha-card>
          <div class="separator-wrap">
            ${this._renderWavyLine(200)}
            <span class="separator-label">
              ${e?Q`<ha-icon .icon=${e}></ha-icon>`:V}
              ${t||""}
            </span>
            ${this._renderWavyLine(200)}
          </div>
        </ha-card>
      `:Q`
      <ha-card>
        <div class="separator-wrap">
          ${this._renderWavyLine(600)}
        </div>
      </ha-card>
    `}};t([gt()],le.prototype,"_config",void 0),le=t([dt("sketch-separator-card")],le),window.customCards=window.customCards||[],window.customCards.push({type:"sketch-entity-card",name:"Sketch Entity Card",description:"Hand-drawn style entity state display with icon, name, and state badge",preview:!0},{type:"sketch-button-card",name:"Sketch Button Card",description:"Sketchbook-style button for toggling entities or triggering actions",preview:!0},{type:"sketch-light-card",name:"Sketch Light Card",description:"Light control card with brightness slider in hand-drawn aesthetic",preview:!0},{type:"sketch-thermostat-card",name:"Sketch Thermostat Card",description:"Climate control card with temperature display and HVAC mode selection",preview:!0},{type:"sketch-weather-card",name:"Sketch Weather Card",description:"Current weather conditions and forecast in sketchbook style",preview:!0},{type:"sketch-sensor-card",name:"Sketch Sensor Card",description:"Sensor value display with sparkline graph in hand-drawn look",preview:!0},{type:"sketch-media-player-card",name:"Sketch Media Player Card",description:"Media player controls with artwork display in sketch aesthetic",preview:!0},{type:"sketch-cover-card",name:"Sketch Cover Card",description:"Blinds/cover control with position slider in hand-drawn style",preview:!0},{type:"sketch-alarm-panel-card",name:"Sketch Alarm Panel Card",description:"Alarm system keypad with arm/disarm controls in sketchbook design",preview:!0},{type:"sketch-clock-card",name:"Sketch Clock Card",description:"Analog and digital clock with date display (no entity required)",preview:!0},{type:"sketch-chip-card",name:"Sketch Chip Card",description:"Compact pills for quick actions, scene triggers, and status indicators",preview:!0},{type:"sketch-person-card",name:"Sketch Person Card",description:"Person presence card with avatar, location, and device battery",preview:!0},{type:"sketch-tile-card",name:"Sketch Tile Card",description:"Ultra-compact single-line entity row with toggle for maximum density",preview:!0},{type:"sketch-camera-card",name:"Sketch Camera Card",description:"Camera snapshot display with refresh and fullscreen controls",preview:!0},{type:"sketch-popup-card",name:"Sketch Pop-up Card",description:"Hash-triggered modal overlay for organizing cards in slide-up panels",preview:!1},{type:"sketch-horizontal-buttons-stack",name:"Sketch Horizontal Buttons Stack",description:"Sticky footer navigation bar with scrollable room/view buttons",preview:!0},{type:"sketch-sub-button-card",name:"Sketch Sub-Button Card",description:"Entity card with expandable secondary action button grid",preview:!0},{type:"sketch-separator-card",name:"Sketch Separator Card",description:"Hand-drawn wavy line divider with optional label for organizing cards",preview:!0});console.info("%c SKETCH-CARDS %c v1.3.0 ","background:#faf7f0;color:#2a2a2a;font-weight:bold;font-family:cursive;padding:2px 6px;border:1px solid #2a2a2a;border-radius:2px;","background:#2a2a2a;color:#faf7f0;font-weight:bold;padding:2px 6px;border-radius:2px;");
