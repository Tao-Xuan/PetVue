<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
      <el-input style="width: 200px" placeholder="请输入手机号" suffix-icon="el-icon-message" class="ml-5" v-model="phone"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0" v-if="user.role == 'ROLE_ADMIN'">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-upload action="http://localhost:9090/doctor/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" ></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <!-- <el-table-column label="角色"> -->
        <!-- <el-table-column label="角色">
          <template v-slot="scope">
            <span>{{ roles.find(v => v.flag === scope.row.role) ? roles.find(v => v.flag === scope.row.role).name : ''  }}</span>
          </template>
        </el-table-column> -->
      <!-- </el-table-column> -->
      <!-- <el-table-column prop="nickname" label="昵称" width="120"></el-table-column> -->

      <el-table-column label="头像"><template slot-scope="scope"><el-image  :src="scope.row.avatarUrl" :preview-src-list="[scope.row.avatarUrl]"></el-image></template></el-table-column>

      <el-table-column  label="性别" >
        <template v-slot="scope">
            <span>{{ genderRender(scope.row.gender)  }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="deptName" label="科室"></el-table-column>
      <el-table-column prop="title" label="职称"></el-table-column>
      <!-- <el-table-column prop="email" label="邮箱"></el-table-column> -->
      <el-table-column prop="phone" label="电话"></el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      
      <el-table-column prop="brief" width="300" label="简介"></el-table-column>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" v-if="user.role == 'ROLE_ADMIN'" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" v-if="user.role == 'ROLE_ADMIN'" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>

          <el-button type="primary" v-if="user.role == 'ROLE_USER'" @click="handleAppointment(scope.row)">预约 <i class="el-icon-circle-plus-outline"></i></el-button>

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

    <el-dialog title="医生信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

<!--         <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="角色">
          <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
            <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.flag"></el-option>
          </el-select>
        </el-form-item> -->
        
        <el-form-item label="性别">
          <el-select clearable v-model="form.gender" placeholder="请选择性别" style="width: 100%">
            <el-option v-for="item in genders" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科室">
          <el-select clearable v-model="form.deptId" placeholder="请选择科室" style="width: 100%">
            <el-option v-for="item in depts" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="form.brief" autocomplete="off"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预约信息" :visible.sync="dialogFormVisible4Appointment" width="30%" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">

        <el-form-item label="顾客姓名">
          <el-input disabled v-model="formAppointment.customName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input disabled v-model="formAppointment.doctorName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-date-picker v-model="formAppointment.appointmentTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="formAppointment.remark" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4Appointment = false">取 消</el-button>
        <el-button type="primary" @click="saveAppointment">确 定</el-button>
      </div>
    </el-dialog>    
  </div>
</template>

<script>
export default {
  name: "Doctor",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      username: "",
      phone: "",
      form: {},
      formAppointment: {},

      dialogFormVisible: false,
      dialogFormVisible4Appointment: false,

      multipleSelection: [],
      roles: [],
      depts: [],
      genders: [{"id":'M',"name":'男'},{"id":'F',"name":'女'},{"id":'N',"name":'未知'}],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/doctor/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          phone: this.phone,
        }
      }).then(res => {

        this.tableData = res.data.records
        this.total = res.data.total

      })

      this.request.get("/department").then(res => {
        this.depts = res.data
      })
    },
    save() {
      this.form.deptName = "";
      for (let index = 0; index < this.depts.length; index++) {
        if (this.depts[index].id == this.form.deptId) {
          this.form.deptName = this.depts[index].name
          break;
        }
      }

      this.request.post("/doctor", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败." + res.msg)
        }
      })
    },
    saveAppointment() {
      this.request.post("/appointment", this.formAppointment).then(res => {
        if (res.code === '200') {
          this.$message.success("预约登记成功")
          this.dialogFormVisible4Appointment = false
          this.load()
        } else {
          this.$message.error("预约登记失败." + res.msg)
        }
      })
    },

    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    handleAppointment(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.formAppointment = {}
      this.formAppointment.customName = this.user.username
      this.formAppointment.doctorName = this.form.username

      this.dialogFormVisible4Appointment = true
    },  
    del(id) {
      this.request.delete("/doctor/" + id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/doctor/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {
      this.username = ""
      this.phone = ""
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
    exp() {
      window.open("http://localhost:9090/doctor/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },
    genderRender(genderValue) {
      if (genderValue == 'M') {
        return '男'
      }else if (genderValue == 'F') {
        return '女'
      }else {
        return '未知'
      }  
        
    }
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
