function e(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},r=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,k=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[k("elementProperties")]=new Map,$[k("finalized")]=new Map,v?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=e=>e,C=w.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,L="?"+A,z=`<${L}>`,P=document,T=()=>P.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,j=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,D=/>/g,U=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,R=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=R(1),K=R(2),G=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),V=new WeakMap,q=P.createTreeWalker(P,129);function Z(e,t){if(!j(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",a=N;for(let t=0;t<i;t++){const i=e[t];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===N?"!--"===c[1]?a=B:void 0!==c[1]?a=D:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=U):void 0!==c[3]&&(a=U):a===U?">"===c[0]?(a=o??N,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?U:'"'===c[3]?I:H):a===I||a===H?a=U:a===B||a===D?a=N:(a=U,o=void 0);const d=a===U&&e[t+1].startsWith("/>")?" ":"";n+=a===N?i+z:l>=0?(s.push(r),i.slice(0,l)+E+i.slice(l)+A+d):i+A+(-2===l?t:d)}return[Z(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[c,l]=Y(e,t);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=l[n++],i=s.getAttribute(e).split(A),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?se:"?"===a[1]?oe:"@"===a[1]?ne:ie}),s.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:o}),s.removeAttribute(e));if(F.test(s.tagName)){const e=s.textContent.split(A),t=e.length-1;if(t>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],T()),q.nextNode(),r.push({type:2,index:++o});s.append(e[t],T())}}}else if(8===s.nodeType)if(s.data===L)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(A,e+1));)r.push({type:7,index:o}),e+=A.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,s){if(t===G)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,s)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);q.currentNode=s;let o=q.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new te(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new ae(o,this,e)),this._$AV.push(t),r=i[++a]}n!==r?.index&&(o=q.nextNode(),n++)}return q.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),M(e)?e===Q||null==e||""===e?(this._$AH!==Q&&this._$AR(),this._$AH=Q):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>j(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Q&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new ee(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new J(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=X(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==G,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=X(this,s[i+a],t,a),r===G&&(r=this._$AH[a]),n||=!M(r)||r!==this._$AH[a],r===Q?e=Q:e!==Q&&(e+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Q?void 0:e}}class oe extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Q)}}class ne extends ie{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??Q)===G)return;const i=this._$AH,s=e===Q&&i!==Q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==Q&&(i===Q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(J,te),(w.litHtmlVersions??=[]).push("3.3.2");const ce=globalThis;let le=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new te(t.insertBefore(T(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};le._$litElement$=!0,le.finalized=!0,ce.litElementHydrateSupport?.({LitElement:le});const he=ce.litElementPolyfillSupport;he?.({LitElement:le}),(ce.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},me=(e=pe,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ue(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return ue({...e,state:!0,attribute:!1})}const fe=2,ve=e=>(...t)=>({_$litDirective$:e,values:t});class ke{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class _e extends ke{constructor(e){if(super(e),this.it=Q,e.type!==fe)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Q||null==e)return this._t=void 0,this.it=e;if(e===G)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}_e.directiveName="unsafeHTML",_e.resultType=1;const ye=ve(_e),be=a`
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
    --sketch-radius: 12px;
    --sketch-shadow: drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.12))
      drop-shadow(5px 7px 8px rgba(0, 0, 0, 0.08));
    --sketch-shadow-hover: drop-shadow(4px 5px 0px rgba(0, 0, 0, 0.15))
      drop-shadow(6px 8px 10px rgba(0, 0, 0, 0.1));
    --sketch-hover-bg: var(--secondary-background-color, rgba(42, 42, 42, 0.06));

    /* Active state — unified across all cards (overridable via card-mod) */
    --sketch-active: var(--sketch-primary);

    /* Icon sizing scale */
    --sketch-icon-sm: 20px;
    --sketch-icon-md: 28px;
    --sketch-icon-lg: 44px;

    /* Card-mod overridable properties */
    --sketch-card-rotate: -0.5deg;
    --sketch-border-style: dashed;
    --sketch-border-width: 2px;
    --sketch-border-color: var(--sketch-border);
    --sketch-card-bg: var(--sketch-bg);
    --sketch-corner-opacity: 0.3;
    --sketch-shadow-opacity: 0.12;

    display: block;
    font-family: var(--sketch-font-body);
  }

  /* Dark mode adjustments — HA sets --primary-text-color to light text on dark themes */
  :host(.dark-mode) {
    --sketch-shadow: drop-shadow(2px 3px 0px rgba(0, 0, 0, 0.3))
      drop-shadow(4px 6px 8px rgba(0, 0, 0, 0.25));
    --sketch-shadow-hover: drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.35))
      drop-shadow(5px 7px 10px rgba(0, 0, 0, 0.3));
  }

  ha-card {
    background: transparent;
    color: var(--sketch-ink);
    border-radius: var(--sketch-radius);
    rotate: var(--sketch-card-rotate);
    filter: var(--sketch-shadow);
    transition: transform 0.3s ease, filter 0.3s ease;
    overflow: visible;
    border: none;
    position: relative;
    /* Ensure ha-card provides a sizing context for the SVG overlay */
    min-height: 40px;
  }

  /* SVG background overlay — must fill the entire ha-card */
  .sketch-bg-svg {
    position: absolute;
    inset: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    pointer-events: none;
    z-index: 0;
  }

  .sketch-card-content {
    position: relative;
    z-index: 1;
  }

  /* Entrance animation */
  ha-card {
    animation: sketch-enter 0.3s ease both;
  }
  @keyframes sketch-enter {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  ha-card:hover {
    transform: translate(-2px, -2px) rotate(-1.5deg);
    filter: var(--sketch-shadow-hover) saturate(1.1);
  }

  .sketch-card-content {
    padding: clamp(12px, 3vw, 20px);
    position: relative;
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
    --mdc-icon-size: var(--sketch-icon-md);
  }

  /* Keyboard focus visible indicator */
  :focus-visible {
    outline: 2px solid var(--sketch-primary);
    outline-offset: 2px;
    border-radius: var(--sketch-radius);
  }

  /* Accessible slider label association */
  .sketch-slider-wrap {
    display: block;
  }
  .sketch-slider-wrap label {
    font-family: var(--sketch-font);
    font-size: 0.9em;
    color: var(--sketch-ink-muted);
    display: block;
    margin-bottom: 4px;
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
    border: var(--sketch-border-width) var(--sketch-border-style) var(--sketch-border-color);
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

  /* Entity picture frame — sketch-styled torn-edge look */
  .sketch-entity-picture {
    border: 2.5px var(--sketch-border-style) var(--sketch-border);
    border-radius: var(--sketch-radius);
    rotate: 1deg;
    filter: drop-shadow(2px 3px 0px rgba(0, 0, 0, 0.1));
    object-fit: cover;
  }

  /* Empty/loading state placeholders */
  .sketch-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    color: var(--sketch-ink-muted);
    font-family: var(--sketch-font);
    font-style: italic;
    font-size: 0.9em;
    min-height: 60px;
  }
  .sketch-empty ha-icon {
    --mdc-icon-size: 32px;
    opacity: 0.4;
  }
  .sketch-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  .sketch-loading::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px dashed var(--sketch-ink-muted);
    border-radius: 50%;
    animation: sketch-spin 1.5s linear infinite;
    opacity: 0.5;
  }
  @keyframes sketch-spin {
    to { transform: rotate(360deg); }
  }

  /* Service call error flash */
  :host(.sketch-error) ha-card {
    animation: sketch-error-flash 0.6s ease;
  }
  @keyframes sketch-error-flash {
    0%, 100% { box-shadow: none; }
    30% { box-shadow: 0 0 0 2px var(--sketch-danger); }
  }

  /* Tap ripple feedback */
  .sketch-tap-target {
    position: relative;
    overflow: hidden;
  }
  .sketch-tap-target:active::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--sketch-ink);
    opacity: 0.06;
    border-radius: inherit;
    pointer-events: none;
  }

  /* State-change highlight animation */
  @keyframes sketch-state-pulse {
    0% { box-shadow: 0 0 0 0 var(--sketch-primary); }
    50% { box-shadow: 0 0 0 4px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }

  @media (prefers-reduced-motion: reduce) {
    ha-card,
    .sketch-btn {
      transition: none;
      animation: none;
    }
    ha-card {
      rotate: 0deg;
    }
    .sketch-tap-target:active::after {
      display: none;
    }
  }
`,$e=document.createElement("link");function we(e,t){t?.color?e.style.setProperty("--sketch-primary",t.color):e.style.removeProperty("--sketch-primary"),t?.card_background?e.style.setProperty("--sketch-card-bg",t.card_background):e.style.removeProperty("--sketch-card-bg"),t?.border_color?e.style.setProperty("--sketch-border-color",t.border_color):e.style.removeProperty("--sketch-border-color"),t?.card_rotation?e.style.setProperty("--sketch-card-rotate",t.card_rotation):e.style.removeProperty("--sketch-card-rotate"),null!=t?.corner_radius?e.style.setProperty("--sketch-radius",`${t.corner_radius}px`):e.style.removeProperty("--sketch-radius")}function xe(e){if(e.attributes.icon)return e.attributes.icon;const t=e.entity_id.split(".")[0],i=e.state;return{light:"on"===i?"mdi:lightbulb":"mdi:lightbulb-outline",switch:"on"===i?"mdi:toggle-switch":"mdi:toggle-switch-off",fan:"mdi:fan",climate:"mdi:thermostat",weather:Ce(i),sensor:Se(e),binary_sensor:"on"===i?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline",cover:"open"===i?"mdi:window-open":"mdi:window-closed",lock:"locked"===i?"mdi:lock":"mdi:lock-open",media_player:"playing"===i?"mdi:play-circle":"mdi:play-circle-outline",alarm_control_panel:Ee(i),camera:"mdi:video",automation:"mdi:robot",script:"mdi:script-text",scene:"mdi:palette",input_boolean:"on"===i?"mdi:check-circle":"mdi:close-circle",person:"mdi:account",device_tracker:"mdi:crosshairs-gps",vacuum:"mdi:robot-vacuum",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",timer:"mdi:timer-outline",counter:"mdi:counter",sun:"above_horizon"===i?"mdi:white-balance-sunny":"mdi:weather-night"}[t]||"mdi:help-circle-outline"}function Ce(e){return{"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle-outline"}[e]||"mdi:weather-cloudy"}function Se(e){return{temperature:"mdi:thermometer",humidity:"mdi:water-percent",pressure:"mdi:gauge",power:"mdi:flash",energy:"mdi:lightning-bolt",battery:"mdi:battery",illuminance:"mdi:brightness-6",carbon_dioxide:"mdi:molecule-co2",carbon_monoxide:"mdi:molecule-co",gas:"mdi:gas-cylinder",moisture:"mdi:water",signal_strength:"mdi:wifi",voltage:"mdi:sine-wave",current:"mdi:current-ac"}[e.attributes.device_class]||"mdi:eye"}function Ee(e){return{armed_home:"mdi:shield-home",armed_away:"mdi:shield-lock",armed_night:"mdi:shield-moon",armed_vacation:"mdi:shield-airplane",armed_custom_bypass:"mdi:shield-star",disarmed:"mdi:shield-off",triggered:"mdi:bell-ring",pending:"mdi:shield-alert",arming:"mdi:shield-outline"}[e]||"mdi:shield"}function Ae(e){return["on","open","playing","home","unlocked"].includes(e)}function Le(e,t){if(t?.formatEntityState)try{return t.formatEntityState(e)}catch(e){}const i=e.state,s=e.attributes.unit_of_measurement;return s?`${i} ${s}`:i}function ze(e,t,i){return Math.min(Math.max(e,t),i)}function Pe(e,t){const i=49297*Math.sin(9301*e+49297*t+233280);return i-Math.floor(i)}function Te(e,t,i,s,o,n,a=4){const r=i-e,c=s-t,l=Math.sqrt(r*r+c*c);if(l<8)return`L ${i.toFixed(1)} ${s.toFixed(1)}`;const h=Math.max(2,Math.floor(l/35));let d="";for(let i=1;i<=h;i++){const s=i/h,p=e+r*s,m=t+c*s;if(i<h){const e=-c/l,t=r/l,s=(Pe(o,13*n+i)-.5)*a*2;d+=`L ${(p+e*s).toFixed(1)} ${(m+t*s).toFixed(1)} `}else d+=`L ${p.toFixed(1)} ${m.toFixed(1)} `}return d}function Me(e,t,i,s,o,n=5,a=0,r=0){const c=e+a,l=t+a,h=e+i-a,d=t+s-a,p=Math.min(r,(h-c)/3,(d-l)/3),m=e=>(Pe(o,e+50)-.5)*n*.6;if(p<1){let e=`M ${(c+m(0)).toFixed(1)} ${(l+m(1)).toFixed(1)} `;return e+=Te(c+m(0),l+m(1),h+m(2),l+m(3),o,0,n),e+=Te(h+m(2),l+m(3),h+m(4),d+m(5),o,1,n),e+=Te(h+m(4),d+m(5),c+m(6),d+m(7),o,2,n),e+=Te(c+m(6),d+m(7),c+m(0),l+m(1),o,3,n),e+="Z",e}const u=e=>(Pe(o,e+80)-.5)*n*.3;let g=`M ${(c+p+u(0)).toFixed(1)} ${(l+u(1)).toFixed(1)} `;return g+=Te(c+p+u(0),l+u(1),h-p+u(2),l+u(3),o,0,n),g+=`Q ${(h+u(4)).toFixed(1)} ${(l+u(5)).toFixed(1)} ${(h+u(6)).toFixed(1)} ${(l+p+u(7)).toFixed(1)} `,g+=Te(h+u(6),l+p+u(7),h+u(8),d-p+u(9),o,1,n),g+=`Q ${(h+u(10)).toFixed(1)} ${(d+u(11)).toFixed(1)} ${(h-p+u(12)).toFixed(1)} ${(d+u(13)).toFixed(1)} `,g+=Te(h-p+u(12),d+u(13),c+p+u(14),d+u(15),o,2,n),g+=`Q ${(c+u(16)).toFixed(1)} ${(d+u(17)).toFixed(1)} ${(c+u(18)).toFixed(1)} ${(d-p+u(19)).toFixed(1)} `,g+=Te(c+u(18),d-p+u(19),c+u(20),l+p+u(21),o,3,n),g+=`Q ${(c+u(22)).toFixed(1)} ${(l+u(23)).toFixed(1)} ${(c+p+u(0)).toFixed(1)} ${(l+u(1)).toFixed(1)} `,g+="Z",g}function je(e,t,i={}){const{bgColor:s="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))",strokeColor:o="var(--sketch-border-color, var(--primary-text-color, #2a2a2a))",showBorder:n=!0,showTexture:a=!0,noiseOpacity:r=.08,seed:c=0,variant:l="paper",cornerRadius:h=14,active:d=!1}=i,p=h,m=`sn${c}${Math.floor(1e4*Pe(c,999))}`;let u=`<svg class="sketch-bg-svg" viewBox="0 0 ${e} ${t}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">`;a&&(u+=`<defs>\n      <filter id="${m}" x="0" y="0" width="100%" height="100%">\n        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="${c}" stitchTiles="stitch" result="noise"/>\n        <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>\n      </filter>\n    </defs>`);const g=Me(0,0,e,t,c,3,3,p);u+=`<path d="${g}" fill="${s}" />`,d&&(u+=`<path d="${g}" fill="var(--sketch-active, var(--sketch-primary, #4a6fa5))" opacity="0.10" />`),a&&(u+=`<rect x="0" y="0" width="${e}" height="${t}" filter="url(#${m})" opacity="${r}" style="mix-blend-mode:multiply" />`),"notebook"===l?u+=function(e,t,i){let s="";const o=28,n=50;for(let i=45;i<t-15;i+=o){const t=.5*Math.sin(.1*i);s+=`<line x1="${n+5}" y1="${i+t}" x2="${e-15}" y2="${i-.5*t}" stroke="#90c1d4" stroke-width="0.8" opacity="0.35" />`}s+=`<line x1="${n}" y1="8" x2="${n+.5}" y2="${t-8}" stroke="#d4626a" stroke-width="1.8" opacity="0.35" />`,s+=`<line x1="${n+2.5}" y1="8" x2="${n+2}" y2="${t-8}" stroke="#d4626a" stroke-width="0.8" opacity="0.18" />`;const a=Math.min(6,Math.floor((t-40)/45));for(let e=0;e<a;e++){const t=35+45*e;s+=`<circle cx="22" cy="${t}" r="5" fill="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))" />`,s+=`<circle cx="22" cy="${t}" r="5" fill="none" stroke="${i}" stroke-width="1.2" opacity="0.3" />`,s+=`<circle cx="22.5" cy="${t+.5}" r="4" fill="none" stroke="${i}" stroke-width="0.5" opacity="0.15" />`}return s}(e,t,o):"sticky"===l&&(u+=function(e){const t=e/2,i=Math.min(90,.3*e);return`<g opacity="0.55" transform="rotate(${(2*Math.sin(.1*t)-1).toFixed(1)} ${t} 6)">\n    <rect x="${t-i/2}" y="-4" width="${i}" height="20" fill="#e8e4c8" rx="1" />\n    <line x1="${t-i/2+4}" y1="2" x2="${t+i/2-4}" y2="2" stroke="#c8c4a8" stroke-width="0.4" opacity="0.4" />\n    <line x1="${t-i/2+4}" y1="8" x2="${t+i/2-4}" y2="8" stroke="#c8c4a8" stroke-width="0.4" opacity="0.4" />\n  </g>`}(e));const f=d?"var(--sketch-active, var(--sketch-primary, #4a6fa5))":o;if(n){u+=`<path d="${Me(0,0,e,t,c,5,6,p)}" fill="none" stroke="${f}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="${d?"0.75":"0.65"}" />`;u+=`<path d="${Me(0,0,e,t,c+17,4,7.8,p)}" fill="none" stroke="${f}" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round" opacity="${d?"0.30":"0.22"}" />`}const v=Math.max(10,.07*Math.min(e,t)),k=11+2*Pe(c,70),_=11+2*Pe(c,71);u+=`<line x1="${k-.4*v}" y1="${_}" x2="${k+.4*v}" y2="${_}" stroke="${o}" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>`,u+=`<line x1="${k}" y1="${_-.4*v}" x2="${k}" y2="${_+.4*v}" stroke="${o}" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>`;const y=e-6-7+2*Pe(c,72),b=t-6-7+2*Pe(c,73),$=.35*v;u+=`<circle cx="${y}" cy="${b}" r="${$}" fill="none" stroke="${o}" stroke-width="1.1" opacity="0.28" />`,u+=`<path d="M ${y-.8*$} ${b-.3*$} A ${$} ${$} 0 0 1 ${y+.5*$} ${b+.8*$}" fill="none" stroke="${o}" stroke-width="0.7" opacity="0.18" />`;const w=Math.min(18,.045*e,.09*t),x=e-6-w;return u+=`<path d="M ${x} 6 L ${e-6} 6 L ${e-6} ${6+w} Z" fill="${o}" opacity="0.05" />`,u+=`<line x1="${x}" y1="6" x2="${e-6}" y2="${6+w}" stroke="${o}" stroke-width="0.8" opacity="0.18" stroke-linecap="round"/>`,u+="</svg>",u}function Oe(e){window.dispatchEvent(new CustomEvent("haptic",{detail:e}))}$e.rel="stylesheet",$e.href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap",document.head.querySelector('link[href*="Caveat"]')||document.head.appendChild($e);class Ne extends le{constructor(){super(...arguments),this._holdFired=!1,this._lastTap=0,this._prevState="",this.handleKeyDown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.executeAction(this._config?.tap_action,this.defaultTapAction))},this.handlePointerDown=e=>{this._holdFired=!1,this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._config?.hold_action&&(this.executeAction(this._config.hold_action),Oe("medium"))},500)},this.handlePointerUp=e=>{if(this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),this._holdFired)return;const t=Date.now();this._config?.double_tap_action&&t-this._lastTap<250?(this._dblTapTimer&&(clearTimeout(this._dblTapTimer),this._dblTapTimer=void 0),this._lastTap=0,this.executeAction(this._config.double_tap_action)):(this._lastTap=t,this._config?.double_tap_action?this._dblTapTimer=setTimeout(()=>{this._lastTap=0,this.executeAction(this._config?.tap_action,this.defaultTapAction)},250):this.executeAction(this._config?.tap_action,this.defaultTapAction))},this.handlePointerCancel=()=>{this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),this._holdFired=!1}}static{this.styles=[be]}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}getCardSize(){return 3}renderSketchBg(e=400,t=200,i=!1){const s=this._config;let o=0;const n=this._config?.entity||"";for(let e=0;e<n.length;e++)o=(o<<5)-o+n.charCodeAt(e)|0;return o=Math.abs(o),W`${ye(je(e,t,{showBorder:!1!==s?.show_border,showTexture:!1!==s?.show_texture,variant:s?.variant||"paper",cornerRadius:s?.corner_radius??14,active:i,seed:o}))}`}getLayoutOptions(){return{grid_columns:4,grid_rows:this.getCardSize()}}getEntity(){if(this._config?.entity&&this.hass)return this.hass.states[this._config.entity]}isUnavailable(){const e=this.getEntity();return!!e&&["unavailable","unknown"].includes(e.state)}getName(){if(this._config?.name)return this._config.name;const e=this.getEntity();return e?.attributes?.friendly_name||this._config?.entity||""}getIcon(){if(this._config?.icon)return this._config.icon;const e=this.getEntity();return e?.attributes?.icon||"mdi:help-circle-outline"}async callService(e,t,i){try{await this.hass.callService(e,t,i)}catch(e){this.classList.add("sketch-error"),setTimeout(()=>this.classList.remove("sketch-error"),1e3),console.error("Ha-sketch service call failed:",e)}}toggleEntity(){if(!this._config?.entity)return;const[e]=this._config.entity.split(".");this.callService(e,"toggle",{entity_id:this._config.entity})}fireEvent(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}executeAction(e,t="more-info"){if(e?.confirmation&&!window.confirm("Are you sure?"))return;switch(e?.action||t){case"toggle":this.toggleEntity(),Oe("success");break;case"call-service":if(e?.service){const[t,i]=e.service.split(".");this.callService(t,i,e.service_data),Oe("light")}break;case"navigate":e?.navigation_path&&/^\/[a-zA-Z0-9\-_/?#=&.]*$/.test(e.navigation_path)&&(window.history.pushState(null,"",e.navigation_path),this.fireEvent("location-changed"),Oe("light"));break;case"url":e?.url_path&&(window.open(e.url_path,"_blank"),Oe("light"));break;case"none":break;default:this.fireEvent("hass-more-info",{entityId:this._config?.entity}),Oe("light")}}updated(e){if(super.updated(e),e.has("_config")&&we(this,this._config),e.has("hass")&&this.hass){const e=this.hass.themes?.darkMode??!1;this.classList.toggle("dark-mode",e);const t=this.isUnavailable();t&&!this.classList.contains("unavailable")?this.classList.add("unavailable"):!t&&this.classList.contains("unavailable")&&this.classList.remove("unavailable");const i=this.getEntity();if(i&&this._prevState&&i.state!==this._prevState){const e=this.shadowRoot?.querySelector("ha-card");e&&(e.style.animation="none",e.offsetHeight,e.style.animation="sketch-state-pulse 0.6s ease")}i&&(this._prevState=i.state)}}disconnectedCallback(){super.disconnectedCallback(),this._holdTimer&&clearTimeout(this._holdTimer),this._dblTapTimer&&clearTimeout(this._dblTapTimer)}get defaultTapAction(){return"more-info"}handleAction(){this.executeAction(this._config?.tap_action,this.defaultTapAction)}}e([ue({attribute:!1})],Ne.prototype,"hass",void 0),e([ge()],Ne.prototype,"_config",void 0);class Be extends le{constructor(){super(...arguments),this._computeLabel=e=>({entity:"Entity",name:"Name (optional)",icon:"Icon (optional)",show_name:"Show Name",show_state:"Show State",show_icon:"Show Icon",show_brightness:"Show Brightness Slider",show_color_temp:"Show Color Temperature",show_current_as_primary:"Show Current Temp as Primary",show_forecast:"Show Forecast",num_forecasts:"Number of Forecast Days",graph:"Show Graph",show_artwork:"Show Artwork",show_source:"Show Source",show_position:"Show Position Slider",show_tilt:"Show Tilt Slider",show_location:"Show Location",show_battery:"Show Battery",battery_entity:"Battery Entity",show_controls:"Show Controls",aspect_ratio:"Aspect Ratio",hide_icon:"Hide Icon",states:"Alarm States",mode:"Display Mode",show_date:"Show Date",show_seconds:"Show Seconds",hash:"Hash (e.g. kitchen)",auto_close:"Auto-close (seconds)",width:"Width (e.g. 90%)",style:"Style",columns:"Columns",collapsible:"Collapsible",color:"Accent Color",card_background:"Card Background",border_color:"Border Color",card_rotation:"Rotation (e.g. -1deg, 0deg)",corner_radius:"Corner Roundness",show_border:"Show Border",show_texture:"Show Paper Texture",variant:"Card Style",primary:"Primary Text (template)",secondary:"Secondary Text (template)",icon_color:"Icon Color",layout:"Layout",multiline_secondary:"Multiline Secondary",badge_icon:"Badge Icon",badge_color:"Badge Color",hours_to_show:"Hours to Show",line_width:"Line Width",fill:"Fill Mode",show_labels:"Show Labels",sub_entities:"Sub-Entities",max:"Maximum Value",max_entries:"Max Entries",temperature_entity:"Temperature Sensor",room_select_entity:"Room Selector (input_select)"}[e.name]||e.name),this._valueChanged=e=>{const t=e.detail.value;!function(e,t,i){const s=new Event(t,{bubbles:!0,cancelable:!1,composed:!0});s.detail=i,e.dispatchEvent(s)}(this,"config-changed",{config:{...this._config,...t}})}}static{this.styles=[a`
    :host {
      display: block;
    }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `]}get _defaults(){return{}}setConfig(e){this._config={...this._defaults,...e}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}}function De(e){return[{name:"entity",selector:{entity:e?{domain:e}:{}}},{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}]},{name:"show_name",selector:{boolean:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_icon",selector:{boolean:{}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}e([ue({attribute:!1})],Be.prototype,"hass",void 0),e([ge()],Be.prototype,"_config",void 0);let Ue=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...De()]}};Ue=e([de("sketch-entity-card-editor")],Ue);let He=class extends Ne{static{this.styles=[...super.styles,a`
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
        flex-shrink: 0;
      }
      .entity-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
      }
      .entity-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define an entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-entity-card-editor")}static getStubConfig(e){return{entity:Object.keys(e.states)[0]||"light.example"}}getCardSize(){return 2}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;const t=this._config.icon||xe(e),i=this.getName(),s=Le(e),o=!1!==this._config.show_name,n=!1!==this._config.show_state,a=!1!==this._config.show_icon,r=Ae(e.state);return W`
      <ha-card>
        ${this.renderSketchBg(400,200,r)}
        <div class="sketch-card-content">
          <div class="entity-row" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${a?W`
                  <div class="entity-icon-wrap ${r?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${t}></ha-icon>
                  </div>
                `:Q}
            <div class="entity-info">
              ${o?W`<p class="sketch-name">${i}</p>`:Q}
              <div class="last-changed">${function(e){const t=new Date,i=new Date(e),s=Math.floor((t.getTime()-i.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:`${Math.floor(s/86400)}d ago`}(e.last_changed)}</div>
            </div>
            ${n?W`
                  <div class="entity-state-badge">
                    <span class="sketch-badge ${r?"on":"off"}">${s}</span>
                  </div>
                `:Q}
          </div>
        </div>
      </ha-card>
    `}};He=e([de("sketch-entity-card")],He);let Ie=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...De()]}};Ie=e([de("sketch-button-card-editor")],Ie);let Fe=class extends Ne{constructor(){super(...arguments),this._pressing=!1}static{this.styles=[...super.styles,a`
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
      }
      .button-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .button-icon-wrap.active ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
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
    `]}setConfig(e){super.setConfig(e)}get defaultTapAction(){return"toggle"}static getConfigElement(){return document.createElement("sketch-button-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("light.")||e.startsWith("switch."));return{entity:t[0]||"light.example",tap_action:{action:"toggle"}}}getCardSize(){return 3}_handlePress(e){this._pressing=!0,this.handlePointerDown(e)}_handleRelease(e){this._pressing=!1,this.handlePointerUp(e)}_handleCancel(){this._pressing=!1,this.handlePointerCancel()}render(){const e=this.getEntity(),t=this._config.icon||(e?xe(e):"mdi:gesture-tap"),i=this.getName()||"Button",s=e&&Ae(e.state),o=!1!==this._config.show_name,n=!1!==this._config.show_state,a=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,!!s)}
        <div
          class="sketch-card-content button-wrap ${this._pressing?"pressing":""}"
          role="button"
          tabindex="0"
          aria-label="${this.getName()||"Button"}"
          @keydown=${this.handleKeyDown}
          @pointerdown=${this._handlePress}
          @pointerup=${this._handleRelease}
          @pointerleave=${this._handleCancel}
          @pointercancel=${this._handleCancel}
        >
          ${a?W`
                <div class="button-icon-wrap ${s?"active":""}">
                  <ha-icon class="sketch-icon" .icon=${t}></ha-icon>
                </div>
              `:Q}
          ${o?W`<div class="button-label">${i}</div>`:Q}
          ${n&&e?W`<div class="button-state">${e.state}</div>`:Q}
        </div>
      </ha-card>
    `}};e([ge()],Fe.prototype,"_pressing",void 0),Fe=e([de("sketch-button-card")],Fe);let Re=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_brightness:!0,show_color_temp:!0}}get _schema(){return[...De("light"),{name:"show_brightness",selector:{boolean:{}}},{name:"show_color_temp",selector:{boolean:{}}}]}};Re=e([de("sketch-light-card-editor")],Re);let We=class extends Ne{static{this.styles=[...super.styles,a`
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
      }
      .light-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .light-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
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
        background: linear-gradient(to right, #ff8a2b, #fff, #90caf9); /* warm(low K) → cool(high K) */
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a light entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-light-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("light."));return{entity:t[0]||"light.example"}}getCardSize(){return 3}get defaultTapAction(){return"toggle"}get _lightConfig(){return this._config}_setBrightness(e){const t=parseInt(e.target.value),i=Math.max(1,Math.min(t,100));this.callService("light","turn_on",{entity_id:this._config.entity,brightness:Math.round(i/100*255)})}_setColorTemp(e){const t=parseInt(e.target.value);this.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:t})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Light not found</p></div></ha-card>`;const t=this.isUnavailable(),i="on"===e.state,s=e.attributes.brightness?Math.round(e.attributes.brightness/255*100):0,o=!1!==this._lightConfig.show_brightness&&i&&!t,n=!1!==this._lightConfig.show_color_temp&&!t&&i&&void 0!==e.attributes.min_color_temp_kelvin,a=this._config.icon||xe(e),r=!1!==this._config.show_name,c=!1!==this._config.show_state,l=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,i)}
        <div class="sketch-card-content">
          <div class="light-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${l?W`
                  <div class="light-icon-wrap ${i?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${a}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${r?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${c?W`<p class="sketch-state">${t?W`<span class="sketch-unavailable-label">Unavailable</span>`:i?`${s}%`:"Off"}</p>`:Q}
            </div>
          </div>
          ${o?W`
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
              `:Q}
          ${n?W`
                <div class="color-temp-row">
                  <span class="ct-label">&#x2600;</span>
                  <input
                    type="range"
                    class="sketch-slider ct-slider"
                    min=${e.attributes.min_color_temp_kelvin||2e3}
                    max=${e.attributes.max_color_temp_kelvin||6500}
                    .value=${String(e.attributes.color_temp_kelvin||4e3)}
                    @change=${this._setColorTemp}
                  />
                  <span class="ct-label">&#x2744;</span>
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};We=e([de("sketch-light-card")],We);let Ke=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_current_as_primary:!1}}get _schema(){return[...De("climate"),{name:"show_current_as_primary",selector:{boolean:{}}}]}};Ke=e([de("sketch-thermostat-card-editor")],Ke);let Ge=class extends Ne{static{this.styles=[...super.styles,a`
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
      }
      .thermo-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .thermo-icon-wrap.heating ha-icon { color: var(--sketch-danger); }
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a climate entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-thermostat-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("climate."));return{entity:t[0]||"climate.example"}}getCardSize(){return 4}_adjustTemp(e){const t=this.getEntity();if(!t)return;const i=t.attributes.target_temp_step||.5,s=t.attributes.temperature||20;this.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s+e*i})}_setMode(e){this.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:e})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Climate not found</p></div></ha-card>`;const t=e.attributes.current_temperature??"--",i=e.attributes.temperature??"--",s=e.attributes.unit_of_measurement||"°",o=e.attributes.hvac_action||e.state,n=e.attributes.hvac_modes||[],a=e.state;let r="";"heating"!==o&&"heat"!==a||(r="heating"),"cooling"!==o&&"cool"!==a||(r="cooling");const c=!1!==this._config.show_name,l=!1!==this._config.show_state,h=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,!!r)}
        <div class="sketch-card-content">
          <div class="thermo-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${h?W`
                  <div class="thermo-icon-wrap ${r}">
                    <ha-icon class="sketch-icon" .icon=${"mdi:thermostat"}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${c?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${l?W`<p class="sketch-state">${a}</p>`:Q}
            </div>
          </div>

          <div class="thermo-temp-display">
            <span class="current-temp">${t}${s}</span>
            <span class="sketch-label" style="display:block;margin-top:4px">Current</span>
          </div>

          <hr class="sketch-divider" />

          <div class="target-row">
            <button class="temp-adjust-btn" @click=${()=>this._adjustTemp(-1)}>-</button>
            <span class="target-temp">${i}${s}</span>
            <button class="temp-adjust-btn" @click=${()=>this._adjustTemp(1)}>+</button>
          </div>
          <span class="sketch-label" style="text-align:center;display:block">Target</span>

          ${n.length>0?W`
                <div class="mode-row">
                  ${n.map(e=>W`
                      <button
                        class="sketch-btn ${e===a?"active":""}"
                        @click=${()=>this._setMode(e)}
                      >
                        ${e}
                      </button>
                    `)}
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};Ge=e([de("sketch-thermostat-card")],Ge);let Qe=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_forecast:!0,num_forecasts:5}}get _schema(){return[...De("weather"),{name:"show_forecast",selector:{boolean:{}}},{name:"num_forecasts",selector:{number:{min:1,max:7,mode:"box"}}}]}};Qe=e([de("sketch-weather-card-editor")],Qe);let Ve=class extends Ne{static{this.styles=[...super.styles,a`
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a weather entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-weather-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("weather."));return{entity:t[0]||"weather.example"}}getCardSize(){const e=this._config;return!1!==e?.show_forecast?5:3}get _weatherConfig(){return this._config}_weatherIconName(e){return function(e){return Ce(e)}(e)}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Weather not found</p></div></ha-card>`;const t=e.attributes.temperature??"--",i=e.attributes.temperature_unit||"°",s=e.state,o=e.attributes.humidity,n=e.attributes.wind_speed,a=e.attributes.wind_speed_unit||"km/h",r=e.attributes.pressure,c=e.attributes.forecast||[],l=!1!==this._weatherConfig.show_forecast,h=this._weatherConfig.num_forecasts||5,d=!1!==this._config.show_name,p=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          ${d?W`<p class="sketch-name" style="margin-bottom:8px">${this.getName()}</p>`:Q}
          <div class="weather-main" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${p?W`
                  <div class="weather-icon-wrap">
                    <ha-icon .icon=${this._weatherIconName(s)}></ha-icon>
                  </div>
                `:Q}
            <div>
              <div class="weather-temp">${t}${i}</div>
              <div class="weather-condition">${s.replace(/-/g," ")}</div>
            </div>
          </div>

          <div class="weather-details">
            ${null!=o?W`<div class="weather-detail"><ha-icon icon="mdi:water-percent"></ha-icon>${o}%</div>`:Q}
            ${null!=n?W`<div class="weather-detail"><ha-icon icon="mdi:weather-windy"></ha-icon>${n} ${a}</div>`:Q}
            ${null!=r?W`<div class="weather-detail"><ha-icon icon="mdi:gauge"></ha-icon>${r} hPa</div>`:Q}
          </div>

          ${l&&c.length>0?W`
                <hr class="sketch-divider" />
                <div class="forecast-row">
                  ${c.slice(0,h).map(e=>W`
                      <div class="forecast-day">
                        <span class="forecast-day-name">
                          ${new Date(e.datetime).toLocaleDateString(void 0,{weekday:"short"})}
                        </span>
                        <ha-icon .icon=${this._weatherIconName(e.condition)}></ha-icon>
                        <div class="forecast-temps">
                          <span class="forecast-high">${e.temperature}\u00b0</span>
                          ${null!=e.templow?W`<span class="forecast-low"> ${e.templow}\u00b0</span>`:Q}
                        </div>
                      </div>
                    `)}
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};Ve=e([de("sketch-weather-card")],Ve);let qe=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,graph:!0}}get _schema(){return[...De("sensor"),{name:"graph",selector:{boolean:{}}}]}};qe=e([de("sketch-sensor-card-editor")],qe);let Ze=class extends Ne{constructor(){super(...arguments),this._history=[],this._historyEntityId=""}static{this.styles=[...super.styles,a`
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
      .no-history {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        margin-top: 8px;
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a sensor entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-sensor-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("sensor."));return{entity:t[0]||"sensor.example",graph:!0}}getCardSize(){return 3}get _sensorConfig(){return this._config}updated(e){super.updated(e),e.has("hass")&&this._config?.entity&&this._historyEntityId!==this._config.entity&&(this._historyEntityId=this._config.entity,this._fetchHistory())}async _fetchHistory(){if(this.hass&&this._config?.entity){try{const e=new Date,t=new Date(e.getTime()-864e5),i=(await this.hass.callWS({type:"recorder/statistics_during_period",start_time:t.toISOString(),end_time:e.toISOString(),statistic_ids:[this._config.entity],period:"hour"}))[this._config.entity];if(i&&i.length>0)return void(this._history=i.map(e=>e.mean??e.state??0))}catch(e){}this._generateFallbackHistory()}}_generateFallbackHistory(){const e=this.getEntity(),t=e?parseFloat(e.state):0;if(isNaN(t))return void(this._history=[]);const i=[];let s=.9*t;for(let e=0;e<24;e++)s+=(Math.random()-.45)*(.08*t),i.push(s);i.push(t),this._history=i}_renderSparkline(){if(this._history.length<2)return W`<p class="no-history">No history data</p>`;const e=Math.min(...this._history),t=Math.max(...this._history)-e||1,i=this._history.map((i,s)=>({x:4+s/(this._history.length-1)*272,y:4+42*(1-(i-e)/t)})),s=i.map((e,t)=>`${0===t?"M":"L"} ${e.x} ${e.y}`).join(" "),o=`${s} L ${i[i.length-1].x} 50 L ${i[0].x} 50 Z`,n=i[i.length-1];return W`
      <svg class="sensor-graph" viewBox="0 0 ${280} ${50}" preserveAspectRatio="none">
        <path class="spark-area" d="${o}" />
        <path class="spark-line" d="${s}" />
        <circle class="spark-dot" cx="${n.x}" cy="${n.y}" r="3" />
      </svg>
    `}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Sensor not found</p></div></ha-card>`;const t=this._config.icon||xe(e),i=e.attributes.unit_of_measurement||"",s=!1!==this._sensorConfig.graph,o=!1!==this._config.show_name,n=!1!==this._config.show_state,a=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          <div class="sensor-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${a?W`
                  <div class="sensor-icon-wrap">
                    <ha-icon class="sketch-icon" .icon=${t}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${o?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${n?W`
                    <div class="sensor-value-row">
                      <span class="sketch-value">${e.state}</span>
                      ${i?W`<span class="sketch-unit">${i}</span>`:Q}
                    </div>
                  `:Q}
            </div>
          </div>
          ${s?this._renderSparkline():Q}
        </div>
      </ha-card>
    `}};e([ge()],Ze.prototype,"_history",void 0),Ze=e([de("sketch-sensor-card")],Ze);let Ye=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_artwork:!0,show_source:!0}}get _schema(){return[...De("media_player"),{name:"show_artwork",selector:{boolean:{}}},{name:"show_source",selector:{boolean:{}}}]}};Ye=e([de("sketch-media-player-card-editor")],Ye);let Je=class extends Ne{static{this.styles=[...super.styles,a`
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a media_player entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-media-player-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("media_player."));return{entity:t[0]||"media_player.example"}}getCardSize(){return 4}get _mediaConfig(){return this._config}_callMediaService(e){this.callService("media_player",e,{entity_id:this._config.entity})}_setVolume(e){const t=Math.max(0,Math.min(parseFloat(e.target.value),100));this.callService("media_player","volume_set",{entity_id:this._config.entity,volume_level:t/100})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Media Player not found</p></div></ha-card>`;const t=e.attributes.media_title||"Nothing playing",i=e.attributes.media_artist||"",s=e.attributes.entity_picture,o="playing"===e.state,n=Math.round(100*(e.attributes.volume_level||0)),a=!1!==this._mediaConfig.show_artwork,r=!1!==this._mediaConfig.show_source,c=e.attributes.source,l=!1!==this._config.show_name,h=!1!==this._config.show_state,d=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,o)}
        <div class="sketch-card-content">
          ${l?W`<p class="sketch-name">${this.getName()}</p>`:Q}
          <div class="media-layout" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${d&&a?s?W`<img class="media-artwork" src="${s}" alt="artwork" />`:W`
                    <div class="media-artwork-placeholder">
                      <ha-icon class="sketch-icon" icon="mdi:music-note"></ha-icon>
                    </div>
                  `:Q}
            ${h?W`
                  <div class="media-info">
                    <div class="media-title">${t}</div>
                    ${i?W`<div class="media-artist">${i}</div>`:Q}
                  </div>
                `:Q}
          </div>

          <div class="media-controls">
            <button class="media-ctrl-btn" @click=${()=>this._callMediaService("media_previous_track")}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="media-ctrl-btn play" @click=${()=>this._callMediaService("media_play_pause")}>
              <ha-icon icon=${o?"mdi:pause":"mdi:play"}></ha-icon>
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

          ${r&&c?W`<div class="media-source">Source: ${c}</div>`:Q}
        </div>
      </ha-card>
    `}};Je=e([de("sketch-media-player-card")],Je);let Xe=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_position:!0,show_tilt:!0}}get _schema(){return[...De("cover"),{name:"show_position",selector:{boolean:{}}},{name:"show_tilt",selector:{boolean:{}}}]}};Xe=e([de("sketch-cover-card-editor")],Xe);let et=class extends Ne{static{this.styles=[...super.styles,a`
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
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }
      .cover-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .cover-icon-wrap.open ha-icon {
        color: var(--sketch-active, var(--sketch-success));
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a cover entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-cover-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("cover."));return{entity:t[0]||"cover.example"}}getCardSize(){return 3}get _coverConfig(){return this._config}_callCoverService(e){this.callService("cover",e,{entity_id:this._config.entity})}_setPosition(e){const t=Math.max(0,Math.min(parseInt(e.target.value),100));this.callService("cover","set_cover_position",{entity_id:this._config.entity,position:t})}_setTilt(e){const t=Math.max(0,Math.min(parseInt(e.target.value),100));this.callService("cover","set_cover_tilt_position",{entity_id:this._config.entity,tilt_position:t})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Cover not found</p></div></ha-card>`;const t="open"===e.state,i=e.attributes.current_position??(t?100:0),s=e.attributes.current_tilt_position,o=!1!==this._coverConfig.show_position&&void 0!==e.attributes.current_position,n=!1!==this._coverConfig.show_tilt&&void 0!==s,a=t?"mdi:window-open-variant":"mdi:window-closed-variant",r=!1!==this._config.show_name,c=!1!==this._config.show_state,l=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,t)}
        <div class="sketch-card-content">
          <div class="cover-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${l?W`
                  <div class="cover-icon-wrap ${t?"open":""}">
                    <div class="cover-fill" style="height: ${i}%"></div>
                    <ha-icon class="sketch-icon" .icon=${this._config.icon||a}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${r?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${c?W`<p class="sketch-state">${e.state} ${null!=i?`(${i}%)`:""}</p>`:Q}
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

          ${o?W`
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
              `:Q}

          ${n?W`
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
              `:Q}
        </div>
      </ha-card>
    `}};et=e([de("sketch-cover-card")],et);let tt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,states:["arm_home","arm_away","arm_night"]}}get _schema(){return[...De("alarm_control_panel"),{name:"states",selector:{select:{multiple:!0,options:[{value:"arm_home",label:"Arm Home"},{value:"arm_away",label:"Arm Away"},{value:"arm_night",label:"Arm Night"},{value:"arm_custom_bypass",label:"Arm Custom"}]}}}]}};tt=e([de("sketch-alarm-panel-card-editor")],tt);let it=class extends Ne{constructor(){super(...arguments),this._code=""}static{this.styles=[...super.styles,a`
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
      .alarm-icon-wrap.triggered ha-icon { color: var(--text-primary-color, #fff); }
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define an alarm_control_panel entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-alarm-panel-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("alarm_control_panel."));return{entity:t[0]||"alarm_control_panel.example"}}getCardSize(){return 6}get _alarmConfig(){return this._config}_appendKey(e){this._code.length<10&&(this._code+=e)}_clearCode(){this._code=""}_armAlarm(e){this.callService("alarm_control_panel",`alarm_${e}`,{entity_id:this._config.entity,code:this._code||void 0}),this._code=""}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Alarm not found</p></div></ha-card>`;const t=e.state,i=t.startsWith("armed"),s="disarmed"===t,o="triggered"===t,n=xe(e),a=e.attributes.code_arm_required||e.attributes.code_format;let r="";i?r="armed":s?r="disarmed":o&&(r="triggered");const c=this._alarmConfig.states||["arm_home","arm_away","arm_night"],l=!1!==this._config.show_name,h=!1!==this._config.show_state,d=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,i||o)}
        <div class="sketch-card-content">
          <div class="alarm-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${d?W`
                  <div class="alarm-icon-wrap ${r}">
                    <ha-icon class="sketch-icon" .icon=${n}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${l?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${h?W`<p class="sketch-state">${t.replace(/_/g," ")}</p>`:Q}
            </div>
          </div>

          ${a?W`
                <div class="code-display">${"•".repeat(this._code.length)}</div>
                <div class="keypad">
                  ${[1,2,3,4,5,6,7,8,9].map(e=>W`<button class="key-btn" @click=${()=>this._appendKey(String(e))}>${e}</button>`)}
                  <button class="key-btn clear" @click=${this._clearCode}>CLR</button>
                  <button class="key-btn" @click=${()=>this._appendKey("0")}>0</button>
                  <button class="key-btn clear" @click=${()=>{this._code=this._code.slice(0,-1)}}>
                    <ha-icon icon="mdi:backspace-outline" style="--mdc-icon-size:20px"></ha-icon>
                  </button>
                </div>
              `:Q}

          <div class="action-row">
            ${i||o?W`<button class="sketch-btn arm-btn disarm" @click=${()=>this._armAlarm("disarm")}>Disarm</button>`:Q}
            ${s?c.map(e=>W`
                    <button class="sketch-btn arm-btn arm" @click=${()=>this._armAlarm(e)}>
                      ${e.replace("arm_","").replace(/_/g," ")}
                    </button>
                  `):Q}
          </div>
        </div>
      </ha-card>
    `}};e([ge()],it.prototype,"_code",void 0),it=e([de("sketch-alarm-panel-card")],it);let st=class extends Be{get _defaults(){return{mode:"both",show_date:!0,show_seconds:!0}}get _schema(){return[{name:"name",selector:{text:{}}},{name:"mode",selector:{select:{options:[{value:"both",label:"Analog + Digital"},{value:"analog",label:"Analog Only"},{value:"digital",label:"Digital Only"}],mode:"dropdown"}}},{name:"show_date",selector:{boolean:{}}},{name:"show_seconds",selector:{boolean:{}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};st=e([de("sketch-clock-card-editor")],st);let ot=class extends le{constructor(){super(...arguments),this._time=new Date,this._marks=null,this._numbers=null}static{this.styles=[be,a`
      ha-card {
        rotate: 0deg;
      }
      ha-card:hover {
        transform: none;
        filter: var(--sketch-shadow);
      }
      .clock-content {
        position: relative;
        z-index: 1;
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
    `]}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}static getConfigElement(){return document.createElement("sketch-clock-card-editor")}static getStubConfig(){return{mode:"both",show_date:!0,show_seconds:!0}}getCardSize(){return 4}getLayoutOptions(){return{grid_columns:4,grid_rows:4}}_ensureStaticMarks(){if(this._marks)return;this._marks=[],this._numbers=[];for(let e=0;e<12;e++){const t=(30*e-90)*Math.PI/180;this._marks.push(K`<line class="hour-mark" x1=${70+52*Math.cos(t)} y1=${70+52*Math.sin(t)} x2=${70+58*Math.cos(t)} y2=${70+58*Math.sin(t)} />`),this._numbers.push(K`<text class="clock-number" x=${70+44*Math.cos(t)} y=${70+44*Math.sin(t)}>${0===e?12:e}</text>`)}for(let e=0;e<60;e++){if(e%5==0)continue;const t=(6*e-90)*Math.PI/180;this._marks.push(K`<line class="minute-mark" x1=${70+58*Math.cos(t)} y1=${70+58*Math.sin(t)} x2=${70+55*Math.cos(t)} y2=${70+55*Math.sin(t)} />`)}}connectedCallback(){super.connectedCallback(),this._tick(),this._timer=window.setInterval(()=>this._tick(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}_tick(){this._time=new Date}_renderAnalog(){this._ensureStaticMarks();const e=this._time.getHours()%12,t=this._time.getMinutes(),i=this._time.getSeconds(),s=!1!==this._config.show_seconds,o=70,n=70,a=(e,t)=>{const i=(e-90)*Math.PI/180;return{x:o+Math.cos(i)*t,y:n+Math.sin(i)*t}},r=a(30*(e+t/60),32),c=a(6*(t+i/60),46),l=a(6*i,50);return W`
      <svg class="analog-clock" viewBox="0 0 140 140">
        <circle class="clock-face" cx=${o} cy=${n} r=${60} />
        ${this._marks}
        ${this._numbers}
        <line class="hour-hand" x1=${o} y1=${n} x2=${r.x} y2=${r.y} />
        <line class="minute-hand" x1=${o} y1=${n} x2=${c.x} y2=${c.y} />
        ${s?K`<line class="second-hand" x1=${o} y1=${n} x2=${l.x} y2=${l.y} />`:Q}
        <circle class="clock-center" cx=${o} cy=${n} r="3" />
      </svg>
    `}_renderDigital(){const e=this._time.getHours(),t=this._time.getMinutes(),i=this._time.getSeconds(),s=e=>String(e).padStart(2,"0"),o=!1!==this._config.show_seconds?`${s(e)}:${s(t)}:${s(i)}`:`${s(e)}:${s(t)}`;return W`<div class="digital-time">${o}</div>`}render(){const e=this._config?.mode||"both",t=!1!==this._config?.show_date,i=this._config?.name,s=this._time.toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});return W`
      <ha-card>
        <div class="sketch-card-content clock-content">
          ${i?W`<div class="clock-name">${i}</div>`:Q}
          ${"analog"===e||"both"===e?this._renderAnalog():Q}
          ${"digital"===e||"both"===e?this._renderDigital():Q}
          ${t?W`<div class="digital-date">${s}</div>`:Q}
        </div>
      </ha-card>
    `}};e([ge()],ot.prototype,"_config",void 0),e([ge()],ot.prototype,"_time",void 0),ot=e([de("sketch-clock-card")],ot);let nt=class extends le{constructor(){super(...arguments),this._config={}}static{this.styles=a`
    :host { display: block; }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `}setConfig(e){this._config={...e}}render(){return W`
      <p class="editor-note">
        The Chip card requires YAML configuration for its chips array.
        Switch to the code editor to configure chips.
      </p>
    `}};e([ue({attribute:!1})],nt.prototype,"hass",void 0),e([ge()],nt.prototype,"_config",void 0),nt=e([de("sketch-chip-card-editor")],nt);let at=class extends le{static{this.styles=[be,a`
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
        color: var(--sketch-ink-muted);
      }
      .chip.on ha-icon {
        color: var(--sketch-active, var(--sketch-success));
      }
      .chip-label {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `]}setConfig(e){if(!e||!e.chips||!Array.isArray(e.chips))throw new Error("Please define chips array");this._config={...e}}static getConfigElement(){return document.createElement("sketch-chip-card-editor")}static getStubConfig(){return{chips:[{type:"entity",entity:"light.living_room"},{type:"action",icon:"mdi:home",name:"Home",tap_action:{action:"navigate",navigation_path:"/"}}]}}getCardSize(){return 1}getLayoutOptions(){return{grid_columns:4,grid_rows:1}}_handleChipTap(e){switch(e.tap_action?.action||(e.entity?"more-info":"none")){case"toggle":if(e.entity){const[t]=e.entity.split(".");this.hass.callService(t,"toggle",{entity_id:e.entity})}break;case"more-info":e.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e.entity}}));break;case"navigate":e.tap_action?.navigation_path&&(window.history.pushState(null,"",e.tap_action.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"call-service":if(e.tap_action?.service){const[t,i]=e.tap_action.service.split(".");this.hass.callService(t,i,e.tap_action.service_data)}}}_renderChip(e){const t=e.entity?this.hass.states[e.entity]:void 0,i=e.icon||(t?xe(t):"mdi:circle"),s=t&&["on","open","playing","home"].includes(t.state);let o=e.name;return!o&&t&&(o=t.attributes.friendly_name||e.entity),"template"===e.type&&e.content&&(o=e.content),W`
      <div class="chip ${s?"on":""}" @click=${()=>this._handleChipTap(e)}>
        <ha-icon .icon=${i}></ha-icon>
        ${o?W`<span class="chip-label">${o}</span>`:Q}
      </div>
    `}render(){return this._config?.chips?W`
      <ha-card>
        <div class="chips-row">
          ${this._config.chips.map(e=>this._renderChip(e))}
        </div>
      </ha-card>
    `:Q}};e([ue({attribute:!1})],at.prototype,"hass",void 0),e([ge()],at.prototype,"_config",void 0),at=e([de("sketch-chip-card")],at);let rt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_location:!0,show_battery:!0}}get _schema(){return[...De("person"),{name:"show_location",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"battery_entity",selector:{entity:{domain:"sensor"}}}]}};rt=e([de("sketch-person-card-editor")],rt);let ct=class extends Ne{static{this.styles=[...super.styles,a`
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
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a person entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-person-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("person."));return{entity:t[0]||"person.example"}}getCardSize(){return 2}get _personConfig(){return this._config}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Person not found</p></div></ha-card>`;const t=this.getName(),i=e.attributes.entity_picture,s="home"===e.state,o="home"===e.state?"Home":"not_home"===e.state?"Away":e.state,n=!1!==this._personConfig.show_location,a=!1!==this._personConfig.show_battery,r=this._personConfig.battery_entity?this.hass.states[this._personConfig.battery_entity]:void 0,c=r?parseInt(r.state):null;let l="high";null!==c&&(c<20?l="low":c<50&&(l="mid"));const h=e.attributes.gps_accuracy,d=s?"mdi:home":"mdi:map-marker",p=!1!==this._config.show_name,m=!1!==this._config.show_state,u=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,s)}
        <div class="sketch-card-content">
          <div class="person-row" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${u?i?W`<img class="person-avatar" src="${i}" alt="${t}" />`:W`
                    <div class="person-avatar-placeholder">
                      <ha-icon icon="mdi:account"></ha-icon>
                    </div>
                  `:Q}
            <div class="person-info">
              ${p?W`<p class="sketch-name">${t}</p>`:Q}
              ${m&&n?W`
                    <div class="person-location">
                      <span class="person-status">
                        <span class="status-dot ${s?"home":"away"}"></span>
                        <ha-icon .icon=${d}></ha-icon>
                        ${o}
                      </span>
                      ${h?W`<span style="font-size:0.8em">(~${h}m)</span>`:Q}
                    </div>
                  `:Q}
              ${m&&a&&null!==c?W`
                    <div class="battery-row">
                      <ha-icon icon="mdi:battery" style="--mdc-icon-size:14px;color:var(--sketch-ink-muted)"></ha-icon>
                      <div class="battery-bar">
                        <div class="battery-fill ${l}" style="width:${c}%"></div>
                      </div>
                      <span class="battery-text">${c}%</span>
                    </div>
                  `:Q}
            </div>
          </div>
        </div>
      </ha-card>
    `}};ct=e([de("sketch-person-card")],ct);let lt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,hide_icon:!1}}get _schema(){return[...De(),{name:"hide_icon",selector:{boolean:{}}}]}};lt=e([de("sketch-tile-card-editor")],lt);let ht=class extends Ne{static{this.styles=[...super.styles,a`
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
        position: relative;
        z-index: 1;
      }
      .tile-icon {
        --mdc-icon-size: 22px;
        color: var(--sketch-ink-muted);
        flex-shrink: 0;
      }
      .tile-icon.on {
        color: var(--sketch-active, var(--sketch-success));
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
        width: 40px;
        height: 22px;
        border-radius: 12px;
        border: none;
        background: var(--sketch-ink-light);
        position: relative;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.2s ease;
      }
      .tile-toggle.on {
        background: var(--sketch-primary);
      }
      .tile-toggle-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--card-background-color, #fff);
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        transition: left 0.2s ease;
      }
      .tile-toggle.on .tile-toggle-knob {
        left: 20px;
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define an entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-tile-card-editor")}static getStubConfig(e){return{entity:Object.keys(e.states)[0]||"light.example"}}getCardSize(){return 1}get _tileConfig(){return this._config}_isToggleable(){if(!this._config?.entity)return!1;const e=this._config.entity.split(".")[0];return["light","switch","fan","input_boolean","automation","script","cover","lock"].includes(e)}_handleToggle(e){e.stopPropagation(),this.toggleEntity()}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="tile-row" style="position:relative;z-index:1"><span class="tile-name">Not found</span></div></ha-card>`;const t=this._config.icon||xe(e),i=this.getName(),s=Le(e),o=Ae(e.state),n=!0!==this._tileConfig.hide_icon&&!1!==this._config.show_icon,a=!1!==this._config.show_name,r=!1!==this._config.show_state,c=this._isToggleable();return W`
      <ha-card>
        ${this.renderSketchBg(400,200,o)}
        <div class="tile-row" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
          ${n?W`<ha-icon class="tile-icon ${o?"on":"off"}" .icon=${t}></ha-icon>`:Q}
          ${a?W`<span class="tile-name">${i}</span>`:Q}
          ${c?W`
                <div class="tile-toggle ${o?"on":""}" @click=${this._handleToggle}>
                  <div class="tile-toggle-knob"></div>
                </div>
              `:r?W`<span class="tile-state">${s}</span>`:Q}
        </div>
      </ha-card>
    `}};ht=e([de("sketch-tile-card")],ht);let dt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_controls:!0}}get _schema(){return[...De("camera"),{name:"show_controls",selector:{boolean:{}}},{name:"aspect_ratio",selector:{text:{}}}]}};dt=e([de("sketch-camera-card-editor")],dt);let pt=class extends Ne{constructor(){super(...arguments),this._imageUrl="",this._loading=!0}static{this.styles=[...super.styles,a`
      .camera-wrap {
        position: relative;
        z-index: 1;
        overflow: hidden;
        border-radius: var(--sketch-radius, 12px);
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
        color: var(--text-primary-color, #fff);
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a camera entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-camera-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("camera."));return{entity:t[0]||"camera.example"}}getCardSize(){return 5}connectedCallback(){super.connectedCallback(),this._refreshTimer&&clearInterval(this._refreshTimer),this._updateImage(),this._refreshTimer=window.setInterval(()=>this._updateImage(),1e4)}disconnectedCallback(){super.disconnectedCallback(),this._refreshTimer&&clearInterval(this._refreshTimer),this._loadingTimer&&clearTimeout(this._loadingTimer)}_updateImage(){const e=this.getEntity();if(!e)return;const t=e.attributes.entity_picture;t&&t!==this._imageUrl&&(this._imageUrl=t,this._loading=!1)}updated(e){super.updated(e),e.has("hass")&&this._updateImage()}_handleImageClick(){this.executeAction(this._config?.tap_action,"more-info")}_handleRefresh(){this._loading=!0,this._updateImage(),this._loadingTimer&&clearTimeout(this._loadingTimer),this._loadingTimer=window.setTimeout(()=>this._loading=!1,500)}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Camera not found</p></div></ha-card>`;const t=this.getName(),i=!1!==this._config.show_controls,s=!1!==this._config.show_name,o=!1!==this._config.show_state,n="idle"===e.state;return W`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="camera-wrap">
          <div class="tape-corner tl"></div>
          <div class="tape-corner tr"></div>
          ${this._imageUrl?W`
                <img
                  class="camera-img ${this._loading?"loading":""}"
                  src="${this._imageUrl}"
                  alt="${t}"
                  role="button"
                  tabindex="0"
                  aria-label="${t}"
                  @keydown=${this.handleKeyDown}
                  @click=${this._handleImageClick}
                  @error=${()=>this._imageUrl=""}
                />
              `:W`
                <div class="camera-placeholder" role="button" tabindex="0" aria-label="${t}" @keydown=${this.handleKeyDown} @click=${this._handleImageClick}>
                  <ha-icon icon="mdi:video-off-outline"></ha-icon>
                  <span style="font-family:var(--sketch-font);font-size:0.9em">${n?"Camera idle":"No image"}</span>
                </div>
              `}
          <div class="camera-overlay">
            ${s?W`<span class="camera-name">${t}</span>`:Q}
            ${o?W`<span class="camera-state">${e.state}</span>`:Q}
          </div>
        </div>
        ${i?W`
              <div class="camera-controls">
                <button class="cam-btn" @click=${this._handleRefresh} title="Refresh">
                  <ha-icon icon="mdi:refresh"></ha-icon>
                </button>
                <button class="cam-btn" @click=${this._handleImageClick} title="Fullscreen">
                  <ha-icon icon="mdi:fullscreen"></ha-icon>
                </button>
              </div>
            `:Q}
      </ha-card>
    `}};e([ge()],pt.prototype,"_imageUrl",void 0),e([ge()],pt.prototype,"_loading",void 0),pt=e([de("sketch-camera-card")],pt);let mt=class extends Be{get _schema(){return[{name:"hash",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"auto_close",selector:{number:{min:0,max:300,mode:"box"}}},{name:"width",selector:{text:{}}}]}render(){return this.hass&&this._config?W`
      ${super.render()}
      <p class="editor-note">
        Configure child cards in YAML mode (code editor).
      </p>
    `:Q}};mt=e([de("sketch-popup-card-editor")],mt);let ut=class extends le{constructor(){super(...arguments),this._open=!1,this._childCards=[],this._hashListener=()=>this._checkHash(),this._keyListener=e=>{"Escape"===e.key&&this._open&&this._closePopup()}}static{this.styles=[be,a`
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
    `]}setConfig(e){if(!e)throw new Error("Invalid configuration");if(!e.hash)throw new Error('Please define a hash (e.g. "kitchen")');this._config={...e}}static getConfigElement(){return document.createElement("sketch-popup-card-editor")}static getStubConfig(){return{hash:"example",name:"Example Pop-up",icon:"mdi:home",cards:[]}}getCardSize(){return 0}getLayoutOptions(){return{grid_columns:4,grid_rows:0}}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this._hashListener),window.addEventListener("keydown",this._keyListener),this._checkHash()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._hashListener),window.removeEventListener("keydown",this._keyListener),this._clearAutoClose()}_checkHash(){const e=window.location.hash.replace("#","")===this._config?.hash;e&&!this._open?this._openPopup():!e&&this._open&&this._closePopup()}async _openPopup(){this._open=!0,await this._renderChildCards(),this._startAutoClose(),document.body.style.overflow="hidden"}_closePopup(){this._open=!1,this._clearAutoClose(),document.body.style.overflow="",window.location.hash.replace("#","")===this._config?.hash&&history.replaceState(null,"",window.location.pathname+window.location.search)}_startAutoClose(){this._clearAutoClose();const e=this._config?.auto_close;e&&e>0&&(this._autoCloseTimer=window.setTimeout(()=>this._closePopup(),1e3*e))}_clearAutoClose(){this._autoCloseTimer&&(clearTimeout(this._autoCloseTimer),this._autoCloseTimer=void 0)}async _renderChildCards(){if(this._config?.cards?.length&&this.hass)try{if(!window.loadCardHelpers)return;const e=await window.loadCardHelpers(),t=[];for(const i of this._config.cards)try{const s=await e.createCardElement(i);s.hass=this.hass,t.push(s)}catch{const e=document.createElement("div");e.textContent=`Error loading card: ${i.type}`,e.style.cssText="padding:8px;color:red;font-family:var(--sketch-font)",t.push(e)}this._childCards=t}catch{this._childCards=[]}else this._childCards=[]}updated(e){super.updated(e),e.has("hass")&&this._childCards.length>0&&this._childCards.forEach(e=>{void 0!==e.hass&&(e.hass=this.hass)})}_handleBackdropClick(){this._closePopup()}render(){const e=this._config?.width||"90%",t=this._config?.name,i=this._config?.icon;return W`
      <div
        class="popup-backdrop ${this._open?"open":""}"
        @click=${this._handleBackdropClick}
      ></div>
      <div
        class="popup-panel ${this._open?"open":""}"
        role="dialog"
        aria-modal="true"
        style="width: ${e}; max-width: 500px"
        @click=${e=>e.stopPropagation()}
      >
        <div class="popup-handle"></div>
        ${t||i?W`
              <div class="popup-header">
                ${i?W`<ha-icon .icon=${i}></ha-icon>`:Q}
                ${t?W`<span class="popup-title">${t}</span>`:Q}
                <button class="popup-close" @click=${this._closePopup}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
              <div class="popup-header-line"></div>
            `:W`
              <div style="display:flex;justify-content:flex-end;padding:4px 12px 0">
                <button class="popup-close" @click=${this._closePopup}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
            `}
        <div class="popup-content">
          ${this._childCards.map(e=>e)}
        </div>
      </div>
    `}};e([ue({attribute:!1})],ut.prototype,"hass",void 0),e([ge()],ut.prototype,"_config",void 0),e([ge()],ut.prototype,"_open",void 0),e([ge()],ut.prototype,"_childCards",void 0),ut=e([de("sketch-popup-card")],ut);let gt=class extends le{constructor(){super(...arguments),this._config={}}static{this.styles=a`
    :host { display: block; }
    .editor-note {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 8px 0;
    }
  `}setConfig(e){this._config={...e}}render(){return W`
      <p class="editor-note">
        The Horizontal Buttons Stack requires YAML configuration for its buttons array.
        Switch to the code editor to configure buttons.
      </p>
    `}};e([ue({attribute:!1})],gt.prototype,"hass",void 0),e([ge()],gt.prototype,"_config",void 0),gt=e([de("sketch-horizontal-buttons-stack-editor")],gt);let ft=class extends le{constructor(){super(...arguments),this._activeHash="",this._hashListener=()=>this._updateActiveHash()}static{this.styles=[be,a`
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
        color: var(--text-primary-color, #fff);
      }
      .nav-icon-wrap ha-icon {
        --mdc-icon-size: 20px;
        color: var(--sketch-ink-muted);
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
    `]}setConfig(e){if(!e||!e.buttons||!Array.isArray(e.buttons))throw new Error("Please define buttons array");this._config={...e}}static getConfigElement(){return document.createElement("sketch-horizontal-buttons-stack-editor")}static getStubConfig(){return{style:"fixed",buttons:[{name:"Home",icon:"mdi:home",hash:"home"},{name:"Lights",icon:"mdi:lightbulb-group",hash:"lights"},{name:"Climate",icon:"mdi:thermostat",hash:"climate"},{name:"Security",icon:"mdi:shield-home",hash:"security"},{name:"Media",icon:"mdi:speaker",hash:"media"}]}}getCardSize(){return 1}getLayoutOptions(){return{grid_columns:4,grid_rows:1}}connectedCallback(){super.connectedCallback(),this._updateActiveHash(),window.addEventListener("hashchange",this._hashListener)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._hashListener)}_updateActiveHash(){this._activeHash=window.location.hash.replace("#","")}_handleButtonTap(e){e.hash?window.location.hash=e.hash:e.navigation_path&&(window.history.pushState(null,"",e.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})))}_getOrderedButtons(){const e=[...this._config.buttons];return this.hass?e.sort((e,t)=>{if(!e.entity&&!t.entity)return 0;const i=e.entity&&"on"===this.hass.states[e.entity]?.state?1:0;return(t.entity&&"on"===this.hass.states[t.entity]?.state?1:0)-i}):e}render(){if(!this._config?.buttons)return Q;const e="inline"!==this._config.style,t=this._getOrderedButtons();return W`
      <div class="${e?"nav-fixed":""}">
        <ha-card>
          <div class="torn-edge">
            <svg viewBox="0 0 400 8" preserveAspectRatio="none">
              <path class="torn-edge-path" d="M0 8 L0 4 Q10 1 20 3 Q30 6 40 2 Q50 0 60 4 Q70 7 80 3 Q90 1 100 5 Q110 7 120 2 Q130 0 140 4 Q150 6 160 2 Q170 1 180 5 Q190 7 200 3 Q210 0 220 4 Q230 6 240 2 Q250 1 260 5 Q270 7 280 3 Q290 0 300 4 Q310 6 320 2 Q330 1 340 5 Q350 7 360 3 Q370 0 380 4 Q390 6 400 3 L400 8 Z" />
            </svg>
          </div>
          <div class="nav-container">
            <div class="nav-scroll">
              ${t.map(e=>W`
                  <button
                    class="nav-btn ${e.hash===this._activeHash?"active":""}"
                    @click=${()=>this._handleButtonTap(e)}
                  >
                    <div class="nav-icon-wrap">
                      <ha-icon .icon=${e.icon}></ha-icon>
                    </div>
                    <span class="nav-label">${e.name}</span>
                  </button>
                `)}
            </div>
          </div>
        </ha-card>
      </div>
    `}};e([ue({attribute:!1})],ft.prototype,"hass",void 0),e([ge()],ft.prototype,"_config",void 0),e([ge()],ft.prototype,"_activeHash",void 0),ft=e([de("sketch-horizontal-buttons-stack")],ft);let vt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,columns:3,collapsible:!0}}get _schema(){return[...De(),{name:"columns",selector:{number:{min:1,max:6,mode:"box"}}},{name:"collapsible",selector:{boolean:{}}}]}render(){return this.hass&&this._config?W`
      ${super.render()}
      <p class="editor-note">
        Configure sub_buttons in YAML mode (code editor).
      </p>
    `:Q}};vt=e([de("sketch-sub-button-card-editor")],vt);let kt=class extends Ne{constructor(){super(...arguments),this._expanded=!0}static{this.styles=[...super.styles,a`
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
        flex-shrink: 0;
      }
      .primary-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .primary-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
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
        color: var(--text-primary-color, #fff);
        border-color: var(--sketch-primary);
      }
      .sub-btn.active ha-icon {
        color: var(--text-primary-color, #fff);
      }
      .sub-btn ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-ink-muted);
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
    `]}setConfig(e){if(!e.entity)throw new Error("Please define an entity");if(!e.sub_buttons||!Array.isArray(e.sub_buttons))throw new Error("Please define sub_buttons array");super.setConfig(e),!1===e.collapsible&&(this._expanded=!0)}static getConfigElement(){return document.createElement("sketch-sub-button-card-editor")}static getStubConfig(e){const t=Object.keys(e.states),i=t.filter(e=>e.startsWith("light."));return{entity:i[0]||t[0]||"light.example",sub_buttons:[{entity:i[1]||"light.example",name:"Lamp"},{icon:"mdi:movie",name:"Movie Mode",tap_action:{action:"call-service",service:"scene.turn_on"}},{icon:"mdi:power",name:"All Off",tap_action:{action:"call-service",service:"light.turn_off"}}]}}getCardSize(){return 3}get _subConfig(){return this._config}_toggleExpand(){!1!==this._subConfig.collapsible&&(this._expanded=!this._expanded)}_handleSubButtonTap(e){const t=e.entity?"toggle":"none";switch(e.tap_action?.action||t){case"toggle":if(e.entity){const[t]=e.entity.split(".");this.callService(t,"toggle",{entity_id:e.entity}),window.dispatchEvent(new CustomEvent("haptic",{detail:"success"}))}break;case"call-service":if(e.tap_action?.service){const[t,i]=e.tap_action.service.split(".");this.callService(t,i,{...e.tap_action.service_data,...e.entity?{entity_id:e.entity}:{}}),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"}))}break;case"more-info":e.entity&&this.fireEvent("hass-more-info",{entityId:e.entity});break;case"navigate":e.tap_action?.navigation_path&&(window.history.pushState(null,"",e.tap_action.navigation_path),this.fireEvent("location-changed"),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"})));break;case"url":e.tap_action?.url_path&&(window.open(e.tap_action.url_path,"_blank"),window.dispatchEvent(new CustomEvent("haptic",{detail:"light"})))}}_renderSubButton(e){const t=e.entity?this.hass.states[e.entity]:void 0,i=e.icon||(t?xe(t):"mdi:circle-small"),s=e.name||t?.attributes?.friendly_name||"",o=t&&Ae(t.state),n=e.show_state&&t;return W`
      <button class="sub-btn ${o?"active":""}" @click=${()=>this._handleSubButtonTap(e)}>
        <ha-icon .icon=${i}></ha-icon>
        <div class="sub-btn-info">
          <div class="sub-btn-name">${s}</div>
          ${n?W`<div class="sub-btn-state">${Le(t)}</div>`:Q}
        </div>
      </button>
    `}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;const t=this._config.icon||xe(e),i=this.getName(),s=Ae(e.state),o=Math.max(1,Math.min(this._subConfig.columns||3,6)),n=!1!==this._subConfig.collapsible,a=!1!==this._config.show_name,r=!1!==this._config.show_state,c=!1!==this._config.show_icon;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,s)}
        <div class="sketch-card-content">
          <div class="primary-row" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @click=${n?this._toggleExpand:void 0} @pointerdown=${n?void 0:this.handlePointerDown} @pointerup=${n?void 0:this.handlePointerUp} @pointercancel=${n?void 0:this.handlePointerCancel}>
            ${c?W`
                  <div class="primary-icon-wrap ${s?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${t}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${a?W`<p class="sketch-name">${i}</p>`:Q}
              ${r?W`<p class="sketch-state">${Le(e)}</p>`:Q}
            </div>
            ${n?W`<ha-icon class="expand-chevron ${this._expanded?"open":""}" icon="mdi:chevron-down"></ha-icon>`:Q}
          </div>
          <div
            class="sub-buttons-grid ${this._expanded?"expanded":"collapsed"}"
            style="grid-template-columns: repeat(${o}, 1fr)"
          >
            ${this._subConfig.sub_buttons.map(e=>this._renderSubButton(e))}
          </div>
        </div>
      </ha-card>
    `}};e([ge()],kt.prototype,"_expanded",void 0),kt=e([de("sketch-sub-button-card")],kt);let _t=class extends Be{get _schema(){return[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};_t=e([de("sketch-separator-card-editor")],_t);let yt=class extends le{static{this.styles=[be,a`
      :host {
        display: block;
        overflow: hidden;
      }
      ha-card {
        background: transparent;
        border: none;
        border-image: none;
        box-shadow: none;
        filter: none;
        rotate: 0deg;
        overflow: hidden;
        animation: none;
        min-height: 0;
      }
      ha-card:hover {
        transform: none;
        filter: none;
      }
      .separator-wrap {
        display: flex;
        align-items: center;
        padding: 8px 4px;
        gap: 10px;
        overflow: hidden;
      }
      .separator-line {
        flex: 1;
        min-width: 0;
        height: 8px;
        overflow: hidden;
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
    `]}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}static getConfigElement(){return document.createElement("sketch-separator-card-editor")}static getStubConfig(){return{name:"Section"}}getCardSize(){return 1}getLayoutOptions(){return{grid_columns:4,grid_rows:1}}_renderWavyLine(e=200){const t=e/12;let i="M 0 4";for(let e=0;e<12;e++){i+=` Q ${e*t+.3*t} ${4+(e%2==0?-2.5:2.5)+.8*Math.sin(1.7*e)} ${(e+1)*t} ${4+.5*Math.sin(2.3*(e+1))}`}return K`
      <svg class="separator-line" viewBox="0 0 ${e} 8" preserveAspectRatio="none">
        <path class="wavy-line" d="${i}" />
      </svg>
    `}render(){const e=this._config?.name,t=this._config?.icon;return e||t?W`
        <ha-card>
          <div class="separator-wrap">
            ${this._renderWavyLine(200)}
            <span class="separator-label">
              ${t?W`<ha-icon .icon=${t}></ha-icon>`:Q}
              ${e||""}
            </span>
            ${this._renderWavyLine(200)}
          </div>
        </ha-card>
      `:W`
      <ha-card>
        <div class="separator-wrap">
          ${this._renderWavyLine(600)}
        </div>
      </ha-card>
    `}};e([ge()],yt.prototype,"_config",void 0),yt=e([de("sketch-separator-card")],yt);let bt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_speed:!0}}get _schema(){return[...De("fan"),{name:"show_speed",selector:{boolean:{}}}]}};bt=e([de("sketch-fan-card-editor")],bt);let $t=class extends Ne{static{this.styles=[...super.styles,a`
      .fan-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .fan-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fan-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .fan-icon-wrap.on ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
      }
      .fan-icon-wrap.on ha-icon {
        color: var(--sketch-active);
        animation: sketch-fan-spin 1.5s linear infinite;
      }
      @keyframes sketch-fan-spin {
        to { transform: rotate(360deg); }
      }
      .speed-row {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .speed-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 40px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a fan entity");super.setConfig(e)}get defaultTapAction(){return"toggle"}static getConfigElement(){return document.createElement("sketch-fan-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("fan."));return{entity:t[0]||"fan.example"}}getCardSize(){return 3}get _fanConfig(){return this._config}_setSpeed(e){const t=Math.max(0,Math.min(parseInt(e.target.value),100));this.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:t})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Fan not found</p></div></ha-card>`;const t=Ae(e.state),i=e.attributes.percentage??0,s=!1!==this._config.show_name,o=!1!==this._config.show_state,n=!1!==this._config.show_icon,a=!1!==this._fanConfig.show_speed&&t,r=this._config.icon||"mdi:fan";return W`
      <ha-card>
        ${this.renderSketchBg(400,200,t)}
        <div class="sketch-card-content">
          <div class="fan-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${n?W`
                  <div class="fan-icon-wrap ${t?"on":""}">
                    <ha-icon class="sketch-icon" .icon=${r}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${s?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${o?W`<p class="sketch-state">${t?`${i}%`:"Off"}</p>`:Q}
            </div>
          </div>
          ${a?W`
                <div class="speed-row">
                  <span class="sketch-label">Speed</span>
                  <input type="range" class="sketch-slider" min="0" max="100" .value=${String(i)} @change=${this._setSpeed} />
                  <span class="speed-value">${i}%</span>
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};$t=e([de("sketch-fan-card")],$t);let wt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...De("lock")]}};wt=e([de("sketch-lock-card-editor")],wt);let xt=class extends Ne{static{this.styles=[...super.styles,a`
      .lock-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .lock-icon-wrap {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lock-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .lock-icon-wrap.locked ha-icon { color: var(--sketch-success); }
      .lock-icon-wrap.unlocked ha-icon { color: var(--sketch-warning); }
      .lock-controls {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        justify-content: center;
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a lock entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-lock-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("lock."));return{entity:t[0]||"lock.example"}}getCardSize(){return 3}_lock(){this.callService("lock","lock",{entity_id:this._config.entity})}_unlock(){this.callService("lock","unlock",{entity_id:this._config.entity})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Lock not found</p></div></ha-card>`;const t="locked"===e.state,i=!1!==this._config.show_name,s=!1!==this._config.show_state,o=!1!==this._config.show_icon,n=this._config.icon||(t?"mdi:lock":"mdi:lock-open");return W`
      <ha-card>
        ${this.renderSketchBg(400,200,t)}
        <div class="sketch-card-content">
          <div class="lock-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${o?W`
                  <div class="lock-icon-wrap ${t?"locked":"unlocked"}">
                    <ha-icon class="sketch-icon" .icon=${n}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${i?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${s?W`<p class="sketch-state">${t?"Locked":"Unlocked"}</p>`:Q}
            </div>
          </div>
          <div class="lock-controls">
            <button class="sketch-btn ${t?"active":""}" @click=${this._lock}>Lock</button>
            <button class="sketch-btn ${t?"":"active"}" @click=${this._unlock}>Unlock</button>
          </div>
        </div>
      </ha-card>
    `}};xt=e([de("sketch-lock-card")],xt);let Ct=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0,show_slider:!0}}get _schema(){return[...De(),{name:"show_slider",selector:{boolean:{}}}]}};Ct=e([de("sketch-number-card-editor")],Ct);let St=class extends Ne{static{this.styles=[...super.styles,a`
      .number-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .number-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .number-slider-row {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .number-value {
        font-family: var(--sketch-font);
        font-size: 1em;
        min-width: 50px;
        text-align: right;
        color: var(--sketch-ink-muted);
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define a number/input_number entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-number-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("input_number.")||e.startsWith("number."));return{entity:t[0]||"input_number.example"}}getCardSize(){return 2}_setValue(e){const t=this.getEntity();if(!t)return;const i=t.attributes.min??0,s=t.attributes.max??100,o=parseFloat(e.target.value),n=Math.max(i,Math.min(o,s)),a=this._config.entity.split(".")[0];this.callService(a,"set_value",{entity_id:this._config.entity,value:n})}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Number not found</p></div></ha-card>`;const t=parseFloat(e.state)||0,i=e.attributes.min??0,s=e.attributes.max??100,o=e.attributes.step??1,n=e.attributes.unit_of_measurement||"",a=!1!==this._config.show_name,r=!1!==this._config.show_state,c=!1!==this._config.show_icon,l=!1!==this._config.show_slider,h=this._config.icon||"mdi:ray-vertex";return W`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          <div class="number-header" role="button" tabindex="0" aria-label="${this.getName()}" @keydown=${this.handleKeyDown} @pointerdown=${this.handlePointerDown} @pointerup=${this.handlePointerUp} @pointercancel=${this.handlePointerCancel}>
            ${c?W`
                  <div class="number-icon-wrap">
                    <ha-icon class="sketch-icon" .icon=${h}></ha-icon>
                  </div>
                `:Q}
            <div class="sketch-col">
              ${a?W`<p class="sketch-name">${this.getName()}</p>`:Q}
              ${r?W`<p class="sketch-state">${t}${n?` ${n}`:""}</p>`:Q}
            </div>
          </div>
          ${l?W`
                <div class="number-slider-row">
                  <input
                    type="range"
                    class="sketch-slider"
                    min=${i}
                    max=${s}
                    step=${o}
                    .value=${String(t)}
                    @change=${this._setValue}
                  />
                  <span class="number-value">${t}${n?` ${n}`:""}</span>
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};St=e([de("sketch-number-card")],St);let Et=class extends Be{get _defaults(){return{show_icon:!0,multiline_secondary:!1,layout:"horizontal"}}get _schema(){return[{name:"entity",selector:{entity:{}}},{name:"primary",selector:{template:{}}},{name:"secondary",selector:{template:{}}},{type:"grid",name:"",schema:[{name:"icon",selector:{icon:{}}},{name:"icon_color",selector:{text:{}}}]},{name:"layout",selector:{select:{options:[{value:"horizontal",label:"Horizontal"},{value:"vertical",label:"Vertical"}],mode:"dropdown"}}},{name:"show_icon",selector:{boolean:{}}},{name:"multiline_secondary",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"badge_icon",selector:{icon:{}}},{name:"badge_color",selector:{text:{}}}]},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};Et=e([de("sketch-template-card-editor")],Et);let At=class extends Ne{constructor(){super(...arguments),this._primary="",this._secondary="",this._icon="",this._iconColor="",this._badgeIcon="",this._unsubs=[],this._subscribing=!1}static{this.styles=[...super.styles,a`
      .template-wrap {
        display: flex;
        gap: 14px;
        cursor: pointer;
      }
      .template-wrap.vertical {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .template-icon-wrap {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .template-icon-wrap ha-icon {
        --mdc-icon-size: var(--sketch-icon-lg, 44px);
        color: var(--sketch-ink-muted);
        transition: color 0.3s ease;
      }
      .template-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--sketch-danger, #f44336);
      }
      .template-badge ha-icon {
        --mdc-icon-size: 12px;
        color: var(--text-primary-color, #fff);
      }
      .template-info {
        flex: 1;
        min-width: 0;
      }
      .template-primary {
        font-family: var(--sketch-font);
        font-size: 1.3em;
        font-weight: 600;
        color: var(--sketch-ink);
        line-height: 1.3;
      }
      .template-secondary {
        font-family: var(--sketch-font-body);
        font-size: 0.95em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
        line-height: 1.5;
      }
      .template-secondary.multiline {
        white-space: normal;
        overflow: visible;
      }
      .template-secondary:not(.multiline) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `]}get _templateConfig(){return this._config}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}static getConfigElement(){return document.createElement("sketch-template-card-editor")}static getStubConfig(){return{primary:'{{ now().strftime("%-I:%M %p") }}',secondary:'{{ now().strftime("%A, %B %-d") }}',icon:"mdi:home"}}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._subscribeTemplates()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeAll()}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._subscribeTemplates()}_unsubscribeAll(){this._unsubs.forEach(e=>e()),this._unsubs=[]}async _subscribeTemplates(){if(!this.hass?.connection||this._subscribing)return;this._subscribing=!0,this._unsubscribeAll();const e=this._templateConfig;e.primary&&this._subscribeTemplate(e.primary,e=>{this._primary=e}),e.secondary&&this._subscribeTemplate(e.secondary,e=>{this._secondary=e}),e.icon&&e.icon.includes("{")?this._subscribeTemplate(e.icon,e=>{this._icon=e.trim()}):this._icon=e.icon||"",e.icon_color&&e.icon_color.includes("{")?this._subscribeTemplate(e.icon_color,e=>{this._iconColor=e.trim()}):this._iconColor=e.icon_color||"",e.badge_icon&&e.badge_icon.includes("{")?this._subscribeTemplate(e.badge_icon,e=>{this._badgeIcon=e.trim()}):this._badgeIcon=e.badge_icon||"",this._subscribing=!1}async _subscribeTemplate(e,t){try{const i=await this.hass.connection.subscribeMessage(e=>{void 0!==e.result&&t(String(e.result))},{type:"render_template",template:e,variables:{}});this._unsubs.push(i)}catch(i){t(e)}}_getIconColor(){return this._iconColor?{red:"var(--sketch-danger, #f44336)",green:"var(--sketch-success, #4caf50)",amber:"var(--sketch-warning, #ff9800)",orange:"var(--sketch-warning, #ff9800)",blue:"var(--sketch-primary, #4a6fa5)","deep-purple":"var(--sketch-deep-purple, #7c77b9)",cyan:"var(--sketch-cyan, #00bcd4)",disabled:"var(--sketch-ink-muted)"}[this._iconColor]||this._iconColor:"var(--sketch-ink-muted)"}render(){const e=this._templateConfig,t=e.layout||"horizontal",i=!1!==e.show_icon,s=!0===e.multiline_secondary,o=this._icon||e.icon||"mdi:text-box-outline",n=this._iconColor&&"disabled"!==this._iconColor&&"grey"!==this._iconColor;return W`
      <ha-card>
        ${this.renderSketchBg(400,200,!!n)}
        <div class="sketch-card-content">
          <div
            class="template-wrap ${"vertical"===t?"vertical":""}"
            role="button"
            tabindex="0"
            aria-label="${this._primary||"Template card"}"
            @keydown=${this.handleKeyDown}
            @pointerdown=${this.handlePointerDown}
            @pointerup=${this.handlePointerUp}
            @pointercancel=${this.handlePointerCancel}
          >
            ${i?W`
                  <div class="template-icon-wrap">
                    <ha-icon .icon=${o} style="color: ${this._getIconColor()}"></ha-icon>
                    ${this._badgeIcon?W`
                          <div class="template-badge" style="background: ${e.badge_color?this._resolveColor(e.badge_color):"var(--sketch-danger)"}">
                            <ha-icon .icon=${this._badgeIcon}></ha-icon>
                          </div>
                        `:Q}
                  </div>
                `:Q}
            <div class="template-info">
              ${this._primary?W`<div class="template-primary">${this._primary}</div>`:Q}
              ${this._secondary?W`<div class="template-secondary ${s?"multiline":""}">${this._secondary}</div>`:Q}
            </div>
          </div>
        </div>
      </ha-card>
    `}_resolveColor(e){return{red:"var(--sketch-danger, #f44336)",green:"var(--sketch-success, #4caf50)",amber:"var(--sketch-warning, #ff9800)",blue:"var(--sketch-primary, #4a6fa5)"}[e]||e}};e([ge()],At.prototype,"_primary",void 0),e([ge()],At.prototype,"_secondary",void 0),e([ge()],At.prototype,"_icon",void 0),e([ge()],At.prototype,"_iconColor",void 0),e([ge()],At.prototype,"_badgeIcon",void 0),At=e([de("sketch-template-card")],At);let Lt=class extends Be{get _defaults(){return{hours_to_show:24,show_labels:!0,line_width:2,fill:"fade"}}get _schema(){return[{name:"name",selector:{text:{}}},{name:"hours_to_show",selector:{number:{min:1,max:168,step:1,mode:"slider"}}},{name:"line_width",selector:{number:{min:1,max:5,step:.5,mode:"slider"}}},{name:"fill",selector:{select:{options:[{value:"fade",label:"Fade"},{value:"solid",label:"Solid"},{value:"none",label:"None"}],mode:"dropdown"}}},{name:"show_labels",selector:{boolean:{}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};Lt=e([de("sketch-history-graph-card-editor")],Lt);let zt=class extends le{constructor(){super(...arguments),this._histories=new Map}static{this.styles=[be,a`
      .graph-content {
        position: relative;
        z-index: 1;
        padding: clamp(12px, 3vw, 20px);
      }
      .graph-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .graph-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .graph-value {
        font-family: var(--sketch-font);
        font-size: 1.4em;
        font-weight: 700;
        color: var(--sketch-ink);
      }
      .graph-unit {
        font-size: 0.6em;
        font-weight: 400;
        color: var(--sketch-ink-muted);
      }
      .graph-svg {
        width: 100%;
        height: 60px;
        overflow: hidden;
      }
      .graph-line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .graph-fill {
        opacity: 0.15;
      }
      .graph-labels {
        display: flex;
        justify-content: space-between;
        font-family: var(--sketch-font);
        font-size: 0.7em;
        color: var(--sketch-ink-muted);
        margin-top: 4px;
      }
      .graph-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        font-style: italic;
      }
    `]}setConfig(e){if(!e.entities||!e.entities.length)throw new Error("Please define at least one entity");this._config={...e}}static getConfigElement(){return document.createElement("sketch-history-graph-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("sensor."));return{entities:[t[0]||"sensor.temperature"],hours_to_show:24}}getCardSize(){return 3}getLayoutOptions(){return{grid_columns:4,grid_rows:3}}connectedCallback(){super.connectedCallback(),this._fetchHistory(),this._fetchTimer=setInterval(()=>this._fetchHistory(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this._fetchTimer&&clearInterval(this._fetchTimer)}updated(e){super.updated(e),e.has("_config")&&(we(this,this._config),this._fetchHistory()),e.has("hass")&&this.hass&&this.classList.toggle("dark-mode",this.hass.themes?.darkMode??!1)}async _fetchHistory(){if(!this.hass||!this._config?.entities)return;const e=this._config.hours_to_show||24,t=new Date,i=new Date(t.getTime()-36e5*e);for(const s of this._config.entities)try{const o=(await this.hass.callWS({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:t.toISOString(),statistic_ids:[s],period:e<=6?"5minute":e<=48?"hour":"day",types:["mean"]}))[s];o?.length&&(this._histories=new Map(this._histories),this._histories.set(s,o.map(e=>e.mean??0)))}catch(e){try{const e=await(this.hass.callApi?.("GET",`history/period/${i.toISOString()}?filter_entity_id=${s}&end_time=${t.toISOString()}&minimal_response&no_attributes`));e?.[0]?.length&&(this._histories=new Map(this._histories),this._histories.set(s,e[0].map(e=>parseFloat(e.s)||0)))}catch(e){}}this.requestUpdate()}_getColorForValue(e){const t=this._config.color_thresholds;if(!t?.length)return"var(--sketch-primary)";let i=t[0].color;for(const s of t)e>=s.value&&(i=s.color);return i}_renderGraph(e,t,i){if(!t.length)return Q;const s=Math.min(...t),o=Math.max(...t)-s||1,n=t.map((e,i)=>({x:2+i/(t.length-1)*296,y:2+46*(1-(e-s)/o)}));let a=`M ${n[0].x} ${n[0].y}`;for(let e=1;e<n.length;e++)a+=` L ${n[e].x} ${n[e].y}`;const r=t[t.length-1],c=this._getColorForValue(r),l="none"!==this._config.fill,h=l?`${a} L ${n[n.length-1].x} 50 L ${n[0].x} 50 Z`:"";return K`
      ${l?K`<path d="${h}" class="graph-fill" fill="${c}" />`:Q}
      <path d="${a}" class="graph-line" stroke="${c}" stroke-width="${this._config.line_width||2}" />
    `}_renderSketchBg(){let e=0;const t=this._config?.entities?.[0]||"";for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i)|0;return e=Math.abs(e),W`${ye(je(400,200,{showBorder:!1!==this._config?.show_border,showTexture:!1!==this._config?.show_texture,variant:this._config?.variant||"paper",cornerRadius:this._config?.corner_radius??14,seed:e}))}`}render(){if(!this._config?.entities?.length)return W`<ha-card><div class="graph-content"><p class="sketch-name">No entities</p></div></ha-card>`;const e=this.hass?.states[this._config.entities[0]],t=this._config.name||e?.attributes?.friendly_name||this._config.entities[0],i=e?parseFloat(e.state):NaN,s=e?.attributes?.unit_of_measurement||"",o=this._config.hours_to_show||24,n=!1!==this._config.show_labels;return W`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="graph-content">
          <div class="graph-header">
            <span class="graph-name">${t}</span>
            ${isNaN(i)?Q:W`<span class="graph-value">${i.toFixed(1)}<span class="graph-unit">${s}</span></span>`}
          </div>
          ${this._config.entities.map((e,t)=>{const i=this._histories.get(e);return i?.length?W`
              <svg class="graph-svg" viewBox="0 0 300 50" preserveAspectRatio="none">
                ${this._renderGraph(e,i,t)}
              </svg>
            `:W`<div class="graph-empty">No history data</div>`})}
          ${n?W`
                <div class="graph-labels">
                  <span>${o}h ago</span>
                  <span>now</span>
                </div>
              `:Q}
        </div>
      </ha-card>
    `}};e([ue({attribute:!1})],zt.prototype,"hass",void 0),e([ge()],zt.prototype,"_config",void 0),e([ge()],zt.prototype,"_histories",void 0),zt=e([de("sketch-history-graph-card")],zt);let Pt=class extends Be{get _defaults(){return{show_name:!0,show_state:!0,show_icon:!0}}get _schema(){return[...De("binary_sensor")]}};Pt=e([de("sketch-room-card-editor")],Pt);let Tt=class extends Ne{static{this.styles=[...super.styles,a`
      .room-wrap {
        display: flex;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        min-height: 48px;
      }
      .room-icon-wrap {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .room-icon-wrap ha-icon {
        --mdc-icon-size: var(--sketch-icon-md);
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .room-icon-wrap.active ha-icon {
        color: var(--sketch-active, var(--sketch-primary));
      }
      .room-info {
        flex: 1;
        min-width: 0;
      }
      .room-name {
        font-family: var(--sketch-font);
        font-size: 1.2em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .room-status {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
      .room-sensors {
        display: flex;
        gap: 10px;
        flex-shrink: 0;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .room-sensor {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        color: var(--sketch-ink-muted);
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
      }
      .room-sensor ha-icon {
        --mdc-icon-size: 14px;
        color: var(--sketch-ink-muted);
      }
    `]}get _roomConfig(){return this._config}setConfig(e){super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-room-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("binary_sensor."));return{entity:t[0]||"binary_sensor.motion",name:"Room",icon:"mdi:sofa"}}getCardSize(){return 2}get defaultTapAction(){return"more-info"}render(){const e=this.getEntity(),t=!!e&&Ae(e.state),i=this._config.icon||"mdi:home",s=this.getName()||"Room",o=e?t?"Occupied":"Empty":"",n=this._roomConfig.sub_entities||[];return W`
      <ha-card>
        ${this.renderSketchBg(400,200,t)}
        <div class="sketch-card-content">
          <div
            class="room-wrap"
            role="button"
            tabindex="0"
            aria-label="${s}"
            @keydown=${this.handleKeyDown}
            @pointerdown=${this.handlePointerDown}
            @pointerup=${this.handlePointerUp}
            @pointercancel=${this.handlePointerCancel}
          >
            <div class="room-icon-wrap ${t?"active":""}">
              <ha-icon .icon=${i}></ha-icon>
            </div>
            <div class="room-info">
              <div class="room-name">${s}</div>
              ${o?W`<div class="room-status">${o}</div>`:Q}
            </div>
            ${n.length?W`
                  <div class="room-sensors">
                    ${n.map(e=>{const t=this.hass?.states[e.entity||""];return t?W`
                        <span class="room-sensor">
                          ${e.icon?W`<ha-icon .icon=${e.icon}></ha-icon>`:Q}
                          ${Le(t,this.hass)}
                        </span>
                      `:Q})}
                  </div>
                `:Q}
          </div>
        </div>
      </ha-card>
    `}};Tt=e([de("sketch-room-card")],Tt);let Mt=class extends Be{get _defaults(){return{show_name:!0,show_icon:!0}}get _schema(){return[...De("input_select")]}};Mt=e([de("sketch-select-card-editor")],Mt);let jt=class extends Ne{constructor(){super(...arguments),this._open=!1}static{this.styles=[...super.styles,a`
      .select-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      .select-icon-wrap {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .select-icon-wrap ha-icon {
        color: var(--sketch-ink-muted);
        transition: color 0.2s ease;
      }
      .select-info {
        flex: 1;
        min-width: 0;
      }
      .select-current {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
      }
      .select-chevron {
        --mdc-icon-size: 20px;
        color: var(--sketch-ink-muted);
        transition: transform 0.2s ease;
        flex-shrink: 0;
      }
      .select-chevron.open {
        transform: rotate(180deg);
      }
      .select-options {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .select-options.open {
        max-height: 500px;
      }
      .select-option {
        font-family: var(--sketch-font);
        font-size: 1em;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: var(--sketch-radius, 12px);
        color: var(--sketch-ink);
        transition: background 0.15s ease;
      }
      .select-option:hover {
        background: var(--sketch-hover-bg);
      }
      .select-option.active {
        color: var(--sketch-active, var(--sketch-primary));
        font-weight: 600;
      }
    `]}setConfig(e){if(!e.entity)throw new Error("Please define an entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-select-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("input_select.")||e.startsWith("select."));return{entity:t[0]||"input_select.example"}}getCardSize(){return 2}_toggleOpen(){this._open=!this._open}_selectOption(e){if(!this._config?.entity)return;const t=this._config.entity.split(".")[0];this.callService(t,"select_option",{entity_id:this._config.entity,option:e}),this._open=!1}render(){const e=this.getEntity();if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content"><p class="sketch-name">Entity not found</p></div></ha-card>`;const t=this.getName(),i=e.state,s=e.attributes.options||[],o=this._config.icon||e.attributes.icon||"mdi:format-list-bulleted",n=!1!==this._config.show_icon,a=!1!==this._config.show_name;return W`
      <ha-card>
        ${this.renderSketchBg()}
        <div class="sketch-card-content">
          <div
            class="select-header"
            role="button"
            tabindex="0"
            aria-label="${t}"
            @click=${this._toggleOpen}
            @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleOpen())}}
          >
            ${n?W`
                  <div class="select-icon-wrap">
                    <ha-icon .icon=${o}></ha-icon>
                  </div>
                `:Q}
            <div class="select-info">
              ${a?W`<p class="sketch-name">${t}</p>`:Q}
              <div class="select-current">${i}</div>
            </div>
            <ha-icon class="select-chevron ${this._open?"open":""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="select-options ${this._open?"open":""}">
            ${s.map(e=>W`
                <div
                  class="select-option ${e===i?"active":""}"
                  role="option"
                  aria-selected="${e===i}"
                  @click=${()=>this._selectOption(e)}
                >
                  ${e}
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}};e([ge()],jt.prototype,"_open",void 0),jt=e([de("sketch-select-card")],jt);let Ot=class extends Be{get _defaults(){return{show_name:!0,show_icon:!0,max:100}}get _schema(){return[...De("sensor"),{name:"max",selector:{number:{min:1,max:1e6,step:1,mode:"box"}}}]}};function Nt(e,t){const i=49297*Math.sin(9301*e+49297*t+233280);return i-Math.floor(i)-.5}Ot=e([de("sketch-progress-card-editor")],Ot);let Bt=class extends Ne{static{this.styles=[...super.styles,a`
      .progress-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        overflow: hidden;
      }
      .progress-svg {
        width: 140px;
        height: 140px;
      }
      .progress-label {
        font-family: var(--sketch-font);
        font-size: 2em;
        font-weight: 700;
        fill: var(--sketch-ink);
      }
      .progress-sub {
        font-family: var(--sketch-font);
        font-size: 0.65em;
        fill: var(--sketch-ink-muted);
      }
      .progress-name {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
        margin-top: 8px;
      }
      .progress-value {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
    `]}get _progressConfig(){return this._config}setConfig(e){if(!e.entity)throw new Error("Please define an entity");super.setConfig(e)}static getConfigElement(){return document.createElement("sketch-progress-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(e=>e.startsWith("sensor."));return{entity:t[0]||"sensor.steps",max:1e4}}getCardSize(){return 4}getLayoutOptions(){return{grid_columns:4,grid_rows:4}}_getColor(e){const t=this._progressConfig.color_thresholds;if(t?.length){let i=t[0].color;for(const s of t)e>=s.value&&(i=s.color);return i}return e>=100?"var(--sketch-success, #4caf50)":e>=60?"var(--sketch-primary, #4a6fa5)":"var(--sketch-ink-muted)"}_renderArc(e,t){const i=360*ze(e/100,0,1),s=this._getColor(e),o=[],n=[];for(let e=0;e<=72;e++){const s=e/72*Math.PI*2-Math.PI/2,a=1.5*Nt(t,e),r=70+(56+a)*Math.cos(s),c=70+(56+a)*Math.sin(s);if(o.push(`${r.toFixed(1)},${c.toFixed(1)}`),e/72*360<=i){const i=2*Nt(t+100,e),o=70+(56+i)*Math.cos(s),a=70+(56+i)*Math.sin(s);n.push(`${o.toFixed(1)},${a.toFixed(1)}`)}}return K`
      <polyline
        points="${o.join(" ")}"
        fill="none"
        stroke="var(--sketch-ink-light)"
        stroke-width="${8}"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.3"
      />
      ${n.length>1?K`<polyline
            points="${n.join(" ")}"
            fill="none"
            stroke="${s}"
            stroke-width="${10}"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.8"
          />`:Q}
      <text x="${70}" y="${68}" text-anchor="middle" dominant-baseline="middle" class="progress-label">
        ${Math.round(e)}%
      </text>
      <text x="${70}" y="${88}" text-anchor="middle" dominant-baseline="middle" class="progress-sub">
        ${this._progressConfig.max?`/ ${this._progressConfig.max.toLocaleString()}`:""}
      </text>
    `}render(){const e=this.getEntity();if(!e)return W`<ha-card><div class="sketch-card-content sketch-empty"><ha-icon icon="mdi:chart-arc"></ha-icon><span>Entity not found</span></div></ha-card>`;const t=parseFloat(e.state)||0,i=ze(t/(this._progressConfig.max||100)*100,0,100),s=this.getName();this._config.icon;let o=0;const n=this._config.entity||"";for(let e=0;e<n.length;e++)o=(o<<5)-o+n.charCodeAt(e)|0;return o=Math.abs(o),W`
      <ha-card>
        ${this.renderSketchBg(400,200,i>=100)}
        <div class="sketch-card-content progress-content"
          role="button" tabindex="0" aria-label="${s}"
          @keydown=${this.handleKeyDown}
          @pointerdown=${this.handlePointerDown}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerCancel}
        >
          <svg class="progress-svg" viewBox="0 0 140 140">
            ${this._renderArc(i,o)}
          </svg>
          <div class="progress-name">${s}</div>
          <div class="progress-value">${t.toLocaleString()} ${e.attributes.unit_of_measurement||""}</div>
        </div>
      </ha-card>
    `}};Bt=e([de("sketch-progress-card")],Bt);let Dt=class extends Be{get _defaults(){return{hours_to_show:4,max_entries:8}}get _schema(){return[{name:"name",selector:{text:{}}},{name:"hours_to_show",selector:{number:{min:1,max:48,step:1,mode:"slider"}}},{name:"max_entries",selector:{number:{min:1,max:20,step:1,mode:"slider"}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};Dt=e([de("sketch-timeline-card-editor")],Dt);let Ut=class extends le{constructor(){super(...arguments),this._events=[]}static{this.styles=[be,a`
      ha-card {
        overflow: hidden;
      }
      .timeline-content {
        position: relative;
        z-index: 1;
        padding: clamp(12px, 3vw, 20px);
      }
      .timeline-title {
        font-family: var(--sketch-font);
        font-size: 1.1em;
        font-weight: 600;
        color: var(--sketch-ink);
        margin-bottom: 12px;
      }
      .timeline-list {
        position: relative;
        padding-left: 24px;
      }
      .timeline-line {
        position: absolute;
        left: 7px;
        top: 4px;
        bottom: 4px;
        width: 2px;
        background: var(--sketch-ink-light);
        border-radius: 1px;
      }
      .timeline-entry {
        position: relative;
        padding: 4px 0 12px 0;
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .timeline-dot {
        position: absolute;
        left: -21px;
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--sketch-primary);
        border: 2px solid var(--sketch-card-bg, var(--ha-card-background, #faf7f0));
        flex-shrink: 0;
        z-index: 1;
      }
      .timeline-icon {
        --mdc-icon-size: 16px;
        color: var(--sketch-ink-muted);
        flex-shrink: 0;
        margin-top: 1px;
      }
      .timeline-text {
        flex: 1;
        min-width: 0;
      }
      .timeline-desc {
        font-family: var(--sketch-font);
        font-size: 0.95em;
        color: var(--sketch-ink);
        line-height: 1.3;
      }
      .timeline-time {
        font-family: var(--sketch-font);
        font-size: 0.75em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        margin-top: 2px;
      }
      .timeline-empty {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
        font-style: italic;
        text-align: center;
        padding: 16px;
      }
    `]}setConfig(e){if(!e.entities?.length)throw new Error("Please define at least one entity");this._config={...e}}static getConfigElement(){return document.createElement("sketch-timeline-card-editor")}static getStubConfig(e){return{entities:Object.keys(e.states).slice(0,3),hours_to_show:4,max_entries:8,name:"Activity"}}getCardSize(){return 4}getLayoutOptions(){return{grid_columns:4,grid_rows:4}}connectedCallback(){super.connectedCallback(),this._fetchEvents(),this._fetchTimer=setInterval(()=>this._fetchEvents(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._fetchTimer&&clearInterval(this._fetchTimer)}updated(e){super.updated(e),e.has("_config")&&(we(this,this._config),this._fetchEvents()),e.has("hass")&&this.hass&&this.classList.toggle("dark-mode",this.hass.themes?.darkMode??!1)}async _fetchEvents(){if(!this.hass||!this._config?.entities?.length)return;const e=this._config.hours_to_show||4,t=this._config.max_entries||8,i=new Date,s=new Date(i.getTime()-36e5*e);try{const e=await this.hass.callWS({type:"logbook/get_events",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:this._config.entities});Array.isArray(e)&&(this._events=e.filter(e=>e.entity_id&&this._config.entities.includes(e.entity_id)).map(e=>({time:new Date(e.when),entity_id:e.entity_id,state:e.state||"",name:e.name||e.entity_id,icon:this._getIconForEntity(e.entity_id)})).sort((e,t)=>t.time.getTime()-e.time.getTime()).slice(0,t))}catch(e){this._events=[]}this.requestUpdate()}_getIconForEntity(e){const t=this.hass?.states[e];if(t?.attributes?.icon)return t.attributes.icon;if(t)return xe(t);return{binary_sensor:"mdi:checkbox-blank-circle-outline",light:"mdi:lightbulb",switch:"mdi:toggle-switch",lock:"mdi:lock",cover:"mdi:window-closed",sensor:"mdi:eye"}[e.split(".")[0]]||"mdi:circle-small"}_formatTime(e){const t=(new Date).getTime()-e.getTime(),i=Math.floor(t/6e4);if(i<1)return"just now";if(i<60)return`${i}m ago`;return`${Math.floor(i/60)}h ${i%60}m ago`}_renderSketchBg(){let e=0;const t=this._config?.entities?.[0]||"timeline";for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i)|0;return e=Math.abs(e),W`${ye(je(400,300,{showBorder:!1!==this._config?.show_border,showTexture:!1!==this._config?.show_texture,variant:this._config?.variant||"notebook",cornerRadius:this._config?.corner_radius??14,seed:e}))}`}render(){const e=this._config?.name||"Activity";return W`
      <ha-card>
        ${this._renderSketchBg()}
        <div class="timeline-content">
          <div class="timeline-title">${e}</div>
          ${this._events.length?W`
                <div class="timeline-list">
                  <div class="timeline-line"></div>
                  ${this._events.map((e,t)=>{const i=Math.max(.35,1-.08*t);return W`
                        <div class="timeline-entry" style="opacity: ${i}">
                          <div class="timeline-dot"></div>
                          <ha-icon class="timeline-icon" .icon=${e.icon}></ha-icon>
                          <div class="timeline-text">
                            <div class="timeline-desc">${e.name}: ${e.state}</div>
                            <div class="timeline-time">${this._formatTime(e.time)}</div>
                          </div>
                        </div>
                      `})}
                </div>
              `:W`<div class="timeline-empty">No recent activity</div>`}
        </div>
      </ha-card>
    `}};e([ue({attribute:!1})],Ut.prototype,"hass",void 0),e([ge()],Ut.prototype,"_config",void 0),e([ge()],Ut.prototype,"_events",void 0),Ut=e([de("sketch-timeline-card")],Ut);class Ht extends _e{}Ht.directiveName="unsafeSVG",Ht.resultType=2;const It=ve(Ht);let Ft=class extends Be{get _defaults(){return{}}get _schema(){return[{name:"name",selector:{text:{}}},{name:"temperature_entity",selector:{entity:{domain:"sensor"}}},{name:"room_select_entity",selector:{entity:{domain:"input_select"}}},{type:"expandable",title:"Appearance",schema:[{type:"grid",name:"",schema:[{name:"color",selector:{ui_color:{}}},{name:"card_background",selector:{ui_color:{}}}]},{name:"border_color",selector:{ui_color:{}}},{name:"variant",selector:{select:{options:[{value:"paper",label:"Paper (default)"},{value:"notebook",label:"Notebook"},{value:"sticky",label:"Sticky Note"}],mode:"dropdown"}}},{name:"card_rotation",selector:{text:{}}},{name:"corner_radius",selector:{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}}},{name:"show_border",selector:{boolean:{}}},{name:"show_texture",selector:{boolean:{}}}]}]}};Ft=e([de("sketch-tog-card-editor")],Ft);const Rt=[{label:"0.5 TOG",range:"24–27°C",min:24,max:27,color:"#fb923c"},{label:"1.0 TOG",range:"20–24°C",min:20,max:24,color:"#4ade80"},{label:"2.5 TOG",range:"17–20°C",min:17,max:20,color:"#38bdf8"}];let Wt=class extends Ne{constructor(){super(...arguments),this._expanded=!1}static{this.styles=[...super.styles,a`
      .tog-room-select {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .tog-room-select ha-icon {
        --mdc-icon-size: 18px;
        color: var(--sketch-ink-muted);
      }
      .tog-room-select select {
        flex: 1;
        font-family: var(--sketch-font-body);
        font-size: 0.95em;
        padding: 6px 10px;
        border: 1.5px solid var(--sketch-ink-light);
        border-radius: var(--sketch-radius, 12px);
        background: transparent;
        color: var(--sketch-ink);
        cursor: pointer;
        outline: none;
      }
      .tog-room-select select:focus-visible {
        border-color: var(--sketch-primary);
      }
      .tog-temp-strip {
        width: 100%;
        height: 24px;
        margin: 8px 0 4px;
      }
      .tog-main {
        text-align: center;
        padding: 8px 0;
      }
      .tog-condition {
        font-family: var(--sketch-font);
        font-size: 0.7em;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--sketch-ink-muted);
      }
      .tog-temp {
        font-family: var(--sketch-font);
        font-size: 2.8em;
        font-weight: 700;
        color: var(--sketch-ink);
        line-height: 1;
        margin: 4px 0;
      }
      .tog-temp-unit {
        font-size: 0.4em;
        font-weight: 400;
        color: var(--sketch-ink-muted);
      }
      .tog-rating {
        font-family: var(--sketch-font);
        font-size: 1.8em;
        font-weight: 700;
        line-height: 1;
        margin: 8px 0;
      }
      .tog-headline {
        font-family: var(--sketch-font);
        font-size: 0.9em;
        color: var(--sketch-ink-muted);
      }
      .tog-clothing {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin: 16px 0 8px;
      }
      .tog-clothing-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 64px;
      }
      .tog-clothing-svg {
        width: 40px;
        height: 44px;
        color: var(--sketch-ink);
      }
      .tog-clothing-label {
        font-family: var(--sketch-font);
        font-size: 0.65em;
        color: var(--sketch-ink-muted);
        text-align: center;
        line-height: 1.2;
      }
      .tog-divider {
        border: none;
        border-top: 1px dashed var(--sketch-ink-light);
        margin: 8px 0;
        opacity: 0.5;
      }
      .tog-pills {
        display: flex;
        gap: 6px;
        margin-top: 8px;
      }
      .tog-pill {
        flex: 1;
        text-align: center;
        padding: 6px 4px;
        border-radius: var(--sketch-radius, 12px);
        border: 1px solid var(--sketch-ink-light);
        opacity: 0.3;
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }
      .tog-pill.active {
        opacity: 1;
      }
      .tog-pill-label {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        font-weight: 700;
      }
      .tog-pill-range {
        font-family: var(--sketch-font);
        font-size: 0.6em;
        color: var(--sketch-ink-muted);
        margin-top: 2px;
      }
      .tog-expand-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        cursor: pointer;
        padding: 4px;
        margin-top: 4px;
      }
      .tog-expand-btn ha-icon {
        --mdc-icon-size: 16px;
        transition: transform 0.2s ease;
      }
      .tog-expand-btn.open ha-icon {
        transform: rotate(180deg);
      }
      .tog-all-options {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .tog-all-options.open {
        max-height: 400px;
      }
      .tog-option-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        opacity: 0.4;
      }
      .tog-option-row.active {
        opacity: 1;
      }
      .tog-option-tog {
        font-family: var(--sketch-font);
        font-size: 0.85em;
        font-weight: 700;
        min-width: 55px;
      }
      .tog-option-desc {
        font-family: var(--sketch-font);
        font-size: 0.8em;
        color: var(--sketch-ink-muted);
        flex: 1;
      }
      .tog-edge {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        font-family: var(--sketch-font);
        font-size: 0.6em;
        color: var(--sketch-ink-muted);
        opacity: 0.6;
      }
    `]}get _togConfig(){return this._config}setConfig(e){if(!e.temperature_entity)throw new Error("Please define temperature_entity");this._config={...e}}static getConfigElement(){return document.createElement("sketch-tog-card-editor")}static getStubConfig(e){const t=Object.keys(e.states).filter(t=>t.startsWith("sensor.")&&"°C"===e.states[t].attributes.unit_of_measurement);return{temperature_entity:t[0]||"sensor.temperature",name:"Baby Sleep Guide"}}getCardSize(){return 6}getLayoutOptions(){return{grid_columns:4,grid_rows:6}}_onRoomChange(e){const t=e.target,i=this._togConfig.room_select_entity;if(!i)return;const s=i.split(".")[0];this.callService(s,"select_option",{entity_id:i,option:t.value})}render(){const e=this.hass?.states[this._togConfig.temperature_entity];if(!e)return W`<ha-card>${this.renderSketchBg()}<div class="sketch-card-content sketch-empty"><ha-icon icon="mdi:baby-face-outline"></ha-icon><span>Temperature entity not found</span></div></ha-card>`;const t=parseFloat(e.state)||20,i=function(e){return e>=27?{tog:"0.2",bucket:"very_light",headline:"Very Light",risk:"hot",clothing:["Nappy only","Skip sleep bag"],color:"var(--sketch-danger, #f44336)"}:e>=24?{tog:"0.5",bucket:"light",headline:"Light Layers",risk:"warm",clothing:["Short-sleeve bodysuit","0.5 TOG sleep bag"],color:"#fb923c"}:e>=22?{tog:"1.0",bucket:"balanced",headline:"Balanced",risk:"comfortable",clothing:["Long-sleeve bodysuit","1.0 TOG sleep bag"],color:"var(--sketch-success, #4caf50)"}:e>=20?{tog:"1.0–2.5",bucket:"transitional",headline:"Comfortable",risk:"comfortable",clothing:["Long-sleeve bodysuit","Sleepsuit or singlet","1.0 or 2.5 TOG sleep bag"],color:"var(--sketch-success, #4caf50)"}:e>=17?{tog:"2.5",bucket:"warm",headline:"Warm Layers",risk:"cool",clothing:["Long-sleeve bodysuit","Warm sleepsuit","2.5 TOG sleep bag"],color:"#38bdf8"}:{tog:"3.5",bucket:"extra_warm",headline:"Extra Warm",risk:"cold",clothing:["Thermal bodysuit","Warm sleepsuit","3.5 TOG sleep bag"],color:"#818cf8"}}(t),s=this._togConfig.name||"Baby Sleep Guide",o=this._togConfig.room_select_entity?this.hass?.states[this._togConfig.room_select_entity]:null,n=o?.attributes?.options||[],a=o?.state||"",r=ze((t-14)/15*100,1,99);let c=0;const l=this._togConfig.temperature_entity;for(let e=0;e<l.length;e++)c=(c<<5)-c+l.charCodeAt(e)|0;c=Math.abs(c);return W`
      <ha-card>
        ${this.renderSketchBg(400,300,!1)}
        <div class="sketch-card-content">
          <p class="sketch-name">${s}</p>

          ${o?W`
                <div class="tog-room-select">
                  <ha-icon icon="mdi:door-open"></ha-icon>
                  <select @change=${this._onRoomChange} aria-label="Select room">
                    ${n.map(e=>W`<option value="${e}" ?selected=${e===a}>${e}</option>`)}
                  </select>
                </div>
              `:Q}

          <svg class="tog-temp-strip" viewBox="0 0 200 20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tog-grad">
                <stop offset="0%" stop-color="#818cf8"/>
                <stop offset="18%" stop-color="#60a5fa"/>
                <stop offset="42%" stop-color="#34d399"/>
                <stop offset="68%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#f87171"/>
              </linearGradient>
            </defs>
            <rect x="4" y="8" width="192" height="4" rx="2" fill="url(#tog-grad)" opacity="0.7"/>
            <circle cx="${4+1.92*r}" cy="10" r="6" fill="${i.color}" stroke="var(--sketch-card-bg, var(--ha-card-background, #faf7f0))" stroke-width="2"/>
          </svg>

          <div class="tog-main">
            <div class="tog-condition">${i.headline}${a?` · ${a}`:""}</div>
            <div class="tog-temp">${t.toFixed(1)}<span class="tog-temp-unit">°C</span></div>
            <div class="tog-rating" style="color: ${i.color}">${i.tog} TOG</div>
          </div>

          <div class="tog-clothing">
            ${i.clothing.map((e,t)=>W`
              <div class="tog-clothing-item">
                <svg class="tog-clothing-svg" viewBox="0 0 40 44">${It(function(e,t){const i=(e,t)=>1.2*(49297*Math.sin(9301*e+49297*t)%1-.5),s="var(--sketch-ink, #2a2a2a)",o='stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"',n=e.toLowerCase();return n.includes("short")&&(n.includes("bodysuit")||n.includes("sleeve")||n.includes("vest"))?`<path d="M ${20+i(t,0)} ${10+i(t,1)} L ${14+i(t,2)} ${14+i(t,3)} L ${8+i(t,4)} ${12+i(t,5)} L ${11+i(t,6)} ${6+i(t,7)} L ${15+i(t,8)} ${3+i(t,9)} L ${25+i(t,10)} ${3+i(t,11)} L ${29+i(t,12)} ${6+i(t,13)} L ${32+i(t,14)} ${12+i(t,15)} L ${26+i(t,16)} ${14+i(t,17)} L ${20+i(t,18)} ${10+i(t,19)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${14+i(t,20)} ${14+i(t,21)} L ${14+i(t,22)} ${34+i(t,23)} L ${17+i(t,24)} ${38+i(t,25)} L ${23+i(t,26)} ${38+i(t,27)} L ${26+i(t,28)} ${34+i(t,29)} L ${26+i(t,30)} ${14+i(t,31)}" fill="none" stroke="${s}" ${o}/>`:n.includes("long")&&(n.includes("bodysuit")||n.includes("sleeve"))?`<path d="M ${20+i(t,0)} ${10+i(t,1)} L ${12+i(t,2)} ${16+i(t,3)} L ${4+i(t,4)} ${14+i(t,5)} L ${3+i(t,40)} ${12+i(t,41)} L ${5+i(t,42)} ${11+i(t,43)} L ${10+i(t,6)} ${14+i(t,7)} L ${10+i(t,44)} ${6+i(t,45)} L ${15+i(t,8)} ${3+i(t,9)} L ${25+i(t,10)} ${3+i(t,11)} L ${30+i(t,46)} ${6+i(t,47)} L ${30+i(t,12)} ${14+i(t,13)} L ${35+i(t,48)} ${11+i(t,49)} L ${37+i(t,50)} ${12+i(t,51)} L ${36+i(t,14)} ${14+i(t,15)} L ${28+i(t,16)} ${16+i(t,17)} L ${20+i(t,18)} ${10+i(t,19)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${12+i(t,20)} ${16+i(t,21)} L ${12+i(t,22)} ${34+i(t,23)} L ${16+i(t,24)} ${38+i(t,25)} L ${24+i(t,26)} ${38+i(t,27)} L ${28+i(t,28)} ${34+i(t,29)} L ${28+i(t,30)} ${16+i(t,31)}" fill="none" stroke="${s}" ${o}/>`:n.includes("bodysuit")||n.includes("vest")?`<path d="M ${20+i(t,0)} ${10+i(t,1)} L ${14+i(t,2)} ${14+i(t,3)} L ${8+i(t,4)} ${12+i(t,5)} L ${11+i(t,6)} ${6+i(t,7)} L ${15+i(t,8)} ${3+i(t,9)} L ${25+i(t,10)} ${3+i(t,11)} L ${29+i(t,12)} ${6+i(t,13)} L ${32+i(t,14)} ${12+i(t,15)} L ${26+i(t,16)} ${14+i(t,17)} L ${20+i(t,18)} ${10+i(t,19)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${14+i(t,20)} ${14+i(t,21)} L ${14+i(t,22)} ${34+i(t,23)} L ${17+i(t,24)} ${38+i(t,25)} L ${23+i(t,26)} ${38+i(t,27)} L ${26+i(t,28)} ${34+i(t,29)} L ${26+i(t,30)} ${14+i(t,31)}" fill="none" stroke="${s}" ${o}/>`:n.includes("sleepsuit")||n.includes("romper")?`<path d="M ${15+i(t,0)} ${4+i(t,1)} L ${25+i(t,2)} ${4+i(t,3)} L ${28+i(t,4)} ${7+i(t,5)} L ${30+i(t,6)} ${18+i(t,7)} L ${30+i(t,8)} ${28+i(t,9)} L ${29+i(t,10)} ${34+i(t,11)} C ${29+i(t,32)} ${38+i(t,33)} ${25+i(t,34)} ${40+i(t,35)} ${23+i(t,12)} ${39+i(t,13)} L ${22+i(t,14)} ${30+i(t,15)} L ${20+i(t,16)} ${28+i(t,17)} L ${18+i(t,18)} ${30+i(t,19)} L ${17+i(t,36)} ${39+i(t,37)} C ${15+i(t,38)} ${40+i(t,39)} ${11+i(t,40)} ${38+i(t,41)} ${11+i(t,42)} ${34+i(t,43)} L ${10+i(t,24)} ${28+i(t,25)} L ${10+i(t,26)} ${18+i(t,27)} L ${12+i(t,28)} ${7+i(t,29)} Z" fill="none" stroke="${s}" ${o}/>\n    <line x1="${10+i(t,44)}" y1="${28+i(t,45)}" x2="${30+i(t,46)}" y2="${28+i(t,47)}" stroke="${s}" stroke-width="0.8" opacity="0.4"/>`:n.includes("sleep bag")||n.includes("tog")?`<path d="M ${14+i(t,0)} ${6+i(t,1)} C ${14+i(t,2)} ${3+i(t,3)} ${26+i(t,4)} ${3+i(t,5)} ${26+i(t,6)} ${6+i(t,7)} L ${28+i(t,8)} ${12+i(t,9)} L ${30+i(t,10)} ${30+i(t,11)} C ${30+i(t,12)} ${36+i(t,13)} ${26+i(t,14)} ${40+i(t,15)} ${20+i(t,16)} ${40+i(t,17)} C ${14+i(t,18)} ${40+i(t,19)} ${10+i(t,20)} ${36+i(t,21)} ${10+i(t,22)} ${30+i(t,23)} L ${12+i(t,24)} ${12+i(t,25)} Z" fill="none" stroke="${s}" ${o}/>\n    <line x1="${16+i(t,26)}" y1="${6+i(t,27)}" x2="${16+i(t,28)}" y2="${12+i(t,29)}" stroke="${s}" stroke-width="0.8" opacity="0.5"/>\n    <line x1="${24+i(t,30)}" y1="${6+i(t,31)}" x2="${24+i(t,32)}" y2="${12+i(t,33)}" stroke="${s}" stroke-width="0.8" opacity="0.5"/>`:n.includes("nappy")||n.includes("diaper")?`<path d="M ${12+i(t,0)} ${16+i(t,1)} L ${28+i(t,2)} ${16+i(t,3)} L ${30+i(t,4)} ${22+i(t,5)} C ${30+i(t,6)} ${30+i(t,7)} ${24+i(t,8)} ${34+i(t,9)} ${20+i(t,10)} ${34+i(t,11)} C ${16+i(t,12)} ${34+i(t,13)} ${10+i(t,14)} ${30+i(t,15)} ${10+i(t,16)} ${22+i(t,17)} Z" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${18+i(t,18)} ${16+i(t,19)} L ${18+i(t,20)} ${20+i(t,21)}" stroke="${s}" stroke-width="0.8" opacity="0.4"/>\n    <path d="M ${22+i(t,22)} ${16+i(t,23)} L ${22+i(t,24)} ${20+i(t,25)}" stroke="${s}" stroke-width="0.8" opacity="0.4"/>`:n.includes("singlet")||n.includes("undershirt")?`<path d="M ${16+i(t,0)} ${4+i(t,1)} L ${17+i(t,2)} ${2+i(t,3)} L ${19+i(t,4)} ${2+i(t,5)} L ${17+i(t,6)} ${8+i(t,7)} L ${14+i(t,8)} ${12+i(t,9)} L ${14+i(t,10)} ${34+i(t,11)} L ${26+i(t,12)} ${34+i(t,13)} L ${26+i(t,14)} ${12+i(t,15)} L ${23+i(t,16)} ${8+i(t,17)} L ${21+i(t,18)} ${2+i(t,19)} L ${23+i(t,20)} ${2+i(t,21)} L ${24+i(t,22)} ${4+i(t,23)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${17+i(t,24)} ${8+i(t,25)} C ${19+i(t,26)} ${12+i(t,27)} ${21+i(t,28)} ${12+i(t,29)} ${23+i(t,30)} ${8+i(t,31)}" fill="none" stroke="${s}" stroke-width="0.8" opacity="0.5"/>`:n.includes("thermal")?`<path d="M ${20+i(t,0)} ${10+i(t,1)} L ${12+i(t,2)} ${16+i(t,3)} L ${4+i(t,4)} ${14+i(t,5)} L ${3+i(t,6)} ${12+i(t,7)} L ${5+i(t,8)} ${11+i(t,9)} L ${10+i(t,10)} ${14+i(t,11)} L ${10+i(t,12)} ${6+i(t,13)} L ${15+i(t,14)} ${3+i(t,15)} L ${25+i(t,16)} ${3+i(t,17)} L ${30+i(t,18)} ${6+i(t,19)} L ${30+i(t,20)} ${14+i(t,21)} L ${35+i(t,22)} ${11+i(t,23)} L ${37+i(t,24)} ${12+i(t,25)} L ${36+i(t,26)} ${14+i(t,27)} L ${28+i(t,28)} ${16+i(t,29)} L ${20+i(t,30)} ${10+i(t,31)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${12+i(t,32)} ${16+i(t,33)} L ${12+i(t,34)} ${34+i(t,35)} L ${16+i(t,36)} ${38+i(t,37)} L ${24+i(t,38)} ${38+i(t,39)} L ${28+i(t,40)} ${34+i(t,41)} L ${28+i(t,42)} ${16+i(t,43)}" fill="none" stroke="${s}" ${o}/>\n    <path d="M ${14+i(t,44)} ${18+i(t,45)} L ${26+i(t,46)} ${18+i(t,47)}" stroke="${s}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>\n    <path d="M ${14+i(t,48)} ${24+i(t,49)} L ${26+i(t,50)} ${24+i(t,51)}" stroke="${s}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>\n    <path d="M ${14+i(t,52)} ${30+i(t,53)} L ${26+i(t,54)} ${30+i(t,55)}" stroke="${s}" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 2"/>`:`<rect x="${12+i(t,0)}" y="${8+i(t,1)}" width="${16+i(t,2)}" height="${24+i(t,3)}" rx="3" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round"/>`}(e,c+37*t))}</svg>
                <span class="tog-clothing-label">${e}</span>
              </div>
            `)}
          </div>

          <hr class="tog-divider"/>

          <div class="tog-pills">
            ${Rt.map(e=>{const i=t>=e.min&&t<e.max;return W`
                <div class="tog-pill ${i?"active":""}" style="${i?`border-color: ${e.color}; background: ${e.color}1a;`:""}">
                  <div class="tog-pill-label" style="${i?`color: ${e.color}`:""}">${e.label}</div>
                  <div class="tog-pill-range">${e.range}</div>
                </div>
              `})}
          </div>

          <div class="tog-edge">
            <span>☀ 0.2 TOG · above 27°C</span>
            <span>❄ 3.5 TOG · below 17°C</span>
          </div>

          <div class="tog-expand-btn ${this._expanded?"open":""}" @click=${()=>{this._expanded=!this._expanded}} role="button" tabindex="0" @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._expanded=!this._expanded)}}>
            <span>${this._expanded?"Hide all options":"Show all options"}</span>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </div>

          <div class="tog-all-options ${this._expanded?"open":""}">
            ${[{tog:"0.2",range:"27°C+",desc:"Nappy only",risk:"hot",color:"#f87171"},{tog:"0.5",range:"24–27°C",desc:"Short-sleeve bodysuit",risk:"warm",color:"#fb923c"},{tog:"1.0",range:"22–24°C",desc:"Long-sleeve bodysuit + sleep bag",risk:"comfortable",color:"#4ade80"},{tog:"1.0–2.5",range:"20–22°C",desc:"Bodysuit + sleepsuit + sleep bag",risk:"comfortable",color:"#4ade80"},{tog:"2.5",range:"17–20°C",desc:"Warm sleepsuit + sleep bag",risk:"cool",color:"#38bdf8"},{tog:"3.5",range:"<17°C",desc:"Thermal + sleepsuit + sleep bag",risk:"cold",color:"#818cf8"}].map(e=>{const t=e.tog===i.tog;return W`
                <div class="tog-option-row ${t?"active":""}">
                  <span class="tog-option-tog" style="color: ${e.color}">${e.tog} TOG</span>
                  <span class="tog-option-desc">${e.range} · ${e.desc}</span>
                </div>
              `})}
          </div>
        </div>
      </ha-card>
    `}};e([ge()],Wt.prototype,"_expanded",void 0),Wt=e([de("sketch-tog-card")],Wt),window.customCards=window.customCards||[],window.customCards.push({type:"sketch-entity-card",name:"Sketch Entity Card",description:"Hand-drawn style entity state display with icon, name, and state badge",preview:!0},{type:"sketch-button-card",name:"Sketch Button Card",description:"Sketchbook-style button for toggling entities or triggering actions",preview:!0},{type:"sketch-light-card",name:"Sketch Light Card",description:"Light control card with brightness slider in hand-drawn aesthetic",preview:!0},{type:"sketch-thermostat-card",name:"Sketch Thermostat Card",description:"Climate control card with temperature display and HVAC mode selection",preview:!0},{type:"sketch-weather-card",name:"Sketch Weather Card",description:"Current weather conditions and forecast in sketchbook style",preview:!0},{type:"sketch-sensor-card",name:"Sketch Sensor Card",description:"Sensor value display with sparkline graph in hand-drawn look",preview:!0},{type:"sketch-media-player-card",name:"Sketch Media Player Card",description:"Media player controls with artwork display in sketch aesthetic",preview:!0},{type:"sketch-cover-card",name:"Sketch Cover Card",description:"Blinds/cover control with position slider in hand-drawn style",preview:!0},{type:"sketch-alarm-panel-card",name:"Sketch Alarm Panel Card",description:"Alarm system keypad with arm/disarm controls in sketchbook design",preview:!0},{type:"sketch-clock-card",name:"Sketch Clock Card",description:"Analog and digital clock with date display (no entity required)",preview:!0},{type:"sketch-chip-card",name:"Sketch Chip Card",description:"Compact pills for quick actions, scene triggers, and status indicators",preview:!0},{type:"sketch-person-card",name:"Sketch Person Card",description:"Person presence card with avatar, location, and device battery",preview:!0},{type:"sketch-tile-card",name:"Sketch Tile Card",description:"Ultra-compact single-line entity row with toggle for maximum density",preview:!0},{type:"sketch-camera-card",name:"Sketch Camera Card",description:"Camera snapshot display with refresh and fullscreen controls",preview:!0},{type:"sketch-popup-card",name:"Sketch Pop-up Card",description:"Hash-triggered modal overlay for organizing cards in slide-up panels",preview:!1},{type:"sketch-horizontal-buttons-stack",name:"Sketch Horizontal Buttons Stack",description:"Sticky footer navigation bar with scrollable room/view buttons",preview:!0},{type:"sketch-sub-button-card",name:"Sketch Sub-Button Card",description:"Entity card with expandable secondary action button grid",preview:!0},{type:"sketch-separator-card",name:"Sketch Separator Card",description:"Hand-drawn wavy line divider with optional label for organizing cards",preview:!0},{type:"sketch-fan-card",name:"Sketch Fan Card",description:"Fan speed control with spinning icon animation",preview:!0},{type:"sketch-lock-card",name:"Sketch Lock Card",description:"Lock/unlock controls with status indicator",preview:!0},{type:"sketch-number-card",name:"Sketch Number Card",description:"Input number or number entity with value slider",preview:!0},{type:"sketch-template-card",name:"Sketch Template Card",description:"Dynamic content card with Jinja2 templates for text, icons, and colors",preview:!0},{type:"sketch-history-graph-card",name:"Sketch History Graph Card",description:"Mini graph with color thresholds, configurable time range, and fill modes",preview:!0},{type:"sketch-room-card",name:"Sketch Room Card",description:"Room summary with occupancy indicator and sensor readouts",preview:!0},{type:"sketch-select-card",name:"Sketch Select Card",description:"Dropdown picker for input_select and select entities",preview:!0},{type:"sketch-progress-card",name:"Sketch Progress Card",description:"Radial progress ring with hand-drawn wobble for goals and tracking",preview:!0},{type:"sketch-timeline-card",name:"Sketch Timeline Card",description:"Hand-drawn activity journal showing recent entity events",preview:!0},{type:"sketch-tog-card",name:"Sketch TOG Card",description:"Baby sleep TOG recommendation with temperature strip and clothing guide",preview:!0});console.info("%c SKETCH-CARDS %c v1.4.3 ","background:#faf7f0;color:#2a2a2a;font-weight:bold;font-family:cursive;padding:2px 6px;border:1px solid #2a2a2a;border-radius:2px;","background:#2a2a2a;color:#faf7f0;font-weight:bold;padding:2px 6px;border-radius:2px;");
