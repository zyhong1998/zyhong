<template>
  <div class="layout">
    <!-- 左侧nav -->
    <Nav />
    <!-- 右侧main -->
    <Main />
  </div>
</template>

<script>
import Nav from "@/views/Layout/Nav.vue";
import Main from "@/views/Layout/Main/Main.vue";
export default {
  components: {
    Nav,
    Main
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
}
</style>