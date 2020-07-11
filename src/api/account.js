/**
 * 引入工具函数，账号功能模块相关所有请求
 * created giao 2020-07-11
*/

// 引入工具函数
import req from '@/utils/request';

//登陆请求

export function checkLogin(params) {
    return req.post('/users/checkLogin', params)
}

// 添加账户请求
export function userAdd(params) {
    return req.post('/users/add', params)
}

// 获取账号列表
export function getUserList(params) {
    return req.get('/users/list', params)
}

// 删除账户列表
export function delUser(params) {
    return req.get('/users/del', params)
}

// 批量删除账户列表
export function betchDelUser(params) {
    return req.get('/users/batchdel', params)
}

// 编辑用户信息
export function savaEditUser(params) {
    return req.post('/users/edit', params)
}