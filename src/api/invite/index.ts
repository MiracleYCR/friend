import { http } from '@/utils/http'

// 我的邀请列表
export const myInviteList = (postData: any) => {
  return http.get('/prod-api/app/invite/list', postData)
}
