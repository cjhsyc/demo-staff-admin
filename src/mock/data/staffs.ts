import { Random } from 'mockjs'
import { compareArrays } from '@/utils'
import { getAddress } from '@/utils/address'

const staffs: Array<Staff> = []
for (let i = 0; i < 14; i++) {
  staffs.push({
    id: Random.id(),
    name: Random.cname(),
    sex: Random.boolean() ? '男' : '女',
    address: Random.county(true),
    age: Random.natural(18, 35),
    entryDate: Random.date(),
    selfPositioning: ['业务型', '技术型'],
    phoneNumber: '1' + Random.range(10).join(''),
    mail: Random.email(),
    planning: Random.cparagraph(1),
    introduction: []
  })
}

export default {
  getStaffs: (options: MockApiOptions): Result => {
    const { pageSize, currentPage, queryData }: { pageSize: number; currentPage: number; queryData?: QueryData } =
      JSON.parse(options.body as string)
    let list: Staff[] = staffs
    if (typeof queryData !== 'undefined') {
      list = staffs.filter((staff) => {
        if (queryData.name && !staff.name.includes(queryData.name)) {
          return false
        }
        if (queryData.entryDate && staff.entryDate !== queryData.entryDate) {
          return false
        }
        if (queryData.selfPositioning.length && !compareArrays(queryData.selfPositioning, staff.selfPositioning)) {
          return false
        }
        return staff.address.startsWith(getAddress(queryData.provinceCode, queryData.cityCode, queryData.countyCode))
      })
    }
    const total: number = list.length
    list = list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    return {
      code: 200,
      data: {
        total,
        staffs: list
      }
    }
  },
  removeStaff: (options: MockApiOptions): Result => {
    const id: string = options.body as string
    for (let i = 0; i < staffs.length; i++) {
      if (staffs[i].id === id) {
        staffs.splice(i, 1)
        return {
          code: 200,
          data: {
            type: 'success',
            message: '删除成功'
          }
        }
      }
    }
    return {
      code: 200,
      data: {
        type: 'error',
        message: '删除失败'
      }
    }
  },
  removeStaffs: (options: MockApiOptions): Result => {
    const list: string[] = JSON.parse(options.body as string)
    const stack: number[] = []
    for (let i = 0; i < staffs.length; i++) {
      if (list.includes(staffs[i].id)) {
        stack.push(i)
      }
    }
    if (stack.length !== list.length) {
      return {
        code: 200,
        data: {
          type: 'error',
          message: '删除失败'
        }
      }
    }
    while (stack.length > 0) {
      staffs.splice(stack.pop() as number, 1)
    }
    return {
      code: 200,
      data: {
        type: 'success',
        message: '删除成功'
      }
    }
  },
  uploadIntroduction: (options: MockApiOptions): Result => {
    const introductionFile = (options.body as FormData).get('file') as File
    return {
      code: 200,
      data: {
        name: introductionFile.name,
        file: introductionFile
      }
    }
  },
  saveStaff: (options: MockApiOptions): Result => {
    const staff: Staff = JSON.parse(options.body as string)
    staffs.forEach((item) => {
      if (item.mail === staff.mail) {
        return {
          code: 200,
          data: {
            message: '该邮箱已存在',
            type: 'error'
          }
        }
      }
      if (item.phoneNumber === staff.phoneNumber) {
        return {
          code: 200,
          data: {
            message: '该手机号已存在',
            type: 'error'
          }
        }
      }
    })
    if (!staff.id) {
      staff.id = Random.id()
      staffs.push(staff)
    } else {
      for (let i = 0; i < staffs.length; i++) {
        if (staffs[i].id === staff.id) {
          staffs[i] = staff
        }
      }
    }
    return {
      code: 200,
      data: {
        message: '保存成功',
        type: 'success'
      }
    }
  }
}
