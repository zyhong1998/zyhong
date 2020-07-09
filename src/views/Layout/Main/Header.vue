<template>
  <div class="header">
    <ul>
      <li v-for="(item, i) in breadArr" :key="item">
        {{ item }}
        <span v-if=" i !== breadArr.length - 1">/</span>
      </li>
    </ul>
    <h4>欢迎你biubiu</h4>
    <div class="img">
      <img :src="imgSrc" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("@/assets/imgs/1.jpg"),
      breadArr: []
    };
  },
  methods: {
    // 计算面包屑
    calcBread() {
      let arr = ["首页"];
      arr.push(this.$route.meta.title);
      this.breadArr = arr;
      console.log(this.$route);
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
  ul {
    display: flex;
    flex: 1;
    list-style: none;
  }
  .img {
    margin-left: 10px;
    width: 40px;
    height: 40px;

    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>