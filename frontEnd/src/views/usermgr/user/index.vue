<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :option="tableOption"
        :data="list"
        :page="page"
        :search.sync="search"
        :table-loading="listLoading"
        :before-open="beforeOpen"
        :before-close="beforeClose"
        :permission="permissionList"
        @on-load="getPage"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel"
      >
        <template slot="status" slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="defult">未提交</el-tag>
          <el-tag v-if="scope.row.status == 0" type="warning">待认证</el-tag>
          <el-tag v-if="scope.row.status == 2" type="success">认证通过</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">认证失败</el-tag>
        </template>
        <template slot="avatarLabel">
          <span class="ml40">头像</span>
        </template>
        <template slot="idCardPictureFrontLabel">
          <span class="ml40">身份证正面</span>
        </template>
        <template slot="idCardPictureBackLabel">
          <span class="ml40">身份证反面</span>
        </template>
        <template slot="idCardPictureManLabel">
          <span class="ml40">手持身份照片</span>
        </template>
        <template slot="businessLicenseLabel">
          <span class="ml40">营业执照</span>
        </template>
        <template slot="mainGrantAuthorizationLabel">
          <span class="ml40">主机厂授权(任选一)</span>
        </template>
        <template slot="abroadGrantAuthorizationLabel">
          <span class="ml40">境外零件授权(任选一)</span>
        </template>
        <template slot="avatarForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList"
              :has-sort="false"
              :imgs="imgs"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="idCardPictureFrontForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList2"
              :has-sort="false"
              :imgs="imgs2"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="businessLicenseForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList3"
              :has-sort="false"
              :imgs="imgs3"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="idCardPictureBackForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList4"
              :has-sort="false"
              :imgs="imgs4"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="idCardPictureManForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList5"
              :has-sort="false"
              :imgs="imgs5"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="mainGrantAuthorizationForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList6"
              :has-sort="false"
              :imgs="imgs6"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>
        <template slot="abroadGrantAuthorizationForm">
          <div style="height:158px;">
            <UploadImg
              class="ml40"
              :init-list="initList7"
              :has-sort="false"
              :imgs="imgs7"
              :is-view="isView"
              :limit="1"
            />
          </div>
        </template>

        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="scope.row.status == 0"
            type="text"
            size="mini"
            icon="el-icon-s-check"
            @click="handleControl('view2', scope.row, scope.index)"
          ><span>用户认证</span></el-button>
          <!-- @click="handleApprove(scope.row)" -->
          <el-button
            type="text"
            size="mini"
            icon="el-icon-remove-outline"
            @click="handleDeduct(scope.row)"
          ><span>违约金扣除</span></el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-coin"
            @click="handleBidRecord(scope.row)"
          ><span>出价记录</span></el-button>
        </template>
        <template slot="menuForm" slot-scope="scope">
          <!-- <el-button
            type="danger"
            size="small"
            icon="el-icon-s-check"
            v-if="isView && form.status==0"
            @click="handleApprove(form)"
            style="margin-right:30px;"
            ><span>用户认证</span></el-button
          > -->
          <div v-if="isCarCheck" class="isCarCheck">
            <avue-form
              ref="approveForm"
              v-model="approveForm"
              :option="approveOption"
              @reset-change="handleResetApprove"
              @submit="handleSubmitApprove"
            />
          </div>
        </template>
      </avue-crud>
    </basic-container>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleCloseSub"
      :width="dialogWidth"
    >
      <!-- 用户认证 -->
      <div v-if="isApproveForm">
        <avue-form
          ref="approveForm"
          v-model="approveForm"
          :option="approveOption"
          @reset-change="handleResetApprove"
          @submit="handleSubmitApprove"
        />
      </div>
      <!-- 违约金扣除 -->
      <div v-if="isDeductForm">
        <avue-form
          ref="deductForm"
          v-model="deductForm"
          :option="deductOption"
          @reset-change="handleResetDeduct"
          @submit="handleSubmitDeduct"
        />
      </div>
      <!-- 出价记录 -->
      <div v-if="isBidRecord">
        <bid-record :key="selectedRow.userId" :user-id="selectedRow.userId" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  editObj,
  getObj,
  getPage,
  approveObj,
  deductObj,
  getDic
} from '@/api/usermgr/user'
import { tableOption } from '@/crud/usermgr/user'
import UploadImg from '@/components/Upload/ossupload'
import BidRecord from './BidRecord'

