<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table class="table" border :stripe="true" :data="keywords" :columns="columns"></Table>
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
          title: '关键字',
          key: 'word'
        },
        {
          title: '回复',
          key: 'reply'
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
                      this.$router.push('/key_words/' + params.row.id + '/edit')
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
      keywords: [],
      keyword: null,
      delete: null,
      modal: false
    }
  },
  created () {
    this.getKeywords()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getKeywords () {
      this.$http.get('/admin/keywords').then((res) => {
        this.keywords = res.data.keywords
      })
    },
    create () {
      this.$router.push('/key_words/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.keywords.splice(this.delete._index, 1)
      this.$http.delete('/admin/keywords/' + this.delete.id).then((res) => {
        this.getKeywords()
        let msg = res.data.notice
        this.showInfos('已删除此关键字', msg)
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