<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :page.sync="page" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange">
                <template slot="menuLeft">
                    <el-button type="primary" size="small" icon="el-icon-refresh" @click="handleSync">更新</el-button>
                    <el-button size="small" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import { emptyObj, getPage, syncObj } from '@/api/poc/index'
import { tableOption } from '@/crud/poc/index'
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
            ).then(({data}) => {
                if (data.code == 200) {
                    this.list = data.items
                    this.page.total = data.total
                    this.page.currentPage = data.page
                    this.page.pageSize = data.size
                }

            }).catch(err => {
                console.log('err',err)
            }).finally(()=>{
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
        beforeOpen(done, type) {
            done()
        },
        handleSubmit(row, index) {
            let _this = this
            this.$confirm(`是否确认${row.status == '1' ? '撤销审核' : '提交审核'}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        status: row.status == '1' ? '0' : '1'
                    }
                    submitObj(row.id, params).then((res) => {
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
        handleSync(){
            syncObj().then(res=>{
                if(res.code==200){
                    this.getPage(this.page)
                }
            })
        },
        handleEmpty(){
            emptyObj().then(res=>{
                if(res.code==200){
                    this.getPage(this.page)
                }
            })
        }
    }
}
</script>
