<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud ref="crud" v-model="form" :option="tableOption" :data="list" :page.sync="page" :search.sync="search"
                :table-loading="listLoading" :before-open="beforeOpen" :permission="permissionList" @on-load="getPage"
                @search-change="searchChange" @refresh-change="refreshChange" @row-update="handleUpdate"
                @row-save="handleSave" @row-del="handleDel">
                <template slot="menu" slot-scope="{row}">
                    <el-button type="text" size="small" icon="el-icon-key"
                        @click="showDialog(row, 'reset')">重置密码</el-button>
                    <el-button type="text" size="small" icon="el-icon-user"
                        @click="showDialog(row, 'assign')">分配角色</el-button>
                </template>
            </avue-crud>
        </basic-container>
        <!-- 弹窗 -->
        <el-dialog size="small" :title="mDialog.title" :visible.sync="mDialog.visible" class="avue-dialog avue-dialog--top"
            :width="mDialog.width" destroyOnClose @opened="beforeOpen2">
            <div>
                <template v-if="mDialog.sign == 'assign'">
                    <avue-form ref="assign" v-model="assignForm" :option="assignOption"
                        @submit="handleSubmit_assign"></avue-form>
                </template>
                <template v-if="mDialog.sign == 'reset'">
                    <avue-form ref="reset" v-model="resetForm" :option="resetOption"
                        @submit="handleSubmit_reset"></avue-form>
                </template>
            </div>
            <div class="avue-dialog__footer" v-if="mDialog.hasFoot">
                <el-button size="small" @click="mDialog.visible = false">取 消</el-button>
                <el-button size="small" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addObj, updateObj, delObj, getPage, assignObj, resetPsw } from '@/api/user'
import { roleObj2, roleList } from '@/api/sysMgr/role'
import { tableOption } from '@/crud/sysMgr/user'
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
            firstLevelMenuList: [],
            mDialog: {
                title: '提示',
                visible: false,
                width: '40%',
                hasFoot: true,
                sign: ''
            },
            assignOption: {
                labelWidth: 90,
                submitText: '确定',
                emptyText: '取消',
                emptyBtn:false,
                column: [
                    {
                        label: '角色',
                        type: 'select',
                        prop: 'role_id',
                        slot: true,
                        multiple: true,
                        span: 24,
                        props: {
                            label: 'role_name',
                            value: 'id'
                        },
                        rules: [{
                            required: true,
                            message: "请选择",
                            trigger: "blur"
                        }],
                    },
                ]
            },
            assignForm: {},
            resetOption: {
                labelWidth: 120,
                submitText: '确定',
                emptyText: '取消',
                column: [
                    {
                        label: '密码',
                        prop: 'password',
                        slot: true,
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请填写",
                            trigger: "blur"
                        }],
                    },
                ]
            },
            resetForm: {},
            roleList: [],  //角色列表
            curr_user_id: '',//当前id
            curr_user_name:'',//当前用户
        }
    },
    computed: {
        permissionList() {
            return {}
        }
    },
    watch: {},
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            console.log('1')
            await roleList().then(res => {
                let tempArr = res.data
                this.roleList = tempArr
                this.assignOption.column[0].dicData = tempArr
                console.log('roleList', res);
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
            if (this.mDialog.sign == 'assign') {
                this.$refs.assign.resetForm()
                roleObj2(this.curr_user_id).then(res => {
                    console.log('roleObj2', res);
                    this.assignForm.role_id = res.data.map(item=>item.id)
                })
            }
            if (this.mDialog.sign == 'reset') {
                this.$refs.reset.resetForm()
            }
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
                        user_id: row.user_id
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
                this.curr_user_id = row.user_id
                this.curr_user_name = row.name
                this.mDialog.hasFoot = false
                this.mDialog.width = '420px'
                this.mDialog.title = '给'+this.curr_user_name+'分配角色';
            }
            if (sign == 'reset') {
                this.curr_user_id = row.user_id
                this.curr_user_name = row.name
                this.mDialog.hasFoot = false
                this.mDialog.width = '420px'
                this.mDialog.title = '对'+this.curr_user_name+'重置密码';
            }
        },
        handleSubmit_assign(form, done) {
            console.log('handleSubmit_assign', form)
            let params = {
                role_id: form.role_id.join(',')
            }
            assignObj(this.curr_user_id, params).then(res => {
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
            })
        },
        handleSubmit_reset(form, done) {
            console.log('handleSubmit_reset', form)
            let params = Object.assign(form, { user_id: this.curr_user_id })
            resetPsw(params).then(res => {
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                })
                this.closeDialog()
            }).finally(() => {
                done()
            })
        },
        closeDialog() {
            this.mDialog.visible = false
        }
    }
}
</script>
