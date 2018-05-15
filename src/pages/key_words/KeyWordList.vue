<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table class="table" border :stripe="true" :data="keyWords" :columns="columns"></Table>
    <!-- <DragableTable
        v-model="foodsTypes"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
    ></DragableTable> -->
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
// import { mapState } from 'vuex'
// import DragableTable from '@/components/dragableTable.vue'
export default {
  // components: {
  //   DragableTable
  // },
  data () {
    return {
      columns: [
        {
          title: '关键字',
          key: 'word'
        },
        {
          title: '回复',
          key: 'content'
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
      keyWords: [],
      keyWord: null,
      delete: null,
      modal: false
    }
  },
  created () {
    this.getKeyWords()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getKeyWords () {
      this.$http.get('/admin/key_words').then((res) => {
        this.keyWords = res.data.keyWords
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
      this.keyWords.splice(this.delete._index, 1)
      this.$http.delete('/admin/key_words/' + this.delete.id).then((res) => {
        this.getKeyWords()
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
    // handleOnstart1 (from) {},
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     this.$http.get('/food_types?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.foodsTypes = res.data.food_types
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