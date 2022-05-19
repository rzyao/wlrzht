import service from '@/utils/request'

export function addadmin(data) {
    return service({
        url: '/php/muser/addadmin.php',
        method: 'post',
        data
    })
}
export function getAdminList(token) {
    return service({
        url: '/php/muser/getAdminListInfo.php',
        method: 'post',
        params: { token }
    })
}
export function deleteInfo(data) {
    return service({
        url: '/php/muser/deleteAdminInfo.php',
        method: 'post',
        data
    })
}
export function updateAdmin(data) {
    return service({
        url: '/php/muser/updateAdminInfo.php',
        method: 'post',
        data
    })
}
