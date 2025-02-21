/**
 * 缘分 Tab 页
 */
import { http } from '@/utils/http'

// 获取用户列表
export const getConnectUserList = (postData: any) => {
  return http.post('/prod-api/app/index', postData)
}
