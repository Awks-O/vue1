/**
 * 表格组件范例
 * 
 * @author xiaowenjie https://github.com/xwjie
 */
<template>
  <div>
    <el-input
      style="width:90%"
      placeholder="请输入查询的药品"
      prefix-icon="el-icon-search"
      v-model="keyword"
    ></el-input>
    <br/>
    <DataVisible></DataVisible>
    <!-- <Pagination url="/config/list" v-model="configs"/> -->
  </div>
</template>

<script>
import DataVisible from "./DataVisible";
export default {
  components: {
    DataVisible
  },
  data() {
    return {
      configs: []
    };
  }
};
</script>