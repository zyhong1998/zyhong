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
        <template v-for="menu in menus">
          <!-- 一级菜单栏 -->
          <el-menu-item
            :index="menu.children && menu.children.length && menu.children[0] != '' ? menu.children[0].path : menu.path"
            :key="menu.path"
            v-if="menu.children && menu.children.length ===1 || menu.path =='/order'"
          >
            <i :class="menu.meta.icon"></i>
            <span slot="title">{{menu.meta.title}}</span>
          </el-menu-item>

          <!-- 一级、二级菜单栏 -->
          <el-submenu v-else :index="menu.path" :key="menu.path">
            <template slot="title">
              <i :class="menu.meta.icon"></i>
              <span>{{menu.meta.title}}</span>
            </template>
            <el-menu-item
              v-for="item in menu.children"
              :index="item.path"
              :key="item.path"
            >{{item.meta.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      menus: []
    };
  },
  computed: {
    // 当前激活
    curActive() {
      if (this.$route.path == "/order/order-update") return "/order/order-list";
      return this.$route.path;
    }
  },
  created() {
    // 去除本地存储好的动态菜单
    this.menus = local.get("menus");
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