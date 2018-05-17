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
    <Table class="table" border :stripe="true" :data="bannars" :columns="columns"></Table>
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
          title: 'URL',
          key: 'url'
        },
        {
          title: '图片',
          key: 'img',
          width: 220,
          render: (h, params) => {
            return h('img', {
              domProps: {
                src: params.row.img
              },
              style: {
                width: '180px',
                height: '60px'
              }
            })
          }
        },
        {
          title: '是否激活',
          key: 'active',
          render: (h, params) => {
            return h('div', params.row.active === true ? '已激活' : '未激活')
          }
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
                    this.$router.push('/bannars/' + params.row.id + '/edit')
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
      bannars: [],
      modal: false,
      delete: null
    }
  },
  created () {
    this.getBannars()
  },
  methods: {
    getBannars () {
      this.$http.get('/admin/bannars').then((res) => {
        // console.log(res.data.bannars)
        this.bannars = res.data.bannars
      })
    },
    create () {
      this.$router.push('/bannars/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.bannars.splice(this.delete._index, 1)
      this.$http.delete('/admin/bannars/' + this.delete.id).then((res) => {
        this.getBannars()
      })
      this.$Message.info('已删除此页头！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
    // handleOnstart1 (from) {
    // },
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