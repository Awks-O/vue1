<template>
  <section>
    <el-input
      style="width:220px"
      placeholder="请输入本位码或药品名称"
      prefix-icon="el-icon-search"
      v-model="keyword"
    ></el-input>

    <el-input
      style="margin-left:10px; width:220px"
      placeholder="请输入供应商名称"
      prefix-icon="el-icon-search"
      v-model="keyword1"
    ></el-input>
    <div style="float: right;">
      <el-button size="medium" type="primary" @click="exportExcel" style="margin-left: 10px;">导出</el-button>
      <el-button size="medium" type="primary" @click="handleAdd" style="margin-left: 10px;">添加</el-button>
    </div>
    <el-scrollbar>
      <el-table
        :data="medicine"
        id="table-data"
        border
        size="mini"
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="medicineNumber" label="本位码" width="130" align="center"></el-table-column>
        <el-table-column prop="medicineName" label="药品名称" align="center" width="130"></el-table-column>
        <el-table-column prop="amount" label="预计采购量" align="center" width="100"></el-table-column>
        <el-table-column prop="unit" label="规格" align="center" width="80"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" width="200"></el-table-column>
        <el-table-column
          prop="purchaseDate"
          label="预订购日期"
          align="center"
          width="150"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column fixed="right" prop="createDatetime" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="large">编辑</el-button>
            <el-button @click="delItem(scope.row.id)" type="text" size="large">删除</el-button>
            <el-button
              v-if="scope.row.forecast==1"
              type="text"
              @click="dataHandle(scope.row)"
              size="large"
            >消耗趋势</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
    </el-scrollbar>

    <Pagination
      ref="page1"
      url="/medicine/purchase/list"
      :pagesize="pagesize"
      :page="page"
      :keyword="keyword"
      :keyword1="keyword1"
      :sort="sort"
      v-model="medicine"
    />

    <el-dialog :visible.sync="dataVisible" width="1050px">
      <DataVisible 
        :dataList="datalist"
      />
    </el-dialog>

    <!--编辑界面-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form :model="editForm" label-width="90px" ref="editForm">
        <el-form-item label="本位码" prop="medicineNumber">
          <el-input v-model="editForm.medicineNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="medicineName">
          <el-input v-model="editForm.medicineName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预计采购量" prop="amount">
          <el-input v-model="editForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="unit">
          <el-select v-model="editForm.unit" placeholder="请选择">
            <el-option
              v-for="item in unit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="editForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="采购日期" prop="purchaseDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.purchaseDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="editMedicine">添加</el-button>
        <el-button v-else type="primary" @click="editMedicine">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import DataVisible from "./DataChart";
export default {
  methods: {
    exportExcel() {
      var pagesize = 10000;
      var page = 1;
      var keyword = this.keyword;
      var keyword1 = this.keyword1;
      var sort = this.sort;
      var params = {
        page,
        pagesize,
        sort,
        keyword1,
        keyword
      };
      this.ajax
        .get("/medicine/purchase/export", params, {
          responseType: "blob"
        })
        .then(res => {
          const blob = new Blob([res], { type: "text/csv;charset=GBK" });
          const fileName = "采购清单.csv";
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
          URL.revokeObjectURL(elink.href); // 释放URL 对象
        });
    },
    sortChange({ prop, order }) {
      this.sort = { prop, order };
    },
    //新增
    editMedicine: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              let param = Object.assign({}, this.editForm);
              this.ajax.post("/medicine/purchase/edit", param).then(result => {
                if (result.code == "SUCCESS") {
                  this.info("添加成功!");
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
      this.dialogFormVisible = true;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    dataHandle: function(row) {
      this.num = row.medicineNumber;
      this.ajax
        .get("/medicine/purchase/forecast", { params: { num: this.num } })
        .then(result => {
          if (result.code == "SUCCESS") {
            this.datalist = result.data;
          } else {
            this.error(result.msg);
          }
        });
      this.dataVisible = true;
      this.editForm = Object.assign({}, row);
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "data not found";
      }
      return new Date(date).format("yyyy-MM-dd");
    },
    delItem(id) {
      this.confirm("此操作将永久删除该记录, 是否继续?").then(() => {
        this.ajax.post("/medicine/purchase/del?id=" + id).then(result => {
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
      this.$refs.page1.reload();
    }
  },
  components: {
    DataVisible
  },
  data() {
    return {
      datalist: [],
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
      keyword1: "",
      medicine: [],
      page: "",
      pagesize: 10,
      sort: {},
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      num: 0,
      dataVisible: false,
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      total: 0,
      //编辑界面数据
      editForm: {
        id: "0"
      },
      //addLoading: false,
      addFormRules: {
        name: []
      }
    };
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
