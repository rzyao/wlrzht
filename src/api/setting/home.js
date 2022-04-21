import service2 from '@/utils/request'

export function getBanner(params) {
    return service2({
        url: '/getindexdata.php',
        method: 'get',
        params: params
    })
}
