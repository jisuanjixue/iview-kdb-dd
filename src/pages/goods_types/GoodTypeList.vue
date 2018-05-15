<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <!-- <DragableTable class="table" v-model="goodsTypes" :columns-list="columns" @on-start="handleOnstart1" @on-end="handleOnend1"></DragableTable> -->
    <Table class="table" border :stripe="true" :data="goodsTypes" :columns="columns"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此信息？</p>
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
          title: '类型名称',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
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
                      this.$router.push('/goods_types/' + params.row.id + '/edit')
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
            // }
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
      goodsTypes: [],
      goodsType: null,
      deleteGoodType: null,
      modal: false
    }
  },
  created () {
    this.getGoodsTypes()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getGoodsTypes () {
      this.$http.get('/admin/goods_types').then((res) => {
        // console.log(res.data)
        this.goodsTypes = res.data.goods_types
      })
    },
    create () {
      this.$router.push('/goods_types/new')
    },
    ok () {
      this.goodsTypes.splice(this.deleteGoodType._index, 1)
      this.$http.delete('/admin/goods_types/' + this.deleteGoodType.id).then((res) => {
        this.getGoodsTypes()
      })
      this.$Message.info('已删除此用货种！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    showModal (row) {
      this.modal = true
      this.deleteGoodType = row
    }
    // handleOnstart1 (from) {},
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     axios.get('/goods_types?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.goodsTypes = res.data.goods_types
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