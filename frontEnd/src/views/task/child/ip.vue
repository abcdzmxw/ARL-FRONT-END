<template>
    <div style="padding-top:15px;" class="u-crud">
        <avue-crud ref="crud" :page.sync="page" v-model="form" :option="tableOption" :data="list" :search.sync="search"
            :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
            @search-change="searchChange" @refresh-change="refreshChange" @selection-change="selectionChange">
            <template slot="domain" slot-scope="{row}">
                <div>
                    <el-tag closable effect="plain" size="mini" v-for="tag in row.tag" :key="tag"
                        @close="handleCloseTag(row, tag)">{{
                            tag
                        }}</el-tag>
                    <p v-for="domain in row.domain" :key="domain">{{ domain }}</p>
                </div>
            </template>
            <template slot="geo" slot-scope="{row}">
                <div>{{ row.geo_city.country_name }}/{{ row.geo_city.region_name }}</div>
            </template>
            <template slot="os_info.name" slot-scope="{row}">
                <div>{{ row.os_info.name || '-' }}</div>
            </template>
            <template slot="port_info.port_id" slot-scope="{row}">
                <div>{{ row.port_info.port_id || '-' }}</div>
            </template>
            <template slot="as" slot-scope="{row}">
                <div>{{ row.geo_asn.organization || '-' }}</div>
            </template>
            <template slot="menuLeft">
                <el-button size="mini" :disabled="!selectedRows.length" icon="el-icon-delete" @click="handleDelete">批量删除</el-button>
                <el-button size="mini" type="primary" icon="el-icon-download" @click="handleExport">导出IP端口</el-button>
            </template>
        </avue-crud>
    </div>
</template>

<script>
import { getPage, exportObj ,delObj} from '@/api/asset/ip'
import { tableOption } from '@/crud/task/child/ip'
export default {
    name: 'MenuList',
    components: {},
    props:{
        info:{
            type:Object,
            default:()=>{}
        }
    },
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
            inputIdVisible: '',
            inputValue: '',
            selectedRows: [], //选中行
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
                    this.info,
                    params,
                )
            ).then((res) => {
                this.list = res.items
                this.page.total = res.total
                this.page.currentPage = res.page
                this.page.pageSize = res.size
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
            done()
        },
        selectionChange(rows) {
            this.selectedRows = rows
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
                        _id: row._id ? [row._id] : _this.selectedRows.map(item => item._id)
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
            this.$confirm(`是否导出站点?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                let params={
                    page:1,
                    size:10000,
                }
                exportObj(Object.assign(params,_this.info)).then(res => {
                    // console.log('export', res)
                    if (window.navigator.msSaveBlob) {
                        try {
                            const blobObject = new Blob([res.data]);
                            window.navigator.msSaveBlob(blobObject, 'ip.txt');
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        let url = window.URL.createObjectURL(res.data)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', 'ip.txt')
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
    }
}
</script>
<style scoped lang="scss">
.u-crud {
    .button-new-tag {
        margin-left: 10px;
        height: 22px;
        line-height: 20px;
        padding: 0 5px;
    }

    ::v-deep .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: center;
        height: 22px;

        .el-input__inner {
            height: 22px;
            line-height: 20px;
        }
    }
}
</style>