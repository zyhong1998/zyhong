<template>
  <div class="useradd">
    <Paner>
      <h3 slot="title">添加用户</h3>
      <div slot="content">
        <div class="form">
          <el-form ref="userForm" :model="userForm" label-width="80px" status-icon :rules="rules">
            <!-- 账号 -->
            <el-form-item label="账号" prop="account">
              <el-input v-model="userForm.account" placeholder="请输入账号"></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item label="用户组" prop="userGroup">
              <el-select v-model="userForm.userGroup" placeholder="请选择用户组">
                <el-option label="普通管理员" value="普通管理员">普通管理员</el-option>
                <el-option label="超级管理员" value="超级管理员">超级管理员</el-option>
              </el-select>
            </el-form-item>

            <!-- 重置 -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </Paner>
  </div>
</template>

<script>
import Paner from "@/components/Paner.vue";
// 引入正则验证
import { REG_ACC, REG_PWD } from "@/utils/REG";
// 引入发送添加账户请求
import { userAdd } from "@/api/account";
export default {
  components: {
    Paner
  },
  data() {
    // 自定义验证规则
    /* 
      rule: 是一个对象，不用
      val:  就是用户输入的值
      callback: 是一个回调函数
        如果错误：  callback(new Error("错误信息"))
        如果正确：  callback()
    */
    const checkAcc = (rule, val, callback) => {
      // 判断为空时
      if (!val) {
        callback(new Error("请输入账号"));
      } else if (!REG_ACC.test(val)) {
        //正则验证不合格
        callback(new Error("字母开头，4到15位，允许字母数字下划线"));
      } else {
        //成功
        callback();
      }
    };
    const checkPwd = (rule, val, callback) => {
      // 判断为空时
      if (!val) {
        callback(new Error("请输入密码"));
      } else if (!REG_PWD.test(val)) {
        //正则验证不合格
        callback(new Error("6到18位(以字母开头，包含字母、数字和下划线)"));
      } else {
        //成功
        callback();
      }
    };
    return {
      userForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      rules: {
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPwd, trigger: "blur" },

        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    // 添加
    onSubmit() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // alert("添加成功");
          let { code, token, role } = await userAdd(this.userForm);
          if (code === 0) {
            this.$router.push("/user/user-list");
          }
        } else {
          this.$message.error("不能添加");
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.userForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.useradd {
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