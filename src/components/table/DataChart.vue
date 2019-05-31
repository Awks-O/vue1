<template>
  <el-row :gutter="10">
    <el-col :span="16">
      <ve-line :data="chartData" width="1000px"></ve-line>
    </el-col>
    <!-- <span>{{dataList}}</span> -->
  </el-row>
</template>

<script>
export default {
  props: { dataList: { Array, required: true } },
  methods: {
    selectRow(index) {
      var row = this.configs[index];
      this.$refs.table1.setCurrentRow(row);
      this.rowClick(row);
    },
    rowClick(row) {
      // console.log(row);
      this.currentRow = row;
      this.load(row.id);
    },
    load(uploadRecordId) {
      // console.log("图表", uploadRecordId);
      this.ajax
        .get("/chart/line?uploadRecordId=" + uploadRecordId)
        .then(result => {
          if (result.code == 0) {
            //this.info("delete success");
            this.chartData = result.data;
          } else {
            this.error(result.msg);
          }
        });
    }
  },
  created() {
    // 这是模拟动态数据用的
    // setTimeout(() => {
    this.chartData.columns = ["日期", "数量"];
    this.chartData.rows = this.dataList;
    // }, 2000);
  },
  data() {
    this.chartSettings = {
      axisSite: { right: ["数量"] },
      yAxisName: ["数值", "比率"]
    };
    return {
      keyword: "",
      configs: [],
      sort: {},
      currentRow: {
        dataCount: 0
      },
      chartData: {
        columns: ["日期", "销售额-1季度"],
        rows: [
          { 日期: "1月1日", "销售额-1季度": 1523 },
          { 日期: "1月2日", "销售额-1季度": 1223 }
        ]
      },
      dataList: [
        // { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        // { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        // { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        // { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        // { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        // { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
      ]
    };
  }
};
</script>

<style>
.num {
  border: 1px solid darkgrey;
  background-color: #fcfcfc;
  width: 20px;
  margin: 5px 15px 5px 0;
  display: inline-block;
  cursor: pointer;
  text-align: center;
}

.current-filename {
  border: 1px solid darkgrey;
  background-color: #fcfcfc;
  padding: 1px 5px 1px 5px;
  margin: 5px 30px 5px 0;
  display: inline-block;
}

.active {
  background-color: yellow;
}
</style>
