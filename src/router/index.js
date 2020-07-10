import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
    redirect: "/order/order-list",
    meta: { title: "订单管理" },
    children: [
      {
        path: "/order/order-list",
        component: () => import("@/views/Order/OrderList.vue"),
        meta: { title: '订单列表' }
      },
      {
        path: "/order/order-update",
        component: () => import("@/views/Order/OrderUpdate.vue"),
        meta: { title: '订单编辑' }
      },
    ],
  },

  // 商品管理
  {
    path: "/product",
    component: Layout,
    redirect: '/product/product-list',
    meta: { title: '商品管理' },
    children: [{
      path: "/product/product-list",
      component: () => import("@/views/Product/ProductList.vue"),
      meta: { title: '商品列表 ' }
    },
    {
      path: "/product/product-add",
      component: () => import("@/views/Product/ProductAdd.vue"),
      meta: { title: '商品添加' },
    },
    {
      path: "/product/product-class",
      component: () => import("@/views/Product/ProductClass.vue"),
      meta: { title: '商品分类' },
    },

    ],
  },

  // 店铺管理
  {
    path: "/shop",
    component: Layout,
    meta: { title: "店铺管理" },
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
    redirect: "/user/user-list",
    meta: { title: '账号管理' },
    children: [
      {
        path: "/user/user-add",
        component: () => import("@/views/User/UserAdd.vue"),
        meta: { title: '账号添加' },
      },
      {
        path: "/user/user-list",
        component: () => import("@/views/User/UserList.vue"),
        meta: { title: '账号列表' },
      },
      {
        path: "/user/user-update",
        component: () => import("@/views/User/UserUpdate.vue"),
        meta: { title: '密码修改' },
      },
      {
        path: "/user/Personal",
        component: () => import("@/views/User/Personal.vue"),
        meta: { title: '个人中心' },
      },
    ],
  },
  // 销售统计
  {
    path: "/total",
    component: Layout,
    redirect: "/total/product-total",
    meta: { title: "销售统计" },
    children: [
      {
        path: "/total/product-total",
        component: () => import("@/views/Total/ProductTotal.vue"),
        meta: { title: "商品统计" },
      },
      {
        path: "/total/order-total",
        component: () => import("@/views/Total/OrderTotal.vue"),
        meta: { title: "订单统计" },
      },
    ],
  },

]

const router = new VueRouter({
  routes
})

export default router
