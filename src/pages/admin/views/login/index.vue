<template>
  <a-spin class="login" :spinning="loginLoading" tip="登录中...">
    <div class="login-content">
      <div class="logo" style="width:100%;">
        <div class="name">博客后台管理系统</div>
      </div>
      <a-form-model
        ref="loginForm"
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <a-form-model-item prop="userName">
          <a-input
            type="text"
            v-model="loginForm.userName"
            placeholder="请输入登录账号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="passWord">
          <a-input
            type="password"
            v-model="loginForm.passWord"
            placeholder="请输入登录密码"
            @keyup.enter.native="login"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox v-model="rememberPwd" @change="setIsNeedRemeberPassword">
            记住我
          </a-checkbox>
          <a
            class="login-form-forgot"
            href="/admin/forget"
            style="float: right;"
          >
            忘记密码
          </a>
          <a-button type="primary" @click="login">登录</a-button>
          Or
          <a href="/admin/regist">
            立即注册!
          </a>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { FormModel, Checkbox } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import cookies from "@/public/utils/cookies";
import { getParamsCode } from "@/public/utils/getParamsCode";

type Up = {
  userName: string;
  passWord: string;
};

@Component
export default class Login extends Vue {
  private loginLoading = false;
  private rememberPwd = false;
  private loginForm: Up = {
    userName: "",
    passWord: ""
  };
  private loginFormRules: object = {
    userName: [{ required: true, message: "请输入登录账号!", trigger: "blur" }],
    passWord: [{ required: true, message: "请输入密码!", trigger: "blur" }]
  };
  /**
   * 用户登录
   * @date 2020-10-09
   */
  private login(e: MouseEvent): void {
    e.preventDefault();
    this.loginLoading = true;
    (this.$refs.loginForm as FormModel).validate(async valid => {
      if (valid) {
        const { statusCode, data, message } = await this.$api.FetchLogin({
          mobile: this.loginForm.userName,
          password: this.loginForm.passWord
        });
        this.loginLoading = false;
        if (statusCode === 0) {
          this.$message.success(message);
          const { token, ...userInfo } = data;
          cookies.set("token", window.btoa(token), { expires: 3 });
          this.$cache.set("userInfo", userInfo);
          this.toPage();
        } else {
          this.$message.error(message);
        }
      }
    });
  }

  /**
   * 判断是否记住密码
   *
   */
  private setIsNeedRemeberPassword(e: Event): void {
    cookies.set(
      "pwdRemember",
      String(((e.target as unknown) as Checkbox).checked),
      {
        expires: 3
      }
    );
    if (this.rememberPwd) {
      cookies.set(
        "uinfo",
        {
          userName: window.btoa(this.loginForm.userName),
          passWord: window.btoa(this.loginForm.passWord)
        },
        { expires: 3 }
      );
    } else {
      cookies.remove("uinfo");
    }
  }

  /**
   * 根据是否记住密码填充信息
   *
   */
  private setPasswordByRemember() {
    this.rememberPwd = !!Number(cookies.get("pwdRemember"));
    const uInfo: Up | string | null = cookies.get("uinfo");
    if (this.rememberPwd && uInfo && typeof uInfo === "object") {
      this.loginForm.userName = window.atob(uInfo.userName);
      this.loginForm.passWord = window.atob(uInfo.passWord);
    }
  }

  // 检查用户是否登录过
  private async checkLogin(): Promise<void> {
    const { statusCode } = await this.$api.FetchGetUser();
    if (statusCode === 0) {
      this.toPage();
    } else {
      this.setPasswordByRemember();
    }
  }

  private toPage(): void {
    setTimeout(() => {
      if (getParamsCode("backUrl")) {
        window.location.href = getParamsCode("backUrl") as string;
      } else {
        this.$router.push({ name: "main" });
      }
    }, 200);
  }

  created() {
    this.checkLogin();
  }
}
</script>

<style scoped lang="less">
.ant-btn {
  width: 100%;
}
.logo {
  text-align: center;
  .name {
    margin-top: 24px;
    margin-bottom: 65px;
    color: #0f1744;
    font-size: 24px;
    position: relative;
  }
}
.login {
  background: #f0f2f5;
  background-image: url(~@/assets/images/login-bg.png);
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  padding: 110px 0 144px 0;
  position: absolute;
  &-content {
    width: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  /deep/.ant-spin-container {
    height: 100%;
    position: absolute;
    width: 100%;
    top: 0;
  }
}
</style>
