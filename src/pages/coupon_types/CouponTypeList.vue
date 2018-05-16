<template>
  <div>
    <Row>
      <!-- <Col :xs="{span: 5, offset: 14}" :sm="{span: 4, offset: 17}" :md="{span: 4, offset: 18}" :lg="{span: 3, offset: 19}">
        <Button type="success" @click="groups">福袋抽奖几率</Button>
      </Col> -->
      <Col :xs="5" :sm="3" :md="2" :lg="2">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Modal
      width="300"
      v-model="modal"
      title="删除优惠券"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此优惠券？</p>
    </Modal>
    <Table border :columns="columns" :data="coupon_types" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getCouponTypes" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '优惠券名称',
          key: 'name'
        },
        {
          title: '到期时间',
          key: 'expire'
        },
        {
          title: '卡券类型',
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 1) {
              return h('div', '现金券')
            } else if (params.row.type === 2) {
              return h('div', '套餐券')
            } else if (params.row.type === 3) {
              return h('div', '折扣券')
            } else if (params.row.type === 4) {
              return h('div', '体验券')
            }
          }
        },
        {
          title: '卡券发放类型',
          key: 'style',
          render: (h, params) => {
            if (params.row.style === 2) {
              return h('div', '福袋')
            } else if (params.row.style === 3) {
              return h('div', '直接发送')
            }
          }
        },
        // {
        //   title: '是否激活',
        //   key: 'active',
        //   render: (h, params) => {
        //     return h('div', params.row.active === true ? '已激活' : '未激活')
        //   }
        // },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
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
                    this.$router.push('/coupon_types/' + params.row.id + '/edit')
                  }
                }
              }, '编辑'),
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
        }
      ],
      coupon_types: [],
      modal: false,
      delete: null,
      total: null,
      current_page: null
    }
  },
  created () {
    this.getCouponTypes(1)
  },
  methods: {
    getCouponTypes (page) {
      this.$http.get('/admin/coupon_types?page=' + page).then((res) => {
        this.coupon_types = res.data.coupon_types
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    create () {
      this.$router.push('/coupon_types/new')
    },
    groups () {
      this.$router.push('/coupon_types/groups')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.$http.delete('/admin/coupon_types/' + this.delete.id).then((res) => {
        this.coupon_types.splice(this.delete._index, 1)
        this.$Message.info('已删除此优惠券！')
        this.getCouponTypes()
      })
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>