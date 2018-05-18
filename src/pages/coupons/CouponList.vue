<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getCoupons(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="coupons" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getCoupons" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '领取用户',
          key: 'user_id'
        },
        {
          title: '类型',
          key: 'coupon_type_id'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '优惠码',
          key: 'sn'
        },
        {
          title: '到期日期',
          key: 'expire'
        },
        {
          title: '使用日期',
          key: 'used_at'
        },
        {
          title: '创建时间',
          key: 'created_at'
        }
      ],
      coupons: [],
      total: null,
      current_page: null,
      search: ''
    }
  },
  created () {
    this.getCoupons(1)
  },
  methods: {
    getCoupons (page) {
      this.$http.get('/admin/coupons?page=' + page + '&search=' + this.search).then((res) => {
        this.coupons = res.data.coupons
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