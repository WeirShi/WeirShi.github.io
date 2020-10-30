<template>
  <a-spin class="regist" :spinning="loading" tip="登录中...">
    <div class="regist-content">
      <div class="logo" style="width:100%;">
        <div class="name">账号注册</div>
      </div>
      <a-form-model
        ref="loginForm"
        class="regist-form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <a-form-model-item prop="userName">
          <a-input
            type="text"
            v-model="loginForm.userName"
            placeholder="请输入手机号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="passWord">
          <a-input-password
            v-model="loginForm.passWord"
            placeholder="请输入密码"
            @keyup.enter.native="regist"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a
            class="regist-form-forgot"
            href="/admin/login"
            style="float: right;"
          >
            已有账号？立即登录！
          </a>
          <a-button type="primary" @click="regist">注册</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { FormModel } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Regist extends Vue {
  private loading = false;
  private rememberPwd = false;
  private loginForm: Dictionary<string> = {
    userName: "",
    passWord: ""
  };
  private loginFormRules: object = {
    userName: [
      { required: true, message: "请输入手机号!", trigger: "blur" },
      { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: "手机号输入有误" }
    ],
    passWord: [{ required: true, message: "请输入密码!", trigger: "blur" }]
  };
  /**
   * 用户登录
   * @date 2020-10-09
   */
  private regist(e: MouseEvent): void {
    e.preventDefault();
    this.loading = true;
    (this.$refs.loginForm as FormModel).validate(async valid => {
      if (valid) {
        const { code, msg } = await this.$api.FetchRegist({
          mobile: this.loginForm.userName,
          password: this.loginForm.passWord
        });
        this.loading = false;

        if (code === 0) {
          this.$message.success(msg);
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 200);
        } else {
          this.$message.error(msg);
        }
      }
    });
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
.regist {
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
