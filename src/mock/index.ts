import Mock from 'mockjs'
import staffs from '@/mock/data/staffs'

Mock.mock('mock/staffs', 'post', staffs.getStaffs)
Mock.mock('mock/staffs/remove', 'post', staffs.removeStaff)
Mock.mock('mock/staffs/remove/multiple', 'post', staffs.removeStaffs)
Mock.mock('mock/introduction', 'post', staffs.uploadIntroduction)
Mock.mock('mock/staffs/save', 'post', staffs.saveStaff)
