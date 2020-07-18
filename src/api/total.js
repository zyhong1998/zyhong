/**
 * 引入工具函数，销售统计相关所有请求
 * created giao 2020-07-15
*/
// 引入通用getpost请求
import req from '@/utils/request.js';

export function getOrderTotal(params) {
    return req.get('/order/ordertotal', params)
}