export default {
  name: 'UsermgerUser',
  components: { UploadImg, BidRecord },
  data() {
    return {
      search: {},
      realSearch: {},
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      list: [],
      listLoading: false,
      form: {},
      dialogPermissionVisible: false,
      dialogLoading: false,
      isApproveForm: false,
      approveForm: {},
      approveOption: {
        column: [
          {
            label: '审批意见',
            prop: 'isApproved',
            type: 'radio',
            align: 'left',
            span: 24,
            dicData: [
              { label: '同意', value: 1 },
              { label: '不同意', value: 0 }
            ],
            rules: [
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '审批意见',
            prop: 'reason',
            type: 'textarea',
            minRows: 2,
            span: 24
          }
        ]
      },
      isDeductForm: false,
      deductForm: {},
      deductOption: {
        labelWidth: '130',
        column: [
          {
            label: '扣除金额',
            prop: 'money',
            type: 'number',
            span: 24
          },
          {
            label: '扣除拍卖次数',
            prop: 'times',
            type: 'number',
            span: 24
          },
          {
            label: '扣除原因',
            prop: 'userRemark',
            type: 'textarea',
            span: 24
          }
        ]
      },
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '580px',
      initList: [], // 文件初始列表
      imgs: {
        files: []
      }, // 接收
      isView: false, // 是否查看
      initList2: [], // 文件初始列表
      imgs2: {
        files: []
      }, // 接收
      initList3: [], // 文件初始列表
      imgs3: {
        files: []
      }, // 接收
      initList4: [], // 文件初始列表
      imgs4: {
        files: []
      }, // 接收
      initList5: [], // 文件初始列表
      imgs5: {
        files: []
      }, // 接收
      initList6: [], // 文件初始列表
      imgs6: {
        files: []
      }, // 接收
      initList7: [], // 文件初始列表
      imgs7: {
        files: []
      }, // 接收
      isCarCheck: false, // 是否用户认证
      isBidRecord: false, // 是否显示出价记录弹窗
      selectedRow: {}// 选中的行
    }
  },
  computed: {
    permissionList() {
      return {}
    }
  },
  watch: {},
  created() {
    this.getDic()
  },
  methods: {
    getDic() {
      getDic().then(({ data }) => {
        this.tableOption.group[1].column[6].dicData = data.enterprise_type
        this.tableOption.group[1].column[7].dicData = data.main_business
        this.tableOption.group[1].column[8].dicData = data.bank
      })
    },
    handleControl(type, row, index) {
      if (type == 'view2') {
        this.isCarCheck = true
        this.approveForm.userId = row.userId
        this.$refs.crud.rowView(row, index)
        document.querySelector('body').classList.add('carcheck-dialog')
      }
    },
    getPage(page, params) {
      this.listLoading = true
      this.realSearch.pageSize = page.pageSize
      this.realSearch.pageNum = page.currentPage
      getPage(
        this.realSearch
      ).then((response) => {
        this.list = response.data.list
        this.page.total = response.data.total
        this.page.currentPage = page.currentPage
        this.page.pageSize = page.pageSize
        this.listLoading = false
      })
        .catch(() => {
          this.listLoading = false
        })
    },
    refreshChange(page) {
      this.getPage(this.page)
    },
    searchChange(param, done) {
      this.page.currentPage = 1
      this.realSearch = JSON.parse(JSON.stringify(this.search))
      this.getPage(this.page, this.filterForm(param))
      done()
    },

    beforeOpen(done, type) {
      this.imgs = { files: [] }
      this.imgs2 = { files: [] }
      this.imgs3 = { files: [] }
      this.imgs4 = { files: [] }
      this.imgs5 = { files: [] }
      this.imgs6 = { files: [] }
      this.imgs7 = { files: [] }

      this.isView = type == 'view'

      if (type == 'view' || type == 'edit') {
        getObj(this.form.userId).then((response) => {
          this.form = response.data
          if (this.form.avatar) {
            this.initList = [{ url: this.form.avatar, isImg: true }]
          }
          if (this.form.idCardPictureFront) {
            this.initList2 = [{ url: this.form.idCardPictureFront, isImg: true }]
          }
          if (this.form.businessLicense) {
            this.initList3 = [{ url: this.form.businessLicense, isImg: true }]
          }
          if (this.form.idCardPictureBack) {
            this.initList4 = [{ url: this.form.idCardPictureBack, isImg: true }]
          }
          if (this.form.idCardPictureMan) {
            this.initList5 = [{ url: this.form.idCardPictureMan, isImg: true }]
          }
          if (this.form.mainGrantAuthorization) {
            this.initList6 = [{ url: this.form.mainGrantAuthorization, isImg: true }]
          }
          if (this.form.abroadGrantAuthorization) {
            this.initList7 = [{ url: this.form.abroadGrantAuthorization, isImg: true }]
          }
          if (response.data.addressCodeList) {
            this.form.addressCode = response.data.addressCodeList
          }
        })
      }
      done()
    },
    beforeClose(done) {
      document.querySelector('body').classList.remove('carcheck-dialog')
      this.isCarCheck = false
      done()
    },
    handleDel(row, index) {
      var _this = this
      this.$confirm('是否确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.userId)
        })
        .then(() => {
          this.getPage(this.page)
          this.list.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(function() {})
    },
    handleSave(row, done, loading) {
      const params = { ...row }
      if (this.imgs.files.length) {
        params.avatar = this.imgs.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs2.files.length) {
        params.idCardPictureFront = this.imgs2.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs3.files.length) {
        params.businessLicense = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs4.files.length) {
        params.idCardPictureBack = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs5.files.length) {
        params.idCardPictureMan = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs6.files.length) {
        params.mainGrantAuthorization = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      if (this.imgs7.files.length) {
        params.abroadGrantAuthorization = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      }
      addObj(params)
        // addObj(this.form)
        .then(() => {
          this.getPage(this.page)
          done()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(() => {
          loading()
        })
    },
    handleUpdate(row, index, done, loading) {
      const params = { ...row }
      if (this.imgs.files.length) {
        params.avatar = this.imgs.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.avatar = ''
      }
      if (this.imgs2.files.length) {
        params.idCardPictureFront = this.imgs2.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.idCardPictureFront = ''
      }
      if (this.imgs3.files.length) {
        params.businessLicense = this.imgs3.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.businessLicense = ''
      }

      if (this.imgs4.files.length) {
        params.idCardPictureBack = this.imgs4.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.idCardPictureBack = ''
      }

      if (this.imgs5.files.length) {
        params.idCardPictureMan = this.imgs5.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.idCardPictureMan = ''
      }

      if (this.imgs6.files.length) {
        params.mainGrantAuthorization = this.imgs6.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.mainGrantAuthorization = ''
      }

      if (this.imgs7.files.length) {
        params.abroadGrantAuthorization = this.imgs7.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename
          }
        })[0].url
      } else {
        params.abroadGrantAuthorization = ''
      }
      if (this.form.addressCodeList && this.form.addressCodeList[2]) {
        params.address = this.form.addressCodeList[2]
      }

      editObj(params)
        .then(() => {
          this.getPage(this.page)
          done()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(() => {
          loading()
        })
    },
    // 出价记录
    handleBidRecord(row) {
      this.dialogTitle = '出价记录'
      this.isBidRecord = true
      this.dialogVisible = true
      this.dialogWidth = '930px'
      this.selectedRow = row
    },
    // 用户认证
    handleApprove(row) {
      this.dialogTitle = '用户认证'
      this.isApproveForm = true
      this.approveForm.userId = row.userId
      this.dialogVisible = true
    },
    handleDeduct(row) {
      this.dialogTitle = '违约金扣款'
      this.isDeductForm = true
      this.deductForm.userId = row.userId
      this.dialogVisible = true
    },
    handleCloseSub(done) {
      this.isDeductForm = false
      this.isApproveForm = false
      this.isBidRecord = false
      done()
    },
    handleResetApprove() {},
    handleSubmitApprove(form, done) {
      const _this = this
      approveObj(this.approveForm)
        .then((res) => {
          if (res.data.code == 200) {
            _this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            _this.dialogVisible = false
            _this.$refs.crud.$refs.dialogForm.closeDialog()
            _this.approveForm = {
              isAgree: null
            }
            _this.getPage(_this.page)
            done()
          } else {
            _this.$message.error(res.data)
            done()
          }
        })
        .catch((err) => {
          done()
        })
      done()
    },
    handleResetDeduct() {},
    handleSubmitDeduct(form, done) {
      const _this = this
      deductObj(this.deductForm)
        .then((res) => {
          _this.dialogVisible = false
        })
        .catch((err) => {
          _this.dialogVisible = false
          done()
        })
    }
  }
}
</script>
<style scoped>
.ml40{
  margin-left: 30px;
}
</style>
