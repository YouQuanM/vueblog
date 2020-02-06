import request from '@/common/request'

// 写评论
export function addComment(data) {
  return request({
    url: '/addComment',
    data: data,
    method: 'POST'
  })
}

// 评论列表
export function commentList(data) {
  return request({
    url: '/commentList',
    params: data,
    method: 'GET'
  })
}

