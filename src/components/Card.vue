<template>
  <div class="card">
    <span :class="carditem.iconSrc"></span>
    <div>
      <h4 class="title">{{carditem.title}}</h4>
      <p class="num">{{carditem.num}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 接收参数
  // props: ["carditem"]
  props: {
    carditem: {
      type: Object,
      required: true,
      default: () => {} // 默认值 如果是数组或对象 必须写成 （）=》[]  或 ()=>{}
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  height: 100px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px #ccc;
  margin-bottom: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    margin-bottom: 6px;
    color: #ccc;
  }
  .num {
    color: #333;
  }
}
</style>