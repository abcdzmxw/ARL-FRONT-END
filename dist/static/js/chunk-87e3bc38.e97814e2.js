(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-87e3bc38"],{e382:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container calendar-list-container"},[s("basic-container",[s("avue-crud",{ref:"crud",attrs:{option:e.tableOption,data:e.list,page:e.page,search:e.search,"table-loading":e.listLoading,"before-open":e.beforeOpen,permission:e.permissionList},on:{"update:page":function(t){e.page=t},"update:search":function(t){e.search=t},"on-load":e.getPage,"search-change":e.searchChange,"refresh-change":e.refreshChange,"row-update":e.handleUpdate,"row-save":e.handleSave,"row-del":e.handleDel},scopedSlots:e._u([{key:"menu",fn:function(t){var a=t.row;return[s("el-button",{attrs:{type:"text",size:"small",icon:"el-icon-key"},on:{click:function(t){return e.showDialog(a,"reset")}}},[e._v("重置密码")]),s("el-button",{attrs:{type:"text",size:"small",icon:"el-icon-user"},on:{click:function(t){return e.showDialog(a,"assign")}}},[e._v("分配角色")])]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})],1),s("el-dialog",{staticClass:"avue-dialog avue-dialog--top",attrs:{size:"small",title:e.mDialog.title,visible:e.mDialog.visible,width:e.mDialog.width,destroyOnClose:""},on:{"update:visible":function(t){return e.$set(e.mDialog,"visible",t)},opened:e.beforeOpen2}},[s("div",["assign"==e.mDialog.sign?[s("avue-form",{ref:"assign",attrs:{option:e.assignOption},on:{submit:e.handleSubmit_assign},model:{value:e.assignForm,callback:function(t){e.assignForm=t},expression:"assignForm"}})]:e._e(),"reset"==e.mDialog.sign?[s("avue-form",{ref:"reset",attrs:{option:e.resetOption},on:{submit:e.handleSubmit_reset},model:{value:e.resetForm,callback:function(t){e.resetForm=t},expression:"resetForm"}})]:e._e()],2),e.mDialog.hasFoot?s("div",{staticClass:"avue-dialog__footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.mDialog.visible=!1}}},[e._v("取 消")]),s("el-button",{attrs:{size:"small",type:"primary"}},[e._v("确 定")])],1):e._e()])],1)},i=[],n=s("5530"),r=s("c7eb"),o=s("1da1"),l=(s("d81d"),s("d3b7"),s("b0c0"),s("a15b"),s("c24f")),c=s("fe15"),u=(s("61f7"),{dialogDrag:!1,dialogHeight:560,labelWidth:"130",border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:360,align:"center",viewBtn:!1,excelBtn:!1,addBtn:!0,delBtn:!0,editBtn:!0,columnBtn:!1,printBtn:!1,menuType:"text",searchMenuSpan:6,searchShow:!0,searchIndex:3,searchIcon:!0,size:"mini",column:[{label:"姓名",prop:"name",span:12,search:!0,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"账户",prop:"username",span:12,search:!0,editDisabled:!0,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"密码",prop:"password",span:12,hide:!0,editDisplay:!1,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"电话",prop:"phone",span:12,search:!0,maxlength:11,rules:[{required:!1,message:"请输入手机号"}]},{label:"邮箱",prop:"email",span:12,search:!0,rules:[{required:!1,message:"请填写",trigger:"blur"}]}]}),g={name:"MenuList",components:{},data:function(){return{search:{},tableOption:u,page:{total:0,currentPage:1,pageSize:10,ascs:[],descs:[]},paramsSearch:{},list:[],listLoading:!1,form:{},firstLevelMenuList:[],mDialog:{title:"提示",visible:!1,width:"40%",hasFoot:!0,sign:""},assignOption:{labelWidth:90,submitText:"确定",emptyText:"取消",emptyBtn:!1,column:[{label:"角色",type:"select",prop:"role_id",slot:!0,multiple:!0,span:24,props:{label:"role_name",value:"id"},rules:[{required:!0,message:"请选择",trigger:"blur"}]}]},assignForm:{},resetOption:{labelWidth:120,submitText:"确定",emptyText:"取消",column:[{label:"密码",prop:"password",slot:!0,span:24,rules:[{required:!0,message:"请填写",trigger:"blur"}]}]},resetForm:{},roleList:[],curr_user_id:"",curr_user_name:""}},computed:{permissionList:function(){return{}}},watch:{},created:function(){this.getRoleList()},methods:{getRoleList:function(){var e=this;return Object(o["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=3,Object(c["d"])().then((function(t){var s=t.data;e.roleList=s,e.assignOption.column[0].dicData=s}));case 3:case"end":return t.stop()}}),t)})))()},getPage:function(e,t){var s=this;this.listLoading=!0,Object(l["f"])(Object.assign({page:e.currentPage,size:e.pageSize,descs:this.page.descs,ascs:this.page.ascs},t)).then((function(e){var t=e.data;s.list=t.items,s.page.total=t.total,s.page.currentPage=t.page,s.page.pageSize=t.size,s.listLoading=!1})).catch((function(){s.listLoading=!1}))},refreshChange:function(e){this.getPage(this.page)},searchChange:function(e,t){this.page.currentPage=1,this.getPage(this.page,this.filterForm(e)),t()},beforeOpen:function(e,t){e()},beforeOpen2:function(){var e=this;"assign"==this.mDialog.sign&&(this.$refs.assign.resetForm(),Object(c["e"])(this.curr_user_id).then((function(t){e.assignForm.role_id=t.data.map((function(e){return e.id}))}))),"reset"==this.mDialog.sign&&this.$refs.reset.resetForm()},handleDel:function(e,t){var s=this;this.$confirm("是否确认删除?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var t={user_id:e.user_id};Object(l["c"])(t).then((function(e){200==e.code?(s.$message({showClose:!0,message:e.message,type:"success"}),s.getPage(s.page)):s.$message({showClose:!0,message:e.message,type:"error"})}))})).catch((function(e){}))},handleSave:function(e,t,s){var a=this,i=this,r=Object(n["a"])({},e);Object(l["a"])(r).then((function(e){200==e.code?(i.$message({showClose:!0,message:e.message,type:"success"}),i.getPage(a.page)):(i.$message({showClose:!0,message:e.message,type:"error"}),i.getPage(a.page))})).catch((function(e){})).finally((function(){t(),s()}))},handleUpdate:function(e,t,s,a){var i=this,r=this,o=Object(n["a"])({},e);Object(l["j"])(o).then((function(e){200==e.code?(r.$message({showClose:!0,message:e.message,type:"success"}),r.getPage(i.page)):(r.$message({showClose:!0,message:e.message,type:"error"}),r.getPage(i.page),r.getFirstLevelMenuList())})).catch((function(e){})).finally((function(){s(),a()}))},showDialog:function(e,t){this.mDialog.sign=t,this.mDialog.visible=!0,"assign"==t&&(this.curr_user_id=e.user_id,this.curr_user_name=e.name,this.mDialog.hasFoot=!1,this.mDialog.width="420px",this.mDialog.title="给"+this.curr_user_name+"分配角色"),"reset"==t&&(this.curr_user_id=e.user_id,this.curr_user_name=e.name,this.mDialog.hasFoot=!1,this.mDialog.width="420px",this.mDialog.title="对"+this.curr_user_name+"重置密码")},handleSubmit_assign:function(e,t){var s=this,a={role_id:e.role_id.join(",")};Object(l["b"])(this.curr_user_id,a).then((function(e){s.$message({showClose:!0,message:e.message,type:"success"}),s.closeDialog()})).catch((function(e){s.$message({showClose:!0,message:res.message,type:"error"})})).finally((function(){t()}))},handleSubmit_reset:function(e,t){var s=this,a=Object.assign(e,{user_id:this.curr_user_id});Object(l["i"])(a).then((function(e){s.$message({showClose:!0,message:e.message,type:"success"}),s.closeDialog()})).finally((function(){t()}))},closeDialog:function(){this.mDialog.visible=!1}}},h=g,m=s("2877"),d=Object(m["a"])(h,a,i,!1,null,null,null);t["default"]=d.exports},fe15:function(e,t,s){"use strict";s.d(t,"c",(function(){return i})),s.d(t,"e",(function(){return n})),s.d(t,"d",(function(){return r})),s.d(t,"a",(function(){return o})),s.d(t,"f",(function(){return l})),s.d(t,"b",(function(){return c}));var a=s("b775");function i(e){return Object(a["a"])({url:"/role/pageList",method:"get",params:e})}function n(e){return Object(a["a"])({url:"/role/getUserRoleList?user_id=".concat(e),method:"get"})}function r(){return Object(a["a"])({url:"/role/list",method:"get"})}function o(e){return Object(a["a"])({url:"/role/",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/role/",method:"patch",data:e})}function c(e){return Object(a["a"])({url:"/role/",method:"delete",data:e})}}}]);