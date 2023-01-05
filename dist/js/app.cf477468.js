(function(){"use strict";var e={5307:function(e,t,n){var o=n(144),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("nav",{staticClass:"text-center"},[t("router-link",{attrs:{to:"/"}},[e._v("Todo List Undo able")]),e._v(" | "),t("router-link",{attrs:{to:"/demo-form"}},[e._v("Form")]),e._v(" | "),t("router-link",{attrs:{to:"/todo-list-1"}},[e._v("Todo List 1 (Vuex)")]),e._v(" | "),t("router-link",{attrs:{to:"/todo-list-2"}},[e._v("Todo List 2 (Vuex)")]),e._v(" | "),t("router-link",{attrs:{to:"/fetch-data"}},[e._v("Fetch Data")]),e._v(" | ")],1),t("router-view")],1)},i=[],a=n(1001),u={},f=(0,a.Z)(u,r,i,!1,null,null,null),s=f.exports,d=n(8345);o["default"].use(d.ZP);const l=[{path:"/",name:"todo list",component:()=>n.e(3).then(n.bind(n,6003))},{path:"/todo-list-1",name:"todo list 1",component:()=>n.e(899).then(n.bind(n,1899))},{path:"/todo-list-2",name:"todo list 2",component:()=>n.e(113).then(n.bind(n,5470))},{path:"/fetch-data",name:"fetch data",component:()=>Promise.all([n.e(945),n.e(179)]).then(n.bind(n,4179))},{path:"/fetch-data-search",name:"fetch data search",component:()=>Promise.all([n.e(945),n.e(551)]).then(n.bind(n,8551))},{path:"/demo-form",name:"demo form",component:()=>n.e(125).then(n.bind(n,1125))}],c=new d.ZP({mode:"history",base:"/vue2-example/",routes:l});var p=c,m=(n(7658),n(629));o["default"].use(m.ZP);var h=new m.ZP.Store({state:{todolist:[{name:1,isDone:!1},{name:2,isDone:!0},{name:3,isDone:!1}]},getters:{getTodolist(e){return e.todolist},completedTask(e){return e.todolist.filter((e=>e.isDone))},unCompleteTask(e){return e.todolist.filter((e=>!e.isDone))}},mutations:{addTask(e,t){e.todolist.push({name:t,isDone:!1})},clearDoneTask(e){e.todolist=e.todolist.filter((e=>!e.isDone))}},actions:{},modules:{}}),v=n(4720),b=n.n(v);o["default"].use(b()),o["default"].config.productionTip=!1,new o["default"]({router:p,store:h,render:e=>e(s)}).$mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],i=e[d][2];for(var u=!0,f=0;f<o.length;f++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[f])}))?o.splice(f--,1):(u=!1,i<a&&(a=i));if(u){e.splice(d--,1);var s=r();void 0!==s&&(t=s)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{3:"dab78d58",113:"86b342b0",125:"97b0dff8",179:"f5582a74",551:"53f4d5dc",899:"0824484a",945:"41501de4"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{3:"77b4f32c",113:"4f7172d2",125:"f4c30aef",179:"a38ff96a",551:"01d3f58e",899:"7a4800d0"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="my-app:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var u,f;if(void 0!==i)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var l=s[d];if(l.getAttribute("src")==o||l.getAttribute("data-webpack")==t+i){u=l;break}}u||(f=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+i),u.src=o),e[o]=[r];var c=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(c.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=c.bind(null,u.onerror),u.onload=c.bind(null,u.onload),f&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/vue2-example/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var a=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,f=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");f.code="CSS_CHUNK_LOAD_FAILED",f.type=a,f.request=u,i.parentNode.removeChild(i),r(f)}};return i.onerror=i.onload=a,i.href=t,n?n.parentNode.insertBefore(i,n.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),u=n.p+a;if(t(a,u))return r();e(o,u,null,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={3:1,113:1,125:1,179:1,551:1,899:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),u=new Error,f=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}};n.l(a,f,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],u=o[1],f=o[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(f)var d=f(n)}for(t&&t(o);s<a.length;s++)i=a[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},o=self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5307)}));o=n.O(o)})();
//# sourceMappingURL=app.cf477468.js.map