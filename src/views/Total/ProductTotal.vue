<template>
  <div class="producttotal">
    <div class="serch">
      <span class="demonstration" style="marginRight:10px">时间范围</span>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" class="serchBtn" @click="serchBtn" :disabled="isSerch">查询</el-button>
      <el-button type="success" class="serchBtn" @click="resetBtn" :disabled="isSerch">重置</el-button>
    </div>
    <LineEcharts :options="options"></LineEcharts>
  </div>
</template>

<script>
import LineEcharts from "@/components/LineEcharts.vue";
import { getOrderTotal } from "@/api/total";
import moment from "moment";
export default {
  components: { LineEcharts },
  data() {
    return {
      //选择的时间数
      date: [],
      //传输到组件的数据
      options: {
        title: "商品统计报表",
        topData: [],
        xAxisData: [],
        seriesData: []
      },
      isSerch: true
    };
  },
  methods: {
    // 获取订单统计
    async getTotal() {
      let { data } = await getOrderTotal({ date: JSON.stringify(this.date) });

      // 渲染x轴的时间
      this.options.xAxisData = data.map(v =>
        moment(v.orderTime).format("YYYY-MM-DD YY:mm:ss")
      );
      let obj = [
        {
          name: "订单",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: data.map(v => v.orderAmount)
        }
      ];
      // 渲染核心数据
      this.options.seriesData = obj;
    },
    // 查询
    serchBtn() {
      this.getTotal();
    },
    resetBtn() {
      this.date = "";
      this.getTotal();
    }
  },

  mounted() {
    this.getTotal();
  },
  watch: {
    date: {
      //监控时间选择有无更改
      handler(newVal, oldVal) {
        this.isSerch = false; //将禁用按钮取消
      }
    }
  }
};
</script>

<style lang="less" scoped>
.producttotal {
  border-radius: 6px;

  .serch {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /deep/.block,
    button {
      margin-left: 10px;
    }
  }
}
</style>