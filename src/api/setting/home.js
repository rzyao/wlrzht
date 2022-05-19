import request from '@/utils/request'

export function login(data) {
    return request({
    // url: '/vue-admin-template/user/login',
        url: '/imgmanagement/bannerimg/insetbanner.php',
        method: 'post',
        data
    })
}
