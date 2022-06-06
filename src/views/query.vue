<template>
  <div class="out">
    <el-row :gutter="20">
      <el-col :span="7">
        姓名：
        <el-input prefix-icon="el-icon-search" v-model="queryData.name" size="small" style="width: 70%"></el-input>
      </el-col>
      <el-col :span="7">
        个人定位：
        <el-select v-model="queryData.selfPositioning" multiple collapse-tags size="small" placeholder=""
                   style="width: 70%">
          <el-option label="业务型" value="业务型"></el-option>
          <el-option label="技术型" value="技术型"></el-option>
          <el-option label="管理型" value="管理型"></el-option>
          <el-option label="营销型" value="营销型"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        入职日期：
        <el-date-picker v-model="queryData.entryDate" type="date" size="small"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-button type="success" size="small" style="width: 100px" @click="queryStaffs">
          查询
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        省：
        <el-select size="small" v-model="queryData.provinceCode" filterable>
          <el-option v-for="item in provinceList" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        市：
        <el-select size="small" v-model="queryData.cityCode" filterable>
          <el-option v-for="item in cityList" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        区：
        <el-select size="small" v-model="queryData.countyCode" filterable>
          <el-option v-for="item in countyList" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button type="warning" size="small" style="width: 100px" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-button type="success" size="small" style="width: 100px" @click="addStaff">新增</el-button>
    <el-button type="danger" size="small" style="width: 100px" @click="removeStaffs">删除</el-button>
    <el-table ref="multipleTable" :data="staffs" style="width: 100%" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" prop="name" width="120"></el-table-column>
      <el-table-column label="性别" prop="sex" width="120"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="入职日期" prop="entryDate"></el-table-column>
      <el-table-column label="自我定位">
        <template v-slot="{row}">
          {{ row.selfPositioning.join('，') }}
        </template>
      </el-table-column>
      <el-table-column label="个人规划" prop="planning"></el-table-column>
      <el-table-column label="个人简介" prop="introduction">
        <template v-slot="{row}">
          {{ row.introduction.map((item: any ) => item.name).join('，') }}
        </template>
      </el-table-column>
      <el-table-column label="所在公司地址" prop="address"></el-table-column>
      <el-table-column label="操作" width="160">
        <template v-slot="{row}">
          <el-button type="primary" size="small" @click="updateStaff(row)">修改</el-button>
          <el-button type="danger" size="small" @click="removeStaff(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-sizes="[5, 10, 20]" :page-size.sync="pageSize" @size-change="sizeChange"
                   layout="->, total, sizes, prev, pager, next, jumper" @current-change="currentChange"
                   :total="total" :current-page.sync="currentPage"></el-pagination>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {getProvinceList, getCityList, getCountyList} from "@/utils/address";
import api from '@/api'

@Component
export default class query extends Vue {
  staffs: Staff[] = []
  queryData: QueryData = {
    name: '',
    selfPositioning: [],
    entryDate: '',
    provinceCode: '',
    cityCode: '',
    countyCode: ''
  }
  provinceList: KeyValue[] = getProvinceList()
  cityList: KeyValue[] = []
  countyList: KeyValue[] = []
  pageSize: number = 5
  total: number = 0
  currentPage: number = 1
  multipleSelection: Staff[] = []

  @Watch('queryData.provinceCode')
  changeCityList(val: string) {
    this.queryData.cityCode = ''
    this.queryData.countyCode = ''
    this.cityList = getCityList(val)
  }

  @Watch('queryData.cityCode')
  changeCountyList(val: string) {
    this.queryData.countyCode = ''
    this.countyList = getCountyList(val)
  }

  async getStaffs(pageSize: number, currentPage: number, queryData?: QueryData) {
    const result = await api.getStaffs(pageSize, currentPage, queryData)
    if (result.code === 200) {
      this.staffs = result.data.staffs
      this.total = result.data.total
    }
  }

  queryStaffs() {
    this.getStaffs(this.pageSize, this.currentPage, this.queryData)
  }

  reset() {
    Object.assign(this.queryData, {
      name: '',
      selfPositioning: [],
      entryDate: '',
      provinceCode: '',
      cityCode: '',
      countyCode: ''
    })
    this.currentPage = 1
    this.getStaffs(this.pageSize, this.currentPage, this.queryData)
  }

  sizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.currentPage = 1
    this.getStaffs(this.pageSize, this.currentPage, this.queryData)
  }

  currentChange(currentPage: number) {
    this.currentPage = currentPage
    this.getStaffs(this.pageSize, this.currentPage, this.queryData)
  }

  handleSelectionChange(val: Staff[]) {
    this.multipleSelection = val
  }

  async removeStaff(staff: Staff) {
    await this.$confirm('确定要删除该员工的信息吗？')
    const result = await api.removeStaff(staff.id)
    if (result.code === 200) {
      this.$message({message: result.data.message, type: result.data.type})
      await this.getStaffs(this.pageSize, this.currentPage)
      if (this.staffs.length === 0) {
        await this.getStaffs(this.pageSize, this.currentPage)
      }
    }
  }

  updateStaff(staff: Staff){
    this.$router.push({name: 'update',params: {staff: JSON.stringify(staff)}})
  }

  async removeStaffs() {
    if (this.multipleSelection.length > 0) {
      await this.$confirm('确定要删除所选员工的信息吗？')
      const idList: string[] = this.multipleSelection.map((staff) => {
        return staff.id
      })
      let result = await api.removeStaffs(idList)
      if (result.code === 200) {
        this.$message({message: result.data.message, type: result.data.type})
        await this.getStaffs(this.pageSize, this.currentPage)
        if (this.staffs.length === 0) {
          await this.getStaffs(this.pageSize, this.currentPage)
        }
      }
    } else {
      this.$message.info('未选择任何员工')
    }
  }

  addStaff() {
    this.$router.push('/update')
  }

  mounted() {
    this.getStaffs(this.pageSize, this.currentPage)
  }

  activated() {
    if (this.$route.params.needUpdate === 'true') {
      this.getStaffs(this.pageSize, this.currentPage, this.queryData)
    }
  }
}
</script>

<style scoped>
.out {
  padding: 10px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row .el-col {
  text-align: right;
}

.el-row .el-col:last-child {
  text-align: center;
}

.el-table {
  margin: 20px 0;
}

.el-col .el-input, .el-select {
  width: 70%;
}
</style>