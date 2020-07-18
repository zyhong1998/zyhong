/**
 * 订单的ajax工具函数
 * created giao 2020-07-14
 */

//  引入工具函数
import req from '@/utils/request'

// 获取订单列表
export function getOrderList(params) {
    return req.get('/order/list', params)
}

// 获取订单详情
export function getOrder(params) {
    return req.get('/order/detail', params)
}

// 修改订单
export function updateOrder(params) {
    return req.post('/order/edit', params)
}