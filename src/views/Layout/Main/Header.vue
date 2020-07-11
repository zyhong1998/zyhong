<template>
  <div class="header">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="v in breadArr" :key="v.title" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        欢迎你，biubiubiu
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="jumpPersonal">个人中心</el-dropdown-item>

        <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 头像 -->
    <el-avatar size="medium" :src="avatar"></el-avatar>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      avatar: require("@/assets/imgs/1.jpg"),
      breadArr: []
    };
  },
  methods: {
    // 计算面包屑
    calcBread() {
      let arr = [{ title: "首页", path: "/home" }];
      this.$route.matched.forEach(v => {
        // 如果有meta且meta中有配置了
        if (v.meta && v.meta.title) {
          arr.push({
            title: v.meta.title,
            path: v.path
          });
        }
      });
      // console.log(arr);
      this.breadArr = arr;
    },
    // 跳转到个人中心
    jumpPersonal() {
      this.$router.push("/user/Personal");
    },
    // 退出登陆
    outLogin() {
      this.$message({ message: "欢迎下次再来,雅虎", type: "success" });
      local.clear(); // 清除本地
      this.$router.push("/login"); // 跳转到登录
    }
  },
  created() {
    this.calcBread(); // 进入页面 或者 刷新页面 调用计算面包屑的函数
  }, // 侦听器
  watch: {
    "$route.path"(newVal, oldVal) {
      this.calcBread(); // 切换导航 地址栏就会变化 也要调用计算面包屑的函数
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 2px 5px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #fff;

  .el-breadcrumb {
    display: flex;
    flex: 1;
    list-style: none;
  }
  .el-dropdown {
    cursor: pointer;
  }
  .el-avatar {
    margin: 0 20px 0 10px;
  }
}
</style>