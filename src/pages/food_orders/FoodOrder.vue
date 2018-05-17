<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getWaiMaiOrders(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="waiMaiOrders" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getWaiMaiOrders" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '订单号',
          key: 'order_id'
        },
        {
          title: '下单人',
          key: 'buyer'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '支付方式',
          key: 'payment'
        },
        {
          title: '总价',
          key: ' total_price'
        },
        {
          title: '实付金额',
          key: 'price'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '下单时间',
          key: 'order_time'
        }
      ],
      waiMaiOrders: [],
      total: null,
      current_page: null,
      modal: false,
      search: ''
    }
  },
  created () {
    this.getWaiMaiOrders(1)
  },
  methods: {
    getWaiMaiOrders (page) {
      this.$http.get('/admin/waimai_orders?search=' + this.search + '&page=' + page).then((res) => {
        this.waiMaiOrders = res.data.waimai_orders
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