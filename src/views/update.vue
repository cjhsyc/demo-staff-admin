<template>
  <div class="out">
    <el-form
      label-width="100px"
      :model="staff"
      :rules="rules"
      status-icon
      ref="updateForm"
    >
      <el-form-item label="基础信息"></el-form-item>
      <el-form
        :inline="true"
        label-width="100px"
        :model="staff"
        :rules="rules"
        status-icon
        ref="inlineForm1"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="staff.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="staff.sex">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number
            v-model.number="staff.age"
            :min="18"
            :max="35"
            :step-strictly="true"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        label-width="100px"
        :model="staff"
        :rules="rules"
        status-icon
        ref="inlineForm2"
      >
        <el-form-item label="入职日期" prop="entryDate">
          <el-date-picker
            v-model="staff.entryDate"
            type="date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="staff.mail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input v-model="staff.phoneNumber" type="tel"></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="个人规划" prop="planning">
        <el-input type="textarea" v-model="staff.planning"></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-upload
          class="upload-demo"
          drag
          action="mock/introduction"
          :limit="2"
          multiple
          :before-upload="beforeUpload"
          :on-exceed="exceed"
          :file-list="staff.introduction"
          :on-success="uploadSuccess"
          :on-remove="removeFile"
        >
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="自我定位" prop="selfPositioning">
        <el-checkbox-group v-model="staff.selfPositioning">
          <el-checkbox label="技术型"></el-checkbox>
          <el-checkbox label="业务型"></el-checkbox>
          <el-checkbox label="营销型"></el-checkbox>
          <el-checkbox label="管理型"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所在公司地址"></el-form-item>
      <el-form :inline="true" label-width="100px">
        <el-form-item label="省">
          <el-select v-model="provinceCode" filterable>
            <el-option
              v-for="item in provinceList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市">
          <el-select v-model="cityCode" filterable>
            <el-option
              v-for="item in cityList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区">
          <el-select v-model="countyCode" filterable>
            <el-option
              v-for="item in countyList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item class="footer">
        <el-button type="danger" @click="closeUpdate">关闭</el-button>
        <el-button type="success" @click="saveUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/* global Staff, KeyValue, Result, IntroductionFile */
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import {
  getCityList,
  getCountyList,
  getProvinceList,
  getAddress,
  getAddressCode
} from '@/utils/address'
import rules from '@/element/rules'
import { Form } from 'element-ui'
import api from '@/api'

@Component
export default class update extends Vue {
  staff: Staff = {
    id: '',
    name: '',
    sex: undefined,
    age: 18,
    entryDate: '',
    selfPositioning: [],
    mail: '',
    phoneNumber: '',
    planning: '',
    introduction: [],
    address: ''
  }
  provinceCode = ''
  cityCode = ''
  countyCode = ''
  provinceList: KeyValue[] = getProvinceList()
  cityList: KeyValue[] = []
  countyList: KeyValue[] = []
  rules: any = rules
  allowFileTypes: string[] = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf'
  ]

  @Ref('updateForm')
  readonly updateForm!: Form
  @Ref('inlineForm1')
  readonly inlineForm1!: Form
  @Ref('inlineForm2')
  readonly inlineForm2!: Form

  @Watch('provinceCode')
  changeCityList(val: string) {
    this.cityCode = ''
    this.countyCode = ''
    this.cityList = getCityList(val)
  }

  @Watch('cityCode')
  changeCountyList(val: string) {
    this.countyCode = ''
    this.countyList = getCountyList(val)
  }

  beforeUpload(file: File) {
    if (!this.allowFileTypes.includes(file.type)) {
      this.$message({ message: '只能上传word或pdf文件', type: 'warning' })
      return false
    }
  }

  exceed() {
    this.$message({ message: '最多只能上次2个文件', type: 'warning' })
  }

  uploadSuccess(response: Result) {
    this.staff.introduction.push(response.data as IntroductionFile)
  }

  removeFile(file: File) {
    this.staff.introduction = this.staff.introduction.filter((item) => {
      return item.name !== file.name
    })
  }

  closeUpdate() {
    this.$router.push('/query')
  }

  async saveUpdate() {
    let isValid = true
    this.updateForm.validate((valid) => {
      if (!valid) {
        isValid = false
      }
    })
    this.inlineForm1.validate((valid) => {
      if (!valid) {
        isValid = false
      }
    })
    this.inlineForm2.validate((valid) => {
      if (!valid) {
        isValid = false
      }
    })
    if (!isValid) {
      this.$message({ message: '保存失败', type: 'error' })
      return
    }
    this.staff.address = getAddress(
      this.provinceCode,
      this.cityCode,
      this.countyCode
    )
    const result: any = await api.saveStaffs(this.staff)
    if (result.code === 200) {
      this.$message({ message: result.data.message, type: result.data.type })
      if (result.data.type === 'success') {
        await this.$router.push({
          name: 'query',
          params: { needUpdate: 'true' }
        })
      }
    }
  }

  mounted() {
    if (this.$route.params.staff) {
      this.staff = JSON.parse(this.$route.params.staff)
      const { provinceCode, cityCode, countyCode } = getAddressCode(
        this.staff.address
      )
      this.provinceCode = provinceCode
      this.cityCode = cityCode
      this.countyCode = countyCode
    }
  }
}
</script>

<style scoped>
.out {
  padding: 10px;
}

.el-form--inline .el-form-item {
  width: 30%;
}

.el-form--inline .el-form-item .el-input,
.el-select,
.el-input-number {
  width: 20vw;
}

.el-textarea {
  width: 90%;
}

.el-checkbox {
  width: 20%;
}

.upload-demo >>> .el-upload {
  width: 90%;
}

.upload-demo >>> .el-upload .el-upload-dragger {
  width: 100%;
  height: 60px;
}

.footer {
  padding-right: 10%;
  text-align: center;
}

.footer .el-button {
  width: 150px;
}

.footer .el-button:first-child {
  margin-right: 200px;
}
</style>
