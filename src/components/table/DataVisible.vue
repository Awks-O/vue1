<template>
  <!-- 图表 -->
  <div>
    <div class="charts">
      <div id="myChart" @v-show="reload" :style="{width:'100%',height:'300px'}"></div>
      <span>{{xList}}</span>
      <span>{{yList}}</span>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  props: { xList: { Array, required: true }, yList: { Array, required: true } },
  mounted() {
    /*ECharts图表*/
    var a1 =  this.xList.slice(0,)
    var a2 = this.yList.slice(0,);
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
        data:a1,
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
      series: [
        { type: "line", seriesLayoutBy: "row", smooth: true, smoothness: 1 }
      ]
    });
  },
  methods: {
    reload() {},
    refreshDone: {
      type: Function,
      required: false,
      default: null
    }
  }
};
</script>