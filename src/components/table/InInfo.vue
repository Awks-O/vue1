<template>
  <section>
    <el-input
      style="width:85%"
      placeholder="请输入出入库方过滤"
      prefix-icon="el-icon-search"
      v-model="keyword"
    ></el-input>

    <el-button size="medium" type="primary" @click="handleAdd">添加出入库纪录</el-button>

    <el-scrollbar>
      <el-table
        :data="details"
        size="mini"
        border
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="medicineNumber" label="药品编号" width="100" align="center"></el-table-column>
        <el-table-column prop="medicineName" label="药品名称" align="center" width="120"></el-table-column>
        <el-table-column prop="stockUnit" label="存储单位" align="center" width="90"></el-table-column>
        <el-table-column prop="amount" label="数量" align="center" width="90"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" align="center" width="90"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" width="100"></el-table-column>
        <el-table-column
          prop="productionDate"
          label="生产日期"
          align="center"
          :formatter="dateFormat"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="expirationDate"
          label="保质期"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="inDate"
          label="入库日期"
          align="center"
          :formatter="dateFormat"
          width="100"
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
      url="/medicine/inInfo/list"
      :pagesize="pagesize"
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
        <el-form-item label="药品编号" prop="medicineNumber">
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
        <el-form-item label="数量" prop="amount">
          <el-input v-model="editForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="outInObj">
          <el-input v-model="editForm.outInObj"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="outInTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.outInTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="保质期" prop="amount">
          <el-input v-model="editForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="入库日期" prop="outInTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.outInTime"></el-date-picker>
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
              this.ajax
                .post("/medicine/inInfo/edit", param)
                .then(result => {
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
    delItem(id) {
      this.confirm("此操作将永久删除该记录, 是否继续?").then(() => {
        this.ajax.post("/medicine/inInfo/del?id=" + id).then(result => {
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
      page:"",
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