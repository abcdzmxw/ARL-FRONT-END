<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange" @row-update="handleUpdate"
                @row-save="handleSave" @row-del="handleDel" @cell-mouse-enter="handleCellEnter">
                <template slot="fooDomainForm">
                    <div style="padding:10px 20px">
                        <el-checkbox :indeterminate="isIndeterminate_domain" v-model="checkAll_domain"
                            @change="(e) => handleCheckAllChange(e, 'domain')">全选</el-checkbox>
                        <!-- {{ checkAll_domain }} {{ checked_domain }} -->
                        <div style="margin:10px 0;border-top:1px solid #eee;"></div>
                        <el-checkbox-group v-model="checked_domain" @change="(e) => handleCheckedChange(e, 'domain')">
                            <el-checkbox v-for="item in domainOptions" :label="item.key">{{ item.value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </template>
                <template slot="fooSiteForm">
                    <div style="padding:10px 20px">
                        <el-checkbox :indeterminate="isIndeterminate_site" v-model="checkAll_site"
                            @change="(e) => handleCheckAllChange(e, 'site')">全选</el-checkbox>
                        <div style="margin:10px 0;border-top:1px solid #eee;"></div>
                        <el-checkbox-group v-model="checked_site" @change="(e) => handleCheckedChange(e, 'site')">
                            <el-checkbox v-for="item in siteOptions" :label="item.key">{{ item.value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </template>
                <template slot="fooPocForm">
                    <div style="padding:10px 20px">
                        <el-checkbox :indeterminate="isIndeterminate_poc" v-model="checkAll_poc"
                            @change="(e) => handleCheckAllChange(e, 'poc')">全选</el-checkbox>
                        <div style="margin:10px 0;border-top:1px solid #eee;"></div>
                        <el-checkbox-group v-model="checked_poc" @change="(e) => handleCheckedChange(e, 'poc')">
                            <el-checkbox v-for="item in pocOptions" :label="item.key">{{ item.value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </template>
                <template slot="fooBruteForm">
                    <div style="padding:10px 20px">
                        <el-checkbox :indeterminate="isIndeterminate_brute" v-model="checkAll_brute"
                            @change="(e) => handleCheckAllChange(e, 'brute')">全选</el-checkbox>
                        <div style="margin:10px 0;border-top:1px solid #eee;"></div>
                        <el-checkbox-group v-model="checked_brute" @change="(e) => handleCheckedChange(e, 'brute')">
                            <el-checkbox v-for="item in bruteOptions" :label="item.key">{{ item.value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </template>
                <!-- 操作栏 -->
                <template slot="menu" slot-scope="{row}">
                    <el-button size="small" type="text" icon="el-icon-news"
                        @click="showDialog(row, 'distribution')">任务下发</el-button>
                </template>
            </avue-crud>
        </basic-container>
        <!-- 弹窗 -->
        <el-dialog size="small" :title="mDialog.title" :visible.sync="mDialog.visible" class="avue-dialog avue-dialog--top"
            :width="mDialog.width" destroy-on-close>
            <div>
                <template v-if="mDialog.sign == 'distribution'">
                    <!-- {{ distributionForm }} -->
                    <avue-form ref="distribution" v-model="distributionForm" :option="distributionOption"
                        @submit="handleSubmit_distribution"></avue-form>
                </template>
            </div>
            <div class="avue-dialog__footer" v-if="mDialog.hasFoot">
                <el-button size="small" @click="mDialog.visible = false">取 消</el-button>
                <el-button size="small"  type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getPage, addObj, delObj, getObj, updateObj, dicAsset, dicPortScanType, dicDomainFunction, dicSiteVuln, dicWeakPassword, dicPocConfig, distributionObj
} from '@/api/policy/index'
import { tableOption } from '@/crud/policy/index'
export default {
    name: 'MenuList',
    components: {},
    data() {
        return {
            search: {},
            tableOption: tableOption,
            page: {
                total: 0,
                currentPage: 1, // 当前页数
                pageSize: 10,
                ascs: [],
                descs: [],
            },
            paramsSearch: {},
            list: [],
            listLoading: false,
            form: {},
            selectedRows: [], //选择

            checkAll_domain: false,
            checked_domain: [],
            isIndeterminate_domain: false,
            domainOptions: [],
            checkAll_site: false,
            checked_site: [],
            isIndeterminate_site: false,
            siteOptions: [],
            checkAll_poc: false,
            checked_poc: [],
            isIndeterminate_poc: false,
            pocOptions: [],
            checkAll_brute: false,
            checked_brute: [],
            isIndeterminate_brute: false,
            bruteOptions: [],
            currId: '',
            type: '',//弹窗open类型

            mDialog: {
                title: '提示',
                visible: false,
                width: '40%',
                hasFoot: true,
                sign: ''
            },
            distributionOption: {
                labelWidth: 120,
                column: [{
                    label: '任务类型',
                    prop: 'task_tag',
                    type: 'select',
                    value: 'task',
                    span: 24,
                    dicData: [
                        { label: '资产侦查任务', value: 'task' },
                        { label: '风险巡航任务', value: 'risk_cruising' },
                    ],
                    rules: [{
                        required: true,
                        message: "请选择类型",
                        trigger: "blur"
                    }],
                    control: (val, form) => {
                        if (val == 'task') {
                            return {
                                target: {
                                    placeholder: '请输入目标，支持IP、IP段、域名',
                                }
                            }
                        } else {
                            return {
                                target: {
                                    placeholder: '请输入确定的目标，不会进行端口扫描,如: http://10.0.1.1:8081/ 10.0.1.1:2222',
                                }
                            }
                        }
                    }
                },
                {
                    label: '任务名称',
                    prop: 'name',
                    span: 24,
                    rules: [{
                        required: true,
                        message: "请填写",
                        trigger: "blur"
                    }],
                },
                {
                    label: '目标',
                    prop: 'target',
                    type: 'textarea',
                    span: 24,
                    placeholder: '请输入目标，支持IP、IP段、域名',
                    rules: [{
                        required: true,
                        message: "请填写",
                        trigger: "blur"
                    }]
                },
                ]
            },
            distributionForm: {
                policy_id: ''
            }
        }
    },
    computed: {
        permissionList() {
            return {}
        }
    },
    watch: {},
    created() {

    },
    methods: {
        handleCheckAllChange(val, sign) {
            let options = sign + 'Options'
            let checkedAllValue = this[options].map(item => item.key) //选项值
            let checkedValue = 'checked_' + sign
            let isIndeterminate = 'isIndeterminate_' + sign
            this[checkedValue] = val ? checkedAllValue : []; //全选/不选对应的，选中项
            this[isIndeterminate] = false;
        },
        handleCheckedChange(e, sign) {
            let options = sign + 'Options'  // options数组
            let isIndeterminate = 'isIndeterminate_' + sign
            let checkAll = 'checkAll_' + sign
            this[isIndeterminate] = e.length > 0 && e.length < this[options].length //是否半选
            this[checkAll] = e.length == this[options].length //全选的值
        },
        async getDic() {
            let group = this.tableOption.group;
            let portScanTypeResult = await dicPortScanType() //端口扫描类型
            let assetResult = await dicAsset({ size: 100 }) //端口扫描类型
            let dicDomainFunctionResult = await dicDomainFunction() //域名和IP复选框选项s
            let dicSiteVulnResult = await dicSiteVuln() //站点风险复选框选项s
            let dicPocConfigResult = await dicPocConfig() //Poc复选框选项s
            let dicWeakPasswordResult = await dicWeakPassword() //弱口令复选框选项s
            group[0].column[1].dicData = portScanTypeResult.data
            group[5].column[0].dicData = assetResult.items
            this.domainOptions = dicDomainFunctionResult.data
            this.siteOptions = dicSiteVulnResult.data
            this.pocOptions = dicPocConfigResult.data
            this.bruteOptions = dicWeakPasswordResult.data
            // 编辑时，先请求 再赋值
            if (this.type == 'edit') {
                let detail = await getObj(this.currId)
                let initForm = detail['items'][0]
                console.log('detail=>', initForm)
                let { poc_config, brute_config, scope_config,
                    site_config, file_leak, domain_config, ip_config
                } = initForm.policy
                this.checked_poc = poc_config.map(item => item.plugin_name)
                this.checked_brute = brute_config.map(item => item.plugin_name)
                this.form.scope_id = scope_config.scope_id
                this.checked_site = Object.keys(site_config)
                if (file_leak) {
                    this.checked_site.push('file_leak')
                }
                this.form.domain_brute_type = domain_config.domain_brute_type
                this.form.port_scan_type = ip_config.port_scan_type
                this.form.host_timeout_type = ip_config.host_timeout_type
                this.form.host_timeout = ip_config.host_timeout
                this.form.port_parallelism = ip_config.port_parallelism
                this.form.port_min_rate = ip_config.port_min_rate
                let temp = [] //域名复选框 ,分散在domain_config和ip_config里，要遍历2个
                for (let key in ip_config) {
                    if (ip_config.hasOwnProperty(key)) {
                        if (ip_config[key] === true) {
                            temp.push(key)
                        }
                    }
                }
                for (let key in domain_config) {
                    if (domain_config.hasOwnProperty(key)) {
                        if (domain_config[key] === true) {
                            temp.push(key)
                        }
                    }
                }
                this.checked_domain = temp
                // 处理全选显示状态
                if (!this.checked_domain.length) {
                    this.checkAll_domain = false
                    this.isIndeterminate_domain = false
                } else {
                    if (this.checked_domain.length == this.domainOptions.length) {
                        this.isIndeterminate_domain = false
                        this.checkAll_domain = true
                    } else {
                        this.isIndeterminate_domain = true
                        this.checkAll_domain = false
                    }
                }

                if (!this.checked_site.length) {
                    this.checkAll_site = false
                    this.isIndeterminate_site = false
                } else {
                    if (this.checked_site.length == this.siteOptions.length) {
                        this.isIndeterminate_site = false
                        this.checkAll_site = true
                    } else {
                        this.isIndeterminate_site = true
                        this.checkAll_site = false
                    }
                }

                if (!this.checked_poc.length) {
                    this.checkAll_poc = false
                    this.isIndeterminate_poc = false
                } else {
                    if (this.checked_poc.length == this.pocOptions.length) {
                        this.isIndeterminate_poc = false
                        this.checkAll_poc = true
                    } else {
                        this.isIndeterminate_poc = true
                        this.checkAll_poc = false
                    }
                }

                if (!this.checked_brute.length) {
                    this.checkAll_brute = false
                    this.isIndeterminate_brute = false
                } else {
                    if (this.checked_brute.length == this.bruteOptions.length) {
                        this.isIndeterminate_brute = false
                        this.checkAll_brute = true
                    } else {
                        this.isIndeterminate_brute = true
                        this.checkAll_brute = false
                    }
                }
            }
        },
        selectionChange(rows) {
            this.selectedRows = rows
        },
        getPage(page, params) {
            this.listLoading = true
            getPage(
                Object.assign(
                    {
                        page: page.currentPage,
                        size: page.pageSize,
                        descs: this.page.descs,
                        ascs: this.page.ascs,
                    },
                    params,
                )
            ).then((res) => {
                if (res.code == 200) {
                    this.list = res.items
                    this.page.total = res.total
                    this.page.currentPage = res.page
                    this.page.pageSize = res.size
                }
            }).catch(err => {
                console.log('err', err)
            }).finally(() => {
                this.listLoading = false
            })
        },
        refreshChange(page) {
            this.getPage(this.page)
        },
        searchChange(param, done) {
            this.page.currentPage = 1
            this.getPage(this.page, this.filterForm(param))
            done()
        },
        handleCellEnter(row) {
            this.currId = row._id
        },
        beforeOpen(done, type) {
            this.type = type
            this.getDic()
            done()
        },
        handleDel(row) {
            console.log(row)
            let _this = this
            this.$confirm(`是否确认删除选择的记录`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        policy_id: [row._id]
                    }
                    delObj(params).then((res) => {
                        if (res.code == 200) {
                            _this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'success'
                            })
                            _this.getPage(_this.page)
                        } else {
                            _this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'error'
                            })
                        }

                    })
                })
        },
        handleUpdate(row, done, loading) {
            let _this = this
            let poc_config = []
            let brute_config = []
            for (let i = 0; i < this.checked_poc.length; i++) {
                let temp = this.pocOptions.find(item => item.key == this.checked_poc[i])
                let item = {
                    enable: true,
                    plugin_name: temp.key,
                    vul_name: temp.value,
                }
                poc_config.push(item)
            }
            for (let i = 0; i < this.checked_brute.length; i++) {
                let temp = this.bruteOptions.find(item => item.key == this.checked_brute[i])
                let item = {
                    enable: true,
                    plugin_name: temp.key,
                    vul_name: temp.value,
                }
                brute_config.push(item)
            }
            let policy_data = {
                name: row.name,
                desc: row.desc,
                policy: {
                    "domain_config": {
                        domain_brute_type: row.domain_brute_type,
                        alt_dns: this.checked_domain.includes('alt_dns'),
                        arl_search: this.checked_domain.includes('arl_search'),
                        dns_query_plugin: this.checked_domain.includes('dns_query_plugin'),
                        domain_brute: this.checked_domain.includes('domain_brute'),
                        skip_scan_cdn_ip: this.checked_domain.includes('skip_scan_cdn_ip'),
                    }, //域名和IP配置
                    "ip_config": {
                        port_scan_type: row.port_scan_type,//端口扫描类型 （在域名组里跑这了）
                        host_timeout_type: row.host_timeout_type,
                        host_timeout: row.host_timeout,
                        port_parallelism: row.port_parallelism,
                        port_min_rate: row.port_min_rate,
                        os_detection: this.checked_domain.includes('os_detection'),
                        port_scan: this.checked_domain.includes('port_scan'),
                        service_detection: this.checked_domain.includes('service_detection'),
                        ssl_cert: this.checked_domain.includes('ssl_cert'),
                    },//IP高级配置
                    "site_config": {
                        nuclei_scan: this.checked_site.includes('nuclei_scan'),
                        search_engines: this.checked_site.includes('search_engines'),
                        site_capture: this.checked_site.includes('site_capture'),
                        site_identify: this.checked_site.includes('site_identify'),
                        site_spider: this.checked_site.includes('site_spider'),
                    },//站点和风险配置
                    poc_config,//poc配置
                    brute_config,//弱口令爆破配置
                    "scope_config": {//关联资产组
                        scope_id: row.scope_id
                    },
                    "npoc_service_detection": this.checked_domain.includes('npoc_service_detection'), //在domain复选框里，
                    "file_leak": this.checked_site.includes('file_leak'), //站点复选框里
                }
            }
            let updateData = {
                policy_data,
                policy_id: row._id
            }
            updateObj(updateData).then(res => {
                console.log('edit', res)
                if (res.code == 200) {
                    _this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'success'
                    })
                    _this.getPage(this.page)
                } else {
                    _this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    })
                    _this.getPage(this.page)
                }
            })
                .finally(() => {
                    done()
                    loading()
                })
        },
        handleSave(row, done, loading) {
            let _this = this
            // console.log(row)
            // console.log(1, this.checked_domain)
            // console.log(2, this.checked_site)
            // console.log(3, this.checked_poc)
            // console.log(4, this.checked_brute)

            let poc_config = []
            let brute_config = []
            for (let i = 0; i < this.checked_poc.length; i++) {
                let temp = this.pocOptions.find(item => item.key == this.checked_poc[i])
                let item = {
                    enable: true,
                    plugin_name: temp.key,
                    vul_name: temp.value,
                }
                poc_config.push(item)
            }
            for (let i = 0; i < this.checked_brute.length; i++) {
                let temp = this.bruteOptions.find(item => item.key == this.checked_brute[i])
                let item = {
                    enable: true,
                    plugin_name: temp.key,
                    vul_name: temp.value,
                }
                brute_config.push(item)
            }
            let params = {
                name: row.name,
                desc: row.desc,
                policy: {
                    "domain_config": {
                        domain_brute_type: row.domain_brute_type,
                        alt_dns: this.checked_domain.includes('alt_dns'),
                        arl_search: this.checked_domain.includes('arl_search'),
                        dns_query_plugin: this.checked_domain.includes('dns_query_plugin'),
                        domain_brute: this.checked_domain.includes('domain_brute'),
                        skip_scan_cdn_ip: this.checked_domain.includes('skip_scan_cdn_ip'),
                    }, //域名和IP配置
                    "ip_config": {
                        port_scan_type: row.port_scan_type,//端口扫描类型 （在域名组里跑这了）
                        host_timeout_type: row.host_timeout_type,
                        host_timeout: row.host_timeout,
                        port_parallelism: row.port_parallelism,
                        port_min_rate: row.port_min_rate,
                        os_detection: this.checked_domain.includes('os_detection'),
                        port_scan: this.checked_domain.includes('port_scan'),
                        service_detection: this.checked_domain.includes('service_detection'),
                        ssl_cert: this.checked_domain.includes('ssl_cert'),
                    },//IP高级配置
                    "site_config": {
                        nuclei_scan: this.checked_site.includes('nuclei_scan'),
                        search_engines: this.checked_site.includes('search_engines'),
                        site_capture: this.checked_site.includes('site_capture'),
                        site_identify: this.checked_site.includes('site_identify'),
                        site_spider: this.checked_site.includes('site_spider'),
                    },//站点和风险配置
                    poc_config,//poc配置
                    brute_config,//弱口令爆破配置
                    "scope_config": {//关联资产组
                        scope_id: row.scope_id
                    },
                    "npoc_service_detection": this.checked_domain.includes('npoc_service_detection'), //在domain复选框里，
                    "file_leak": this.checked_site.includes('file_leak'), //站点复选框里
                }
            }
            console.log('save params', params)
            // return;
            addObj(params)
                .then((res) => {
                    if (res.code == 200) {
                        _this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        })
                        _this.getPage(this.page)
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error'
                        })
                        _this.getPage(this.page)
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                }).finally(() => {
                    done()
                    loading()
                })
        },
        // 弹窗打开
        showDialog(row, sign) {
            this.mDialog.sign = sign
            this.mDialog.visible = true
            if (sign == 'distribution') {
                this.mDialog.hasFoot = false
                this.mDialog.title = '任务下发'
                this.distributionForm.policy_id = row._id
            }
        },
        // 任务下发
        handleSubmit_distribution(form, done) {
            // console.log(form)
            distributionObj(this.distributionForm).then(res => {
                // console.log('res===>',res)
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                })
                this.closeDialog()
            }).catch(err => {
                // console.log('err===>',err)
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }).finally(()=>{
                done()
            })
        },
        closeDialog() {
            this.mDialog.visible = false
        }
    }
}
</script>
