<template>
  <div class="layout">
    <Layout>
      <Sider ref="side" breakpoint="md" collapsible :collapsed-width="80" v-model="isCollapsed" :style="{minHeight: '100vh'}">
        <div @click="$router.push('/')" style="text-align: center; padding: 10px;">
            <img src="../assets/fw.jpg" width="40%" />
            <p style="color: #fff;">开店宝后台管理</p>
        </div>
        <template>
          <Menu theme="dark" :active-name="this.$route.meta.menuName" width="auto" :class="menuitemClasses" :open-names="['1', '2']">
            <Submenu :name="menu.id" v-for="(menu, key) in menus" :key="key">
              <template slot="title">
                <Icon :type="menu.icon"></Icon>
                {{menu.nickname}}
              </template>
              <MenuItem :name="subMenu.name" @click.native="onMenu(subMenu,menu.nickname)" v-for="(subMenu, key) in menu.subCates" :key="key">
                <Icon :type="subMenu.icon"></Icon>
                  {{subMenu.nickname}}
              </MenuItem>
            </Submenu>
          </Menu>
        </template>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar" :style="{background: '#fff'}">
          <Row justify="start" align="middle">
            <Col :xs="{ span: 19, offset: 0 }" :sm="{ span: 5, offset: 10 }" :lg="{ span: 4, offset: 14 }" align="center">
              玉溪土豪外卖
            </Col>
            <Col :xs="{ span: 0 }" :sm="{ span: 5 }" :lg="{ span: 4 }" align="center">
              20789999@qq.com
            </Col>
            <Col :xs="{ span: 0 }" :sm="{ span: 4 }" :lg="{ span: 2 }" align="center">
              <Dropdown>
                <i-button type="primary">
                    设置
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" trigger="click">
                  <Dropdown-item>个人信息</Dropdown-item>
                  <Dropdown-item>商户信息</Dropdown-item>
                  <DropdownItem>安全退出</DropdownItem>
                </Dropdown-menu>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Breadcrumb :style="{margin: '16px 16px 0px 16px'}">
          <Breadcrumb-item href="#" @click.native="$router.push('/')" >
            <Icon type="ios-home-outline"></Icon> 首页
          </Breadcrumb-item>
          <Breadcrumb-item v-if="title">
            <Icon type="social-buffer-outline"></Icon> {{title}}
          </Breadcrumb-item>
          <Breadcrumb-item v-if="subTitle">
            <Icon type="pound"></Icon> {{subTitle}}
          </Breadcrumb-item>
        </Breadcrumb>
        <Content :style="{margin: '16px', padding: '16px', background: '#fff', minHeight: '650px'}">
          <Modal v-model="modal" width="360">
            <p slot="header" style="color:#2d8cf0;text-align:center">
              <Icon type="information-circled"></Icon>
              <span>新用户提示</span>
            </p>
            <div style="text-align:center">
              <p>由于您是第一次登陆，需要先进行基本配置后才能正常使用，请按照新手引导进行基本配置。</p>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" long  @click="ok">开始配置</Button>
            </div>
          </Modal>
          <Row :style="{margin: '10px 0 40px 0'}">
            <Col  :xs="19" :sm="21" :md="22" :lg="22" :style="{margin: '0 0 30px 0'}">
              <p>首次引导</p>
            </Col>
            <!-- <Col :xs="5" :sm="3" :md="2" :lg="2">
              <Button type="primary" @click="next()">下一步</Button>
            </Col>
            <Steps :current="current">
              <Step v-for="(step, key) in steps" :title="step.title" :content="step.content" :key="key"></Step>
            </Steps> -->
          </Row>
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// import $ from 'zepto'
export default {
  data () {
    return {
      menus: null,
      title: '',
      subTitle: '',
      isCollapsed: false,
      modal: false
    }
  },
  methods: {
    onMenu (e, k) {
      this.title = k
      this.subTitle = e.nickname
      this.$router.push(e.url)
      this.collapsedSider()
    },
    collapsedSider () {
      if ($('.ivu-layout-sider-zero-width-trigger').css('display') === 'block') {
        this.$refs.side.toggleCollapse()
      }
    },
    ok () {
      this.modal = false
      this.$router.push(this.steps[this.current].url)
    },
    cancel () {
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created () {
    this.menus = [{
      id: '1',
      nickname: '平台管理',
      icon: 'gear-a',
      role: 'super_admin',
      subCates: [{
        id: '1001',
        menuId: '1',
        name: 'Sites',
        nickname: '多站点',
        url: '/sites',
        icon: 'home'
      }, {
        id: '1002',
        menuId: '1',
        name: 'Managers',
        nickname: '管理员账号',
        url: '/managers',
        icon: 'person-stalker'
      }]
    },{
      id: '2',
      nickname: '站点管理',
      icon: 'gear-a',
      role: 'site_admin',
      subCates: [ {
        id: '2001',
        menuId: '2',
        name: 'DiyMenus',
        nickname: '微信菜单',
        url: '/diymenus',
        icon: 'android-menu'
      }, {
        id: '2002',
        menuId: '2',
        name: 'QrCodes',
        nickname: '二维码管理',
        url: '/qr_codes',
        icon: 'qr-scanner'
      }]
    },
    {
      id: '3',
      nickname: '基础配置',
      icon: 'gear-a',
      role: 'merchant_admin',
      subCates: [{
        id: '3001',
        menuId: '3',
        name: 'KeyWords',
        nickname: '自动回复',
        url: '/key_words',
        icon: 'android-menu'
      },{
        id: '3002',
        menuId: '3',
        name: 'Tabbars',
        nickname: '底部导航',
        url: '/tabbars',
        icon: 'android-menu'
      }, {
        id: '3003',
        menuId: '3',
        name: 'Bannars',
        nickname: '首页页头',
        url: '/bannars',
        icon: 'speakerphone'
      }, {
        id: '3004',
        menuId: '3',
        name: 'Categories',
        nickname: '内容管理',
        url: '/categories',
        icon: 'ios-book'
      }, {
        id: '3005',
        menuId: '3',
        name: 'MerchantAddresses',
        nickname: '商铺地址管理',
        url: '/merchant_addresses',
        icon: 'qr-scanner'
      }, {
        id: '3006',
        menuId: '3',
        name: 'VerificationLogs',
        nickname: '消费记录',
        url: '/verification_logs',
        icon: 'speakerphone'
      }, {
        id: '3007',
        menuId: '3',
        name: 'MerchantQrCodes',
        nickname: '二维码管理',
        url: '/merchant_qr_codes',
        icon: 'qr-scanner'
      }]
    }, {
      id: '4',
      nickname: '活动推广',
      icon: 'briefcase',
      role: 'merchant_admin',
      subCates: [{
        id: '4001',
        menuId: '4',
        name: 'Promotions',
        nickname: '活动管理',
        url: '/promotions',
        icon: 'medkit'
      }, {
        id: '4002',
        menuId: '4',
        name: 'Coupons',
        nickname: '卡券管理',
        url: '/coupons',
        icon: 'ios-list'
      }, {
        id: '4003',
        menuId: '4',
        name: 'CouponTypes',
        nickname: '卡券类型',
        url: '/coupon_types',
        icon: 'ios-copy'
      }, {
        id: '4004',
        menuId: '4',
        name: 'CouponProducts',
        nickname: '卡券商品',
        url: '/coupon_products',
        icon: 'ios-list'
      }, {
        id: '4005',
        menuId: '4',
        name: 'CouponOrders',
        nickname: '卡券购买订单',
        url: '/coupon_orders',
        icon: 'ios-list'
      }, {
        id: '4006',
        menuId: '4',
        name: 'RedPacketTypes',
        nickname: '红包类型管理',
        url: '/red_packet_types',
        icon: 'android-calendar'
      }, {
        id: '4007',
        menuId: '4',
        name: 'RedPacketLogs',
        nickname: '红包领取记录',
        url: '/red_packet_logs',
        icon: 'clipboard'
      }, {
        id: '4008',
        menuId: '4',
        name: 'VerificationLogs',
        nickname: '核销记录',
        url: '/verification_logs',
        icon: 'ios-paper'
      }]
    }, {
      id: '5',
      nickname: '用户管理',
      icon: 'person-stalker',
      role: 'merchant_admin',
      subCates: [{
        id: '5001',
        menuId: '5',
        name: 'Users',
        nickname: '用户详情',
        url: '/users',
        icon: 'person-add'
      }, {
        id: '5002',
        menuId: '5',
        name: 'Consumes',
        nickname: '消费记录',
        url: '/consumes',
        icon: 'social-usd'
      }, {
        id: '5002',
        menuId: '5',
        name: 'Items',
        nickname: '积分商品',
        url: '/items',
        icon: 'social-usd'
      }, {
        id: '5002',
        menuId: '5',
        name: 'LevelRulers',
        nickname: '等级规则',
        url: '/level_rulers',
        icon: 'social-usd'
      }]
    }, {
      id: '6',
      nickname: '进存销管理',
      icon: 'ios-compose',
      role: 'merchant_admin',
      subCates: [{
        id: '6001',
        menuId: '6',
        name: 'GoodsType',
        nickname: '进货货品类型',
        url: '/goods_types',
        icon: 'ios-copy'
      }, {
        id: '6002',
        menuId: '6',
        name: 'Goods',
        nickname: '进货货种',
        url: '/goodses',
        icon: 'navicon-round'
      }, {
        id: '6003',
        menuId: '6',
        name: 'GoodsRecord',
        nickname: '进货详情',
        url: '/goods_records',
        icon: 'ios-list'
      }]
    }, {
      id: '7',
      nickname: '外卖',
      icon: 'coffee',
      role: 'merchant_admin',
      subCates: [{
        id: '7001',
        menuId: '7',
        name: 'FoodsConfig',
        nickname: '外卖送货配置',
        url: '/foods_config',
        icon: 'gear-a'
      }, {
        id: '7002',
        menuId: '7',
        name: 'FoodsType',
        nickname: '菜品种类',
        url: '/foods_types',
        icon: 'ios-grid-view'
      }, {
        id: '7003',
        menuId: '7',
        name: 'Foods',
        nickname: '菜品详情',
        url: '/foods',
        icon: 'clipboard'
      }, {
        id: '7004',
        menuId: '7',
        name: 'FoodOrder',
        nickname: '外卖订单管理',
        url: '/foods_orders',
        icon: 'flag'
      }]
    }]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layout{
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.ivu-layout-header {
  background: #fff;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
}
.ivu-layout-sider-zero-width-trigger {
  top: 10px !important;
}
</style>
