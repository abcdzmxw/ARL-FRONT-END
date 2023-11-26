<template>
  <div>
    <avue-crud
      :option="tableOption"
      :data="list"
      ref="crud"
      :page="page"
      :table-loading="listLoading"
      @on-load="getPage"
      @refresh-change="refreshChange"
    >
    </avue-crud>
  </div>
</template>

<script>
import { bidObj } from "@/api/usermgr/user";
export default {
  name: "BidRecord",
  props: {
    userId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listLoading: false,
      list: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableOption: {
        refreshBtn: false,
        columnBtn:false,
        addBtn:false,
        menu:false,
        header:false,
        column: [
          {
            label: "用户名",
            prop: "username",
          },
          {
            label: "标题",
            prop: "title",
          },
          {
            label: "报价时间",
            prop: "createTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "报价金额",
            prop: "bidPrice",
          },
          {
            label: "是否预报价",
            prop: "isPreQutation",
            formatter:(row,val)=>{
              return val?'是':'否'
            }
          },
          {
            label: "上架回数",
            prop: "whichTimes",
          },
          {
            label: "车牌号",
            prop: "carNo",
          },
          {
            label: "车架号",
            prop: "rockNo",
          },
          {
            label: "成交时间",
            prop: "tradeDate",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "成交人",
            prop: "transactionMan",
          },
          {
            label: "成交价",
            prop: "transactionPrice",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    getPage(page, params) {
      console.log("params:", params);

      this.listLoading = true;
      bidObj(
        Object.assign(
          {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            userId: this.userId,
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
        .catch(() => {
          this.listLoading = false;
        });
    },
    refreshChange(page) {
      this.getPage(this.page);
    },
  },
};
</script>

<style>
</style>