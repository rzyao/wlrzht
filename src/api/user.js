import request from '@/utils/request'

export function login(data) {
    return request({
    // url: '/vue-admin-template/user/login',
        url: '/php/muser/login.php',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/php/muser/info.php',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/php/muser/logout.php',
        method: 'post'
    })
}
