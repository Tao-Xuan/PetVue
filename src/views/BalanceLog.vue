<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入用户名称" suffix-icon="el-icon-search" v-model="userName"></el-input>
<!--      <el-input style="width: 200px" placeholder="请输入" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>-->
<!--      <el-input style="width: 200px" placeholder="请输入" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <!-- <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button> -->
      <el-button type="primary" @click="handleRecharge">充值 <i class="el-icon-circle-plus-outline"></i></el-button>
      <!-- <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm> -->
      <!-- <el-upload action="http://localhost:9090/balanceLog/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button> -->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <!-- <el-table-column prop="userId" label="用户id"></el-table-column> -->
      <el-table-column prop="userName" label="用户姓名"></el-table-column>

      <el-table-column  label="交易方式" >
        <template v-slot="scope">
           <span :style="{color:tranModeColorRender(scope.row.tranMode)}">{{tranModeRender(scope.row.tranMode)}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="业务类型" >
        <template v-slot="scope">
           <span >{{businessTypeRender(scope.row.businessType)}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="businessNo" label="业务单号"></el-table-column>
      <el-table-column prop="beforeBalance" label="交易前余额"></el-table-column>
      <el-table-column prop="operationAmount" label="操作金额"></el-table-column>
      <el-table-column prop="afterBalance" label="交易后余额"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createName" label="创建人"></el-table-column>
      <!-- <el-table-column prop="createBy" label="创建人账号ID"></el-table-column>
      <el-table-column prop="createRole" label="创建人角色"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间"></el-table-column>

      <!-- <el-table-column label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="充值信息" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        <!-- <el-form-item label="用户id">
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="用户姓名">
          <el-input disabled v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="交易方式.0-未知,10-充值,20-扣减">
          <el-input v-model="form.tranMode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务类型.0-未知,10-现金充值,11-第三方交易充值,20-订单支付,30-退款">
          <el-input v-model="form.businessType" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="业务单号">
          <el-input v-model="form.businessNo" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="交易前余额">
          <el-input v-model="form.beforeBalance" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="充值金额">
          <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.operationAmount" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="交易后余额">
          <el-input v-model="form.afterBalance" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建人名称">
          <el-input v-model="form.createName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人账号ID">
          <el-input v-model="form.createBy" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人角色">
          <el-input v-model="form.createRole" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BalanceLog",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      userName: "",
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/balanceLog/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userName: this.userName,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      this.request.post("/balanceLog/recharge", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("充值成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("充值失败." + res.msg)
        }
      })
    },
    // handleAdd() {
    //   this.dialogFormVisible = true
    //   this.form = {}
    //   this.$nextTick(() => {
    //     if(this.$refs.img) {
    //        this.$refs.img.clearFiles();
    //      }
    //      if(this.$refs.file) {
    //       this.$refs.file.clearFiles();
    //      }
    //   })
    // },
    handleRecharge(){
      this.dialogFormVisible = true
      this.form = {}
      this.form.userName = this.user.username

      this.$nextTick(() => {
        if(this.$refs.img) {
           this.$refs.img.clearFiles();
         }
         if(this.$refs.file) {
          this.$refs.file.clearFiles();
         }
      })
    },

    // handleEdit(row) {
    //   this.form = JSON.parse(JSON.stringify(row))
    //   this.dialogFormVisible = true
    //    this.$nextTick(() => {
    //      if(this.$refs.img) {
    //        this.$refs.img.clearFiles();
    //      }
    //      if(this.$refs.file) {
    //       this.$refs.file.clearFiles();
    //      }
    //    })
    // },
    // del(id) {
    //   this.request.delete("/balanceLog/" + id).then(res => {
    //     if (res.code === '200') {
    //       this.$message.success("删除成功")
    //       this.load()
    //     } else {
    //       this.$message.error("删除失败")
    //     }
    //   })
    // },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // delBatch() {
    //   if (!this.multipleSelection.length) {
    //     this.$message.error("请选择需要删除的数据")
    //     return
    //   }
    //   let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
    //   this.request.post("/balanceLog/del/batch", ids).then(res => {
    //     if (res.code === '200') {
    //       this.$message.success("批量删除成功")
    //       this.load()
    //     } else {
    //       this.$message.error("批量删除失败")
    //     }
    //   })
    // },
    reset() {
      this.userName = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleFileUploadSuccess(res) {
      this.form.file = res
    },
    handleImgUploadSuccess(res) {
      this.form.img = res
    },
    download(url) {
      window.open(url)
    },
    exp() {
      window.open("http://localhost:9090/balanceLog/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },

    tranModeRender(value) {
      //交易方式
      var ret = ""
      switch (value) {
        case 10:
          ret = "充值"
          break;

        case 20:
          ret = "扣减"
          break;

        default:
          ret = value + "-未知"
          break;
      }
      return ret;
    },

    tranModeColorRender(value) {
      //交易方式
      var ret = ""
      switch (value) {
        case 10:
          ret = "green"   //充值
          break;

        case 20:
          ret = "red"     //扣减
          break;

        default:
          ret = "black" 
          break;
      }
      return ret;
    },
    
    businessTypeRender(value) {
      //业务类型
      var ret = ""
      switch (value) {
        case 10:
          ret = "现金充值"
          break;

        case 11:
          ret = "淘宝交易充值"
          break;

        case 12:
          ret = "微信交易充值"
          break;

        case 20:
          ret = "订单支付"
          break;

        case 30:
          ret = "退款"
          break;

        default:
          ret = value + "-未知"
          break;
      }
      return ret;
    }

  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
