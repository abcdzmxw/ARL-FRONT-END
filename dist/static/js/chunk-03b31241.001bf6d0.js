(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03b31241"],{4372:function(e,t,n){},"59c0":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"u-crud",staticStyle:{"padding-top":"15px"}},[n("avue-crud",{ref:"crud",attrs:{page:e.page,option:e.tableOption,data:e.list,search:e.search,"table-loading":e.listLoading,"before-open":e.beforeOpen,permission:e.permissionList},on:{"update:page":function(t){e.page=t},"update:search":function(t){e.search=t},"on-load":e.getPage,"search-change":e.searchChange,"refresh-change":e.refreshChange,"selection-change":e.selectionChange},scopedSlots:e._u([{key:"name",fn:function(t){var a=t.row;return[n("a",{attrs:{href:"#"}},[e._v(" "+e._s(a.name))])]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[n("template",{slot:"menuLeft"},[n("el-button",{attrs:{size:"mini",disabled:!e.selectedRows.length,icon:"el-icon-delete"},on:{click:e.handleDelete}},[e._v("批量删除")])],1)],2)],1)},s=[],i=(n("d81d"),n("b775"));function o(e){return Object(i["a"])({url:"/stat_finger/",method:"GET",params:e})}function c(e){return Object(i["a"])({url:"/site/delete/",method:"post",data:e})}var r={dialogDrag:!1,dialogWidth:420,labelWidth:76,border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:0,menu:!1,align:"left",viewBtn:!1,excelBtn:!1,addBtn:!1,delBtn:!1,editBtn:!1,columnBtn:!1,printBtn:!1,menuType:"text",searchMenuSpan:6,searchShow:!0,searchIndex:3,searchIcon:!0,selection:!0,size:"mini",column:[{label:"finger",prop:"name",search:!0,span:24,slot:!0},{label:"数量",prop:"cnt",span:12,search:!1,slot:!0,align:"center"}]},l={name:"MenuList",components:{},props:{info:{type:Object,default:function(){}}},data:function(){return{search:{},tableOption:r,page:{total:0,currentPage:1,pageSize:10,ascs:[],descs:[]},paramsSearch:{},list:[],listLoading:!1,form:{},inputIdVisible:"",inputValue:"",selectedRows:[]}},computed:{permissionList:function(){return{}}},watch:{},created:function(){},methods:{getPage:function(e,t){var n=this;this.listLoading=!0,o(Object.assign({page:e.currentPage,size:e.pageSize,descs:this.page.descs,ascs:this.page.ascs},this.info,t)).then((function(e){n.list=e.items,n.page.total=e.total,n.page.currentPage=e.page,n.page.pageSize=e.size,n.listLoading=!1})).catch((function(){n.listLoading=!1}))},refreshChange:function(e){this.getPage(this.page)},searchChange:function(e,t){this.page.currentPage=1,this.getPage(this.page,this.filterForm(e)),t()},selectionChange:function(e){this.selectedRows=e},beforeOpen:function(e,t){e()},handleDelete:function(e){var t=this;this.$confirm("是否确认删除选择的记录","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n={_id:e._id?[e._id]:t.selectedRows.map((function(e){return e._id}))};c(n).then((function(e){200==e.code?(t.$message({showClose:!0,message:e.message,type:"success"}),t.getPage(t.page)):t.$message({showClose:!0,message:e.message,type:"error"})}))}))}}},u=l,g=(n("fdf9"),n("2877")),p=Object(g["a"])(u,a,s,!1,null,"4473517f",null);t["default"]=p.exports},fdf9:function(e,t,n){"use strict";n("4372")}}]);