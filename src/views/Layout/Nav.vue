<template>
  <div class="nav">
    <el-col :span="12">
      <el-menu
        :default-active="curActive"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <div class="title">
          <el-avatar icon="el-icon-dish"></el-avatar>
          <h3>外卖商家中心</h3>
        </div>

        <!-- 后台首页 -->
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>

        <!-- 订单管理 -->
        <el-menu-item index="/order/order-list">
          <i class="el-icon-document-copy"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <!-- 商品管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/product/product-list">商品列表</el-menu-item>
          <el-menu-item index="/product/product-add">商品添加</el-menu-item>
          <el-menu-item index="/product/product-class">商品分类</el-menu-item>
        </el-submenu>

        <!-- 店铺管理 -->
        <el-menu-item index="/shop">
          <i class="el-icon-s-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>

        <!-- 账号管理 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/user/user-list">账号列表</el-menu-item>
          <el-menu-item index="/user/user-add">添加账号</el-menu-item>
          <el-menu-item index="/user/user-update">修改密码</el-menu-item>
          <el-menu-item index="/user/Personal">个人中心</el-menu-item>
        </el-submenu>

        <!-- 销售统计 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item index="/total/product-total">商品统计</el-menu-item>
          <el-menu-item index="/total/order-total">订单统计</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  computed: {
    // 当前激活
    curActive() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  flex: 0 0 200px;

  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  /deep/.index {
    .el-submenu__icon-arrow {
      display: none;
    }
  }
  .el-col {
    width: 100%;
    height: 100%;
    .el-menu-vertical-demo {
      height: 100%;
      .title {
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 6px;
        .el-avatar {
          background: rgb(18, 150, 219);
          margin-right: 10px;
          /deep/i {
            font-size: 22px;
            color: #444;
          }
        }
      }
    }
  }
}
/deep/.el-menu-item.is-active {
  color: rgb(18, 150, 219) !important;
}
/deep/.el-menu--inline {
  .el-menu-item {
    background: rgb(32, 47, 63) !important;
    &:hover {
      background: rgb(81, 97, 114) !important;
    }
  }
}
/deep/.el-menu {
  border-right: none;
}
</style>