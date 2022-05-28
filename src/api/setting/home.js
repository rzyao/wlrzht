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
        method: 'post',
        data: data
    })
}
export function UpdateBanner(data) {
    return request({
        url: '/php/imgmanagement/updateBanner.php',
        method: 'post',
        data: data
    })
}
export function UploadNavigation(data) {
    return request({
    // url: '/vue-admin-template/user/login',
        url: '/php/imgmanagement/insertNavigation.php',
        method: 'post',
        data
    })
}
export function GetNavigation(token) {
    return request({
        url: '/php/imgmanagement/GetNavigation.php',
        method: 'get',
        params: { token }
    })
}
export function UpdateNavigation(data) {
    return request({
        url: '/php/imgmanagement/UpdateNavigation.php',
        method: 'post',
        data: data
    })
}
export function DeleteNavigation(data) {
    return request({
        url: '/php/imgmanagement/DeleteNavigation.php',
        method: 'post',
        data: data
    })
}
export function GetOneThree(token) {
    return request({
        url: '/php/imgmanagement/GetOneThree.php',
        method: 'get',
        params: { token }
    })
}
export function UpdateOneThree(data) {
    return request({
        url: '/php/imgmanagement/UpdateOneThree.php',
        method: 'post',
        data: data
    })
}
