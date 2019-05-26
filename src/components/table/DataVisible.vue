<template>
  <!-- 图表 -->
  <div>
    <div class="charts">
      <div id="myChart" :style="{width:'100%',height:'300px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },

  mounted() {
    /*ECharts图表*/
    var a1 = [
      "product",
      "2015",
      "2016",
      "2017",
      "预测",
      "20171",
      "预测1",
      "20127",
      "2预测",
      "22017",
      "2预测"
    ];
    var a2 = [
      "Matcha Latte",
      43.3,
      85.8,
      13.7,
      23.7,
      93.7,
      53.7,
      93.7,
      3.7,
      93.7
    ];
    var myChart = echarts.init(document.getElementById("myChart"), "dark");
    myChart.setOption({
      title: {
        text: "药品消耗趋势",
        textStyle: {
          color: "#000000"
        }
      },
      tooltip: {
        trigger: "axis"
      },
      label: {
        show: true
      },
      // 背景色
      backgroundColor: "#FFFFFF",
      // 折线上数据的颜色
      textStyle: {
        color: "#000000"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: true },
          magicType: { show: true, type: ["bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        },
        itemStyle: {
          color: "#000000" //左边线的颜色
        }
      },
      dataset: {
        // 提供一份数据。
        source: [a1, a2]
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#000000" //左边线的颜色
          }
        },
        axisLabel: {
          textStyle: {
            color: "#000000" //坐标值得具体的颜色
          }
        }
        //data: ["0", "6H", "9H", "12H", "15H", "18H", "24H"]
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#000000" //左边线的颜色
          }
        },
        axisLabel: {
          textStyle: {
            color: "#000000" //坐标值得具体的颜色
          }
        }
      },
      series: [{ type: "line", seriesLayoutBy: "row", smooth:true, smoothness:1 }]
    });
  },
  methods: {}
};
</script>