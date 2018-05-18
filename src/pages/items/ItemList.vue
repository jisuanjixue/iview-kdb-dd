<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table class="table" border :stripe="true" :data="items" :columns="columns"></Table>
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
export default {
  data () {
    return {
      columns: [
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '商品数量',
          key: 'count_all'
        },
        {
          title: '兑换商品所需积分',
          key: 'exchange'
        },
        {
          title: '创建时间',
          key: 'created_at'
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
                      this.$router.push('/items/' + params.row.id + '/edit')
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
      ],
      items: [],
      item: null,
      delete: null,
      modal: false
    }
  },
  created () {
    this.getItems()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getItems () {
      this.$http.get('/admin/items').then((res) => {
        this.items = res.data.items
      })
    },
    create () {
      this.$router.push('/items/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.items.splice(this.delete._index, 1)
      this.$http.delete('/admin/items/' + this.delete.id).then((res) => {
        this.getItems()
        let msg = res.data.notice
        this.showInfos('已删除此商品', msg)
      })
    },
    cancel () {
      this.$Message.info('您取消了操作')
    },
    showInfos (title, msg) {
      this.$Message.info({
        title: title,
        desc: msg
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