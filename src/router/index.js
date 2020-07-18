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
import Error404 from '@/views/404.vue'
// 引入本地存储函数
import local from '@/utils/local'


// 路由配置【默认是两个配置】
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
]

// 路由权限配置
const asyncRoutes = [
  // 登陆
  {
    path: '/login',
    component: Login,
    visible: false
  },

  // 后端大布局
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: '首页', icon: 'el-icon-s-home' },
    visible: true,
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
    meta: { title: "订单管理", icon: 'el-icon-document-copy' },
    visible: true,
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
    meta: { title: '商品管理', icon: 'el-icon-shopping-bag-1' },
    visible: true,
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
    meta: { title: "店铺管理", icon: 'el-icon-s-shop' },
    visible: true,
    children: [
      {
        path: "/shop",
        component: () => import("@/views/Shop.vue"),
      },
    ],
  },

  // 账号管理
  {
    path: "/user",
    component: Layout,
    redirect: "/user/user-list",
    meta: { title: '账号管理', role: ['super', 'normal'], icon: 'el-icon-user' },
    visible: true,
    children: [
      {
        path: "/user/user-add",
        component: () => import("@/views/User/UserAdd.vue"),
        meta: { title: '账号添加', role: ['super'] },
      },
      {
        path: "/user/user-list",
        component: () => import("@/views/User/UserList.vue"),
        meta: { title: '账号列表', role: ['super'] },
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
    meta: { title: "销售统计", role: ['super'], icon: 'el-icon-pie-chart' },
    visible: true,
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
  // 404页面
  {
    path: '/404',//路径
    component: Error404,//组件
    visible: false
  },
  {
    path: '*',//路径
    redirect: '/404',//组件
    visible: false
  }
]

// 创建路由实例对象
const router = new VueRouter({
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  /**
   * to   去哪里
   * from 从哪里来
   * next 放行
   */

  // 判断是否登录
  let isLogin = local.get('t_k') ? true : false
  if (isLogin) {//登陆过就放行
    next()
  } else {//没登录过
    if (to.path == '/login') {//去的是登陆页面
      next()//放行
    } else {//强制去登录页面
      next({ path: '/login' })
    }
  }
})

// 判断当前对象是否有权限
function isRole(router, role) {

  if (router.meta && router.meta.role) {
    //如果路由中有meta就是需要有权限才可以访问
    return router.meta.role.includes(role)//有当前的role就为真，没有就为false
  } else {
    //没有meta就是没有设置权限，任何人都可以访问
    return true
  }
}

// 计算当前所有的动态路由
function calcRoutes(asyncRoutes, role) {
  let accessRouter = asyncRoutes.filter(router => {
    // 判断isRole的返回值是否正确，是false就是没有权限管理，都可以访问
    if (isRole(router, role)) {
      // 如果有二级，就递归遍历出符合权限的
      if (router.children && router.children.length) {
        router.children = calcRoutes(router.children, role)
      }
      return true
    } else {
      return false
    }
  })
  return accessRouter
}

// 计算当前角色有权访问的菜单
function isVisible(router, role) {
  // 判断router的visited的属性 false是不显示在左侧导航栏，true是显示
  if (router.visible) {
    return true
  } else {
    return false
  }

}

// 计算在不在左侧显示的导航栏菜单
function calcMenus(accessRoutes, role) {
  // 过滤出是否在左侧显示的导航栏
  let arr = accessRoutes.filter(router => {
    if (isVisible(router, role)) {
      return true
    } else {
      return false
    }
  })
  return arr
}

// 根据当前角色，动态创建出当前角色可以访问的路由
export function createRouter() {
  // 从本地拿取出role
  let role = local.get('role')

  // 计算出有权限访问的路由
  let accessRoutes = calcRoutes(asyncRoutes, role)

  // 将有权限的动态路由增加给默认的路由
  router.addRoutes(accessRoutes)

  // 计算动态的菜单
  let menus = calcMenus(accessRoutes, role)

  // 将动态的菜单存入本地
  local.set('menus', menus)
  // console.log(menus);
}
createRouter()//防止未登陆刷新时 没有路由

export default router
