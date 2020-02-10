import request from '@/common/request'

// 写文章
export function addArticle(data) {
  return request({
    url: '/addArticle',
    data: data,
    method: 'POST'
  })
}

// 上传图片
export function uploadImg(data) {
  return request({
    url: '/uploadImg',
    data: data,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'}
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

// 获取types&labels
export function getArticleTypesLabels() {
  return request({
    url: '/articleTypesLabels',
    method: 'GET'
  })
}

// 文章列表
export function articleList(params) {
  return request({
    url: '/articleList',
    method: 'GET',
    params: params
  })
}

// 修改文章
export function modifyArticle(data) {
  return request({
    url: '/modifyArticle',
    method: 'POST',
    data: data
  })
}
