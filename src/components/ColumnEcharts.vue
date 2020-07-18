<template>
  <div class="echarts">
    <div class="echarts-main" ref="box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    options: {
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    getEcharts(options) {
      let option = {
        xAxis: {
          type: "category",
          data: options.xAxis
        },
        yAxis: {
          type: "value"
        },
        // series: [
        //   {
        //     data: [120, 200, 150, 80, 70, 110, 130],
        //     type: "bar"
        //   }
        // ]
        title: {
          text: options.title //标题
        },
        legend: {
          data: options.lengend //头部分块
        },
        series: options.series
      };
      // 初始化报表, 使用配置 生成报表
      echarts.init(this.$refs.box).setOption(option);
    }
  },
  mounted() {
    // 调用方法 生成报表
    this.getEcharts(this.options);
  },
  //深度侦听器
  watch: {
    // 观察options的变化,有变化时触发handler这个函数
    options: {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal);
        this.getEcharts(newVal); //监听到options变化时就 将新数据传入函数进行渲染报表
      },
      deep: true //深度监听
    }
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
</style>