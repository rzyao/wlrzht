import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/admin/muser/login.php',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/muser/info.php',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/muser/logout.php',
    method: 'post'
  })
}
