import request from '@/common/request'

// 写文章
export function addArticle(data) {
  return request({
    url: '/addArticle',
    data: data,
    method: 'POST'
  })
}

// 文章详情
export function articleDetail(data) {
  return request({
    url: '/articleDetail',
    params: data,
    method: 'GET'
  })
}

