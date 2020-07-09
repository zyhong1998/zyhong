<template>
  <div class="userupdate">
    <div class="form">
      <p>修改密码</p>
      <hr />
      <el-form
        :model="updateForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="updateForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPassword1">
          <el-input type="password" v-model="updateForm.checkPassword1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPassword2">
          <el-input type="password" v-model="updateForm.checkPassword2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.updateForm.checkPassword1 !== "") {
          this.$refs.updateForm.validateField("checkPassword2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.updateForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      updateForm: {
        password: "",
        checkPassword1: "",
        checkPassword2: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        checkPassword1: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        checkPassword2: [
          { required: true, message: "请再次输入新密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.userupdate {
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