<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getConsumes(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="consumes" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getConsumes" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '消费内容',
          key: 'content'
        },
        {
          title: '消费金额',
          key: 'price'
        },
        {
          title: '消费来源',
          key: 'source'
        },
        {
          title: '消费者',
          key: 'nickname'
        },
        {
          title: '手机',
          key: 'mobile'
        },
        {
          title: '卡号',
          key: 'cardno'
        },
        {
          title: '姓名',
          key: 'real_name'
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
      consumes: [],
      total: null,
      current_page: null,
      search: ''
    }
  },
  created () {
    this.getConsumes(1)
  },
  methods: {
    getConsumes (page) {
      this.$http.get('/consumes?page=' + page + '&search=' + this.search).then((res) => {
        this.consumes = res.data.consumes
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