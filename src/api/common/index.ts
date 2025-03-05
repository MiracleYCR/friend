import { http } from '@/utils/http'

// 所有枚举
export const getDataMap = () => {
  return http.get('/prod-api/common/enums/map')
}

// 上传
export const upload = (postData: any) => {
  return http.post('/prod-api/common/oss/upload', postData)
}

// 省市区
export const getPlacesInfo = () => {
  return http.get('/prod-api/system/code/list')
}

// 获取所有城市列表
export const getAllCity = () => {
  return http.get('/prod-api/system/code/list/city')
}

// 获取定位地址
export const getLocationInfo = (data) => {
  return http.get('/prod-api/common/address', data)
}

// 实名认证
export const realCheck = ({ name, idcard }) => {
  return http.get('/prod-api/common/real-name/verification', { name, idcard })
}

// 意见反馈
export const submitAdvice = (postData: any) => {
  return http.post(`/prod-api/app/advice`, postData)
}
