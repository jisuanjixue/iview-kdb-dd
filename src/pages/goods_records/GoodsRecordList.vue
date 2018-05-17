<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getGoodsRecords(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="goodsRecords" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getGoodsRecords" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '货品名',
          key: 'goods_name'
        },
        {
          title: '进货量',
          key: 'count'
        },
        {
          title: '单价',
          key: 'price'
        },
        {
          title: '总价',
          key: 'price_all'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '创建时间',
          key: 'created_at'
        }
      ],
      goodsRecords: [],
      total: null,
      current_page: null,
      modal: false,
      search: ''
    }
  },
  created () {
    this.getGoodsRecords(1)
  },
  methods: {
    getGoodsRecords (page) {
      this.$http.get('/admin/goods_records?search=' + this.search + '&page=' + page).then((res) => {
        this.goodsRecords = res.data.goodsRecords
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