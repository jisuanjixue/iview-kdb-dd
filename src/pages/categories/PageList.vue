<template>
  <div>
    <Row>
      <Col :xs="{span: 10, offset: 9}" :sm="{span: 6, offset: 15}" :md="{span: 4, offset: 18}" :lg="{span: 4, offset: 18}">
        <Button type="default" icon="chevron-left" @click="$router.push('/categories')">返回内容管理</Button>
      </Col>
      <Col :xs="5" :sm="3" :md="2" :lg="2">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <!-- <DragableTable
        v-model="pages"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
    ></DragableTable> -->
    <Table class="table" border :stripe="true" :data="pages" :columns="columns"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除文章"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此文章？</p>
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
          title: '访问量',
          key: 'view_count'
        },
        {
          title: '点赞数',
          key: 'likes'
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
                    this.$router.push('/categories/' + this.$route.params.id + '/pages/' + params.row.id + '/edit')
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
              }, '删除'),
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
              }, '下'),
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
              }, '上')
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
      pages: [],
      modal: false,
      delete: null,
      search: ''
    }
  },
  created () {
    this.getPages()
  },
  methods: {
    getPages () {
      this.$http.get('/admin/categories/' + this.$route.params.id + '/pages').then((res) => {
        this.pages = res.data.pages
      })
    },
    create () {
      this.$router.push('/categories/' + this.$route.params.id + '/pages/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.pages.splice(this.delete._index, 1)
      this.$http.delete('/admin/categories/' + this.$route.params.id + '/pages/' + this.delete.id).then((res) => {
        this.getPages()
      })
      this.$Message.info('已删除此文章！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    downAway (row) {
      this.$http.put('/admin/categories/' + this.$route.params.id + '/pages/' + row.id + '/down').then((res) => {
        if (res.data.status === 1) {
          // row.active = false
          this.$Message.info(res.data.notice)
        }
      })
    },
    upAway (row) {
      this.$http.put('/admin/categories/' + this.$route.params.id + '/pages/' + row.id + '/up').then((res) => {
        if (res.data.status === 1) {
          // row.active = true
          this.$Message.info(res.data.notice)
        }
      })
    }
    // handleOnstart1 (from) {
    // },
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     this.$http.get('/admin/categories/' + this.$route.params.id + '/pages?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.pages = res.data.pages
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