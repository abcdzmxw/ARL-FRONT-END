(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4610af50"],{"7db0":function(e,t,i){"use strict";var n=i("23e7"),c=i("b727").find,s=i("44d2"),o=i("ae40"),a="find",r=!0,l=o(a);a in[]&&Array(1)[a]((function(){r=!1})),n({target:"Array",proto:!0,forced:r||!l},{find:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}}),s(a)},8190:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container"},[i("basic-container",[i("avue-crud",{ref:"crud",attrs:{option:e.tableOption,data:e.list,search:e.search,"table-loading":e.listLoading,"before-open":e.beforeOpen,permission:e.permissionList},on:{"update:search":function(t){e.search=t},"on-load":e.getPage,"search-change":e.searchChange,"refresh-change":e.refreshChange,"row-update":e.handleUpdate,"row-save":e.handleSave,"row-del":e.handleDel,"cell-mouse-enter":e.handleCellEnter},scopedSlots:e._u([{key:"menu",fn:function(t){var n=t.row;return[i("el-button",{attrs:{size:"small",type:"text",icon:"el-icon-news"},on:{click:function(t){return e.showDialog(n,"distribution")}}},[e._v("任务下发")])]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[i("template",{slot:"fooDomainForm"},[i("div",{staticStyle:{padding:"10px 20px"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate_domain},on:{change:function(t){return e.handleCheckAllChange(t,"domain")}},model:{value:e.checkAll_domain,callback:function(t){e.checkAll_domain=t},expression:"checkAll_domain"}},[e._v("全选")]),i("div",{staticStyle:{margin:"10px 0","border-top":"1px solid #eee"}}),i("el-checkbox-group",{on:{change:function(t){return e.handleCheckedChange(t,"domain")}},model:{value:e.checked_domain,callback:function(t){e.checked_domain=t},expression:"checked_domain"}},e._l(e.domainOptions,(function(t){return i("el-checkbox",{attrs:{label:t.key}},[e._v(e._s(t.value))])})),1)],1)]),i("template",{slot:"fooSiteForm"},[i("div",{staticStyle:{padding:"10px 20px"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate_site},on:{change:function(t){return e.handleCheckAllChange(t,"site")}},model:{value:e.checkAll_site,callback:function(t){e.checkAll_site=t},expression:"checkAll_site"}},[e._v("全选")]),i("div",{staticStyle:{margin:"10px 0","border-top":"1px solid #eee"}}),i("el-checkbox-group",{on:{change:function(t){return e.handleCheckedChange(t,"site")}},model:{value:e.checked_site,callback:function(t){e.checked_site=t},expression:"checked_site"}},e._l(e.siteOptions,(function(t){return i("el-checkbox",{attrs:{label:t.key}},[e._v(e._s(t.value))])})),1)],1)]),i("template",{slot:"fooPocForm"},[i("div",{staticStyle:{padding:"10px 20px"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate_poc},on:{change:function(t){return e.handleCheckAllChange(t,"poc")}},model:{value:e.checkAll_poc,callback:function(t){e.checkAll_poc=t},expression:"checkAll_poc"}},[e._v("全选")]),i("div",{staticStyle:{margin:"10px 0","border-top":"1px solid #eee"}}),i("el-checkbox-group",{on:{change:function(t){return e.handleCheckedChange(t,"poc")}},model:{value:e.checked_poc,callback:function(t){e.checked_poc=t},expression:"checked_poc"}},e._l(e.pocOptions,(function(t){return i("el-checkbox",{attrs:{label:t.key}},[e._v(e._s(t.value))])})),1)],1)]),i("template",{slot:"fooBruteForm"},[i("div",{staticStyle:{padding:"10px 20px"}},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate_brute},on:{change:function(t){return e.handleCheckAllChange(t,"brute")}},model:{value:e.checkAll_brute,callback:function(t){e.checkAll_brute=t},expression:"checkAll_brute"}},[e._v("全选")]),i("div",{staticStyle:{margin:"10px 0","border-top":"1px solid #eee"}}),i("el-checkbox-group",{on:{change:function(t){return e.handleCheckedChange(t,"brute")}},model:{value:e.checked_brute,callback:function(t){e.checked_brute=t},expression:"checked_brute"}},e._l(e.bruteOptions,(function(t){return i("el-checkbox",{attrs:{label:t.key}},[e._v(e._s(t.value))])})),1)],1)])],2)],1),i("el-dialog",{staticClass:"avue-dialog avue-dialog--top",attrs:{size:"small",title:e.mDialog.title,visible:e.mDialog.visible,width:e.mDialog.width,"destroy-on-close":""},on:{"update:visible":function(t){return e.$set(e.mDialog,"visible",t)}}},[i("div",["distribution"==e.mDialog.sign?[i("avue-form",{ref:"distribution",attrs:{option:e.distributionOption},on:{submit:e.handleSubmit_distribution},model:{value:e.distributionForm,callback:function(t){e.distributionForm=t},expression:"distributionForm"}})]:e._e()],2),e.mDialog.hasFoot?i("div",{staticClass:"avue-dialog__footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.mDialog.visible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("确 定")])],1):e._e()])],1)},c=[],s=i("c7eb"),o=i("1da1"),a=(i("d81d"),i("b64b"),i("d3b7"),i("b0c0"),i("caad"),i("2532"),i("7db0"),i("fc1e")),r={dialogDrag:!1,dialogWidth:1e3,labelWidth:120,border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menu:!0,menuWidth:240,align:"center",viewBtn:!1,excelBtn:!1,addBtn:!0,addBtnText:"新建策略",delBtn:!0,editBtn:!0,columnBtn:!1,printBtn:!1,menuType:"text",searchMenuSpan:6,searchShow:!0,searchIndex:3,searchIcon:!0,size:"mini",selection:!1,column:[{label:"策略名称",prop:"name",span:24,search:!0,rules:[{required:!0,message:"请填写策略名称",trigger:"blur"}]},{label:"策略描述",prop:"desc",span:24,rules:[{required:!1,message:"请填写策略描述",trigger:"blur"}]},{label:"更新时间",prop:"update_date",display:!1}],group:[{label:"域名和IP配置",prop:"domain_config",column:[{label:"域名爆破类型",prop:"domain_brute_type",type:"select",dicData:[{value:"大字典",key:"big"},{value:"测试",key:"test"}],props:{label:"value",value:"key"},rules:[{required:!0,message:"请选择",trigger:"blur"}]},{label:"端口扫描类型",prop:"port_scan_type",type:"select",dicData:[],props:{label:"value",value:"key"},rules:[{required:!0,message:"请选择",trigger:"blur"}]},{label:"",prop:"fooDomain",slot:!0,labelWidth:0,span:24}]},{label:"IP高级配置",prop:"ip_config",column:[{label:"主机超时时间",prop:"host_timeout_type",type:"select",value:"default",dicData:[{label:"默认(900s)",value:"default"},{label:"自定义",value:"custom"}],rules:[{required:!0,message:"请选择",trigger:"blur"}],control:function(e,t){return"default"==e?{host_timeout:{display:!1}}:{host_timeout:{display:!0}}}},{label:"主机超时时间(s)",labelWidth:130,prop:"host_timeout",value:0,type:"number",min:0,display:!1,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"探测报文并行度",labelWidth:130,prop:"port_parallelism",value:0,min:0,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"最少发包速率",labelWidth:130,prop:"port_min_rate",value:0,min:0,rules:[{required:!0,message:"请填写",trigger:"blur"}]}]},{label:"站点和风险配置",prop:"site_config",column:[{label:"",prop:"fooSite",slot:!0,labelWidth:0,span:24}]},{label:"Poc配置",prop:"poc_config",column:[{label:"",prop:"fooPoc",slot:!0,labelWidth:0,span:24}]},{label:"弱口令爆破配置",prop:"brute_config",column:[{label:"",prop:"fooBrute",slot:!0,labelWidth:0,span:24}]},{label:"资产组配置",prop:"scope_config",column:[{label:"关联资产组",prop:"scope_id",type:"select",dicData:[],props:{label:"scope",value:"_id"},rules:[{required:!1,message:"请选择资产",trigger:"blur"}]}]}]},l={name:"MenuList",components:{},data:function(){return{search:{},tableOption:r,page:{total:0,currentPage:1,pageSize:10,ascs:[],descs:[]},paramsSearch:{},list:[],listLoading:!1,form:{},selectedRows:[],checkAll_domain:!1,checked_domain:[],isIndeterminate_domain:!1,domainOptions:[],checkAll_site:!1,checked_site:[],isIndeterminate_site:!1,siteOptions:[],checkAll_poc:!1,checked_poc:[],isIndeterminate_poc:!1,pocOptions:[],checkAll_brute:!1,checked_brute:[],isIndeterminate_brute:!1,bruteOptions:[],currId:"",type:"",mDialog:{title:"提示",visible:!1,width:"40%",hasFoot:!0,sign:""},distributionOption:{labelWidth:120,column:[{label:"任务类型",prop:"task_tag",type:"select",value:"task",span:24,dicData:[{label:"资产侦查任务",value:"task"},{label:"风险巡航任务",value:"risk_cruising"}],rules:[{required:!0,message:"请选择类型",trigger:"blur"}],control:function(e,t){return"task"==e?{target:{placeholder:"请输入目标，支持IP、IP段、域名"}}:{target:{placeholder:"请输入确定的目标，不会进行端口扫描,如: http://10.0.1.1:8081/ 10.0.1.1:2222"}}}},{label:"任务名称",prop:"name",span:24,rules:[{required:!0,message:"请填写",trigger:"blur"}]},{label:"目标",prop:"target",type:"textarea",span:24,placeholder:"请输入目标，支持IP、IP段、域名",rules:[{required:!0,message:"请填写",trigger:"blur"}]}]},distributionForm:{policy_id:""}}},computed:{permissionList:function(){return{}}},watch:{},created:function(){},methods:{handleCheckAllChange:function(e,t){var i=t+"Options",n=this[i].map((function(e){return e.key})),c="checked_"+t,s="isIndeterminate_"+t;this[c]=e?n:[],this[s]=!1},handleCheckedChange:function(e,t){var i=t+"Options",n="isIndeterminate_"+t,c="checkAll_"+t;this[n]=e.length>0&&e.length<this[i].length,this[c]=e.length==this[i].length},getDic:function(){var e=this;return Object(o["a"])(Object(s["a"])().mark((function t(){var i,n,c,o,r,l,d,u,p,h,_,m,g,b,f,k,y,v,O,x;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.tableOption.group,t.next=3,Object(a["f"])();case 3:return n=t.sent,t.next=6,Object(a["c"])({size:100});case 6:return c=t.sent,t.next=9,Object(a["d"])();case 9:return o=t.sent,t.next=12,Object(a["g"])();case 12:return r=t.sent,t.next=15,Object(a["e"])();case 15:return l=t.sent,t.next=18,Object(a["h"])();case 18:if(d=t.sent,i[0].column[1].dicData=n.data,i[5].column[0].dicData=c.items,e.domainOptions=o.data,e.siteOptions=r.data,e.pocOptions=l.data,e.bruteOptions=d.data,"edit"!=e.type){t.next=51;break}return t.next=28,Object(a["j"])(e.currId);case 28:for(O in u=t.sent,p=u["items"][0],h=p.policy,_=h.poc_config,m=h.brute_config,g=h.scope_config,b=h.site_config,f=h.file_leak,k=h.domain_config,y=h.ip_config,e.checked_poc=_.map((function(e){return e.plugin_name})),e.checked_brute=m.map((function(e){return e.plugin_name})),e.form.scope_id=g.scope_id,e.checked_site=Object.keys(b),f&&e.checked_site.push("file_leak"),e.form.domain_brute_type=k.domain_brute_type,e.form.port_scan_type=y.port_scan_type,e.form.host_timeout_type=y.host_timeout_type,e.form.host_timeout=y.host_timeout,e.form.port_parallelism=y.port_parallelism,e.form.port_min_rate=y.port_min_rate,v=[],y)y.hasOwnProperty(O)&&!0===y[O]&&v.push(O);for(x in k)k.hasOwnProperty(x)&&!0===k[x]&&v.push(x);e.checked_domain=v,e.checked_domain.length?e.checked_domain.length==e.domainOptions.length?(e.isIndeterminate_domain=!1,e.checkAll_domain=!0):(e.isIndeterminate_domain=!0,e.checkAll_domain=!1):(e.checkAll_domain=!1,e.isIndeterminate_domain=!1),e.checked_site.length?e.checked_site.length==e.siteOptions.length?(e.isIndeterminate_site=!1,e.checkAll_site=!0):(e.isIndeterminate_site=!0,e.checkAll_site=!1):(e.checkAll_site=!1,e.isIndeterminate_site=!1),e.checked_poc.length?e.checked_poc.length==e.pocOptions.length?(e.isIndeterminate_poc=!1,e.checkAll_poc=!0):(e.isIndeterminate_poc=!0,e.checkAll_poc=!1):(e.checkAll_poc=!1,e.isIndeterminate_poc=!1),e.checked_brute.length?e.checked_brute.length==e.bruteOptions.length?(e.isIndeterminate_brute=!1,e.checkAll_brute=!0):(e.isIndeterminate_brute=!0,e.checkAll_brute=!1):(e.checkAll_brute=!1,e.isIndeterminate_brute=!1);case 51:case"end":return t.stop()}}),t)})))()},selectionChange:function(e){this.selectedRows=e},getPage:function(e,t){var i=this;this.listLoading=!0,Object(a["k"])(Object.assign({page:e.currentPage,size:e.pageSize,descs:this.page.descs,ascs:this.page.ascs},t)).then((function(e){200==e.code&&(i.list=e.items,i.page.total=e.total,i.page.currentPage=e.page,i.page.pageSize=e.size)})).catch((function(e){})).finally((function(){i.listLoading=!1}))},refreshChange:function(e){this.getPage(this.page)},searchChange:function(e,t){this.page.currentPage=1,this.getPage(this.page,this.filterForm(e)),t()},handleCellEnter:function(e){this.currId=e._id},beforeOpen:function(e,t){this.type=t,this.getDic(),e()},handleDel:function(e){var t=this;this.$confirm("是否确认删除选择的记录","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i={policy_id:[e._id]};Object(a["b"])(i).then((function(e){200==e.code?(t.$message({showClose:!0,message:e.message,type:"success"}),t.getPage(t.page)):t.$message({showClose:!0,message:e.message,type:"error"})}))}))},handleUpdate:function(e,t,i){for(var n=this,c=this,s=[],o=[],r=function(e){var t=n.pocOptions.find((function(t){return t.key==n.checked_poc[e]})),i={enable:!0,plugin_name:t.key,vul_name:t.value};s.push(i)},l=0;l<this.checked_poc.length;l++)r(l);for(var d=function(e){var t=n.bruteOptions.find((function(t){return t.key==n.checked_brute[e]})),i={enable:!0,plugin_name:t.key,vul_name:t.value};o.push(i)},u=0;u<this.checked_brute.length;u++)d(u);var p={name:e.name,desc:e.desc,policy:{domain_config:{domain_brute_type:e.domain_brute_type,alt_dns:this.checked_domain.includes("alt_dns"),arl_search:this.checked_domain.includes("arl_search"),dns_query_plugin:this.checked_domain.includes("dns_query_plugin"),domain_brute:this.checked_domain.includes("domain_brute"),skip_scan_cdn_ip:this.checked_domain.includes("skip_scan_cdn_ip")},ip_config:{port_scan_type:e.port_scan_type,host_timeout_type:e.host_timeout_type,host_timeout:e.host_timeout,port_parallelism:e.port_parallelism,port_min_rate:e.port_min_rate,os_detection:this.checked_domain.includes("os_detection"),port_scan:this.checked_domain.includes("port_scan"),service_detection:this.checked_domain.includes("service_detection"),ssl_cert:this.checked_domain.includes("ssl_cert")},site_config:{nuclei_scan:this.checked_site.includes("nuclei_scan"),search_engines:this.checked_site.includes("search_engines"),site_capture:this.checked_site.includes("site_capture"),site_identify:this.checked_site.includes("site_identify"),site_spider:this.checked_site.includes("site_spider")},poc_config:s,brute_config:o,scope_config:{scope_id:e.scope_id},npoc_service_detection:this.checked_domain.includes("npoc_service_detection"),file_leak:this.checked_site.includes("file_leak")}},h={policy_data:p,policy_id:e._id};Object(a["l"])(h).then((function(e){200==e.code?(c.$message({showClose:!0,message:e.message,type:"success"}),c.getPage(n.page)):(c.$message({showClose:!0,message:e.message,type:"error"}),c.getPage(n.page))})).finally((function(){t(),i()}))},handleSave:function(e,t,i){for(var n=this,c=this,s=[],o=[],r=function(e){var t=n.pocOptions.find((function(t){return t.key==n.checked_poc[e]})),i={enable:!0,plugin_name:t.key,vul_name:t.value};s.push(i)},l=0;l<this.checked_poc.length;l++)r(l);for(var d=function(e){var t=n.bruteOptions.find((function(t){return t.key==n.checked_brute[e]})),i={enable:!0,plugin_name:t.key,vul_name:t.value};o.push(i)},u=0;u<this.checked_brute.length;u++)d(u);var p={name:e.name,desc:e.desc,policy:{domain_config:{domain_brute_type:e.domain_brute_type,alt_dns:this.checked_domain.includes("alt_dns"),arl_search:this.checked_domain.includes("arl_search"),dns_query_plugin:this.checked_domain.includes("dns_query_plugin"),domain_brute:this.checked_domain.includes("domain_brute"),skip_scan_cdn_ip:this.checked_domain.includes("skip_scan_cdn_ip")},ip_config:{port_scan_type:e.port_scan_type,host_timeout_type:e.host_timeout_type,host_timeout:e.host_timeout,port_parallelism:e.port_parallelism,port_min_rate:e.port_min_rate,os_detection:this.checked_domain.includes("os_detection"),port_scan:this.checked_domain.includes("port_scan"),service_detection:this.checked_domain.includes("service_detection"),ssl_cert:this.checked_domain.includes("ssl_cert")},site_config:{nuclei_scan:this.checked_site.includes("nuclei_scan"),search_engines:this.checked_site.includes("search_engines"),site_capture:this.checked_site.includes("site_capture"),site_identify:this.checked_site.includes("site_identify"),site_spider:this.checked_site.includes("site_spider")},poc_config:s,brute_config:o,scope_config:{scope_id:e.scope_id},npoc_service_detection:this.checked_domain.includes("npoc_service_detection"),file_leak:this.checked_site.includes("file_leak")}};Object(a["a"])(p).then((function(e){200==e.code?(c.$message({showClose:!0,message:e.message,type:"success"}),c.getPage(n.page)):(c.$message({showClose:!0,message:e.message,type:"error"}),c.getPage(n.page))})).catch((function(e){})).finally((function(){t(),i()}))},showDialog:function(e,t){this.mDialog.sign=t,this.mDialog.visible=!0,"distribution"==t&&(this.mDialog.hasFoot=!1,this.mDialog.title="任务下发",this.distributionForm.policy_id=e._id)},handleSubmit_distribution:function(e,t){var i=this;Object(a["i"])(this.distributionForm).then((function(e){i.$message({showClose:!0,message:e.message,type:"success"}),i.closeDialog()})).catch((function(e){i.$message({showClose:!0,message:res.message,type:"error"})})).finally((function(){t()}))},closeDialog:function(){this.mDialog.visible=!1}}},d=l,u=i("2877"),p=Object(u["a"])(d,n,c,!1,null,null,null);t["default"]=p.exports},fc1e:function(e,t,i){"use strict";i.d(t,"k",(function(){return c})),i.d(t,"j",(function(){return s})),i.d(t,"a",(function(){return o})),i.d(t,"l",(function(){return a})),i.d(t,"b",(function(){return r})),i.d(t,"i",(function(){return l})),i.d(t,"d",(function(){return d})),i.d(t,"e",(function(){return u})),i.d(t,"f",(function(){return p})),i.d(t,"g",(function(){return h})),i.d(t,"h",(function(){return _})),i.d(t,"c",(function(){return m}));var n=i("b775");function c(e){return Object(n["a"])({url:"/policy/",method:"GET",params:e})}function s(e){return Object(n["a"])({url:"/policy/?_id=".concat(e),method:"GET"})}function o(e){return Object(n["a"])({url:"/policy/add/",method:"POST",data:e})}function a(e){return Object(n["a"])({url:"/policy/edit/",method:"POST",data:e})}function r(e){return Object(n["a"])({url:"/policy/delete/",method:"POST",data:e})}function l(e){return Object(n["a"])({url:"/task/policy/",method:"POST",data:e})}function d(){return Object(n["a"])({url:"/policy/get_domain_function",method:"GET"})}function u(){return Object(n["a"])({url:"/policy/get_poc_config",method:"GET"})}function p(){return Object(n["a"])({url:"/policy/get_port_scan_type",method:"GET"})}function h(){return Object(n["a"])({url:"/policy/get_site_vuln",method:"GET"})}function _(){return Object(n["a"])({url:"/policy/get_weak_password",method:"GET"})}function m(e){return Object(n["a"])({url:"/asset_scope/",method:"GET",params:e})}}}]);