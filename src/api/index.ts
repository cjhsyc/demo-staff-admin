import request from '@/api/request'

export default {
  getStaffs: (pageSize: number, currentPage: number, queryData?: QueryData) =>
    request.post('staffs', {
      pageSize,
      currentPage,
      queryData
    }),
  //删除员工
  removeStaff: (id: string) => request.post('staffs/remove', id),
  //批量删除
  removeStaffs: (idList: string[]) => request.post('staffs/remove/multiple', idList),
  //新增或更新
  saveStaffs: (data: Staff) => request.post('staffs/save', data)
}
