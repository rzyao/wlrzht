import request from '@/utils/request'

export function UploadBanner(data) {
    return request({
    // url: '/vue-admin-template/user/login',
        url: '/php/imgmanagement/insertbanner.php',
        method: 'post',
        data
    })
}
export function getBannerList(token) {
    return request({
        url: '/php/imgmanagement/getBannerInfo.php',
        method: 'get',
        params: { token }
    })
}
export function deleteBanner(data) {
    return request({
        url: '/php/imgmanagement/deleteBanner.php',
        method: 'get',
        data
    })
}
