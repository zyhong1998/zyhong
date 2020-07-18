/**
 * 引入工具函数，账号功能模块相关所有请求
 * created giao 2020-07-11
*/

// 引入工具函数
import req from '@/utils/request';

export function getTotal() {
    return req.get('/order/totaldata')
}