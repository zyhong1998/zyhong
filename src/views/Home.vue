<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(v,i) in cardclass" :key="i">
        <!-- 使用封装的组件 -->
        <Card :carditem="v"></Card>
      </el-col>
    </el-row>
    <div class="echarts">
      <div class="echarts-main" ref="echarts"></div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import echarts from "echarts";
export default {
  components: {
    Card
  },
  data() {
    return {
      cardclass: [
        { iconSrc: "el-icon-document", title: "总订单", num: "41414" },
        { iconSrc: "iconfont icon-qian", title: "总销售额", num: "4141241" },
        { iconSrc: "el-icon-s-claim", title: "今日订单数", num: "3213123" },
        { iconSrc: "iconfont icon-tsk", title: "今日销售额", num: "2131" }
      ]
    };
  },
  created() {
    this.option = {
      title: {
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单", "销售额", "注册人数", "管理员人数"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "销售额",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "注册人数",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "管理员人数",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        }
      ]
    };
  },
  mounted() {
    echarts.init(this.$refs.echarts).setOption(this.option);
  }
};
</script>

<style lang="less" scoped>
.echarts {
  background: #fff;
  height: 360px;
  border-radius: 4px;
  padding: 10px;
  .echarts-main {
    width: 100%;
    height: 300px;
  }
}
.card {
  /deep/span {
    font-size: 50px;
  }
}
/deep/.el-icon-document,
/deep/.el-icon-s-claim {
  color: rgb(41, 160, 233);
}
/deep/.el-icon-bangzhu {
  color: rgb(26, 250, 41);
}
/deep/.icon-qian {
  color: #d73182;
}
/deep/.icon-tsk {
  color: #1ffa2e;
}
</style>