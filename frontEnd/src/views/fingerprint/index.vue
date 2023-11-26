<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :page.sync="page" :data="list" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @selection-change="selectionChange" @search-change="searchChange" @refresh-change="refreshChange"
                @row-save="handleSave">
                <template slot="menuLeft">
                    <el-button size="small" icon="el-icon-delete" @click="handleDelete"
                        :disabled="!selectedRows.length">删除</el-button>
                    <el-button size="small" icon="el-icon-download" @click="handleExport">导出</el-button>
                    <el-upload action="#" accept="application/json" :show-file-list="false" :http-request="handleUpload"
                        :before-upload="handleBeforeUpload" style="display: inline-block">
                        <el-button size="small" icon="el-icon-upload2">上传</el-button>
                    </el-upload>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import { getPage, addObj, delObj, exportObj, uploadObj } from '@/api/fingerprint/index'
import { tableOption } from '@/crud/fingerprint/index'
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
            selectedRows: [],
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
            ).then(({ data }) => {
                if (data.code == 200) {
                    this.list = data.items
                    this.page.total = data.total
                    this.page.currentPage = data.page
                    this.page.pageSize = data.size
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
        beforeOpen(done, type) {
            done()
        },
        handleDelete() {
            let _this = this
            this.$confirm(`是否确认删除选择的记录`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function () {
                    let params = {
                        _id: _this.selectedRows.map(item => item._id)
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
        handleExport() {
            let _this = this
            this.$confirm(`是否导出指纹信息?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                exportObj().then(res => {
                    console.log('export', res)
                    if (window.navigator.msSaveBlob) {
                        try {
                            const blobObject = new Blob([res.data]);
                            window.navigator.msSaveBlob(blobObject, '指纹数据.json');
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        let url = window.URL.createObjectURL(res.data)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', '指纹数据.json')
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
        handleBeforeUpload(file) {
            if (file.type.indexOf('json') < 0) {
                this.$message({
                    message: '只允许上传json文件',
                    type: 'error'
                })
                return false
            }
        },
        handleUpload(param) {
            let _this = this
            _this.listLoading = false
            const file = param.file
            const formData = new FormData();
            formData.append("file", file)
            uploadObj(formData).then(res => {
                console.log('upload', res)
                if (res.code == 200) {
                    _this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success'
                    })
                    _this.getPage(_this.page)
                }
            }).catch(err => {
                console.log('err', err)
            }).finally(() => {
                _this.listLoading = false
            })
        },
        handleSave(row, done, loading) {
            let _this = this
            let { name, human_rule } = row
            const params = { name, human_rule }
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
    }
}
</script>
