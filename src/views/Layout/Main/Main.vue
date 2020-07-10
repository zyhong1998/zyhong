<template>
  <div class="main">
    <!-- 上 -->
    <Header />
    <!-- 下 -->
    <div class="content">
      <!-- 路由出口 -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: scroll;
    background: #ccc;
    padding: 20px;
  }
}
</style>