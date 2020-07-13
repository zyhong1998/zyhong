<template>
  <div class="personal">
    <h3 style="margin-top: 10px;">管理员信息</h3>
    <el-divider></el-divider>

    <span>管理员ID：{{user.id}}</span>
    <el-divider></el-divider>
    <span>账号：{{user.account}}</span>
    <el-divider></el-divider>
    <span>用户组：{{user.userGroup}}</span>
    <el-divider></el-divider>
    <span>创建时间：{{user.ctime}}</span>
    <el-divider></el-divider>
    <div class="footerBox">
      管理员头像:
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
      >
        <img v-if="imgUrl" :src="imgUrlBase + imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button @click="handelUpdateUserAvtar" size="small" type="primary">点击修改</el-button>
    </div>
  </div>
</template>

<script>
// 引入封装获取个人信息的函数
import { getUserInfo, UpdateUserAvatr } from "@/api/account";
// 引入moment处理时间
import moment from "moment";
// 引入local
import local from "@/utils/local";
export default {
  data() {
    return {
      user: {},
      imgUrl: "",
      imgUrlBase: "http://127.0.0.1:5000/upload/imgs/acc_img/"
    };
  },
  methods: {
    // 上传成功返回的
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        //上传成功
        this.$message({ type: "success", message: res.msg });
        // 将图片铺盖当前显示框
        this.imgUrl = res.imgUrl;
      } else {
        this.message.error("请稍后再试");
      }
    },
    // 检测上传格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改头像
    async handelUpdateUserAvtar() {
      let { code } = await UpdateUserAvatr({ imgUrl: this.imgUrl });

      if (code === 0) {
        // 中介传输
        this.$bus.$emit("update_avatar");
        // 将上传框的图片清空
        this.imgUrl = "";
      }
    }
  },
  created() {
    // 本地拿取个人信息
    let userData = local.get("user");
    // 处理时间
    userData.ctime = moment(userData.ctime).format("YYYY-MM-DD HH:mm:ss");
    // 渲染
    this.user = userData;
  }
};
</script>

<style lang="less" scoped>
.personal {
  border-radius: 6px;
  background: #fff;
  padding: 10px;

  .footerBox {
    display: flex;
    align-items: center;
    .demo-image {
      margin-left: 20px;
    }
  }
}
// 上传头像
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>