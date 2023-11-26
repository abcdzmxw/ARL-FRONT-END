<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :data="list" :page.sync="page" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange" @row-update="handleUpdate"
                @row-save="handleSave" @row-del="handleDel">
                <template slot="menu" slot-scope="{row}">
                    <!-- {{ row }} -->
                    <el-button type="text" size="small" icon="el-icon-suitcase"
                        @click="showDialog(row, 'assign')">分配菜单</el-button>
                    <!-- <el-button type="text" size="small"><i class="el-icon-document"></i>分配资源</el-button> -->
                </template>
            </avue-crud>
        </basic-container>
        <!-- 弹窗 -->
        <el-dialog size="small" :title="mDialog.title" :visible.sync="mDialog.visible" class="avue-dialog avue-dialog--top"
            :width="mDialog.width" top="0" :close-on-click-modal="false" destroyOnClose @opened="beforeOpen2">
            <div>
                <template v-if="mDialog.sign == 'assign'">
                    <avue-form ref="assign" v-model="assignForm" :option="assignOption">
                        <template slot="menu_id" slot-scope="scope">
                            <el-tree ref="tree"
                            :props="defaultProps"
                            :data="treeData"
                            show-checkbox
                            node-key="id"
                            defaultExpandAll
                            @check="handleTreeCheck">
                            </el-tree>
                        </template>
                    </avue-form>
                </template>
            </div>
            <div class="avue-dialog__footer" v-if="mDialog.hasFoot">
                <el-button size="small" @click="mDialog.visible = false">取 消</el-button>
                <el-button size="small" @click="handleDialogSubmit" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addObj, updateObj, delObj, getPage } from '@/api/sysMgr/role'
import { assignObj, getAllMenu, assignMenu } from '@/api/sysMgr/menu'
import { tableOption } from '@/crud/sysMgr/role'
export default {
    name: 'RoleList',
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
            firstLevelMenuList: [],
            mDialog: {
                title: '提示',
                visible: false,
                width: '40%',
                hasFoot: true,
                sign: ''
            },
            assignOption: {
                labelWidth: 120,
                menuBtn: false,
                column: [
                    {
                        label: '菜单',
                        type: 'tree',
                        prop: 'menu_id',
                        slot: true,
                        rules: [{
                            required: false,
                            message: "请选择",
                            trigger: "blur"
                        }],
                    },
                ]
            },
            assignForm: {},
            curr_role_id: '',//当前角色id
            treeData: [],
            defaultCheckedKeys: [],
            defaultProps: {
                label: 'menu_name',
                children: 'childrens'
            },
            checkedMenuId:[],
        }
    },
    computed: {
        permissionList() {
            return {}
        }
    },
    watch: {},
    created() {
        this.getAllMenuList()
    },
    methods: {
        async getAllMenuList() {
            console.log('1')
            await getAllMenu().then(res => {
                console.log('allMenu', res)
                this.treeData = res.data
            })
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
            done()
        },
        beforeOpen2() {
            this.getHadMenu()
        },
        getHadMenu() {
            let _this = this;
            assignObj(this.curr_role_id).then(res => {
                _this.defaultCheckedKeys = res.data.map(item => item.id)
                _this.checkedMenuId = [..._this.defaultCheckedKeys]
                let temp = setInterval(() => {
                    _this.defaultCheckedKeys.forEach((i) => {
                        let node = _this.$refs.tree.getNode(i);
                        if (node.isLeaf) {
                            _this.$refs.tree.setChecked(node, true);
                        }
                    });
                    clearInterval(temp)
                }, 200)
            })
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
                        _this.getFirstLevelMenuList()
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                }).finally(() => {
                    done()
                    loading()
                })
        },
        showDialog(row, sign) {
            console.log('show', row, sign)
            this.mDialog.sign = sign
            this.mDialog.visible = true
            if (sign == 'assign') {
                this.mDialog.title = '分配菜单';
                this.mDialog.width = '680px'
                this.curr_role_id = row.id
            }
        },
        handleDialogSubmit(done) {
            console.log('handleSubmit_assign', this.curr_role_id)
            let params={
                menu_id:this.checkedMenuId.join(',')
            }
            assignMenu(this.curr_role_id, params).then(res => {
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
            }).finally(() => {
                done()
                this.closeDialog()
            })
        },
        closeDialog() {
            this.mDialog.visible = false
        },
        handleTreeCheck(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
            let nodes = this.$refs.tree.getCheckedNodes(false, true).map(i => i.id)
            console.log('nodes', nodes)
            this.checkedMenuId=nodes
            console.log('checkedMenuId', this.checkedMenuId)
        },
    }
}
</script>
