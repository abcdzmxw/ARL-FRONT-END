<template>
  <div class="app-container calendar-list-container user">
    <basic-container>
      <el-row :span="24" :gutter="20">
        <!-- <el-col :xs="24" :sm="24" :md="4">
          <avue-tree
            :option="treeOption"
            :data="treeData"
            @node-click="nodeClick"
          ></avue-tree>
        </el-col> -->
        <el-col :xs="24" :sm="24" :md="24" class="user__main">
          <avue-crud
            :option="option"
            :data="list"
            ref="crud"
            v-model="form"
            :page.sync="page"
            :table-loading="listLoading"
            :before-open="beforeOpen"
            @on-load="getPage"
            @sort-change="sortChange"
            @search-change="searchChange"
            @refresh-change="refreshChange"
            @row-update="handleUpdate"
            @row-save="handleSave"
            @row-del="handleDel"
          >
            <!-- <template slot-scope="scope" slot="menu">
              <el-button
                type="text"
                v-if="permissions['sys:user:password']"
                icon="el-icon-key"
                size="small"
                plain
                @click="editPassword(scope.row, scope.index)"
                >修改密码</el-button
              >
            </template> -->
            <template slot="avtarForm" slot-scope="scope">
              <div>
                <UploadImg
                  ref="upload"
                  :initList="initList"
                  :hasSort="false"
                  :imgs="imgs"
                  :isView="isView"
                  :limit="1"
                />
              </div>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  getPage,
  getObj,
  editObj,
  getRoles,
} from "@/api/permission/user";
import { getPage as getDeptpage } from "@/api/permission/dept";
import { tableOption } from "@/crud/permission/user";
import UploadImg from "@/components/Upload/ossupload";

