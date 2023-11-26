<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <!-- :page.sync="page"  -->
            <avue-crud ref="crud" v-model="form" :option="tableOption" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange" @row-update="handleUpdate"
                @row-save="handleSave" @row-del="handleDel">
                <template slot="icon" slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import { getFirstLevelMenuList, addObj, updateObj, delObj, getPage } from '@/api/sysMgr/menu'
import { tableOption } from '@/crud/sysMgr/menu'
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
                pageSize: 100,
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
        this.getFirstLevelMenuList()
    },
    methods: {
        getFirstLevelMenuList() {
            getFirstLevelMenuList().then(({ data }) => {
                this.firstLevelMenuList = data
            })
        },
        getPage(page, params) {
            this.listLoading = true
            getPage(
                Object.assign(
                    {
                        // page: page.currentPage,
                        // size: page.pageSize,
                        page: 1,
                        size: 200,
                        descs: this.page.descs,
                        ascs: this.page.ascs,
                    },
                    params,
                )
            ).then(({ data }) => {
                let items = [...data.items]
                // 处理成树状结构
                let result = this.$utils.toArrayTree(items, { strict: true, parentKey: 'parent_id' })
                console.log('result', result)
                this.list = result

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
                        menu_id: row.id
                    }
                    delObj(params).then((res) => {
                        if (res.code == 200) {
                            _this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'success'
                            })
                            _this.getPage(_this.page)
                            _this.getFirstLevelMenuList()
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
            if (params.parent_id === '') {
                delete params.parent_id
            }
            // console.log('save params',params)
            addObj(params)
                .then((res) => {
                    if (res.code == 200) {
                        _this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        })
                        _this.getPage(this.page)
                        _this.getFirstLevelMenuList()
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
            if (this.$utils.isNull(params.parent_id)) {
                delete params.parent_id
            }
            updateObj(params)
                .then((res) => {
                    if (res.code == 200) {
                        _this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        })
                        _this.getPage(this.page)
                        _this.getFirstLevelMenuList()
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error'
                        })
                        _this.getPage(this.page)
                        _this.getFirstLevelMenuList()
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                }).finally(() => {
                    done()
                    loading()
                })
        }
    }
}
</script>
