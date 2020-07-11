<template>
  <div class="login">
    <div class="form">
      <h2 class="title">登录页面</h2>
      <div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="account">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.account"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @click.native="changeIcon"
              :type="isOpen?'text':'password'"
              :suffix-icon="isOpen?'iconfont icon-yanjing1':'iconfont icon-yanjing' "
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入正则验证
import { REG_ACC } from "@/utils/REG";

// 引入发送登陆请求函数
import { checkLogin } from "@/api/account";

// 引入本地存储封装函数
import local from "@//utils/local";
export default {
  data() {
    // 自定义验证
    const checkAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入账号"));
      } else if (!REG_ACC.test(val)) {
        callback(new Error("字母开头，4到15位，允许字母数字下划线"));
      } else {
        callback();
      }
    };
    return {
      loginForm: { account: "", password: "" },
      rules: {
        //单个验证是对象
        account: { required: true, validator: checkAcc, trigger: "blur" },
        // 多个验证 【是数组】
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      },
      // 眼睛
      isOpen: false
    };
  },
  methods: {
    // 登陆
    login() {
      // 验证所有表单
      this.$refs.loginForm.validate(async valid => {
        // console.log(valid);
        if (valid) {
          //成功
          let { code, token, role } = await checkLogin(this.loginForm);
          if (code === 0) {
            // 将token放入本地存储
            local.set("t_k", token);
            this.$router.push("/");
          }
        } else {
          //失败
          this.$message({
            message: "登陆失败请重试",
            type: "success"
          });
          return;
        }
      });
    },
    // 睁眼闭眼
    changeIcon(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background: rgba(45, 58, 75, 0.8);
  background: url("../assets/imgs/login.jpg") no-repeat;
  background-size: 100%;
  .title {
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 700;
  }
  .form {
    width: 400px;
    height: 400px;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .el-input {
      margin-bottom: 10px;
    }
    /deep/input {
      background: #fff;
    }
    button {
      width: 100%;
    }
    /deep/.icon-yanjing,
    /deep/.icon-yanjing1 {
      cursor: pointer;
    }
    /deep/.el-input__icon {
      font-size: 20px;
    }
  }
}
</style>