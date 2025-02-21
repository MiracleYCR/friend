/**
 * 帖子相关
 */
import { http } from '@/utils/http'

// 获取帖子列表
export const getSquarePostList = (postData: any) => {
  return http.get('/prod-api/app/post/list', postData)
}

// 获取指定人帖子
export const getUserPostList = (postData: any) => {
  return http.get('/prod-api/app/post', postData)
}

// 帖子增
export const addPost = (postData: any) => {
  return http.post('/prod-api/app/post', postData)
}
// 帖子删
export const deletePost = (ids) => {
  return http.delete(`/prod-api/app/post/${ids}`)
}
// 帖子查
export const checkPost = (id) => {
  return http.get(`/prod-api/app/post/${id}`)
}
// 帖子点赞
export const likePost = (postData: any) => {
  return http.post(`/prod-api/app/post/like`, postData)
}

// 评论
export const commendPost = (postData: any) => {
  return http.post(`/prod-api/app/post/comment`, postData)
}
// 删除评论
export const deleteCommend = (postData: any) => {
  return http.delete(`/prod-api/app/post/comment`, postData)
}
