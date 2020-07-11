/**
 * 封装本地存储
 * created giao 2020-07-11
*/
export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}