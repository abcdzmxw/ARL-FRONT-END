<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="mytabs">
        <avue-form ref="form2" v-model="form2" :option="option2" @reset-change="reset('form2')" @submit="submitForm2">
        </avue-form>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getObj, editObj, setPwd2 } from "@/api/profile/profile";
import { option1, option2 } from "@/crud/profile/profile";
import { mapGetters } from "vuex";
import UploadImg from "@/components/Upload/ossupload";

export default {
  name: "Profile",
  components: { UploadImg },
  data() {
    return {
      form2: {},
      option2: option2,
      initList: [], //文件初始列表 过户图片
      imgs: {
        files: [],
      }, //接收
      isView: false, //是否查看
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(["currUser"]),
  },
  methods: {
    reset() { },
    submitForm2(form, done) {
      if (form.newPassword != form.confirmPassword) {
        this.$message.error("两次密码不一致");
        done()
        return;
      }
      let params = Object.assign(form,{userId:this.currUser.userId})
      console.log('params',params)
      setPwd2(params).then((res) => {
        if (res.code == '200') {
          this.$message.success("修改成功");
          this.logout()
        } else {
          this.$message.error(res.message);
        }
      }).finally(() => {
        done()
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },


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
