<template>
  <section>
    <el-input
      style="width:220px"
      placeholder="请输入出入库方过滤"
      prefix-icon="el-icon-search"
      v-model="keyword"
    ></el-input>

    <div style="float: right;">
      <el-button size="medium" type="primary" @click="exportFile" style="margin-left: 10px;">导出</el-button>
      <el-button size="medium" type="primary" @click="handleAdd">添加出库纪录</el-button>
    </div>

    <el-scrollbar>
      <el-table
        :data="details"
        size="mini"
        border
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="medicineNumber" label="本位码" width="145" align="center"></el-table-column>
        <el-table-column prop="medicineName" label="药品名称" align="center" width="145"></el-table-column>
        <el-table-column prop="amount" label="数量" align="center" width="100"></el-table-column>
        <el-table-column prop="stockUnit" label="规格" align="center" width="100"></el-table-column>
        <el-table-column prop="unitPrice" label="退货单价" align="center" width="100"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" width="150"></el-table-column>
        <el-table-column
          prop="outDate"
          label="出库日期"
          align="center"
          :formatter="dateFormat"
          width="130"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="large">编辑</el-button>
            <el-button @click="delItem(scope.row.id)" type="text" size="large">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
    </el-scrollbar>

    <Pagination
      ref="page2"
      url="/medicine/outInfo/list"
      :pageSize="pagesize"
      :page="page"
      :keyword="keyword"
      :sort="sort"
      v-model="details"
    />

    <!--编辑界面-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="本位码" prop="medicineNumber">
          <el-input v-model="editForm.medicineNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="medicineName">
          <el-input v-model="editForm.medicineName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储单位" prop="stockUnit">
          <el-select v-model="editForm.stockUnit" placeholder="请选择">
            <el-option
              v-for="item in unit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退货单价" prop="unitPrice">
          <el-input v-model="editForm.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <el-input v-model="editForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="editForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="outDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.outDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="editDetail">添加</el-button>
        <el-button v-else type="primary" @click="editDetail">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  methods: {
    sortChange({ prop, order }) {
      this.sort = { prop, order };
    },
    exportFile:function() {
      window.location.href="http://localhost:8085/medicine/outInfo/export";
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "data not found";
      }
      return new Date(date).format("yyyy-MM-dd");
    },
    outInFormat: function(row, column) {
      var data = row[column.property];
      if (data == 1) {
        return "出库";
      } else {
        return "入库";
      }
    },
    //新增
    editDetail: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              let param = Object.assign({}, this.editForm);
              this.ajax.post("/medicine/outInfo/edit", param).then(result => {
                if (result.code == "SUCCESS") {
                  this.info("操作成功!");
                } else {
                  this.error(result.msg);
                }
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                this.refreshConfig();
              });
            })
            .catch(e => {
              this.info("操作失败!:" + e);
            });
        }
      });
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      if (this.$refs["editForm"] !== undefined) {
        this.$refs["editForm"].resetFields();
      }
      this.dialogFormVisible = true;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    delItem(id) {
      this.confirm("此操作将永久删除该记录, 是否继续?").then(() => {
        this.ajax.post("/medicine/outInfo/del?id=" + id).then(result => {
          if (result.code == "SUCCESS") {
            this.info("delete success");
            this.refreshConfig();
            this.info("删除成功!");
          } else {
            this.error(result.msg);
          }
        });
      });
    },
    // 刷新表格数据
    refreshConfig() {
      this.$refs.page2.reload();
    }
  },
  data() {
    return {
      unit: [
        {
          value: "盒",
          label: "盒"
        },
        {
          value: "瓶",
          label: "瓶"
        },
        {
          value: "袋",
          label: "袋"
        },
        {
          value: "片",
          label: "片"
        }
      ],
      keyword: "",
      details: [],
      page: "",
      pagesize: 10,
      sort: {},
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      total: 0,
      //编辑界面数据
      editForm: {
        id: "0"
      }
    };
  }
};
</script>