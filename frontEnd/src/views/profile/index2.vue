<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="mytabs">
        切换路由
      </div>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {

    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.mytabs {
  .el-tabs--left {
    ::v-deep .el-tabs__item.is-left {
      width: 160px;
    }
  }
}
</style>
