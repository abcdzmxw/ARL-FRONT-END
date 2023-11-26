<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :page.sync="page" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @selection-change="selectionChange" @search-change="searchChange" @refresh-change="refreshChange"
                @row-save="handleSave" @row-del="handleDelete">
                <template slot="statistic" slot-scope="{row}">
                    <div v-if="!row.statistic">-</div>
                    <div v-else>
                        <span>站点：{{ row.statistic.site_cnt }}</span><br /><span>域名：{{ row.statistic.domain_cnt }}</span>
                    </div>
                </template>
                <template slot="options" slot-scope="{row}">
                    options
                </template>
                <template slot="name" slot-scope="{row}">
                    <a :href="'###'+row.target" class="aa" @click="linkTo(row)">{{ row.name }}</a>
                    <!-- <a :href="'###' + row.target" class="aa" @click="(e) => linkTo(e, row)">{{ row.name }}</a> -->
                </template>
                <template slot="functionForm" slot-scope="scope">
                    <div>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllFunctions"
                            @change="handleCheckAllFunctionChange">全选</el-checkbox>
                    </div>
                    <el-checkbox-group v-model="checkedFuction" @change="handleCheckedFunctionChange"
                        style="margin-top:10px;width:460px">
                        <el-checkbox v-for="item in functionOptions" :key="item.key" :label="item.key">{{ item.value
                        }}</el-checkbox>
                    </el-checkbox-group>
                </template>
                <template slot="status" slot-scope="{row}">
                    <el-tag size="mini" type="success" v-if="row.status == 'done'">{{ row.status }}</el-tag>
                    <el-tag size="mini" type="info" v-else-if="row.status == 'error'">{{ row.status }}</el-tag>
                    <el-tag size="mini" v-else>{{ row.status }}</el-tag>
                </template>
                <template slot="menuLeft">
                    <el-button size="mini" icon="el-icon-mouse" type="primary"
                        @click="showDialog('fofa')">FOFA任务下发</el-button>
                    <el-button size="small" icon="el-icon-delete" @click="handleDelete"
                        :disabled="!selectedRows.length">批量删除</el-button>
                    <el-button size="small" icon="el-icon-delete" @click="handleStop"
                        :disabled="!selectedRows.length">批量停止</el-button>
                    <el-select :disabled="!selectedRows.length" clearable size="small" v-model="exportValue"
                        placeholder="批量导出" style="width:140px !important" @change="handleExport">
                        <el-option v-for="item in exportOptions" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </template>
                <template slot="menu" slot-scope="{row}">
                    <el-button size="small" type="text" icon="el-icon-refresh"
                        @click="showDialog('sync', row)">同步</el-button>
                    <el-button size="small" type="text" icon="el-icon-download" @click="handleExport(row)">导出</el-button>
                    <el-button size="small" type="text" icon="el-icon-turn-off" @click="handleStop(row)">停止</el-button>
                    <el-button size="small" type="text" icon="el-icon-open" @click="handleRestart(row)">重启</el-button>
                </template>
            </avue-crud>
            <!-- 弹窗 -->
            <el-dialog size="small" :title="mDialog.title" :visible.sync="mDialog.visible"
                class="avue-dialog avue-dialog--top" :width="mDialog.width" top="0" :close-on-click-modal="false"
                destroyOnClose @opened="beforeOpen2">
                <div>
                    <!-- 同步 -->
                    <template v-if="mDialog.sign == 'sync'">
                        <avue-form ref="sync" v-model="syncForm" :option="syncOption">
                        </avue-form>
                    </template>
                    <!-- fofa任务下发 -->
                    <template v-if="mDialog.sign == 'fofa'">
                        <avue-form ref="fofa" v-model="fofaForm" :option="fofaOption">
                            <template slot="query">
                                <el-input v-model="fofaForm.query">
                                    <el-button slot="append" @click="handleQueryTest">测试</el-button>
                                </el-input>
                                <div>结果数：{{ testCount }}</div>
                            </template>
                        </avue-form>
                    </template>
                </div>
                <div class="avue-dialog__footer" v-if="mDialog.hasFoot">
                    <el-button size="small" @click="mDialog.visible = false">取 消</el-button>
                    <el-button size="small" @click="handleDialogSubmit" type="primary">确 定</el-button>
                </div>
            </el-dialog>
        </basic-container>
    </div>
