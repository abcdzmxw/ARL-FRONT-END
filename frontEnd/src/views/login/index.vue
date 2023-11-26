<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ title }}
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1"
          autocomplete="on" clearable />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码"
          name="password" tabindex="2" autocomplete="on" clearable @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-row>
        <el-col :span="17">
          <el-form-item prop="validate_code">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="code" v-model="loginForm.validate_code" placeholder="验证码不区分大小写" name="validate_code" type="text" tabindex="3"
              autocomplete="on" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <img :src="captchInfo.captcherImg" alt="code" class="code-img" @click="refreshCode" />
          <img src="" alt="">
        </el-col>
      </el-row>

      <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { login, getCaptcha } from '@/api/user';

export default {
  name: "Login",
  components: {},
  data() {
    return {
      title: 'Galaxy资产灯塔系统',
      loginForm: {
        username: "", //admin1
        password: "",//admin123
        validate_code: "",
      },
      captchInfo: {
        captcherImg: '',
        userKey: ''
      },

      loginRules: {
        username: [{ required: true, trigger: "blur", message: '用户名必填' }],
        password: [{ required: true, trigger: "blur", message: '密码必填' }],
        validate_code: [{ required: true, trigger: "blur", message: '验证码必填' }],
      },
      passwordType: "password",//password
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.refreshCode()
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
  },
  methods: {
    refreshCode() {
      getCaptcha().then(({data}) => {
        console.log('getCaptcha',data)
        this.captchInfo.userKey = data.userKey;
        this.captchInfo.captcherImg = 'data:image/jpg;base64,'+data.captcherImg
      })
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let params = Object.assign(this.loginForm, { user_key: this.captchInfo.userKey })
          this.$store
            .dispatch("user/login", params)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch((err) => {
              this.$message.error(err)
              this.loginForm.validate_code = ""
              this.refreshCode()
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .code-img {
    height: 47px;
    width: 100%;
    min-width:80px;
    background-color: #f2f2f2;
    border-radius: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
