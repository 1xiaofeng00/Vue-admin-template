<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        //隐藏y轴
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowgreen",
          //柱状图的宽度
          barWidth: 10,
          //背景颜色设置
          showBackground: true,
          // 设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          //文本标签
          label: {
            show: true,
            formatter: "|",
            // 文本标签位置
            position: "right",
          },
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
