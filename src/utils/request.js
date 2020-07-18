/**
 * 封装通用的工具函数
 * created giao 2020-07-11
 */

// 引入axios 和qs
import axios from 'axios'
import qs from 'qs';

// 引入本地存储封装函数
import local from '@/utils/local'

// 引入ui 的消息提示Message
import { Message } from 'element-ui';

// 服务器地址 写上以后 所有的请求 会自动在前面拼接这个地址
axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.timeout = 5000; // 超时

/**
 * 请求拦截：  请求拦截 就是在发送请求出去之前 拦截
 */
axios.interceptors.request.use((config) => {
    // 获取本地token
    let token = local.get('t_k') || ''
    // 将token放入请求头
    if (token) {
        config.headers.Authorization = token;
    }
    console.log("请求拦截");
    return config;
});

/**
 * 响应拦截： 后端响应数据之后 先拦截下来 可以进行某些处理 再接收
 */
axios.interceptors.response.use((response) => {
    if (response.data.code !== undefined && response.data.msg !== undefined) {
        // 取出code和msg
        let { code, msg } = response.data
        if (code === 0) {//成功
            Message({ type: 'success', message: msg })
        } else if (code === 1) {//失败
            Message.error(msg)
        }
    }
    console.log("详情拦截");
    return response;
});

// 通用的get和post请求
export default {
    // get
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, { params })
                .then((response) => {
                    resolve(response.data)//成功
                }).catch((err) => {
                    reject(err)//失败
                })
        })
    },
    // post
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, qs.stringify(params))
                .then((response) => {
                    resolve(response.data)//成功
                }).catch((err) => {
                    reject(err)//失败
                })
        })
    }
}