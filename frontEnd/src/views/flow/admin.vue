<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :page.sync="page" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange" @row-update="handleUpdate"
                @row-save="handleSave" @row-del="handleDel">

                <template slot="menu" slot-scope="{row,index}">
                    <!-- 状态(0:待提交(已撤回),1:已提交(待审核),2:审核通过,3:审核不通过 -->
                    <template v-if="row.status == 1">
                        <el-button type="text" size="small" icon="el-icon-check" @click="handleProcess(row,'2')">通过</el-button>
                        <el-button type="text" size="small" icon="el-icon-close" @click="handleProcess(row,'3')">驳回</el-button>
                    </template>

                </template>
                <template slot="status" slot-scope="{row}">
                    <el-tag size="small" type="info" v-if="row.status=='0'">待提交</el-tag>
                    <el-tag size="small" type="warning" v-if="row.status=='1'">待审核</el-tag>
                    <el-tag size="small" type="success" v-if="row.status=='2'">审核通过</el-tag>
                    <el-tag size="small" type="danger" v-if="row.status=='3'">审核不通过</el-tag>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import { addObj, updateObj, delObj, getObj, processObj, getAdminPage as getPage } from '@/api/flowMgr/flow'
import { tableOption } from '@/crud/flowMgr/admin'
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
            firstLevelMenuList: []
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
        handleControl(type, row, index) {
            if (type === 'edit') {
                this.$refs.crud.rowEdit(row, index)
            }
            if (type === 'del') {
                this.$refs.crud.rowDel(row, index)
            }
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
            ).then(({ data }) => {
                this.list = data.items
                this.page.total = data.total
                this.page.currentPage = data.page
                this.page.pageSize = data.size
                this.listLoading = false
            }).catch(() => {
                this.listLoading = false
            })
        },
        refreshChange(page) {
            console.log('refreshChange', page)
            this.getPage(this.page)
        },
        searchChange(param, done) {
            console.log('searchChange', param)
            this.page.currentPage = 1
            this.getPage(this.page, this.filterForm(param))
            done()
        },
        beforeOpen(done, type) {
            console.log(type)
            let column = this.tableOption.column[3];
            column.dicData = this.firstLevelMenuList
            done()
        },
        handleDel(row, index) {
            let _this = this
            this.$confirm('是否确认删除?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        id: row.id
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
                .catch((err) => {
                    console.log('err', err)
                })
        },
        handleSave(row, done, loading) {
            let _this = this
            const params = { ...row }
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
        handleUpdate(row, index, done, loading) {
            let _this = this
            const params = { ...row }
            params.status='0' //编辑时，状态重置为0，解决=》审核不通过后，重新编辑为可提交状态
            updateObj(params)
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
        handleProcess(row, status) {
            let _this = this
            this.$confirm(`是否确认${status=='2'?'通过':'驳回'}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        status
                    }
                    processObj(row.id,params).then((res) => {
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
                .catch((err) => {
                    console.log('err', err)
                })
        },
    }
}
</script>
