<template>
  <div>
    <Row>
        <Col :xs="19" :sm="21" :md="22" :lg="22">
          <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
          <Button type="primary" icon="ios-search" @click="getStocks(1)">搜索</Button>
        </Col>
        <Col :xs="5" :sm="3" :md="2" :lg="2">
          <Button type="success" icon="plus-round" @click="create">新建</Button>
        </Col>
    </Row>
    <Table border :columns="columns" :data="stocks" :stripe="true" class="table"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此信息？</p>
    </Modal>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getStocks" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '货品名',
          key: 'name'
        },
        {
          title: '所属类型',
          key: 'type'
        },
        // {
        //   title: '单位',
        //   key: 'unit',
        //   render: (h, params) => {
        //     return h('div', params.row.unit === 2 ? '个' : '公斤' && params.row.unit === 1 ? '件' : '公斤')
        //   }
        // },
        {
          title: '当前库存',
          key: 'count_current'
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            // if (this.manager.role === 'merchant_admin') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/goods/' + params.row.id + '/edit')
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showModal(params.row)
                    }
                  }
                }, '删除')
              ])
            // }
          }
        }
      ],
      stocks: [],
      stocksTypes: [],
      stock: null,
      total: null,
      current_page: null,
      deleteStock: null,
      modal: false,
      search: ''
    }
  },
  created () {
    this.getStocks(1)
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getStocks (page) {
      this.$http.get('/admin/goodses?search=' + this.search + '&page=' + page).then((res) => {
        this.stocks = res.data.goodses
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    pageChange (page) {
      this.$http.get('/admin/goodses' + '?page=' + page).then((res) => {
        this.stocks = res.data.goodses
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    create () {
      this.$router.push('/goods/new')
    },
    show (rowId) {
      this.$http.get('/admin/goodses/' + rowId).then((res) => {
        this.stock = res.data.goods
        this.$Modal.info({
          title: '货品详情',
          content: `名称：${this.stock.name}<br>类型: ${this.stock.type}<br>单位：${this.stock.unit}<br>当前库存：${this.stock.count_current}<br>创建时间: ${this.stock.created_at}`
        })
      })
    },
    ok () {
      this.stocks.splice(this.deleteStock._index, 1)
      this.$http.delete('/admin/goodses/' + this.deleteStock.id).then((res) => {
        if (this.stocks.length === 0) {
          this.getStocks()
          this.pageChange(this.current_page - 1)
        } else {
          this.getStocks()
          this.pageChange(this.current_page)
        }
      })
      this.$Message.info('已删除此用货种！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    showModal (row) {
      this.modal = true
      this.deleteStock = row
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>