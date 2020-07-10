<template>
  <div class="userupdate">
    <Paner>
      <h3 slot="title">修改密码</h3>
      <div slot="content">
        <div class="form">
          <el-form
            :model="updateForm"
            status-icon
            :rules="rules"
            ref="updateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="oldPwd">
              <el-input type="password" v-model="updateForm.oldPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input type="password" v-model="updateForm.newPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confrimPwd">
              <el-input type="password" v-model="updateForm.confrimPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">确定</el-button>
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
import { REG_PWD } from "@/utils/REG";
export default {
  components: {
    Paner
  },
  data() {
    // 自定义验证
    const checkNewPwd = (rule, val, callback) => {
      // 验证非空
      if (!val) {
        callback(new Error("请输入新密码"));
      } else if (!REG_PWD.test(val)) {
        //正则验证失败
        callback(new Error("字母开头，4到15位，允许字母数字下划线"));
      } else {
        // 反向验证二次密码匹配
        if (this.updateForm.confrimPwd !== "") {
          // 如果二次密码不为空时，触发表单部分验证
          this.$refs.updateForm.validateField("confrimPwd"); //重新验证是否一致
        }
        //正则验证成功
        callback();
      }
    };
    const checkCfrimPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请再次输入新密码"));
      } else if (val !== this.updateForm.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      updateForm: {
        oldPwd: "",
        newPwd: "",
        confrimPwd: ""
      },
      rules: {
        // 原密码
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        // 新密码
        newPwd: [{ required: true, validator: checkNewPwd, trigger: "blur" }],
        // 确认新密码
        confrimPwd: [
          { required: true, validator: checkCfrimPwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          // alert("添加成功");

          this.$message({
            message: "恭喜你，修改成功",
            type: "success"
          });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.updateForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.userupdate {
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