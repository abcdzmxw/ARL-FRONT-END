(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccbb6d30"],{a2ec:function(e,t,n){},d420:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"u-crud",staticStyle:{"padding-top":"15px"}},[n("avue-crud",{ref:"crud",attrs:{page:e.page,option:e.tableOption,data:e.list,search:e.search,"table-loading":e.listLoading,"before-open":e.beforeOpen,permission:e.permissionList},on:{"update:page":function(t){e.page=t},"update:search":function(t){e.search=t},"on-load":e.getPage,"search-change":e.searchChange,"refresh-change":e.refreshChange,"selection-change":e.selectionChange},scopedSlots:e._u([{key:"info",fn:function(t){var a=t.row;return[n("ul",e._l(a.service_info,(function(t){return n("li",{key:t.ip},[n("span",[e._v(e._s(t.ip))])])})),0)]}},{key:"service_info.product",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.service_info.product||"-"))])]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[n("template",{slot:"menuLeft"},[n("el-button",{attrs:{size:"mini",disabled:!e.selectedRows.length,icon:"el-icon-delete"},on:{click:e.handleDelete}},[e._v("批量删除")])],1)],2)],1)},i=[],s=(n("d81d"),n("b775"));function c(e){return Object(s["a"])({url:"/service/",method:"GET",params:e})}function o(e){return Object(s["a"])({url:"/site/delete/",method:"post",data:e})}var r={dialogDrag:!1,dialogWidth:420,labelWidth:76,border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:0,menu:!1,align:"left",viewBtn:!1,excelBtn:!1,addBtn:!1,delBtn:!1,editBtn:!1,columnBtn:!1,printBtn:!1,menuType:"text",searchMenuSpan:6,searchShow:!0,searchIndex:3,searchIcon:!0,selection:!0,size:"mini",column:[{label:"服务",prop:"service_name",headerAlign:"center",search:!0,span:24},{label:"IP端口",prop:"info",headerAlign:"center",span:12,slot:!0},{label:"IP",prop:"service_info.ip",search:!0,hide:!0,span:12},{label:"端口",prop:"service_info.port_id",search:!0,hide:!0,span:12},{label:"产品",prop:"service_info.product",search:!0,headerAlign:"center",align:"center",span:12,slot:!0}]},l={name:"MenuList",components:{},props:{info:{type:Object,default:function(){}}},data:function(){return{search:{},tableOption:r,page:{total:0,currentPage:1,pageSize:10,ascs:[],descs:[]},paramsSearch:{},list:[],listLoading:!1,form:{},inputIdVisible:"",inputValue:"",selectedRows:[]}},computed:{permissionList:function(){return{}}},watch:{},created:function(){},methods:{getPage:function(e,t){var n=this;this.listLoading=!0,c(Object.assign({page:e.currentPage,size:e.pageSize,descs:this.page.descs,ascs:this.page.ascs},this.info,t)).then((function(e){n.list=e.items,n.page.total=e.total,n.page.currentPage=e.page,n.page.pageSize=e.size,n.listLoading=!1})).catch((function(){n.listLoading=!1}))},refreshChange:function(e){this.getPage(this.page)},searchChange:function(e,t){this.page.currentPage=1,this.getPage(this.page,this.filterForm(e)),t()},selectionChange:function(e){this.selectedRows=e},beforeOpen:function(e,t){e()},handleDelete:function(e){var t=this;this.$confirm("是否确认删除选择的记录","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n={_id:e._id?[e._id]:t.selectedRows.map((function(e){return e._id}))};o(n).then((function(e){200==e.code?(t.$message({showClose:!0,message:e.message,type:"success"}),t.getPage(t.page)):t.$message({showClose:!0,message:e.message,type:"error"})}))}))}}},p=l,u=(n("df77"),n("2877")),d=Object(u["a"])(p,a,i,!1,null,"0ee6a161",null);t["default"]=d.exports},df77:function(e,t,n){"use strict";n("a2ec")}}]);