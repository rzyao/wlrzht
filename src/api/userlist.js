import service from '@/utils/request'

export function getList(data) {
    return service({
        url: '/php/muser/getuserlist.php',
        method: 'post',
        data
    })
}
