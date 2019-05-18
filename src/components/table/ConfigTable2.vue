 /**
 * 表格组件范例
 *
 */
<template>
  <div>
    <el-input style="width:90%" placeholder="请输入关键字过滤" prefix-icon="el-icon-search" v-model="keyword"></el-input>
    <el-button size="medium" type="primary" @click="addMedicine">添加药品</el-button>
    <el-scrollbar>
      <el-table
        :data="medicine"
        border
        size="mini"
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="medicineNumber" label="药品编号" width="100" align="center"></el-table-column>
        <el-table-column prop="medicineName" label="药品名称" align="center" width="120"></el-table-column>
        <el-table-column prop="stockUnit" label="库存单位" align="center" width="120"></el-table-column>
        <el-table-column prop="stock" label="库存量" align="center" width="130"></el-table-column>
        <el-table-column prop="alarmValue" label="报警值" align="center" width="100"></el-table-column>
        <el-table-column
          prop="purchaseDate"
          label="预计采购日期"
          align="center"
          width="150"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="usableTime"
          label="预计剩余可用日期"
          align="center"
          width="150"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column prop="createDatetime" label="操作" width="154" align="center">
          <template slot-scope="scope">
            <el-button @click="editItem(scope.$index, tableData)" type="text" size="large">编辑</el-button>
            <el-button @click="deleteConfig(scope.row)" type="text" size="large">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <Pagination
      ref="page1"
      url="/medicine/list"
      :pageSize="5"
      :keyword="keyword"
      :sort="sort"
      v-model="medicine"
    />
  </div>
</template>

<script>
export default {
  methods: {
    sortChange({ prop, order }) {
      this.sort = { prop, order };
    },
    addMedicine() {
      this.sort = { prop, order };
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "data not found";
      }
      return new Date(date).format("yyyy-MM-dd hh:mm:ss");
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
      medicine: [],
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
