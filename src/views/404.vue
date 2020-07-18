<template>
  <div class="error">
    <el-button type="success" @click="backHome">返回首页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    backHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  background: url(../assets/imgs/timg.jpg) no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  button {
    margin-bottom: 90px;
    background-color: transparent;
    border: none;
    font-size: 30px;
  }
}
</style>