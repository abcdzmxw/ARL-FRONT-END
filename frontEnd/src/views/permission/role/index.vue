<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        :option="tableOption"
        :data="list"
        ref="crud"
        v-model="form"
        :table-loading="listLoading"
        :before-open="beforeOpen"
        :permission="permissionList"
        @on-load="getPage"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel"
      >
        <template slot="menuListForm" slot-scope="scope">
          <div>
            <el-tree
              disabled
              class="filter-tree"
              :data="menuData"
              :check-strictly="false"
              node-key="menuId"
              highlight-current
              :props="defaultProps"
              ref="menuTree"
              :default-checked-keys="checkedDsScope"
              show-checkbox
              default-expand-all
              @check-change="checkChange"
            >
            </el-tree>
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  editObj,
  getObj,
  getPage,
  getRoleLevel,
} from "@/api/permission/role";
import { tableOption } from "@/crud/permission/role";
import { getPage as getMenuPage } from "@/api/permission/menu";

export default {
  name: "table_role",
  data() {
    return {
      tableOption: tableOption,
      checkedKeys: [],
      checkedDsScope: [], //默认选中的菜单
      defaultProps: {
        label: "menuName",
        value: "menuId",
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      list: [],
      listLoading: false,
      form: {},
      id: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
      dialogLoading: false,
      roleLevel: [], //角色级别
      menuData: [], //菜单数据
    };
  },
  created() {
    this.getRoleLevel();
    this.getMenuList();
  },
  computed: {
    permissionList() {
      return {};
    },
  },
  watch: {
    roleLevel: {
      handler(n, o) {
        let column = this.tableOption.column[1]; //角色级别
        column.dicData = n;
      },
      deep: true,
    },
  },
  methods: {
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
          console.log("列表：", response);
          this.list = response.data;
          // this.page.total = response.data.data.total;
          // this.page.currentPage = page.currentPage;
          // this.page.pageSize = page.pageSize;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    refreshChange(page) {
      this.getPage(this.page);
    },
    searchChange(param, done) {
      this.page.currentPage = 1;
      this.getPage(this.page, this.filterForm(param));
      done();
    },
    // 角色权限
    getRoleLevel() {
      getRoleLevel().then((response) => {
        this.roleLevel = response.data;
      });
    },
    // 菜单列表
    getMenuList() {
      getMenuPage().then((response) => {
        console.log("菜单列表", response);
        this.menuData = response.data;
      });
    },
    // 角色权限变化
    checkChange(a, b, c) {
      //  let allNodes = this.$refs.menuTree
      //   .getCheckedKeys()
      //   .concat(this.$refs.menuTree.getHalfCheckedKeys())
      let half = this.$refs.menuTree.getHalfCheckedKeys();
      let full = this.$refs.menuTree.getCheckedKeys();
      console.log('half,full', half,full)      

      this.form.menuList = full;
    },
    beforeOpen(done, type) {
      window.openType = type;
      console.log("beforeOpen", type);
     
      if(type=='view'||type=='edit'){
        console.log('form:',this.form)
        
        getObj(this.form.roleId).then((response)=>{
          console.log('详情',response)
          this.form = response.data;
          this.checkedDsScope = response.data.menuList;
        })
      }
      done();
    },
    handleDel(row, index) {
      var _this = this;
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.roleId);
        })
        .then(() => {
          this.getPage(this.page);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
        })
        .catch(function () {});
    },
    handleSave(row, done, loading) {
      addObj(this.form)
        .then(() => {
          this.getPage(this.page);
          done();
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000,
          });
        })
        .catch(() => {
          loading();
        });
    },
    handleUpdate(row, index, done, loading) {
      editObj(this.form)
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
  },
};
</script>
