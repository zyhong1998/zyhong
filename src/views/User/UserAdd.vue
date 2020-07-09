<template>
  <div class="useradd">
    <div class="form">
      <p>添加账号</p>
      <hr />
      <el-form ref="userForm" :model="userForm" label-width="80px" :rules="rules">
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="用户组">
          <el-select v-model="userForm.region" placeholder="请选择用户组">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <!-- 重置 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        account: "",
        password: "",
        region: ""
      },
      rules: {
        account: { required: true, message: "请输入账号", trigger: "blur" },
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      alert(1);
    }
  }
};
</script>

<style lang="less" scoped>
.useradd {
  margin: 20px;
  background: #fff;
  height: 360px;
  border-radius: 4px;
  padding: 10px;
  .form {
    p {
      margin-bottom: 10px;
    }
    .el-form {
      margin-top: 30px;
      width: 400px;
    }
  }
}
</style>