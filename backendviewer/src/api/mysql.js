import request from '@/utils/request'

export function getAddressBookList(params) {
  return request({
    url: '/scaffold/addressBook/addressBookInfoByPage',
    method: 'get',
    params // 查询参数
  })
}

export function addAddressBook(data) {
  return request({
    url: '/scaffold/addressBook/save',
    method: 'post',
    data
  })
}

export function delAddressBookById(id) {
  return request({
    url: `/scaffold/addressBook/deleteById/${id}`,
    method: 'delete'
  })
}

export function updateAddressBook(data) {
  return request({
    url: '/scaffold/addressBook/update',
    method: 'put',
    data
  })
}