export default {
  name: "sys_user",
  components: { UploadImg },
  data() {
    return {
      selectRow: {},
      dialogVisible: false,
      treeOption: {
        nodeKey: "deptId",
        addBtn: false,
        menu: false,
        defaultExpandAll: true,
        props: {
          label: "deptName",
          value: "deptId",
        },
      },
      treeData: [],
      option: tableOption,
      checkedKeys: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      list: [],
      listLoading: false,
      role: [],
      form: {},

      dialogVisible2: false,
      tableData2: [],
      page2: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [],
        descs: "create_time",
      },
      tableLoading2: false,
      roleLevel: [], //角色列表
      initList: [], //文件初始列表 过户图片
      imgs: {
        files: [],
      }, //接收
      isView: false, //是否查看
    };
  },
  computed: {},
  watch: {
    roleLevel: {
      handler(n, o) {
        let column = this.option.column[3]; //角色
        column.dicData = n;
      },
      deep: true,
    },
    treeData: {
      handler(n, o) {
        let column = this.option.column[2]; //部门
        column.dicData = n;
      },
      deep: true,
    },
  },
  created() {
    this.getDeptList(); //部门列表
    this.getRoles(); //角色列表
  },
  methods: {
    // 角色权限
    getRoles() {
      getRoles().then((response) => {
        this.roleLevel = response.data;
        console.log('roleLevelthis.',this.roleLevel)
      });
    },
    // 部门列表
    getDeptList() {
      let params = {
        pageNum: 1,
        pageSize: 1000,
      };
      getDeptpage(params).then((response) => {
        this.treeData = response.data.list;
      });
    },
    subPassword(form2, done) {
      form2.id = this.selectRow.id;
      editPassword(form2)
        .then(() => {
          done();
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000,
          });
          this.dialogVisible = false;
          this.form2.password = "";
        })
        .catch(() => {
          done();
        });
    },
    editPassword(row, index) {
      this.selectRow = row;
      this.dialogVisible = true;
    },

    nodeClick(data) {
      this.page.page = 1;
      this.getPage(this.page, { deptId: data.deptId });
    },
    sortChange(val) {
      let prop = val.prop
        ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase()
        : "";
      if (val.order == "ascending") {
        this.page.descs = [];
        this.page.ascs = prop;
      } else if (val.order == "descending") {
        this.page.ascs = [];
        this.page.descs = prop;
      } else {
        this.page.ascs = [];
        this.page.descs = [];
      }
      this.getPage(this.page);
    },
    getPage(page, params) {
      this.listLoading = true;
      getPage(
        Object.assign(
          {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs,
          },
          params
        )
      )
        .then((response) => {
          this.list = response.data.list;
          this.page.total = response.data.total;
          this.page.currentPage = page.currentPage;
          this.page.pageSize = page.pageSize;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    searchChange(params, done) {
      console.log("搜索", params);
      params = this.filterForm(params);
      this.paramsSearch = params;
      this.page.currentPage = 1;
      this.getPage(this.page, params);
      done();
    },
    refreshChange(page) {
      this.getPage(this.page);
    },
    handleSave(row, done, loading) {
      console.log("保存", row);
      let params = { ...row };
      if (this.imgs.files.length) {
        params.avtar = this.imgs.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename,
          };
        })[0].url;
      }
      addObj(params)
        .then(() => {
          this.getPage(this.page);
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000,
          });
          done();
        })
        .catch(() => {
          loading();
        });
    },
    handleUpdate(row, index, done, loading) {
      console.log("保存", row,this.imgs.files);
      let params = { ...row };
      if (this.imgs.files.length) {
        params.avtar = this.imgs.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename,
          };
        })[0].url;
      }else{
        params.avtar = '';//
      }
      editObj(params)
        .then(() => {
          this.getPage(this.page);
          done();
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000,
          });
        })
        .catch(() => {
          loading();
        });
    },
    handleDel(row, index) {
      this.$confirm(
        "此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        delObj(row.adminId)
          .then((res) => {
            this.$notify({
              title: "成功",
              message: res.data,
              type: "success",
              duration: 2000,
            });
            this.getPage(this.page);
          })
          .catch(() => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
              duration: 2000,
            });
          });
      });
    },
    beforeOpen(done, type) {
      this.imgs={
        files: [],
      };
      let passwordColumn = tableOption.column[1];
      this.isView=type=="view"?true:false
      if (type == "edit"||type=='view') {
        getObj(this.form.adminId).then(({ data }) => {
          console.log("data", data);
          this.form = data.admin;
          if(this.form.avtar){
            this.initList = [{url:this.form.avtar,isImg:true}]
          }
        });
        passwordColumn.rules[0].required = false;
      }
      if (type == "add") {
        passwordColumn.rules[0].required = true;
      }
      done();
    },

    showLoglogin(row, index) {
      this.selectRow = row;
      this.tableData2 = [];
      this.page2.currentPage = 1;
      this.dialogVisible2 = true;
      this.getPage2(this.page2);
    },
    searchChange2(params, done) {
      params = this.filterForm(params);
      this.page2.currentPage = 1;
      this.getPage2(this.page2, params);
      done();
    },
    sortChange2(val) {
      let prop = val.prop
        ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase()
        : "";
      if (val.order == "ascending") {
        this.page2.descs = [];
        this.page2.ascs = prop;
      } else if (val.order == "descending") {
        this.page2.ascs = [];
        this.page2.descs = prop;
      } else {
        this.page2.ascs = [];
        this.page2.descs = [];
      }
      this.getPage2(this.page2);
    },
    getPage2(page, params) {
      this.tableLoading2 = true;
      getPage2(
        Object.assign(
          {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            descs: this.page2.descs,
            ascs: this.page2.ascs,
            createId: this.selectRow.id,
          },
          params
        )
      )
        .then((response) => {
          this.tableData2 = response.data.data.records;
          this.page2.total = response.data.data.total;
          this.page2.currentPage = page.currentPage;
          this.page2.pageSize = page.pageSize;
          this.tableLoading2 = false;
        })
        .catch(() => {
          this.tableLoading2 = false;
        });
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前删除数据的行数
     *
     **/
    handleDel2: function (row, index) {
      let _this = this;
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj2(row.id);
        })
        .then((data) => {
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.getPage2(this.page2);
        })
        .catch(function (err) {});
    },
    /**
     * 刷新回调
     */
    refreshChange2(page) {
      this.getPage2(this.page2);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

