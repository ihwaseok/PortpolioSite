webpackJsonp([1],{"9M+g":function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("7+uW"),a=s("mtWM"),n=s("/ocq"),i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"hello"},e._l(e.users,function(t,r){return s("div",{key:r,staticClass:"user-wrap"},[s("h2",[e._v("No. "+e._s(r+1))]),e._v(" "),s("dl",[s("dt",[e._v("아이디")]),e._v(" "),s("dd",[e._v(e._s(t.userid))]),e._v(" "),s("dt",[e._v("이름")]),e._v(" "),s("dd",[e._v(e._s(t.name))])])])}),0)},staticRenderFns:[]},o=s("VU/8")({data:function(){return{users:[]}},created:function(){var e=this;this.$http.get("/api/users").then(function(t){e.users=t.data})}},i,!1,null,null,null).exports,u={data:function(){return{user:{userid:"",password:""}}},methods:{login:function(e){this.$http.post("/api/users/login",{user:this.user}).then(function(e){alert(e.data.message)},function(e){alert("Login failed! please check your id or password")}).catch(function(e){alert(e)})}}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"hello"},[s("div",{staticClass:"input_row"},[s("label",{attrs:{for:"id"}},[e._v("아이디")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.userid,expression:"user.userid"}],attrs:{type:"text",id:"id"},domProps:{value:e.user.userid},on:{input:function(t){t.target.composing||e.$set(e.user,"userid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("label",{attrs:{for:"password"}},[e._v("비밀번호")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),s("button",{on:{click:e.login}},[e._v("로그인")]),e._v(" "),s("a",{attrs:{href:"/signUp"}},[e._v("가입하기")])])},staticRenderFns:[]},d=s("VU/8")(u,l,!1,null,null,null).exports,p={methods:{signUp:function(e){var t=this;this.$http.post("/api/users/signUp",{user:this.user}).then(function(e){1==e.data.success&&(alert(e.data.message),t.$router.push("/login")),0==e.data.success&&alert(e.data.message)}).catch(function(e){alert("error")})}},data:function(){return{user:{userid:"",name:"",password:""}}}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app"},[s("div",{staticClass:"input_row"},[s("label",{attrs:{for:"id"}},[e._v("아이디")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.userid,expression:"user.userid"}],attrs:{type:"text",id:"id"},domProps:{value:e.user.userid},on:{input:function(t){t.target.composing||e.$set(e.user,"userid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("label",{attrs:{for:"name"}},[e._v("이름")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{type:"text",id:"name"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("label",{attrs:{for:"password"}},[e._v("비밀번호")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),s("button",{on:{click:e.signUp}},[e._v("가입하기")])])},staticRenderFns:[]},c=s("VU/8")(p,v,!1,null,null,null).exports;r.default.use(n.a);var m=[{path:"/",name:"index",component:o},{path:"/login",name:"login",component:d},{path:"/signUp",name:"signUp",component:c}],_=new n.a({routes:m}),f={name:"App",components:{router:_}},g={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{attrs:{id:"nav"}},[s("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" "),s("router-link",{attrs:{to:"/login"}},[e._v("Login")]),e._v(" "),s("router-link",{attrs:{to:"/signUp"}},[e._v("SignUp")])],1),e._v(" "),s("b-button",{attrs:{varient:"primary"}},[e._v("Button")]),e._v(" "),s("router-view")],1)},staticRenderFns:[]};var w=s("VU/8")(f,g,!1,function(e){s("azxs")},null,null).exports,h=s("Tqaz");s("qb6w"),s("9M+g");r.default.use(h.a),r.default.config.productionTip=!1,r.default.prototype.$http=a.a,new r.default({el:"#app",router:_,components:{App:w},template:"<App/>"})},azxs:function(e,t){},qb6w:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.a1d7dda8769646739d3a.js.map