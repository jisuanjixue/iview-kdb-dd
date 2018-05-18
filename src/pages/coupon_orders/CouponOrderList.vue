<template>
  <div>
    <Row type="flex">
      <Col span="10">
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in list" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col :xs="19" :sm="21" :md="22" :lg="22" span="14">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getCouponOrders(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="coupon_orders" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getCouponOrders" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '订单号',
          key: 'id'
        },
        {
          title: '订单标题',
          key: 'order_no'
        },
        {
          title: '订单价格',
          key: 'price'
        },
        {
          title: '订单购买人',
          key: 'user_id'
        },
        {
          title: '付款时间',
          key: ' paied_at'
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      coupon_orders: [],
      total: null,
      current_page: null,
      modal: false,
      search: '',
      model1: '',
      list: [
        {value: 'all', label: '全部'},
        {value: 'non_payment', label: '未付款'},
        {value: 'paid', label: '已付款'},
      ]
    }
  },
  created () {
    this.getCouponOrders(1)
  },
  methods: {
    getCouponOrders (page) {
      this.$http.get('/admin/coupon_orders?search=' + this.search + '&page=' + page).then((res) => {
        this.coupon_orders = res.data.coupon_orders
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>