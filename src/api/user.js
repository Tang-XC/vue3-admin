import request from '@/utils/request'
export const getUserManageList = (params) => {
  return request({
    url: '/user-manage/list',
    method: 'get',
    params: params
  })
}
export const getRoleList = (params) => {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}
export const getPermissionList = (params) => {
  return request({
    url: '/permission/list',
    method: 'get',
    params: params
  })
}
