"use strict";(self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[]).push([[551],{8551:function(t,s,a){a.r(s),a.d(s,{default:function(){return d}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container"},[s("h2",{staticClass:"text-center"},[t._v("Fetch Data Search")]),s("div",{staticClass:"w-100 text-center"},[s("el-input",{attrs:{placeholder:"Tìm kiếm sách"},model:{value:t.searchText,callback:function(s){t.searchText=s},expression:"searchText"}})],1),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"show-post"},t._l(t.posts,(function(a){return s("div",{key:a.id,staticClass:"mb-4"},[s("h4",{staticClass:"title"},[t._v(t._s(a.title))]),s("div",{staticClass:"body"},[t._v(t._s(a.body))])])})),0)])},i=[],c=a(8945),o={components:{},data(){return{posts:[],loading:!1,searchText:""}},created(){this.fetchData()},methods:{async fetchData(){this.posts=[],this.loading=!0,await new Promise((t=>setTimeout(t,1e3)));try{const t=await c.Z.get("http://jsonplaceholder.typicode.com/posts");200==t.status?this.posts=t.data:console.log(t)}catch(t){console.log(t)}finally{this.loading=!1}}}},n=o,l=a(1001),r=(0,l.Z)(n,e,i,!1,null,"71bfa098",null),d=r.exports}}]);
//# sourceMappingURL=551.53f4d5dc.js.map