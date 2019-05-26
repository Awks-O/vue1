<template>
  <section>
    <el-input
      style="width:90%"
      placeholder="请输入药品编号或药品名称"
      prefix-icon="el-icon-search"
      v-model="keyword"
    ></el-input>

    <el-button size="medium" type="primary" @click="handleAdd">添加药品</el-button>

    <el-scrollbar>
      <el-table
        :data="medicine"
        border
        size="mini"
        stripe
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="medicineNumber" label="药品编号" width="130" align="center"></el-table-column>
        <el-table-column prop="medicineName" label="药品名称" align="center" width="120"></el-table-column>
        <el-table-column prop="stockUnit" label="库存单位" align="center" width="80"></el-table-column>
        <el-table-column prop="stock" label="库存量" align="center" width="80"></el-table-column>
        <el-table-column prop="alarmValue" label="报警值" align="center" width="80"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" width="130"></el-table-column>
        <el-table-column
          prop="purchaseDate"
          label="订货提前期"
          align="center"
          width="100"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="usableTime"
          label="预计完全消耗日期"
          align="center"
          width="130"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column fixed="right" prop="createDatetime" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="large">编辑</el-button>
            <el-button @click="delItem(scope.row.id)" type="text" size="large">删除</el-button>
            <!-- <el-button
              v-if="scope.row.forecast==1"
              type="text"
              @click="dataHandle(scope.row.id)"
              size="large"
            >消耗趋势</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <br>
    </el-scrollbar>

    <Pagination
      ref="page1"
      url="/medicine/list"
      :pagesize="pagesize"
      :page="page"
      :keyword="keyword"
      :sort="sort"
      v-model="medicine"
    />

    <el-dialog :visible.sync="dataVisible" @open="open()">
      <DataVisible></DataVisible>
    </el-dialog>

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
        <el-form-item label="库存单位" prop="stockUnit">
          <el-select v-model="editForm.stockUnit" placeholder="请选择">
            <el-option
              v-for="item in unit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存量" prop="stock">
          <el-input v-model="editForm.stock"></el-input>
        </el-form-item>
        <el-form-item label="报警值" prop="alarmValue">
          <el-input v-model="editForm.alarmValue"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="editForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="预测">
          <el-radio-group v-model="editForm.forecast">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>-->
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
import DataVisible from "./DataVisible";
export default {
  methods: {
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
              this.ajax.post("/medicine/edit", param).then(result => {
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
    typeFormat: function(row, column) {
        var data = row[column.property];
        if (data == 0) {
          return "处方药";
        } else if (data == 1) {
          return "非处方药（甲类）";
        } else {
          return "非处方药（乙类）"
        }
    },
    delItem(id) {
      this.confirm("此操作将永久删除该记录, 是否继续?").then(() => {
        this.ajax.post("/medicine/del?id=" + id).then(result => {
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
      medicine: [],
      page: "",
      pagesize: 10,
      sort: {},
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
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
