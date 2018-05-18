<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="20" :lg="20">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;"></Input>
        <Button type="primary" icon="ios-search" @click="getFoods(1)">搜索</Button>
      </Col>
      <Col :xs="5" :sm="3" :md="2" :lg="2">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table highlight-row ref="currentRowTable" border :columns="columns" :data="foods" :stripe="true" class="table"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此信息？</p>
    </Modal>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getFoods" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '菜品名',
          key: 'name'
        },
        {
          title: '简介',
          key: 'desc'
        },
        {
          title: '价格',
          width: 70,
          key: 'price'
        },
        {
          title: '已售',
          width: 70,
          key: 'sales'
        },
        {
          title: '分类',
          key: 'food_type_name',
          filters: [],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.food_type_name.indexOf(value) >= 0
          }
        },
        {
          title: '菜品状态',
          key: 'active',
          render: (h, params) => {
            return h('div', params.row.active === true ? '菜品已上架' : '菜品已下架')
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'left',
          render: (h, params) => {
            // if (this.manager.role === 'merchant_admin') {
              if (params.row.active === true) {
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
                        this.$router.push('/foods/' + params.row.id + '/edit')
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
                        this.show(params.row.id, params.index)
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
                        this.downAway(params.row)
                      }
                    }
                  }, '下架'),
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
              } else if (params.row.active !== true) {
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
                        this.$router.push('/foods/' + params.row.id + '/edit')
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
                        this.show(params.row.id, params.index)
                      }
                    }
                  }, '详情'),
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
                        this.upAway(params.row)
                      }
                    }
                  }, '上架'),
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
              }
            // }
          }
        }
      ],
      food_types: [],
      food: null,
      foods: [],
      deleteFood: null,
      modal: false,
      total: null,
      current_page: null,
      // search: ''
    }
  },
  created () {
    this.getFoods(1)
    this.$http.get('/admin/food_types').then((res) => {
      this.food_types = res.data.food_types
      let column = this.columns.find((v) => {
        return v.key === 'food_type_name'
      })
      // column.filters = this.food_types.map((v) => {
      //   return {label: v.name, value: v.name}
      // })
      column.filters = this.food_types.map(v => ({label: v.name, value: v.name}))
    })
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getFoods (page) {
      this.$http.get('/admin/foods' + '&page=' + page).then((res) => {
        this.foods = res.data.foods
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    show (rowId, index) {
      this.$http.get('/admin/foods/' + rowId).then((res) => {
        this.food = res.data.food
        this.$Modal.info({
          title: '菜品详情',
          content: `名称：${this.food.name}<br>
                    描述：${this.food.desc}<br>价格：${this.food.price}<br>已售份数: ${this.food.sales}<br>
                    购买数量: ${this.food.buyNum}<br>创建时间: ${this.foods[index].created_at}<br>
                    激活状态: ${this.foods[index].active === true ? '是' : '否'}`
        })
      })
    },
    upAway (row) {
      this.$http.get('/admin/foods/' + row.id + '/active').then((res) => {
        if (res.data.status === 1) {
          row.active = true
          this.$Message.info(res.data.notice)
        }
      })
    },
    downAway (row) {
      this.$http.get('/admin/foods/' + row.id + '/unactive').then((res) => {
        if (res.data.status === 1) {
          row.active = false
          this.$Message.info(res.data.notice)
        }
      })
    },
    create () {
      this.$router.push('/foods/new')
    },
    ok () {
      this.foods.splice(this.deleteFood._index, 1)
      this.$http.delete('/admin/foods/' + this.deleteFood.id).then((res) => {
        if (this.foods.length === 0) {
          this.getFoods()
          this.pageChange(this.current_page - 1)
        } else {
          this.getFoods()
          this.pageChange(this.current_page)
        }
      })
      this.$Message.info('已删除此用菜品！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    showModal (row) {
      this.modal = true
      this.deleteFood = row
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>