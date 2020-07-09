<template>
  <div class="personal">
    <span>管理员信息</span>
    <el-divider></el-divider>

    <span>管理员ID：11</span>
    <el-divider></el-divider>
    <span>账号：阿曾</span>
    <el-divider></el-divider>
    <span>用户组：超级管理员</span>
    <el-divider></el-divider>
    <span>创建时间：2020/02/01</span>
    <el-divider></el-divider>
    <div class="footerBox">
      管理员头像:
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <span class="demonstration"></span>
          <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fits: ["cover"],
      url: require("@/assets/imgs/1.jpg")
    };
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
</style>