"use strict";(self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[]).push([[179],{4179:function(t,s,a){a.r(s),a.d(s,{default:function(){return d}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container"},[s("h2",{staticClass:"text-center"},[t._v("Fetch Data")]),s("div",{staticClass:"w-100 text-center"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",circle:""},on:{click:t.fetchData}})],1),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"show-post"},t._l(t.posts,(function(a){return s("div",{key:a.id,staticClass:"mb-4"},[s("h4",{staticClass:"title"},[t._v(t._s(a.title))]),s("div",{staticClass:"body"},[t._v(t._s(a.body))])])})),0)])},i=[],o=a(8945),n={components:{},data(){return{posts:[],loading:!1}},created(){this.fetchData()},methods:{async fetchData(){this.posts=[],this.loading=!0,await new Promise((t=>setTimeout(t,1e3)));try{const t=await o.Z.get("http://jsonplaceholder.typicode.com/posts");200==t.status?this.posts=t.data:console.log(t)}catch(t){console.log(t)}finally{this.loading=!1}}}},c=n,l=a(1001),r=(0,l.Z)(c,e,i,!1,null,"07fef0d4",null),d=r.exports}}]);
//# sourceMappingURL=179.f5582a74.js.map