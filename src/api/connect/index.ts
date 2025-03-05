/**
 * 缘分 Tab 页
 */
import { http } from '@/utils/http'

// 获取轮播
export const getBannerList = () => {
  return http.get('/prod-api/app/banner/list')
}

// 获取用户列表
export const getConnectUserList = (postData: any) => {
  return http.post('/prod-api/app/index', postData)
}
