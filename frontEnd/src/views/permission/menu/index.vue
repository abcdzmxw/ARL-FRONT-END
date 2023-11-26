<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <!-- <div>{{ tableData }}</div> -->
      <avue-crud
        ref="crud"
        v-model="form"
        @on-load="getPage"
        :option="tableOption"
        :data="tableData"
        row-key="row => { return row.menuId }"
        :table-loading="tableLoading"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel"
      >
        
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-plus"
            size="small"
            plain
            @click="addChildrenMenu(scope.row, scope.index)"
            >添加下级菜单</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  editObj,
  delObj,
  getObj,
  getPage,
} from "@/api/permission/menu";
import { tableOption } from "@/crud/permission/menu";
import { mapGetters } from "vuex";

export default {
  name: "sysMenu",
  data() {
    return {
      form: {},
      tableOption: tableOption,
      tableData: [],
      tableLoading: false,      
    };
  },
  watch: {
    "form.menuType"() {
      let column4 = this.tableOption.column[4]; //图标
      let column5 = this.tableOption.column[5]; //路径
      let column6 = this.tableOption.column[6]; //组件
      if (this.form.menuType === 1 || this.form.menuType === 2) {
        // 目录||菜单
        column4.display = true;
        column5.display = true;
        column6.display = true;
      }
      if (this.form.menuType === 3) {
        // 按钮
        column4.display = false;
        column5.display = true;
        column6.display = false;
      }
    },
  },
  created() {},
  computed: {},
  methods: {
    getPage() {
      console.log("ddd");
      this.tableLoading = true;
      getPage()
        .then((response) => {
          let tmpData = response.data;
          console.log("eee", tmpData);
          // 数据处理
          this.tableData = this.transData([...tmpData]);
          console.log("fff", this.tableData);
          let children = this.tableData;
          let parentIdDIC = [
            {
              id: 0,
              menuId: "0",
              name: "顶级",
              menuName: "顶级",
              parentId: "0",
              children: children,
            },
          ];
          this.$refs.crud.DIC.parentId = parentIdDIC; //?
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 处理数据
    transData(mapData) {
      let result;
      if (mapData.length == 0) {
        return (result = []);
      }
      result = mapData.filter((item) => {
        item.id = item.menuId;
        item.name = item.menuName;
        if (item.children && item.children.length) {
          item.children = this.transData(item.children);
        }
        return true;
      });
      return result;
    },
    handleDel: function (row, index) {
      var _this = this;
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.menuId);
        })
        .then((data) => {
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.getPage(this.page);
        })
        .catch(function (err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function (row, index, done, loading) {
      editObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function (row, done, loading) {
      addObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPage(this.page);
    },
    addChildrenMenu(row, index) {
      this.form.parentId = row.id;
      this.$refs.crud.rowAdd();
    },
  },
};
</script>