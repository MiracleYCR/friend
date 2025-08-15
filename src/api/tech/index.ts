/**
 * 技术支持
 */
import { http } from '@/utils/http'

// 帖子增
export const addSupport = (postData: any) => {
  return http.post('/prod-api/app/support', postData)
}
