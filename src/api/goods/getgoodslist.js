import service from '@/utils/request'

export function getGoodsList(data) {
    return service({
        url: '/php/muser/getgoodslist.php',
        method: 'post',
        data
    })
}
export function changeGoodState(data) {
    return service({
        url: '/php/muser/changegoodstate.php',
        method: 'post',
        data
    })
}
