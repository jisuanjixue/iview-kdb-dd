import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
// import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component(resolve) {
        require(['../pages/Home.vue'], resolve)
      },
      children: [
        // 首页
        {
          path: '/index',
          name: 'Index',
          component(resolve) {
            require(['../pages/Index.vue'], resolve)
          },
          meta: { menuName: 'Index' }
        },
        // 平台管理的站点
        {
          path: '/sites',
          name: 'SiteList',
          component(resolve) {
            require(['../pages/sites/SiteList.vue'], resolve)
          },
          meta: { menuName: 'Sites' }
        },
        {
          path: '/sites/new',
          name: 'SiteNew',
          component(resolve) {
            require(['../pages/sites/SiteNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Sites' }
        },
        {
          path: '/sites/:id/show',
          name: 'SiteDesc',
          component(resolve) {
            require(['../pages/sites/SiteDesc.vue'], resolve)
          },
          meta: { menuName: 'Sites' }
        },
        {
          path: '/sites/:id/edit',
          name: 'SiteEdit',
          component(resolve) {
            require(['../pages/sites/SiteNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Sites' }
        },
        // 管理员管理
        {
          path: '/managers',
          name: 'ManagerList',
          component (resolve) {
            require(['../pages/managers/ManagerList.vue'], resolve)
          },
          meta: {menuName: 'Managers'}
        },
        {
          path: '/managers/new',
          name: 'ManagerNew',
          component (resolve) {
            require(['../pages/managers/ManagerNewEdit.vue'], resolve)
          },
          meta: {menuName: 'Managers'}
        },
        {
          path: '/managers/:id/edit',
          name: 'ManagerEdit',
          component (resolve) {
            require(['../pages/managers/ManagerNewEdit.vue'], resolve)
          },
          meta: {menuName: 'Managers'}
        },
        // 基础配置的自动回复
        {
          path: '/key_words',
          name: 'KeyWordList',
          component(resolve) {
            require(['../pages/key_words/KeyWordList.vue'], resolve)
          },
          meta: { menuName: 'KeyWords' }
        },
        {
          path: '/key_words/new',
          name: 'KeyWordNew',
          component(resolve) {
            require(['../pages/key_words/KeyWordNewEdit.vue'], resolve)
          },
          meta: { menuName: 'KeyWords' }
        },
        {
          path: '/key_words/:id/edit',
          name: 'KeyWordEdit',
          component(resolve) {
            require(['../pages/key_words/KeyWordNewEdit.vue'], resolve)
          },
          meta: { menuName: 'KeyWords' }
        },
        // 基础配置的首页页头
        {
          path: '/bannars',
          name: 'BannarList',
          component(resolve) {
            require(['../pages/bannars/BannarList.vue'], resolve)
          },
          meta: { menuName: 'Bannars' }
        },
        {
          path: '/bannars/new',
          name: 'BannarNew',
          component(resolve) {
            require(['../pages/bannars/BannarNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Bannars' }
        },
        {
          path: '/bannars/:id/edit',
          name: 'BannarEdit',
          component(resolve) {
            require(['../pages/bannars/BannarNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Bannars' }
        },
        // 基础配置的底部导航
        {
          path: '/tabbars',
          name: 'TabbarList',
          component(resolve) {
            require(['../pages/tabbars/TabbarList.vue'], resolve)
          },
          meta: { menuName: 'Tabbars' }
        },
        {
          path: '/tabbars/new',
          name: 'TabbarNew',
          component(resolve) {
            require(['../pages/tabbars/TabbarNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Tabbars' }
        },
        {
          path: '/tabbars/:id/edit',
          name: 'TabbarEdit',
          component(resolve) {
            require(['../pages/tabbars/TabbarNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Tabbars' }
        },
        // 基础配置的内容管理
        {
          path: '/categories',
          name: 'CategoryList',
          component(resolve) {
            require(['../pages/categories/CategoryList.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/new',
          name: 'CategoryNew',
          component(resolve) {
            require(['../pages/categories/CategoryNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/:id/edit',
          name: 'CategoryEdit',
          component(resolve) {
            require(['../pages/categories/CategoryNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        // 基础配置的内容管理的相册
        {
          path: '/categories/:id/photos',
          name: 'PhotoList',
          component(resolve) {
            require(['../pages/categories/PhotoList.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/:id/photos/new',
          name: 'PhotoNew',
          component(resolve) {
            require(['../pages/categories/PhotoNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/:id/photos/:photo_id/edit',
          name: 'PhotoEdit',
          component(resolve) {
            require(['../pages/categories/PhotoNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        // 基础配置的内容管理的文章
        {
          path: '/categories/:id/pages',
          name: 'PageList',
          component(resolve) {
            require(['../pages/categories/PageList.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/:id/pages/new',
          name: 'PageNew',
          component(resolve) {
            require(['../pages/categories/PageNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        {
          path: '/categories/:id/pages/:page_id/edit',
          name: 'PageEdit',
          component(resolve) {
            require(['../pages/categories/PageNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Categories' }
        },
        // 基础配置的商铺地址管理
        {
          path: '/merchant_addresses',
          name: 'MerchantAddressList',
          component(resolve) {
            require(['../pages/merchant_addresses/MerchantAddressList.vue'], resolve)
          },
          meta: { menuName: 'MerchantAddresses' }
        },
        {
          path: '/merchant_addresses/new',
          name: 'MerchantAddressNew',
          component(resolve) {
            require(['../pages/merchant_addresses/MerchantAddressNewEdit.vue'], resolve)
          },
          meta: { menuName: 'MerchantAddresses' }
        },
        {
          path: '/merchant_addresses/:id/edit',
          name: 'MerchantAddressEdit',
          component(resolve) {
            require(['../pages/merchant_addresses/MerchantAddressNewEdit.vue'], resolve)
          },
          meta: { menuName: 'MerchantAddresses' }
        },
        // 基础配置的二维码管理
        //活动推广的活动管理
        {
          path: '/promotions',
          name: 'PromotionList',
          component(resolve) {
            require(['../pages/promotions/PromotionList.vue'], resolve)
          },
          meta: { menuName: 'Promotions' }
        },
        {
          path: '/promotions/new',
          name: 'PromotionNew',
          component(resolve) {
            require(['../pages/promotions/PromotionNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Promotions' }
        },
        {
          path: '/promotions/:id/edit',
          name: 'PromotionEdit',
          component(resolve) {
            require(['../pages/promotions/PromotionNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Promotions' }
        },
        // 活动推广的卡券管理
        {
          path: '/coupons',
          name: 'CouponList',
          component(resolve) {
            require(['../pages/coupons/CouponList.vue'], resolve)
          },
          meta: { menuName: 'Coupons' }
        },
        // 活动推广的卡券类型
        {
          path: '/coupon_types',
          name: 'CouponTypeList',
          component(resolve) {
            require(['../pages/coupon_types/CouponTypeList.vue'], resolve)
          },
          meta: { menuName: 'CouponTypes' }
        },
        {
          path: '/coupon_types/new',
          name: 'CouponTypeNew',
          component(resolve) {
            require(['../pages/coupon_types/CouponTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'CouponTypes' }
        },
        {
          path: '/coupon_types/:id/edit',
          name: 'CouponTypeEdit',
          component(resolve) {
            require(['../pages/coupon_types/CouponTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'CouponTypes' }
        },
        //活动推广的卡券商品
        {
          path: '/coupon_products',
          name: 'CouponProductList',
          component(resolve) {
            require(['../pages/coupon_products/CouponProductList.vue'], resolve)
          },
          meta: { menuName: 'CouponProducts' }
        },
        {
          path: '/coupon_products/new',
          name: 'CouponProductNew',
          component(resolve) {
            require(['../pages/coupon_products/CouponProductNewEdit.vue'], resolve)
          },
          meta: { menuName: 'CouponProducts' }
        },
        {
          path: '/coupon_products/:id/edit',
          name: 'CouponProductEdit',
          component(resolve) {
            require(['../pages/coupon_products/CouponProductNewEdit.vue'], resolve)
          },
          meta: { menuName: 'CouponProducts' }
        },
        // 活动推广的卡券购买订单
        {
          path: '/coupon_orders',
          name: 'CouponOrderList',
          component(resolve) {
            require(['../pages/coupon_orders/CouponOrderList.vue'], resolve)
          },
          meta: { menuName: 'CouponOrders' }
        },
        //活动推广的红包类型
        {
          path: '/red_packet_types',
          name: 'RedPacketTypeList',
          component(resolve) {
            require(['../pages/red_packet_types/RedPacketTypeList.vue'], resolve)
          },
          meta: { menuName: 'RedPacketTypes' }
        },
        {
          path: '/red_packet_types/new',
          name: 'RedPacketTypeNew',
          component(resolve) {
            require(['../pages/red_packet_types/RedPacketTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'RedPacketTypes' }
        },
        {
          path: '/red_packet_types/:id/edit',
          name: 'RedPacketTypeEdit',
          component(resolve) {
            require(['../pages/red_packet_types/RedPacketTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'RedPacketTypes' }
        },
        // 活动推广的红包领取记录
        {
          path: '/red_packet_logs',
          name: 'RedPacketLogList',
          component(resolve) {
            require(['../pages/red_packet_logs/RedPacketLogList.vue'], resolve)
          },
          meta: { menuName: 'RedPacketLogs' }
        },
        // 用户管理的用户详情
        {
          path: '/users',
          name: 'UserList',
          component(resolve) {
            require(['../pages/users/UserList.vue'], resolve)
          },
          meta: { menuName: 'Users' }
        },
        {
          path: '/users/:id',
          name: 'UserDesc',
          component(resolve) {
            require(['../pages/users/UserDesc.vue'], resolve)
          },
          meta: { menuName: 'Users' }
        },
        // 用户管理的消费记录
        {
          path: '/consumes',
          name: 'ConsumeList',
          component(resolve) {
            require(['../pages/consumes/ConsumeList.vue'], resolve)
          },
          meta: { menuName: 'Consumes' }
        },
        // 用户管理的积分商城
        {
          path: '/items',
          name: 'Item',
          component(resolve) {
            require(['../pages/items/ItemList.vue'], resolve)
          },
          meta: { menuName: 'Items' }
        },
        {
          path: '/items/new',
          name: 'ItemNew',
          component(resolve) {
            require(['../pages/items/ItemNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Items' }
        },
        {
          path: '/items/:id/edit',
          name: 'ItemEdit',
          component(resolve) {
            require(['../pages/items/ItemNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Items' }
        },
        // 用户管理的等级规则
        {
          path: '/level_rulers',
          name: 'LevelRuler',
          component(resolve) {
            require(['../pages/consumes/LevelRulerList.vue'], resolve)
          },
          meta: { menuName: 'LevelRulers' }
        },
        // 进存销管理的进货货品类型
        {
          path: '/goods_types',
          name: 'GoodTypeList',
          component(resolve) {
            require(['../pages/goods_types/GoodTypeList.vue'], resolve)
          },
          meta: { menuName: 'GoodsType' }
        },
        {
          path: '/goods_types/new',
          name: 'GoodTypeNew',
          component(resolve) {
            require(['../pages/goods_types/GoodTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'GoodsType' }
        },
        {
          path: '/goods_types/:id/edit',
          name: 'GoodTypeEdit',
          component(resolve) {
            require(['../pages/goods_types/GoodTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'GoodsType' }
        },
        // 进存销管理的进货货种
        {
          path: '/goodses',
          name: 'GoodsList',
          component(resolve) {
            require(['../pages/goodses/GoodsList.vue'], resolve)
          },
          meta: { menuName: 'Goods' }
        },
        {
          path: '/goodses/new',
          name: 'GoodsNew',
          component(resolve) {
            require(['../pages/goodses/GoodsNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Goods' }
        },
        {
          path: '/goodses/:id/edit',
          name: 'GoodsEdit',
          component(resolve) {
            require(['../pages/goodses/GoodsNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Goods' }
        },
        // 进存销管理的进存货管理记录
        {
          path: '/goods_records',
          name: 'GoodsRecordList',
          component(resolve) {
            require(['../pages/goods_records/GoodsRecordList.vue'], resolve)
          },
          meta: { menuName: 'GoodsRecord' }
        },
        // 外卖的外卖配送设置
        {
          path: '/foods_config',
          name: 'FoodConfig',
          component(resolve) {
            require(['../pages/food_configs/FoodConfigEdit.vue'], resolve)
          },
          meta: {
            menuName: 'FoodsConfig'
          }
        },
        // 外卖的菜品种类
        {
          path: '/foods_types',
          name: 'FoodTypeList',
          component(resolve) {
            require(['../pages/food_types/FoodTypeList.vue'], resolve)
          },
          meta: { menuName: 'FoodsType' }
        },
        {
          path: '/foods_types/new',
          name: 'FoodTypeNew',
          component(resolve) {
            require(['../pages/food_types/FoodTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'FoodsType' }
        },
        {
          path: '/foods_types/:id/edit',
          name: 'FoodTypeEdit',
          component(resolve) {
            require(['../pages/food_types/FoodTypeNewEdit.vue'], resolve)
          },
          meta: { menuName: 'FoodsType' }
        },
        // 外卖的菜品详情
        {
          path: '/foods',
          name: 'Food',
          component(resolve) {
            require(['../pages/foods/Food.vue'], resolve)
          },
          meta: { menuName: 'Foods' }
        },
        {
          path: '/foods/new',
          name: 'FoodNew',
          component(resolve) {
            require(['../pages/foods/FoodNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Foods' }
        },
        {
          path: '/foods/:id/edit',
          name: 'FoodEdit',
          component(resolve) {
            require(['../pages/foods/FoodNewEdit.vue'], resolve)
          },
          meta: { menuName: 'Foods' }
        },
        // 外卖的外卖订单
        {
          path: '/foods_orders',
          name: 'FoodOrder',
          component(resolve) {
            require(['../pages/food_orders/FoodOrder.vue'], resolve)
          },
          meta: { menuName: 'FoodOrder' }
        }
      ]
    }
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component(resolve) {
    //     require(['../pages/Login.vue'], resolve)
    //   }
    // }
  ]
})

// router.beforeEach((to, from, next) => {
  // http response 拦截器 拦截 401错误
  // axios.interceptors.response.use(
  //   response => {
  //     return response
  //   },
  //   error => {
  //     if (error.response) {
  //       switch (error.response.status) {
  //         case 401:
  //           window.localStorage.removeItem('authorization')
  //           store.commit('SET_USER', { user: '' })
  //           axios.defaults.headers.common['Authorization'] = ''
  //           next('/login')
  //       }
  //     }
  //     return Promise.reject(error)   // 返回接口返回的错误信息
  //   })
  // 用户第一次进入
  // let authorization = window.localStorage.getItem('authorization')
  // console.log(authorization)
  // if (authorization === null && to.path !== '/login') {
  //   next('/login')
  // }
  // next()
  // iView.LoadingBar.start()
  // Util.title(to.meta.title)
  // next();
// });

// router.afterEach(() => {
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// });

 export default router