</template>

<script>
import {
    getPage, addObj, delObj, exportObj, batchStopObj, stopObj, restartObj,
    syncObj, fofaSubmitObj, fofaTestObj,
    dicDomainBruteType, dicFunction, dicPortScanType
} from '@/api/task/index'
import { tableOption } from '@/crud/task/index'
import mixScopeSelect from '@/mixins/ScopeSelect'
import mixPolicySelect from '@/mixins/PolicySelect'
export default {
    name: 'MenuList',
    components: {},
    mixins: [mixScopeSelect, mixPolicySelect],
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
            selectedRows: [],
            exportOptions: [
                { label: 'C段批量导出', value: 'cip' },
                { label: '域名批量导出', value: 'domain' },
                { label: 'IP批量导出', value: 'ip' },
                { label: 'IP端口批量导出', value: 'ip_port' },
                { label: '站点批量导出', value: 'site' },
                { label: 'URL批量导出', value: 'url' },
            ],
            checkAllFunctions: false,
            isIndeterminate: false,
            exportValue: '',//选中的批量导出类型
            checkedFuction: [],//选中的功能
            functionOptions: [], //功能列表
            domainBruteOptions: [],//域名爆破数组
            portScanOptions: [],//端口扫描类型数组
            mDialog: {
                title: '提示',
                visible: false,
                width: '40%',
                hasFoot: true,
                sign: ''
            },
            syncOption: {
                labelWidth: 120,
                menuBtn: false,
                column: [
                    {
                        label: '资产信息',
                        type: 'select',
                        prop: 'scope_id',
                        span: 23,
                        // slot: true,
                        props: {
                            label: 'name',
                            value: '_id'
                        },
                        dicData: [],
                        rules: [{
                            required: true,
                            message: "请选择",
                            trigger: "blur"
                        }],
                    },
                ]
            },
            syncForm: {},
            curr_task_id: '',//当前taskId
            fofaForm: {},
            fofaOption: {
                labelWidth: 120,
                menuBtn: false,
                column: [
                    {
                        label: '任务名称',
                        prop: 'name',
                        span: 23,
                        rules: [{
                            required: true,
                            message: "请填写",
                            trigger: "blur"
                        }],
                    },
                    {
                        label: '查询语句',
                        prop: 'query',
                        span: 23,
                        rules: [{
                            required: true,
                            message: "请填写",
                            trigger: "blur"
                        }],
                    },
                    {
                        label: '关联策略',
                        type: 'select',
                        prop: 'policy_id',
                        // slot: true,
                        span: 23,
                        props: {},
                        dicData: [],
                        rules: [{
                            required: false,
                            message: "请选择",
                            trigger: "blur"
                        }],
                    },
                ]
            },
            testCount: 0,
        }
    },
    computed: {
        permissionList() {
            return {}
        }
    },
    watch: {},
    created() {
        // this.getDic()
    },
    methods: {
        // async getDic() {
        //     let result1 = await dicDomainBruteType()
        //     let result2 = await dicPortScanType()
        //     let result3 = await dicFunction()
        //     console.log('result1',result1)
        //     this.domainBruteOptions = result1.data
        //     this.portScanOptions = result2.data
        //     this.functionOptions = result3.data
        // },
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
                console.log('getPage res', res)
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
        async beforeOpen(done, type) {
            let column = this.tableOption.column
            let result1 = await dicDomainBruteType()
            let result2 = await dicPortScanType()
            let result3 = await dicFunction()
            column[9].dicData = result1.data
            column[10].dicData = result2.data
            this.functionOptions = result3.data
            done()
        },
        handleRestart(row) {
            let _this = this
            this.$confirm(`是否重启选择的记录`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        task_id: [row._id]
                    }

                    restartObj(params)
                        .then((res) => {
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
        handleStop(row) {
            let _this = this
            this.$confirm(`是否确认停止选择的记录`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    // row._id 表示row， 否则是批量
                    let params = row._id ? row._id : {
                        task_id: _this.selectedRows.map(item => item._id)
                    }
                    let API = row._id ? stopObj : batchStopObj

                    API(params)
                        .then((res) => {
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
        handleDelete(row) {
            let _this = this
            this.$confirm(`是否确认删除选择的记录`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        // row._id 表示row删除， 否则是批量删除
                        task_id: row._id ? [row._id] : _this.selectedRows.map(item => item._id)
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
        handleExport(row) {
            let _this = this
            this.$confirm(`是否导出?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                let type = row._id ? '' : _this.exportValue  //==TODO 如果是行操作，判断type的值
                let data = {
                    task_id: row._id ? [row._id] : _this.selectedRows.map(item => item._id)
                }
                console.log('type', type, 'data:', data)
                exportObj(type, data).then(res => {
                    if (window.navigator.msSaveBlob) {
                        try {
                            const blobObject = new Blob([res.data]);
                            window.navigator.msSaveBlob(blobObject, '导出文件.txt');
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        let url = window.URL.createObjectURL(res.data)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', '导出文件.txt')
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        window.URL.revokeObjectURL(link.href);
                    }
                }).catch(err => {
                    console.log('err', err)
                }).finally(() => {
                    _this.listLoading = false
                })
            })
        },
        handleSave(row, done, loading) {
            let _this = this
            let { name, target, domain_brute_type, port_scan_type } = row
            let params1 = { name, target, domain_brute_type, port_scan_type }
            let params2 = {};
            _this.functionOptions.forEach(function (item) {
                params2[item.key] = _this.checkedFuction.includes(item.key)
            })
            console.log('params2', params2);
            let params = Object.assign(params1, params2)
            console.log('params', params);
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
        beforeOpen2() { },
        showDialog(sign, row) {
            this.mDialog.sign = sign
            this.mDialog.visible = true
            console.log('row', row);
            if (sign == 'sync') {
                this.mDialog.title = '同步';
                this.mDialog.width = '480px'
                this.curr_task_id = row._id
                this.syncOption.column[0].dicData = this.mixScopeData
            }
            if (sign == 'fofa') {
                this.mDialog.title = 'FOFA任务下发';
                this.mDialog.width = '680px'
                this.fofaOption.column[2].dicData = this.mixPolicyData
            }
        },
        handleDialogSubmit(done) {
            let params = {}
            let API = null
            if (this.mDialog.sign == 'sync') {
                this.$refs.sync.validate(vaild => {
                    if (vaild) {
                        params = {
                            "task_id": this.curr_task_id,
                            "scope_id": this.syncForm.scope_id
                        }
                        API = syncObj
                    }
                })
            }
            if (this.mDialog.sign == 'fofa') {
                this.$refs.fofa.validate(vaild => {
                    if (vaild) {
                        params = {
                            "query": this.fofaForm.query,
                            "name": this.fofaForm.name,
                            "policy_id": this.fofaForm.policy_id,
                        }
                        API = fofaSubmitObj
                    }
                })
            }
            if (!API) {
                return
            }
            API(params).then(res => {
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
            }).finally(() => {
                done()
                this.closeDialog()
            })
        },
        closeDialog() {
            this.mDialog.visible = false
        },
        handleQueryTest() {
            let _this = this
            if (!this.fofaForm.query) {
                return;
            }
            let params = {
                query: this.fofaForm.query
            }
            fofaTestObj(params).then(res => {
                console.log('fofaTestObj', res);
                // _this.testCount=  //TODO
                _this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                })
            })
        },
        linkTo(row) {
            console.log('row', row);
            // this.$router.push({
            //     path: '/task/detail',
            //     query: {
            //         task_id: row._id,
            //         targetName: row.target,
            //         statistic: JSON.stringify(row.statistic)
            //     }
            // })
            let routeUrl = this.$router.resolve({
                path: '/task/detail',
                query: {
                    task_id: row._id,
                    targetName: row.target,
                    statistic: JSON.stringify(row.statistic)
                }
            });
            window.open(routeUrl.href, '_blank')
        },
        // 功能框 选中项变化
        handleCheckedFunctionChange(value) {
            this.isIndeterminate = value.length > 0 && value.length < this.functionOptions.length
            this.checkAllFunctions = value.length === this.functionOptions.length;
        },
        //全选
        handleCheckAllFunctionChange(val) {
            this.checkedFuction = val ? this.functionOptions.map(item => item.key) : []
            this.isIndeterminate = false;
        },
    }
}
</script>
<style lang="scss" scoped>
a.aa:link {
    color: #46a6ff;
}

a.aa:visited {
    color: #ccc;
}

a.aa:hover {
    color: #46a6ff;
}</style>