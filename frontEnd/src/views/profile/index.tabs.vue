<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="mytabs">
        <el-tabs
          @tab-click="switchTab"
          v-model="switchStatus"
          tabPosition="left"
        >
          <el-tab-pane label="基本信息" name="userManager">
            <avue-form
              ref="form1"
              v-model="form1"
              :option="option1"
              @reset-change="reset('form1')"
              @submit="submitForm1"
            >
              <template slot="avtar">
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
            </avue-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="passwordManager">
            <avue-form
              ref="form2"
              v-model="form2"
              :option="option2"
              @reset-change="reset('form2')"
              @submit="submitForm2"
            >
            </avue-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getObj, editObj, setPwd } from "@/api/profile/profile";
import { option1, option2 } from "@/crud/profile/profile";
import { mapGetters } from "vuex";
import UploadImg from "@/components/Upload/ossupload";

export default {
  name: "Profile",
  components: { UploadImg },
  data() {
    return {
      switchStatus: "",
      form1: {},
      option1: option1,
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
    // 初始值 ，获取用户信息
    this.form1.id = this.profile.adminId;
    this.switchStatus = "userManager";
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  methods: {
    switchTab(tab, event) {
      this.switchStatus = tab.name;
    },
    reset(){},
    submitForm1(form, done) {
      console.log(form, done );
      if (this.imgs.files.length) {
        form.avtar = this.imgs.files.map((item) => {
          return {
            imageId: item.imageId,
            url: item.filename,
          };
        })[0].url;
      } else {
        form.avtar = "";
      }
      console.log("form:", form);
      editObj(form).then((res) => {
        if (res.code == 200) {
          console.log(1)
          this.$message.success("修改成功");
          this.getUserInfo();
        } else {
          console.log(2)
          this.$message.error(res.message);
        }
      }).catch(() => {
        done()
      })
    },
    submitForm2(form, done) {
      if(form.newPassword != form.confirmPassword){
        this.$message.error("两次密码不一致");
        return;
      }
      setPwd(form).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.logout()
        } else {
          this.$message.error(res.message);
        }
      }).catch(() => {
        done()
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },

    getUserInfo() {
      getObj(this.profile.adminId).then((res) => {
        this.form1 = res.data.admin;
        if (this.form1.avtar) {
          this.initList = [{ url: this.form1.avtar,isImg:true }];
        }
      });
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
