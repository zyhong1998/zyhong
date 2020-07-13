/**
 * 引入工具函数，账号功能模块相关所有请求
 * created giao 2020-07-11
*/

// 引入通用getpost请求
import req from '@/utils/request.js';


// 获取分类
export function getProductClass(params) {
    return req.get('/goods/catelist', params)
}

// 修改分类
export function editProductClass(params) {
    return req.post('/goods/editcate', params)
}

// 删除分类
export function removeProductClass(params) {
    return req.get('/goods/delcate', params)
}

// 添加分类
export function addProductClass(params) {
    return req.post('/goods/addcate', params)
}

// 查询所有分类
export function getAllCategories() {
    return req.get('/goods/categories')
}

// 添加商品
export function addProduct(params) {
    return req.post('/goods/add', params)
}

//  获取商品列表
export function getGoodsList(params) {
    return req.get("/goods/list", params);
}

// 修改商品
export function editGoods(params) {
    return req.post('/goods/edit', params)
}

// 删除商品
export function deleteGoods(params) {
    return req.get('/goods/del', params)
}