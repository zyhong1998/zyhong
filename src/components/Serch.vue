<template>
  <div class="block">
    <!-- <span class="demonstration">时间范围</span> -->
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
    ></el-date-picker>
    <!-- <el-button type="primary" class="serchBtn">查询</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ""
    };
  }
};
</script>

<style lang="less" scoped>
.demonstration {
  margin-right: 20px;
}
.serchBtn {
  margin-left: 20px;
}
</style>