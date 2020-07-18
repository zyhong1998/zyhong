<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(v,i) in cardclass" :key="i">
        <!-- 使用封装的组件 -->
        <Card :carditem="v"></Card>
      </el-col>
    </el-row>
    <LineEcharts :options="optionsData" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import LineEcharts from "@/components/LineEcharts.vue";
import { getTotal } from "@/api/home";
export default {
  components: {
    Card,
    LineEcharts
  },
  data() {
    return {
      cardclass: [
        { iconSrc: "el-icon-document", title: "总订单", num: "" },
        { iconSrc: "iconfont icon-qian", title: "总销售额", num: "" },
        { iconSrc: "el-icon-s-claim", title: "今日订单数", num: "" },
        { iconSrc: "iconfont icon-tsk", title: "今日销售额", num: "" }
      ],
      optionsData: {
        title: "数据统计",
        lengend: ["订单", "销售额"],
        xAxisData: [],
        seriesData: []
      }
    };
  },
  methods: {
    async getData() {
      // 发送ajax
      let {
        xData,
        orderData,
        amountData,
        totalOrder,
        totalAmount,
        todayOrder,
        totayAmount
      } = await getTotal();

      let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
      // 卡片数据渲染
      this.cardclass.forEach((v, i) => (v.num = arr[i])); //卡片数据渲染
      this.optionsData.xAxisData = xData; //x轴数据渲染
      //series核心参数渲染
      this.optionsData.seriesData = [
        {
          name: "订单",
          type: "line",
          data: orderData
        },
        {
          name: "销售额",
          type: "line",
          data: amountData
        }
      ];
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
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