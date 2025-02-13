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

// 修改用户信息
export const setOwnUserInfo = () => {
  return http.put('/prod-api/app/user/edit')
}
