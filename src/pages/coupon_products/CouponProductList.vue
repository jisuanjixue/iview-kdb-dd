<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <!-- <DragableTable
        v-model="bannars"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
    ></DragableTable> -->
    <Table class="table" border :stripe="true" :data="couponProducts" :columns="columns"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除页头"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此页头？</p>
    </Modal>
  </div>
</template>

<script>
// import DragableTable from '@/components/dragableTable.vue'
export default {
  // components: {
  //   DragableTable
  // },
  data () {
    return {
      columns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '库存',
          key: ' count'
        },
        {
          title: '销量',
          key: ' sales'
        },
        {
          title: '创建时间',
          key: ' created_at'
        },
        // {
        //   title: '是否激活',
        //   key: 'active',
        //   render: (h, params) => {
        //     return h('div', params.row.active === true ? '已激活' : '未激活')
        //   }
        // },
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
                    this.$router.push('/coupon_products/' + params.row.id + '/edit')
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
        // {
        //   title: '拖拽排序',
        //   key: 'drag',
        //   width: 90,
        //   align: 'center',
        //   render: (h) => {
        //     return h(
        //       'Icon',
        //       {
        //         props: {
        //           type: 'arrow-move',
        //           size: 24
        //         }
        //       }
        //     )
        //   }
        // }
      ],
      couponProducts: [],
      modal: false,
      delete: null
    }
  },
  created () {
    this.getCouponProducts()
  },
  methods: {
    getCouponProducts () {
      this.$http.get('/admin/coupon_products').then((res) => {
        // console.log(res.data.bannars)
        this.couponProducts = res.data.coupon_products
      })
    },
    create () {
      this.$router.push('/coupon_products/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.coupon_products.splice(this.delete._index, 1)
      this.$http.delete('/admin/coupon_products/' + this.delete.id).then((res) => {
        this.getCouponProducts()
      })
      this.$Message.info('已删除此页头！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
    // handleOnstart1 (from) {
    // }
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     this.$http.get('/bannars?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.bannars = res.data.bannars
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>