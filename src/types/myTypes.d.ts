type IntroductionFile = {
  name: string
  file: File
}

type Introduction = Array<IntroductionFile>

type Staff = {
  id: string
  name: string
  sex?: '男' | '女'
  age: number
  entryDate: string
  selfPositioning: string[]
  mail: string
  phoneNumber: string
  address: string
  planning: string
  introduction: Introduction
}

type Result = {
  code: number
  data: any
}

type KeyValue = {
  key: string
  value: string
}

type QueryData = {
  name: string
  selfPositioning: string[]
  entryDate: string
  provinceCode: string
  cityCode: string
  countyCode: string
}

type PaginationData = {
  pageSize: number
  total: number
  currentPage: number
}