/**
 * 引入工具函数，店铺模块相关所有请求
 * created giao 2020-07-14
*/
// 引入通用getpost请求
import req from '@/utils/request.js';

// 获取店铺信息
export function getShopInfo() {
    return req.get('/shop/info')
}

// 店铺内容修改
export function updateShop(params) {
    return req.post('/shop/edit', params)
}