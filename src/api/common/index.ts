import { http } from '@/utils/http'

export const upload = (postData: any) => {
  return http.post('/prod-api/common/oss/upload', postData)
}
