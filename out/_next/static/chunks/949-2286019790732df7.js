(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[949],{9361:function(e,t){"use strict";t.Z=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},8461:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(9361).Z,o=r(4941).Z,i=r(3929).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,r,l,u=e.src,m=e.sizes,w=e.unoptimized,b=void 0!==w&&w,C=e.priority,x=void 0!==C&&C,k=e.loading,L=e.className,S=e.quality,z=e.width,E=e.height,M=e.fill,R=e.style,I=e.onLoadingComplete,P=e.placeholder,A=void 0===P?"empty":P,j=e.blurDataURL,N=c(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoadingComplete","placeholder","blurDataURL"]),B=s.useContext(p.ImageConfigContext),T=s.useMemo(function(){var e=g||B||$.imageConfigDefault,t=i(e.deviceSizes).concat(i(e.imageSizes)).sort(function(e,t){return e-t}),r=e.deviceSizes.sort(function(e,t){return e-t});return a({},e,{allSizes:t,deviceSizes:r})},[B]),q=N,W=y;if("loader"in q){if(q.loader){var Z=q.loader;W=function(e){e.config;var t=c(e,["config"]);return Z(t)}}delete q.loader}var D,U,O="",H=v(z),G=v(E);if(D=u,"object"==typeof D&&(h(D)||void 0!==(U=D).src)){var V=h(u)?u.default:u;if(!V.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(V)));if(!V.height||!V.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(V)));if(t=V.blurWidth,r=V.blurHeight,j=j||V.blurDataURL,O=V.src,!M){if(H||G){if(H&&!G){var F=H/V.width;G=Math.round(V.height*F)}else if(!H&&G){var K=G/V.height;H=Math.round(V.width*K)}}else H=V.width,G=V.height}}u="string"==typeof u?u:O;var J=!x&&("lazy"===k||void 0===k);(u.startsWith("data:")||u.startsWith("blob:"))&&(b=!0,J=!1),T.unoptimized&&(b=!0);var Q=o(s.useState(!1),2),X=Q[0],Y=Q[1],ee=o(s.useState(!1),2),et=ee[0],er=ee[1],en=v(S),eo=Object.assign(M?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0}:{},et?{}:{color:"transparent"},R),ei="blur"===A&&j&&!X?{backgroundSize:eo.objectFit||"cover",backgroundPosition:eo.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(d.getImageBlurSvg({widthInt:H,heightInt:G,blurWidth:t,blurHeight:r,blurDataURL:j}),'")')}:{},ea=function(e){var t=e.config,r=e.src,n=e.unoptimized,o=e.width,a=e.quality,l=e.sizes,u=e.loader;if(n)return{src:r,srcSet:void 0,sizes:void 0};var c=function(e,t,r){var n=e.deviceSizes,o=e.allSizes;if(r){for(var a=/(^|\s)(1?\d?\d)vw/g,l=[];u=a.exec(r);u)l.push(parseInt(u[2]));if(l.length){var u,c,s=.01*(c=Math).min.apply(c,i(l));return{widths:o.filter(function(e){return e>=n[0]*s}),kind:"w"}}return{widths:o,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:i(new Set([t,2*t].map(function(e){return o.find(function(t){return t>=e})||o[o.length-1]}))),kind:"x"}}(t,o,l),s=c.widths,f=c.kind,d=s.length-1;return{sizes:l||"w"!==f?l:"100vw",srcSet:s.map(function(e,n){return"".concat(u({config:t,src:r,quality:a,width:e})," ").concat("w"===f?e:n+1).concat(f)}).join(", "),src:u({config:t,src:r,quality:a,width:s[d]})}}({config:T,src:u,unoptimized:b,width:H,quality:en,sizes:m,loader:W}),el=u,eu="imagesizes";eu="imageSizes";var ec=(n(l={},"imageSrcSet",ea.srcSet),n(l,eu,ea.sizes),l),es=s.useRef(I);s.useEffect(function(){es.current=I},[I]);var ef=a({isLazy:J,imgAttributes:ea,heightInt:G,widthInt:H,qualityInt:en,className:L,imgStyle:eo,blurStyle:ei,loading:k,config:T,fill:M,unoptimized:b,placeholder:A,loader:W,srcString:el,onLoadingCompleteRef:es,setBlurComplete:Y,setShowAltText:er},q);return s.default.createElement(s.default.Fragment,null,s.default.createElement(_,Object.assign({},ef)),x?s.default.createElement(f.default,null,s.default.createElement("link",Object.assign({key:"__nimg-"+ea.src+ea.srcSet+ea.sizes,rel:"preload",as:"image",href:ea.srcSet?void 0:ea.src},ec))):null)};var a=r(6495).Z,l=r(2648).Z,u=r(1598).Z,c=r(7273).Z,s=u(r(7294)),f=l(r(5443)),d=r(2730),$=r(9309),p=r(9977);r(3794);var g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function h(e){return void 0!==e.default}function v(e){return"number"==typeof e||void 0===e?e:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function m(e,t,r,n,o){e&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch(function(){}).then(function(){e.parentNode&&("blur"===r&&o(!0),(null==n?void 0:n.current)&&n.current(e))}))}var _=function(e){var t=e.imgAttributes,r=e.heightInt,n=e.widthInt,o=(e.qualityInt,e.className),i=e.imgStyle,l=e.blurStyle,u=e.isLazy,f=e.fill,d=e.placeholder,$=e.loading,p=e.srcString,g=(e.config,e.unoptimized,e.loader,e.onLoadingCompleteRef),h=e.setBlurComplete,v=e.setShowAltText,_=e.onLoad,y=e.onError,w=c(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return $=u?"lazy":$,s.default.createElement(s.default.Fragment,null,s.default.createElement("img",Object.assign({},w,t,{width:n,height:r,decoding:"async","data-nimg":"future".concat(f?"-fill":""),className:o,loading:$,style:a({},i,l),ref:s.useCallback(function(e){e&&(y&&(e.src=e.src),e.complete&&m(e,p,d,g,h))},[p,d,g,h,y,]),onLoad:function(e){m(e.currentTarget,p,d,g,h),_&&_(e)},onError:function(e){v(!0),"blur"===d&&h(!0),y&&y(e)}})))};function y(e){var t=e.config,r=e.src,n=e.width,o=e.quality;return r.endsWith(".svg")&&!t.dangerouslyAllowSVG?r:"".concat(t.path,"?url=").concat(encodeURIComponent(r),"&w=").concat(n,"&q=").concat(o||75)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1210:function(e,t){"use strict";function r(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=r,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4941).Z;r(5753).default,Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(2648).Z,i=r(7273).Z,a=o(r(7294)),l=r(6273),u=r(2725),c=r(3462),s=r(1018),f=r(7190),d=r(1210),$=r(8684),p=void 0!==a.default.useTransition,g={};function h(e,t,r,n){if(e&&l.isLocalURL(t)){Promise.resolve(e.prefetch(t,r,n)).catch(function(e){});var o=n&&void 0!==n.locale?n.locale:e&&e.locale;g[t+"%"+r+(o?"%"+o:"")]=!0}}var v=a.default.forwardRef(function(e,t){var r,o,v=e.href,m=e.as,_=e.children,y=e.prefetch,w=e.passHref,b=e.replace,C=e.shallow,x=e.scroll,k=e.locale,L=e.onClick,S=e.onMouseEnter,z=e.onTouchStart,E=e.legacyBehavior,M=void 0===E?!0!==Boolean(!1):E,R=i(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);r=_,M&&("string"==typeof r||"number"==typeof r)&&(r=a.default.createElement("a",null,r));var I=!1!==y,P=n(p?a.default.useTransition():[],2)[1],A=a.default.useContext(c.RouterContext),j=a.default.useContext(s.AppRouterContext);j&&(A=j);var N=a.default.useMemo(function(){var e=n(l.resolveHref(A,v,!0),2),t=e[0],r=e[1];return{href:t,as:m?l.resolveHref(A,m):r||t}},[A,v,m]),B=N.href,T=N.as,q=a.default.useRef(B),W=a.default.useRef(T);M&&(o=a.default.Children.only(r));var Z=M?o&&"object"==typeof o&&o.ref:t,D=n(f.useIntersection({rootMargin:"200px"}),3),U=D[0],O=D[1],H=D[2],G=a.default.useCallback(function(e){(W.current!==T||q.current!==B)&&(H(),W.current=T,q.current=B),U(e),Z&&("function"==typeof Z?Z(e):"object"==typeof Z&&(Z.current=e))},[T,Z,B,H,U]);a.default.useEffect(function(){var e=O&&I&&l.isLocalURL(B),t=void 0!==k?k:A&&A.locale,r=g[B+"%"+T+(t?"%"+t:"")];e&&!r&&h(A,B,T,{locale:t})},[T,B,O,k,I,A]);var V={ref:G,onClick:function(e){M||"function"!=typeof L||L(e),M&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,i,a,u,c,s){if("A"!==e.currentTarget.nodeName.toUpperCase()||(!(d=(f=e).currentTarget.target)||"_self"===d)&&!f.metaKey&&!f.ctrlKey&&!f.shiftKey&&!f.altKey&&(!f.nativeEvent||2!==f.nativeEvent.which)&&l.isLocalURL(r)){e.preventDefault();var f,d,$=function(){"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:i,locale:u,scroll:a}):t[o?"replace":"push"](r,{forceOptimisticNavigation:!s})};c?c($):$()}}(e,A,B,T,b,C,x,k,j?P:void 0,I)},onMouseEnter:function(e){M||"function"!=typeof S||S(e),M&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),!(!I&&j)&&l.isLocalURL(B)&&h(A,B,T,{priority:!0})},onTouchStart:function(e){M||"function"!=typeof z||z(e),M&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),!(!I&&j)&&l.isLocalURL(B)&&h(A,B,T,{priority:!0})}};if(!M||w||"a"===o.type&&!("href"in o.props)){var F=void 0!==k?k:A&&A.locale,K=A&&A.isLocaleDomain&&d.getDomainLocale(T,F,A.locales,A.domainLocales);V.href=K||$.addBasePath(u.addLocale(T,F,A&&A.defaultLocale))}return M?a.default.cloneElement(o,V):a.default.createElement("a",Object.assign({},R,V),r)});t.default=v,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,c=e.disabled||!a,s=n(o.useState(!1),2),f=s[0],d=s[1],$=n(o.useState(null),2),p=$[0],g=$[1];return o.useEffect(function(){if(a){if(!c&&!f&&p&&p.tagName){var e,n,o,s,$,g,h;return e=p,n=function(e){return e&&d(e)},$=(s=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=u.find(function(e){return e.root===r.root&&e.margin===r.margin});if(n&&(t=l.get(n)))return t;var o=new Map;return t={id:r,observer:new IntersectionObserver(function(e){e.forEach(function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},u.push(r),l.set(r,t),t}(o={root:null==t?void 0:t.current,rootMargin:r})).id,g=s.observer,(h=s.elements).set(e,n),g.observe(e),function(){if(h.delete(e),g.unobserve(e),0===h.size){g.disconnect(),l.delete($);var t=u.findIndex(function(e){return e.root===$.root&&e.margin===$.margin});t>-1&&u.splice(t,1)}}}}else if(!f){var v=i.requestIdleCallback(function(){return d(!0)});return function(){return i.cancelIdleCallback(v)}}},[p,c,r,t,f]),[g,f,o.useCallback(function(){d(!1)},[])]};var o=r(7294),i=r(9311),a="function"==typeof IntersectionObserver,l=new Map,u=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var n=(0,r(2648).Z)(r(7294)),o=n.default.createContext(null);t.AppRouterContext=o;var i=n.default.createContext(null);t.LayoutRouterContext=i;var a=n.default.createContext(null);t.GlobalLayoutRouterContext=a},2730:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){var t=e.widthInt,r=e.heightInt,n=e.blurWidth,o=e.blurHeight,i=e.blurDataURL,a=i.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(n||t," ").concat(o||r,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(n&&o?"1":"20","'/%3E").concat(a,"%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(i,"'/%3E%3C/svg%3E")}},1608:function(e,t,r){e.exports=r(8461)},9008:function(e,t,r){e.exports=r(5443)},1664:function(e,t,r){e.exports=r(8418)},1163:function(e,t,r){e.exports=r(387)},6893:function(e,t,r){"use strict";r.d(t,{Imn:function(){return l},JID:function(){return i},q5L:function(){return u},qOw:function(){return a},uOf:function(){return o}});var n=r(8357);function o(e){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(e)}function i(e){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"2",width:"20",height:"20",rx:"5",ry:"5"}},{tag:"path",attr:{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}},{tag:"line",attr:{x1:"17.5",y1:"6.5",x2:"17.51",y2:"6.5"}}]})(e)}function a(e){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"}},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"}}]})(e)}function l(e){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}},{tag:"polyline",attr:{points:"22,6 12,13 2,6"}}]})(e)}function u(e){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"}},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"}}]})(e)}},8357:function(e,t,r){"use strict";r.d(t,{w_:function(){return u}});var n=r(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(o),a=function(){return(a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},l=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function u(e){return function(t){return n.createElement(c,a({attr:a({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,a({key:r},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var r,o=e.attr,i=e.size,u=e.title,c=l(e,["attr","size","title"]),s=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,c,{className:r,style:a(a({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),u&&n.createElement("title",null,u),e.children)};return void 0!==i?n.createElement(i.Consumer,null,function(e){return t(e)}):t(o)}}}]);