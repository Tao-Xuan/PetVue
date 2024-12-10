<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
<!--      <el-input style="width: 200px" placeholder="请输入" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>-->
<!--      <el-input style="width: 200px" placeholder="请输入" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" v-if="user.role == 'ROLE_ADMIN'" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" v-if="user.role == 'ROLE_ADMIN'" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <!-- <el-upload action="http://localhost:9090/drug/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button> -->
      <el-button type="primary" v-if="user.role == 'ROLE_USER'" @click="handleAddOrder">预购 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="name" label="通用名称"></el-table-column>
      <el-table-column prop="productName" label="商品名称"></el-table-column>
      <el-table-column prop="productRemark" label="商品备注"></el-table-column>
      <el-table-column label="图片"><template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image></template></el-table-column>
      <el-table-column prop="dosageForm" label="剂型"></el-table-column>
      <el-table-column prop="specs" label="规格"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="packing" label="包装"></el-table-column>
      <el-table-column prop="packingRemark" label="包装备注"></el-table-column>
      <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
      <el-table-column prop="purchasePrice" v-if="user.role == 'ROLE_ADMIN'" label="采购价格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价格"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!-- <el-table-column prop="createName" label="创建人名称"></el-table-column> -->
      <!-- <el-table-column prop="createBy" label="创建人账号"></el-table-column> -->

      <el-table-column prop="createTime" label="创建时间"></el-table-column>


      <el-table-column label="操作"  v-if="user.role == 'ROLE_ADMIN'" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success"  @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
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

    <el-dialog title="药品信息" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        <el-form-item label="Id">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>        
        <el-form-item label="通用名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品备注">
          <el-input v-model="form.productRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片url">
          <el-upload action="http://localhost:9090/file/upload" ref="img" :on-success="handleImgUploadSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="剂型">
          <el-input v-model="form.dosageForm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.specs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装">
          <el-input v-model="form.packing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装备注">
          <el-input v-model="form.packingRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="form.manufacturer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="采购价格">
          <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价格">
          <el-input v-model="form.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建人名称">
          <el-input v-model="form.createName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人账号">
          <el-input v-model="form.createBy" autocomplete="off"></el-input>
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

    <el-dialog title="预购信息" :visible.sync="dialogFormVisible4Order" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        
        <el-form-item label="用户姓名">
          <el-input readonly="readonly" v-model="formOrder.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input v-model="formOrder.receiverPhone" autocomplete="off" @input='change($event)'></el-input>
        </el-form-item>
        <el-form-item label="收货人地址">
          <el-input v-model="formOrder.receiverAddress" autocomplete="off" @input='change($event)'></el-input>
        </el-form-item>
        <el-form-item label="订单总金额">
          <el-input  readonly="readonly" v-model="formOrder.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formOrder.remark" autocomplete="off" @input='change($event)'></el-input>
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
        <el-button @click="dialogFormVisible4Order = false">取 消</el-button>
        <el-button type="primary" @click="saveOrder">提交订单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>




export default {
  name: "Drug",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      form: {},
      formOrder: {
        userName:"",
        receiverPhone:"",
        receiverAddress:"",        
        remark:"",
        amount: 0,
        items:[]
      },
      dialogFormVisible: false,
      dialogFormVisible4Order: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/drug/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      this.request.post("/drug", this.form).then(res => {
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
      this.dialogFormVisible = true
       this.$nextTick(() => {
         if(this.$refs.img) {
           this.$refs.img.clearFiles();
         }
         if(this.$refs.file) {
          this.$refs.file.clearFiles();
         }
       })
    },
    del(id) {
      this.request.delete("/drug/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
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
      this.request.post("/drug/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {
      this.name = ""
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
      window.open("http://localhost:9090/drug/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },


    handleAddOrder() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要订购的药品")
        return
      }

      this.dialogFormVisible4Order = true
      this.formOrder = {}
      this.formOrder.items = []
      this.formOrder.amount = 0;

      this.multipleSelection.forEach(element => {
        this.formOrder.items.push(
          {
          "itemId": element.id,
          "name": element.name,
          "price": element.retailPrice,
          "unit": element.unit,
          "qty": 1,
          "id":0,
          "seq":0,
          "orderId":0
        })
        this.formOrder.amount +=  element.retailPrice;
      });

      if (this.user.role == 'ROLE_USER') {
        this.formOrder.userName = this.user.username
        this.formOrder.receiverPhone = this.user.phone
        this.formOrder.receiverAddress = this.user.address
      }      
    },

    saveOrder() {
      this.request.post("/order", this.formOrder).then(res => {
        if (res.code === '200') {
          this.$message.success("预购成功，请到订单管理进行订单支付")
          this.dialogFormVisible4Order = false
          this.load()
        } else {
          this.$message.error("预购失败." + res.msg)
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

      this.$forceUpdate();
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
