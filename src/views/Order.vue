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
      <!-- <el-upload action="http://localhost:9090/order/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button> -->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="overview" label="订单简要"></el-table-column>
      <!-- <el-table-column prop="userId" label="用户id"></el-table-column> -->
      <el-table-column prop="userName" label="用户姓名"></el-table-column>
      <el-table-column prop="receiverPhone" label="收货人电话" width="120"></el-table-column>
      <el-table-column prop="receiverAddress" label="收货人地址" width="100"></el-table-column>
      <el-table-column prop="amount" label="总金额"></el-table-column>

      <el-table-column  label="状态" >
        <template v-slot="scope">
           <span :style="{color:orderStatusColorRender(scope.row.status)}">{{orderStatusRender(scope.row.status)}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="支付方式" >
        <template v-slot="scope">
           <span >{{payModeRender(scope.row.payMode)}}</span>
        </template>
      </el-table-column>


      <el-table-column prop="payTime" label="支付时间"></el-table-column>
      <el-table-column prop="payVoucherNo" label="支付凭证号" width="100"></el-table-column>
      <el-table-column prop="deliveryTime" label="发货时间"></el-table-column>
      <el-table-column prop="signTime" label="签收时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!-- <el-table-column prop="createName" label="创建人名称"></el-table-column>
      <el-table-column prop="createBy" label="创建人账号ID"></el-table-column>
      <el-table-column prop="createRole" label="创建人角色"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>

      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success"  v-if="(scope.row.status == 10) && (user.role == 'ROLE_USER')"  @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" v-if="(scope.row.status == 10) || (scope.row.status == 40)"  slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>

          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定支付吗？"

              @confirm="handlePay(scope.row)"
          >
            <el-button type="danger"  v-if="(scope.row.status == 10) && (user.role == 'ROLE_USER')" slot="reference">支付 <i class="el-icon-coin"></i></el-button>
          </el-popconfirm>

          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定发货吗？"

              @confirm="handleDelivery(scope.row)"
          >
            <el-button type="danger"  v-if="(scope.row.status == 20) && (user.role == 'ROLE_ADMIN')" slot="reference">发货 <i class="el-icon-position"></i></el-button>
          </el-popconfirm>

          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定商品收到货了吗？"

              @confirm="handleSign(scope.row)"
          >
            <el-button type="danger"  v-if="(scope.row.status == 30) && (user.role == 'ROLE_USER')" slot="reference">签收 <i class="el-icon-edit-outline"></i></el-button>
          </el-popconfirm>


        </template>
      </el-table-column>
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


    <el-dialog title="订单信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        <el-form-item label="用户姓名">
          <el-input readonly="readonly" v-model="formOrder.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input v-model="formOrder.receiverPhone" autocomplete="off"  @input='change($event)'></el-input>
        </el-form-item>
        <el-form-item label="收货人地址">
          <el-input v-model="formOrder.receiverAddress" autocomplete="off"  @input='change($event)'></el-input>
        </el-form-item>
        <el-form-item label="订单总金额">
          <el-input  readonly="readonly" v-model="formOrder.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formOrder.remark" autocomplete="off"  @input='change($event)'></el-input>
        </el-form-item>

        <el-table :data="formOrder.items" border stripe :header-cell-class-name="'headerBg'"  >
          <el-table-column prop="itemId" label="药品ID" width="80" ></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column  prop="qty" label="数量">
            <template slot-scope = "scope">
              <el-input type="number" min="1" max="99" v-model="scope.row.qty"  @input="chargeQty($event)" />
            </template>
          </el-table-column>
        </el-table>        
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrder">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      userName: "",
      form: {},
      formOrder: {
        amount: 0,
        items:[]
      },      
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
      this.request.get("/order/page", {
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
    saveOrder() {
      this.request.post("/order", this.formOrder).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败." + res.msg)
        }
      })
    },    
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}

      if (this.user.role == 'ROLE_USER') {
        this.form.userName = this.user.username
        this.form.receiverPhone = this.user.phone
        this.form.receiverAddress = this.user.address
      }      

      this.$nextTick(() => {
        if(this.$refs.img) {
           this.$refs.img.clearFiles();
         }
         if(this.$refs.file) {
          this.$refs.file.clearFiles();
         }
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      

      this.formOrder = {}
      this.formOrder.items = []
      this.formOrder.amount = 0;
      
      this.formOrder.id = this.form.id
      this.formOrder.userName = this.form.userName
      this.formOrder.receiverPhone = this.form.receiverPhone
      this.formOrder.receiverAddress = this.form.receiverAddress
      this.formOrder.remark = this.form.remark


      //请求后台明细      
      this.request.get("/order/items/" + this.form.id).then(res => {
        if (res.code === '200') {
          
          this.formOrder.items = res.data          

          var  amount = 0.0;
          for (let index = 0; index < this.formOrder.items.length; index++) {
            const element = this.formOrder.items[index];
            amount+=(element.qty * element.price );
          }

          this.formOrder.amount =  amount;

          this.dialogFormVisible = true          
        } else {
          this.$message.error("无法获取订单明细数据")
        }
      })

    },


    del(id) {
      this.request.delete("/order/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败"+ res.msg)
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要删除的数据")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/order/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
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
      window.open("http://localhost:9090/order/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },

    orderStatusRender(value) {
      //订单状态 0-未知,10-待支付,20-已支付(待发货),30-已发货,40-已收货
      var ret = ""
      switch (value) {
        case 10:
          ret = "待支付"
          break;

        case 20:
          ret = "已支付(待发货)"
          break;

        case 30:
          ret = "已发货"
          break;

        case 40:
          ret = "已收货"
          break;

        default:
          ret = value + "-未知"
          break;
      }
      return ret;
    },

    orderStatusColorRender(value) {
      //订单状态颜色  0-未知,10-待支付,20-已支付(待发货),30-已发货,40-已收货
      var ret = ""
      switch (value) {
        case 10:
          ret = "blue"  //待支付
          break;

        case 20:
          ret = "green" //已支付(待发货)
          break;

        case 30:
          ret = "blue"  //已发货
          break;

        case 40:
          ret = "green"  //40-已收货
          break;
          
        default:
          ret = "black"
          break;
      }
      return ret;
    },

    payModeRender(value) {
      //支付方式 0-未知,10-余额支付,20-余额支付,30-余额支付
      var ret = ""
      switch (value) {
        case 10:
          ret = "余额支付"
          break;

        case 20:
          ret = "余额支付"
          break;

        case 30:
          ret = "余额支付"
          break;

        default:
          ret = value + "-未知"
          break;
      }
      return ret;
    },
    
    handlePay(row) {
      var payPara = {}

      payPara.operationAmount = row.amount
      payPara.businessNo = row.id
      payPara.userName = this.user.username

      this.request.post("/balanceLog/orderPay", payPara).then(res => {
        if (res.code === '200') {
          this.$message.success("支付成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("支付失败." + res.msg);
        }
      })      
    },

    handleSign(row) {
      this.request.post("/order/sign/" + row.id).then(res => {
        if (res.code === '200') {
          this.$message.success("签收成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("签收失败." + res.msg);
        }
      })      
    },

    handleDelivery(row) {
      this.request.post("/order/delivery/" + row.id).then(res => {
        if (res.code === '200') {
          this.$message.success("发货成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("发货失败." + res.msg);
        }
      })      
    },


    chargeQty(val) {
      //数量改变了,重新计算总价格
      var  amount = 0.0;
      for (let index = 0; index < this.formOrder.items.length; index++) {
        const element = this.formOrder.items[index];
        amount+=(element.qty * element.price );
      }

      this.formOrder.amount =  amount;

      this.$forceUpdate()
    },


    change(val) {
      this.$forceUpdate();
    }

  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
