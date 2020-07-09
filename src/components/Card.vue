<template>
  <div class="option">
    <span :class="carditem.iconSrc"></span>
    <div>
      <h4>{{carditem.title}}</h4>
      <p>{{carditem.num}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["carditem"]
};
</script>

<style lang="less" scoped>
.option {
  margin: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  width: 200px;
  display: flex;
  justify-content: space-between;
}
</style>