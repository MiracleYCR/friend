import { http } from '@/utils/http'

// 获取短信验证码
export const getSmsCode = (phone: string) => {
  return http.get('/prod-api/common/sms/send', { phone })
}

// 登录
interface loginPostData {
  uuid: string
  code: string
  phone: string
}
export const login = (postData: loginPostData) => {
  return http.post('/prod-api/app/user/login', postData)
}
