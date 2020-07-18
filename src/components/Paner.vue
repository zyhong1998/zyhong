<template>
  <div class="paner">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span>
          <!-- 预留插槽 -->
          <slot name="title" />
        </span>

        <div>
          <slot name="button2" />
          <slot name="button1" />
        </div>
      </div>
      <div class="content">
        <slot name="content" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.paner {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>