/**
 * 表格组件范例
 * 
 */
<template>
  <div>
    <el-input placeholder="请输入关键字过滤" prefix-icon="el-icon-search" v-model="keyword"></el-input>
    <p/>
    <el-scrollbar>
      <el-table
        :data="configs"
        border
        size="mini"
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="id" label="药品编号" width="100" align="center"></el-table-column>
        <el-table-column prop="username" label="药品名称" align="center" width="120"></el-table-column>
        <el-table-column prop="email" label="库存单位" align="center" width="120"></el-table-column>
        <el-table-column prop="phone" label="库存量" align="center" width="130"></el-table-column>
        <el-table-column prop="sex" label="报警值" align="center" width="100"></el-table-column>
        <el-table-column prop="zone" label="预计采购日期" align="center" width="150"></el-table-column>
        <el-table-column prop="zone" label="预计剩余可用日期" align="center" width="150"></el-table-column>
        <el-table-column
          prop="create_datetime"
          label="药品消耗趋势"
          width="154"
          align="center"
          :formatter="formatter"
        >
          <template scope="scope">
            <el-button @click="editItem(scope.$index, tableData)" type="text" size="large">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteConfig(scope.row)" type="text">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <Pagination
      ref="page1"
      url="/config/list"
      :pageSize="5"
      :keyword="keyword"
      :sort="sort"
      v-model="configs"
    />
  </div>
</template>

<script>
export default {
  methods: {
    sortChange({ column, prop, order }) {
      this.sort = { prop, order };
    },
    deleteConfig(row) {
      this.confirm("此操作将永久删除该记录, 是否继续?")
        .then(() => {
          this.ajax.post("/config/delete?id=" + row.id).then(result => {
            if (result.code == 0) {
              this.info("delete success");
              this.refreshConfig();
              this.info("删除成功!");
            } else {
              this.error(result.msg);
            }
          });
        })
        .catch(() => {
          this.info("已取消删除");
        });
    },
    // 刷新表格数据
    refreshConfig() {
      this.$refs.page1.reload();
    }
  },
  data() {
    return {
      keyword: "",
      configs: [],
      sort: {}
    };
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
