import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入组件
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout/Layout.vue'


// 路由配置

const routes = [
  // 登陆

  {
    path: '/login',
    component: Login
  },

  // 后端大布局
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home.vue"), // 路由懒加载写法
      },
    ],
  },

  // 订单管理
  {
    path: "/order",
    component: Layout,
    children: [
      {
        path: "/order/order-list",
        component: () => import("@/views/Order/OrderList.vue"),
        meta: { name: '订单列表' }
      },
      {
        path: "/order/order-update",
        component: () => import("@/views/Order/OrderUpdate.vue"),
      },
    ],
  },

  // 商品管理
  {
    path: "/product",
    component: Layout,
    children: [
      {
        path: "/product/product-add",
        component: () => import("@/views/Product/ProductAdd.vue"),
      },
      {
        path: "/product/product-class",
        component: () => import("@/views/Product/ProductClass.vue"),
      },
      {
        path: "/product/product-list",
        component: () => import("@/views/Product/ProductList.vue"),
      },
    ],
  },

  // 店铺管理
  {
    path: "/shop",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/Shop.vue"),
      },
    ],
  },

  // 账号管理
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "/user/user-add",
        component: () => import("@/views/User/UserAdd.vue"),
      },
      {
        path: "/user/user-list",
        component: () => import("@/views/User/UserList.vue"),
      },
      {
        path: "/user/user-update",
        component: () => import("@/views/User/UserUpdate.vue"),
      },
      {
        path: "/user/Personal",
        component: () => import("@/views/User/Personal.vue"),
      },
    ],
  },
  // 销售统计
  {
    path: "/total",
    component: Layout,
    children: [
      {
        path: "/total/product-total",
        component: () => import("@/views/Total/ProductTotal.vue"),
      },
      {
        path: "/total/order-total",
        component: () => import("@/views/Total/OrderTotal.vue"),
      },
    ],
  },

]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router
