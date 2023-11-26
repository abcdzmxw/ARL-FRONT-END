<template>
    <div style="padding-top:15px;" class="u-crud">
        <avue-crud ref="crud" :page.sync="page" v-model="form" :option="tableOption" :data="list" :search.sync="search"
            :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
            @search-change="searchChange" @refresh-change="refreshChange" @sort-change="sortChange">
            <template slot="site" slot-scope="{row}">
                <div><a :href="row.site" target="_blank">{{ row.site }}</a></div>
                <div>
                    <el-tag closable effect="plain" size="mini" v-for="tag in row.tag" @close="handleCloseTag(row, tag)">{{
                        tag
                    }}</el-tag>
                    <el-input class="input-new-tag" v-if="inputIdVisible == 'inp_' + row._id" v-model="inputValue"
                        ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm(row)"
                        @blur="handleInputConfirm(row)">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput(row)">+ 添加标签</el-button>
                </div>
            </template>
            <template slot="headers1" slot-scope="{row}">
                <div style="white-space: pre-wrap;" v-html="row.headers"></div>
            </template>
            <template slot="status1" slot-scope="{row}">
                <span>{{ row.status }}</span>
            </template>
            <template slot="finger" slot-scope="{row}">
                <div v-for="item in row.finger">{{ item.name }}</div>
            </template>
            <template slot="screenshot" slot-scope="{row}">
                <el-image style="width: 100px; height: 100px"
                :src="'/api' + row.screenshot"
                :preview-src-list="['/api' + row.screenshot]">
                </el-image>
            </template>
            <template slot="menuLeft">
                <el-button size="mini" type="primary" icon="el-icon-download" @click="handleExport">导出站点</el-button>
                <el-button size="mini" type="danger" icon="el-icon-upload2">风险下发</el-button>
            </template>
        </avue-crud>
    </div>
</template>

<script>
import { getPage, exportObj, addObj_tag, delObj_tag } from '@/api/asset/site'
import { tableOption } from '@/crud/asset/site'
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
                order:'status',//默认以状态码排序
            },
            paramsSearch: {},
            list: [],
            listLoading: false,
            form: {},
            inputIdVisible: '',
            inputValue: '',
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
                        order:'status'
                    },
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
        // 关闭Tag
        handleCloseTag(row, tag) {
            console.log('row', row, tag);
            let params = {
                _id: row._id,
                tag
            }
            delObj_tag(params).then(res => {
                console.log('del tag res', res);
                this.getPage(this.page)
            })
        },
        showInput(row) {
            this.inputIdVisible = 'inp_' + row._id;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm(row) {
            console.log('handleInputConfirm', row);
            let inputValue = this.inputValue;
            console.log('inputValue', inputValue);
            if (inputValue) {
                console.log('if', inputValue);
                let params = {
                    _id: row._id,
                    tag: inputValue
                }
                addObj_tag(params).then(res => {
                    console.log('add tag res', res);
                    this.getPage(this.page)
                    this.inputIdVisible = '';
                    this.inputValue = '';
                })
            }

        },
        handleExport() {
            let _this = this
            this.$confirm(`是否导出站点?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                exportObj(_this.page).then(res => {
                    // console.log('export', res)
                    if (window.navigator.msSaveBlob) {
                        try {
                            const blobObject = new Blob([res.data]);
                            window.navigator.msSaveBlob(blobObject, 'site.txt');
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        let url = window.URL.createObjectURL(res.data)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', 'site.txt')
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
        sortChange(val){
            console.log('sort',val)
            // this.getPage(this.page,{order:'status'})
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