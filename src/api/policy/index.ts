// 所有协议的富文本
import { http } from '@/utils/http'

// 获取协议数据
export const getPolicyDetail = (postData: any) => {
  return http.post('/prod-api/app/documents/detail', postData)
}
