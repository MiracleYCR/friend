import { http } from '@/utils/http'

// 登录
interface loginPostData {
  uuid: string
  code: string
  phone: string
}
export const login = (postData: loginPostData) => {
  return http.post('/prod-api/app/user/login', postData)
}

// 获取当前用户信息
export const getOwnUserInfo = () => {
  return http.get('/prod-api/app/user')
}

// 获取其他用户信息

// 修改用户信息
export const setOwnUserInfo = () => {
  return http.put('/prod-api/app/user/edit')
}

// 我的关注
export const getMyFollowList = () => {
  return http.get('/prod-api/app/follow/list')
}

// 关注我的
export const getFollowMeList = () => {
  return http.get('/prod-api/app/follow/list/follow-me')
}

// 互相关注
export const getMutualList = () => {
  return http.get('/prod-api/app/follow/list/mutual')
}

// 最近访客
export const getVisiteMeList = () => {
  return http.get('/prod-api/app/follow/list/visit-me')
}

// 取消关注
export const cancelFollow = (userId) => {
  return http.delete(`/prod-api/app/follow/unfollow/${userId}`)
}
