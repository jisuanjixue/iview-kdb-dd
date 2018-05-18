<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table class="table" border :stripe="true" :data="level_rulers" :columns="columns"></Table>
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
          title: '等级名称',
          key: 'name'
        },
        {
          title: '等级排位',
          key: 'rank'
        },
        {
          title: '等级所需分数',
          key: 'value'
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
                      this.$router.push('/level_rulers/' + params.row.id + '/edit')
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
      level_rulers: [],
      level_ruler: null,
      delete: null,
      modal: false
    }
  },
  created () {
    this.getLevelRulers()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getLevelRulers () {
      this.$http.get('/admin/level_rulers').then((res) => {
        this.level_rulers = res.data.level_rulers
      })
    },
    create () {
      this.$router.push('/level_rulers/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.level_rulers.splice(this.delete._index, 1)
      this.$http.delete('/admin/level_rulers/' + this.delete.id).then((res) => {
        this.getlevel_rulers()
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