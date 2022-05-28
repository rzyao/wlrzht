import request from '@/utils/request'

export function getBusinessInfo() {
    return request({
        url: '/php/business/getBusinesslist.php',
        method: 'post'
    })
}
export function addBusiness(data) {
    return request({
        url: '/php/business/addBusiness.php',
        method: 'post',
        data: data
    })
}
export function deleteBusiness(data) {
    return request({
        url: '/php/business/deleteBusiness.php',
        method: 'post',
        data: data
    })
}
export function updateBusiness(data) {
    return request({
        url: '/php/business/updateBusiness.php',
        method: 'post',
        data: data
    })
}
