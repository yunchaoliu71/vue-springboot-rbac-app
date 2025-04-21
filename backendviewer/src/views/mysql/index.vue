<template>
  <div class="container">
    <div class="app-container">
      <!-- 操作栏 -->
      <div class="mysql-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加数据</el-button>
      </div>

      <!-- MySQL 数据表格 -->
      <el-table :data="list">
        <el-table-column prop="id" align="center" width="100" label="ID">
          <template v-slot="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="provinceName" align="center" label="省名称">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.provinceName" size="mini" />
            <span v-else>{{ row.provinceName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cityName" align="center" label="市名">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.cityName" size="mini" />
            <span v-else>{{ row.cityName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="consignee" align="center" label="小区名">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.consignee" size="mini" />
            <span v-else>{{ row.consignee }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="电话号">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.phone" size="mini" />
            <span v-else>{{ row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="detail" align="center" label="详情">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.detail" size="mini" />
            <span v-else>{{ row.detail }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="确定删除该记录吗？" @confirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left:10px" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>

    <!-- 添加数据弹窗 -->
    <el-dialog width="500px" title="新增 MySQL 数据" :visible.sync="showDialog" @close="btnCancel">
      <el-form ref="mysqlForm" :model="mysqlForm" :rules="rules" label-width="120px">
        <el-form-item prop="provinceName" label="省">
          <el-input v-model="mysqlForm.provinceName" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="cityName" label="市">
          <el-input v-model="mysqlForm.cityName" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="consignee" label="小区">
          <el-input v-model="mysqlForm.consignee" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="mysqlForm.phone" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="detail" label="详情">
          <el-input v-model="mysqlForm.detail" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAddressBookList, addAddressBook, delAddressBookById, updateAddressBook } from '@/api/mysql'

export default {
  name: 'MysqlPage',
  data() {
    return {
      list: [], // MySQL 数据列表
      showDialog: false, // 控制添加数据弹窗
      pageParams: {
        page: 1, // 当前页码
        pagesize: 5, // 每页数量
        total: 0 // 总条数
      },
      mysqlForm: {
        provinceName: '',
        cityName: '',
        consignee: '',
        phone: '',
        detail: ''
      },
      rules: {
        provinceName: [{ required: true, message: '省不能为空', trigger: 'blur' }],
        cityName: [{ required: true, message: '市不能为空', trigger: 'blur' }],
        consignee: [{ required: true, message: '小区不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getAddressBookList()
  },
  methods: {
    async getAddressBookList() {
      const { content, totalElements } = await getAddressBookList(this.pageParams)
      this.list = content
      this.pageParams.total = totalElements

      this.list.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', { id: item.id, provinceName: item.provinceName,
          cityName: item.cityName, consignee: item.consignee, phone: item.phone, detail: item.detail })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getAddressBookList()
    },
    btnOK() {
      this.$refs.mysqlForm.validate(async isOK => {
        if (isOK) {
          await addAddressBook(this.mysqlForm)
          this.$message.success('新增 MySQL 数据成功')
          this.getAddressBookList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.mysqlForm.resetFields()
      this.showDialog = false
    },
    async confirmDel(id) {
      await delAddressBookById(id)
      this.$message.success('删除 MySQL 数据成功')
      if (this.list.length === 1) this.pageParams.page--
      this.getAddressBookList()
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.id = row.id
      row.editRow.provinceName = row.provinceName
      row.editRow.cityName = row.cityName
      row.editRow.consignee = row.consignee
      row.editRow.phone = row.phone
      row.editRow.detail = row.detail
    },
    async btnEditOK(row) {
      if (row.editRow.provinceName && row.editRow.cityName) {
        await updateAddressBook({ id: row.id, provinceName: row.editRow.provinceName,
          cityName: row.editRow.cityName, consignee: row.editRow.consignee, phone: row.editRow.phone, detail: row.editRow.detail })
        this.$message.success('更新 MySQL 数据成功')
        Object.assign(row, { id: row.editRow.id, provinceName: row.editRow.provinceName,
          cityName: row.editRow.cityName, consignee: row.editRow.consignee, phone: row.editRow.phone, detail: row.editRow.detail, isEdit: false })
      } else {
        this.$message.warning('省和市不能为空')
      }
    }
  }
}
</script>

  <style scoped>
  .mysql-operate {
    padding: 10px;
  }
  </style>
