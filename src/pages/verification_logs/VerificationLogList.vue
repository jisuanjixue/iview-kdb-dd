<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getVerificationLogs(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="verification_logs" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getVerificationLogs" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '用户名',
          key: 'nickname'
        },
        {
          title: '真实姓名',
          key: 'real_name'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '卡号',
          key: 'cardno'
        },
        {
          title: '活动名称',
          key: 'promotion_name'
        },
        {
          title: '卡券名称',
          key: 'coupon_name'
        },
        {
          title: '卡券类型',
          key: 'coupon_type_name'
        },
        {
          title: '优惠码',
          key: 'coupon_sn'
        },
        {
          title: '核销人',
          key: 'verifer_name'
        },
        {
          title: '核销时间',
          key: 'created_at'
        }
      ],
      verification_logs: [],
      total: null,
      current_page: null,
      search: ''
    }
  },
  created () {
    this.getVerificationLogs(1)
  },
  methods: {
    getVerificationLogs (page) {
      this.$http.get('/admin/verification_logs?page=' + page + '&search=' + this.search).then((res) => {
        this.verification_logs = res.data.verification_logs
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